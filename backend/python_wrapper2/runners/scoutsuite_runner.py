import os
import json
import re
import glob
import time
import shutil
import subprocess
from pymongo import MongoClient, errors
from config import MONGO_URI, MONGO_DB, SCAN_COLLECTION
from flask import jsonify
from datetime import datetime, timezone, timedelta
from zoneinfo import ZoneInfo
from config import MONGO_URI, MONGO_DB, SCAN_COLLECTION
from authentication.keycloak_auth import get_user_counter_from_keycloak

# Reuse MongoDB client
mongo_client = MongoClient(MONGO_URI)
collection = mongo_client[MONGO_DB][SCAN_COLLECTION]

def categorize_scoutsuite_error(stderr: str) -> str:
    if not stderr:
        return "Unknown error (no stderr output)"

    stderr_lower = stderr.lower()

    # === Cloud agnostic ===
    if "authentication failed" in stderr_lower or "unauthenticated" in stderr_lower or "authentication failure" in stderr_lower:
        return "Authentication failed: Invalid credentials"

    if "accessdenied" in stderr_lower or "unauthorized" in stderr_lower or "not authorized" in stderr_lower:
        return "Permission denied: Missing privileges"

    if "could not connect" in stderr_lower or "timed out" in stderr_lower or "network is unreachable" in stderr_lower:
        return "Network error: Unable to reach API endpoint"

    if "permission denied" in stderr_lower or "no such file" in stderr_lower:
        return "Filesystem error: ScoutSuite cannot write/read required files"

    # === AWS specific ===
    if "invalidclienttokenid" in stderr_lower:
        return "AWS: Invalid access key or secret key"

    if "invalidregion" in stderr_lower:
        return "AWS: Invalid or unsupported region"

    # === GCP specific ===
    if "permission_denied" in stderr_lower:
        return "GCP: Permission denied (IAM roles missing)"

    if "resource_exhausted" in stderr_lower:
        return "GCP: Quota exceeded or API limit reached"

    if "project not found" in stderr_lower:
        return "GCP: Invalid or missing project ID"
    
    if "no projects found" in stderr_lower:
        return "GCP error: No projects found"

    # === Azure specific ===
    if "authorizationfailed" in stderr_lower:
        return "Azure: Authorization failed, missing RBAC role"

    if "invalidsubscription" in stderr_lower:
        return "Azure: Invalid or inactive subscription"

    if "authenticationfailed" in stderr_lower:
        return "Azure: Invalid service principal or tenant ID"
    
    if "traceback" in stderr_lower or "exception" in stderr_lower:
        return "Internal error: ScoutSuite runtime exception"


    return f"Uncategorized error: {stderr.strip()[:300]}"


def run_scoutsuite_aws(user_id, aws_access_key, aws_secret_key, region="us-east-1"):
    counter_result = get_user_counter_from_keycloak(user_id)
    if not counter_result["success"]:
        return {
            "success": False,
            "status": "failed",
            "message": f"Cannot fetch user counter: {counter_result['message']}"
        }, 400

    if counter_result["counter"] <= 0:
        return {
            "success": False,
            "status": "failed",
            "message": "User has no remaining scans. Please top up your counter."
        }, 400  # Forbidden because user cannot perform scan
    scan_timestamp = int(time.time() * 1000)
    created_time = datetime.utcnow().replace(tzinfo=timezone.utc)
    output_dir = f"output/{user_id}/{scan_timestamp}"
    os.makedirs(output_dir, exist_ok=True)

    try:
        # AWS environment
        env = os.environ.copy()
        env["AWS_ACCESS_KEY_ID"] = aws_access_key
        env["AWS_SECRET_ACCESS_KEY"] = aws_secret_key
        env["AWS_DEFAULT_REGION"] = region
        env["SCOUTSUITE_NO_BROWSER"] = "true"

        # Run ScoutSuite
        result = subprocess.run(
            ["scout", "aws", "--no-browser", "--report-dir", output_dir],
            env=env,
            capture_output=True,
            text=True
        )

        # Parse disabled/missing services from stderr
        disabled_services = []
        service_pattern = re.compile(r'([\w\s]+) has not been used|is disabled', re.IGNORECASE)

        for line in result.stderr.splitlines():
            match = service_pattern.search(line)
            if match:
                service_name = match.group(1).strip()
                disabled_services.append({"service": service_name, "error": line.strip()})

        # Deduplicate
        seen = set()
        unique_disabled_services = []
        for entry in disabled_services:
            key = (entry["service"], entry["error"])
            if key not in seen:
                seen.add(key)
                unique_disabled_services.append(entry)
        disabled_services = unique_disabled_services

        # Determine scan status
        if disabled_services:
            scan_status = "partial"
            scan_message = f"Scan completed with some disabled/missing services"
        elif result.returncode != 0:
            scan_status = "failed"
            categorized_message = categorize_scoutsuite_error(result.stderr)

            # Delete the folder after insertion
            user_output_dir = f"output/{user_id}"
            if os.path.exists(user_output_dir):
                shutil.rmtree(user_output_dir)
                print(f"Deleted all scans for user: {user_output_dir}")
            
            # Print for logs
            print("=== SCOUTSUITE ERROR ===")
            print("Status:", scan_status)
            print("STDERR:", result.stderr)
            print("Categorized:", categorized_message)

            return {
                "success": False,
                "status": "failed",
                "message": categorized_message,
                "raw_error": result.stderr  # optional, for debugging
            }, 500
        else:
            scan_status = "success"
            scan_message = "Scan completed successfully."

        # Read .js report
        folder_path = os.path.join(output_dir, "scoutsuite-results")
        pattern = os.path.join(folder_path, "scoutsuite_results_aws-*.js")
        matching_files = glob.glob(pattern)
        if not matching_files:
            return {"success": False, "status": "failed", "message": "ScoutSuite AWS result file not found"}, 404

        js_path = matching_files[0]
        with open(js_path, "r") as f:
            content = f.read()

        match = re.search(r'scoutsuite_results\s*=\s*(\{.*\})', content, re.DOTALL)
        if not match:
            return {"success": False, "status": "failed", "message": "Could not extract JSON from .js file"}, 500

        json_data = json.loads(match.group(1))

        scan_record = {
            "scan_id": scan_timestamp,
            "cloud_provider": "AWS",
            "data": json_data,
            "disabled_services": disabled_services,
            "status": scan_status,
            "created_at": created_time,
            "user_id":user_id
        }

        collection.insert_one(scan_record)

        # Delete the folder after insertion
        user_output_dir = f"output/{user_id}"
        if os.path.exists(user_output_dir):
            shutil.rmtree(user_output_dir)
            print(f"Deleted all scans for user: {user_output_dir}")

        return {
            "success": True,
            "status": scan_status,
            "message": scan_message,
            "disabled_services": disabled_services
        }, 200

    except Exception as e:
        return {"success": False, "status": "failed", "message": str(e)}, 500


def run_scoutsuite_gcp(user_id, project_id, gcp_key_path):
    # --- Check user scan counter first ---
    counter_result = get_user_counter_from_keycloak(user_id)
    if not counter_result["success"]:
        return {
            "success": False,
            "status": "failed",
            "message": f"Cannot fetch user counter: {counter_result['message']}"
        }, 400

    if counter_result["counter"] <= 0:
        return {
            "success": False,
            "status": "failed",
            "message": "User has no remaining scans. Please top up your counter."
        }, 400  # Forbidden because user cannot perform scan

    scan_timestamp = int(time.time() * 1000)

    created_time = datetime.utcnow().replace(tzinfo=timezone.utc)
    print(created_time)

    output_dir = f"output/{user_id}/{scan_timestamp}"
    os.makedirs(output_dir, exist_ok=True)

    try:
        env = os.environ.copy()
        env["SCOUTSUITE_NO_BROWSER"] = "true"
        env["GOOGLE_APPLICATION_CREDENTIALS"] = gcp_key_path

        # Run ScoutSuite
        result = subprocess.run(
            [
                "scout", "gcp", "-s", gcp_key_path, 
                "--project-id", project_id, "--no-browser", 
                "--report-dir", output_dir
            ],
            env=env,
            capture_output=True,
            text=True
        )

        disabled_apis = []

        # Regex patterns
        api_pattern = re.compile(r'([\w\s\(\)]+API) (has not been used|is disabled)')
        url_pattern = re.compile(r'https://console\.developers\.google\.com/apis/api/[\w\./?=&-]+')

        lines = result.stderr.splitlines()
        i = 0
        while i < len(lines):
            line = lines[i]
            api_match = api_pattern.search(line)
            if api_match:
                api_name = api_match.group(1).strip()
                # Look ahead a few lines to find URL
                url = None
                for j in range(i, min(i + 5, len(lines))):
                    url_match = url_pattern.search(lines[j])
                    if url_match:
                        url = url_match.group(0)
                        break
                disabled_apis.append({"api": api_name, "url": url})
            i += 1

        # Use a set to track unique API+URL pairs
        seen = set()
        unique_disabled_apis = []

        for entry in disabled_apis:
            # Use tuple of (api, url) as unique key
            key = (entry["api"], entry["url"])
            if key not in seen:
                seen.add(key)
                unique_disabled_apis.append(entry)

        # Replace original list with unique list
        disabled_apis = unique_disabled_apis
        
        # Determine scan status
        if disabled_apis:
            scan_status = "partial"
            scan_message = f"Scan completed with some disabled APIs"
        elif result.returncode != 0:
            scan_status = "failed"
            categorized_message = categorize_scoutsuite_error(result.stderr)
            
            user_output_dir = f"output/{user_id}"
            if os.path.exists(user_output_dir):
                shutil.rmtree(user_output_dir)
                print(f"Deleted all scans for user: {user_output_dir}")

            # Print for logs
            print("=== SCOUTSUITE ERROR ===")
            print("disabled_apis:",disabled_apis)
            print("Status:", scan_status)
            print("STDERR:", result.stderr)
            print("Categorized:", categorized_message)

            return {
                "success": False,
                "status": "failed",
                "message": categorized_message,
                "raw_error": result.stderr  # optional, for debugging
            }, 400
        else:
            scan_status = "success"
            scan_message = "Scan completed successfully."

        # Read the .js result
        folder_path = os.path.join(output_dir, "scoutsuite-results")
        pattern = os.path.join(folder_path, "scoutsuite_results_gcp-*.js")
        matching_files = glob.glob(pattern)
        if not matching_files:
            return {"success": False, "status": "failed", "message": "ScoutSuite GCP result file not found"}, 404

        js_path = matching_files[0]
        with open(js_path, "r") as f:
            content = f.read()

        match = re.search(r'scoutsuite_results\s*=\s*(\{.*\})', content, re.DOTALL)
        if not match:
            return {"success": False, "status": "failed", "message": "Could not extract JSON from .js file"}, 500

        json_data = json.loads(match.group(1))

        scan_record = {
            "scan_id": scan_timestamp,
            "cloud_provider": "GCP",
            "data": json_data,
            "disabled_apis": disabled_apis,
            "status": scan_status,
            "created_at": created_time,
            "user_id":user_id
        }

        collection.insert_one(scan_record)

        # Clean up
        user_output_dir = f"output/{user_id}"
        if os.path.exists(user_output_dir):
            shutil.rmtree(user_output_dir)

        return {
            "success": True,
            "status": scan_status,
            "message": scan_message,
            "disabled_apis": disabled_apis
        }, 200

    except Exception as e:
        return {"success": False, "status": "failed", "message": str(e)}, 500


def run_scoutsuite_azure(user_id, subscription_id, tenant_id, client_id, client_secret):
    counter_result = get_user_counter_from_keycloak(user_id)
    if not counter_result["success"]:
        return {
            "success": False,
            "status": "failed",
            "message": f"Cannot fetch user counter: {counter_result['message']}"
        }, 400

    if counter_result["counter"] <= 0:
        return {
            "success": False,
            "status": "failed",
            "message": "User has no remaining scans. Please top up your counter."
        }, 400  # Forbidden because user cannot perform scan
    scan_timestamp = int(time.time() * 1000)
    created_time = datetime.utcnow().replace(tzinfo=timezone.utc)
    output_dir = f"output/{user_id}/{scan_timestamp}"
    os.makedirs(output_dir, exist_ok=True)

    try:
        env = os.environ.copy()
        env["SCOUTSUITE_NO_BROWSER"] = "true"

        # Run ScoutSuite with service principal authentication
        cmd = [
            "scout", "azure",
            "-s",  # service principal authentication
            "--tenant", tenant_id,
            "--client-id", client_id,
            "--client-secret", client_secret,
            "--subscriptions", subscription_id,  # ✅ correct flag
            "--no-browser",
            "--report-dir", output_dir
        ]

        result = subprocess.run(
            cmd,
            env=env,
            capture_output=True,
            text=True
        )

        disabled_services = []

        # Regex for disabled/unused services
        service_pattern = re.compile(r'([\w\s\(\)]+) (is not enabled|is disabled|has not been used)')
        url_pattern = re.compile(r'https://portal\.azure\.com/#blade/[\w\./?=&-]+')

        lines = result.stderr.splitlines()
        i = 0
        while i < len(lines):
            line = lines[i]
            service_match = service_pattern.search(line)
            if service_match:
                service_name = service_match.group(1).strip()
                # Look ahead for URL
                url = None
                for j in range(i, min(i + 5, len(lines))):
                    url_match = url_pattern.search(lines[j])
                    if url_match:
                        url = url_match.group(0)
                        break
                disabled_services.append({"service": service_name, "url": url})
            i += 1

        # Deduplicate
        seen = set()
        unique_disabled = []
        for entry in disabled_services:
            key = (entry["service"], entry["url"])
            if key not in seen:
                seen.add(key)
                unique_disabled.append(entry)
        disabled_services = unique_disabled

        # Determine scan status
        if disabled_services:
            scan_status = "partial"
            scan_message = "Scan completed with some disabled services"
        elif result.returncode != 0:
            scan_status = "failed"
            categorized_message = categorize_scoutsuite_error(result.stderr)
            
            user_output_dir = f"output/{user_id}"
            if os.path.exists(user_output_dir):
                shutil.rmtree(user_output_dir)
                print(f"Deleted all scans for user: {user_output_dir}")

            # Print for logs
            print("=== SCOUTSUITE ERROR ===")
            print("Status:", scan_status)
            print("STDERR:", result.stderr)
            print("Categorized:", categorized_message)

            return {
                "success": False,
                "status": "failed",
                "message": categorized_message,
                "raw_error": result.stderr  # optional, for debugging
            }, 500
        else:
            scan_status = "success"
            scan_message = "Scan completed successfully."

        # Read the .js result
        folder_path = os.path.join(output_dir, "scoutsuite-results")
        pattern = os.path.join(folder_path, "scoutsuite_results_azure-*.js")
        matching_files = glob.glob(pattern)
        if not matching_files:
            return {"success": False, "status": "failed", "message": "ScoutSuite Azure result file not found"}, 404

        js_path = matching_files[0]
        with open(js_path, "r") as f:
            content = f.read()

        match = re.search(r'scoutsuite_results\s*=\s*(\{.*\})', content, re.DOTALL)
        if not match:
            return {"success": False, "status": "failed", "message": "Could not extract JSON from .js file"}, 500

        json_data = json.loads(match.group(1))

        scan_record = {
            "scan_id": scan_timestamp,
            "cloud_provider": "Azure",
            "data": json_data,
            "disabled_services": disabled_services,
            "status": scan_status,
            "created_at": created_time,
            "user_id":user_id
        }

        collection.insert_one(scan_record)

        # Clean up
        user_output_dir = f"output/{user_id}"
        if os.path.exists(user_output_dir):
            shutil.rmtree(user_output_dir)

        return {
            "success": True,
            "status": scan_status,
            "message": scan_message,
            "disabled_services": disabled_services
        }, 200

    except Exception as e:
        return {"success": False, "status": "failed", "message": str(e)}, 500
