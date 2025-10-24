from flask import Blueprint, request, jsonify
from auth.keycloak import token_required, decrement_user_counter_in_keycloak
from runners.scoutsuite import run_scoutsuite_aws,run_scoutsuite_gcp,run_scoutsuite_azure
from utils.error import handle_error
from pymongo import MongoClient
import tempfile,json
from datetime import timezone, timedelta
from config import MONGO_URI, MONGO_DB, SCAN_COLLECTION
from .arn import update_dom
# Reuse MongoDB client
mongo_client = MongoClient(MONGO_URI)
collection = mongo_client[MONGO_DB][SCAN_COLLECTION]

scan_bp = Blueprint("scan", __name__)

@scan_bp.route("/get_summary/<user_id>/<scan_id>", methods=["GET"])
@token_required
def get_summary(user_id, scan_id):
    try:
        result = collection.find_one({"user_id": user_id, "scan_id": int(scan_id)})
        if not result:
            return handle_error(Exception("Scan not found"), "get_summary", 404,"Scan not found")
        summary = result.get("data", {}).get("last_run", {}).get("summary", {})
        account_id = result.get("data", {}).get("account_id")
        return jsonify({"success": True, "summary": summary,"accountId":account_id}), 200
    except Exception as e:
        return handle_error(e, "get_summary")


@scan_bp.route("/get_findings/<user_id>/<scan_id>/<service_name>", methods=["GET"])
@token_required
def get_findings(user_id, scan_id, service_name):
    try:
        result = collection.find_one({"user_id": user_id, "scan_id": int(scan_id)})
        if not result:
            return handle_error(Exception("Scan not found"), "get_findings", 404,"Scan not found")

        services = result.get("data", {}).get("services", {})
        service_data = services.get(service_name.lower(), {})

        return jsonify({"success": True, "findings": service_data.get("findings", {})}), 200
    except Exception as e:
        return handle_error(e, "get_findings")

@scan_bp.route("/get_finding_details/<user_id>/<scan_id>/<service_name>", methods=["POST"])
def get_finding_details(user_id, scan_id, service_name):
    try:
        description_query = request.json.get("description")
        if not description_query:
            return handle_error(
                Exception("Description not provided"),
                "get_finding_details",
                400,
                "Description query param is required"
            )

        # fetch scan result
        result = collection.find_one({"user_id": user_id, "scan_id": int(scan_id)})
        if not result:
            return handle_error(Exception("Scan not found"),
                                "get_finding_details", 404,
                                "Scan not found")
        service = result.get("data", {})
        path_string = f"services.{service_name}.findings.{description_query}.items"
        rendered_templates = update_dom(path_string,service)
        print("rendered_templates",rendered_templates)
        with open("rendered_templates.json", "w") as f:
            json.dump(rendered_templates, f, indent=2)
        return jsonify({
            "success": True,
            "rendered_data": rendered_templates
        }), 200

    except Exception as e:
        return handle_error(e, "get_finding_details")

@scan_bp.route("/get_all_dangerous_findings/<user_id>/<scan_id>", methods=["GET"])
@token_required
def get_all_dangerous_findings(user_id, scan_id):
    try:
        result = collection.find_one({"user_id": user_id, "scan_id": int(scan_id)})
        if not result:
            return handle_error(Exception("Scan not found"), "get_all_dangerous_findings", 404,"Scan not found")

        services = result.get("data", {}).get("services", {})
        dangerous = [
            {
                "service": s_name.upper(),
                "finding_key": f_key,
                "description": f.get("description"),
                "level": f.get("level"),
                "flagged_items": f.get("flagged_items"),
                "checked_items": f.get("checked_items"),
                "rationale": f.get("rationale"),
                "remediation": f.get("remediation"),
                "references": f.get("references"),
                "items": f.get("items"),
            }
            for s_name, s_data in services.items()
            for f_key, f in s_data.get("findings", {}).items()
            if f.get("level") == "danger" and f.get("flagged_items", 0) > 0
        ]

        return jsonify({"success": True, "dangerous_findings": dangerous}), 200
    except Exception as e:
        return handle_error(e, "get_all_dangerous_findings")


@scan_bp.route("/count_findings_by_level/<user_id>/<scan_id>", methods=["GET"])
@token_required
def count_findings_by_level(user_id, scan_id):
    try:
        result = collection.find_one({"user_id": user_id, "scan_id": int(scan_id)})
        if not result:
            return handle_error(Exception("Scan not found"), "count_findings_by_level", 404,"Scan not found")

        summary = result.get("data", {}).get("last_run", {}).get("summary", {})
        counts = {"danger": 0, "warning": 0, "good": 0}
        for details in summary.values():
            max_level = details.get("max_level", "")
            flagged_items = details.get("flagged_items", 0)
            if max_level == "danger" and flagged_items > 0:
                counts["danger"] += 1
            elif max_level == "warning" and flagged_items > 0:
                counts["warning"] += 1
            else:
                counts["good"] += 1

        return jsonify({"success": True, "counts": counts}), 200
    except Exception as e:
        return handle_error(e, "count_findings_by_level")


@scan_bp.route("/get_service_groups/<user_id>/<scan_id>", methods=["GET"])
@token_required
def get_service_groups(user_id, scan_id):
    try:
        result = collection.find_one({"user_id": user_id, "scan_id": int(scan_id)})
        if not result:
            return handle_error(Exception("Scan not found"), "get_service_groups", 404,"Scan not found")

        metadata = result.get("data", {}).get("metadata", {})
        groups = {g: list(s.keys()) if isinstance(s, dict) else [] for g, s in metadata.items()}

        return jsonify({"success": True, "service_groups": groups}), 200
    except Exception as e:
        return handle_error(e, "get_service_groups")


@scan_bp.route("/get_service_list/<user_id>/<scan_id>", methods=["GET"])
@token_required
def get_service_list(user_id, scan_id):
    try:
        result = collection.find_one({"user_id": user_id, "scan_id": int(scan_id)})
        if not result:
            return handle_error(Exception("Scan not found"), "get_service_list", 404,"Scan not found")

        service_list = result.get("data", {}).get("service_list", [])
        return jsonify({"success": True, "service_list": service_list}), 200
    except Exception as e:
        return handle_error(e, "get_service_list")


@scan_bp.route("/run-scoutsuite", methods=["POST"])
@token_required
def run_scan():
    try:
        data = request.json or {}
        aws_key = data.get("aws_access_key")
        aws_secret = data.get("aws_secret_key")
        region = data.get("region", "us-east-1")
        user_id = data.get("user_id")

        if not aws_key or not aws_secret:
            return handle_error(ValueError("AWS credentials required"), "run_scan", 400,"AWS credentials required")

        result, status = run_scoutsuite_aws(user_id, aws_key, aws_secret, region)

        # Only decrement counter if scan was successful
        if result.get("success", False):
            counter_response = decrement_user_counter_in_keycloak(user_id)
            if not counter_response["success"]:
                # Optional: log this, but don't block the scan result
                print(f"Warning: {counter_response['message']}")

        return jsonify(result), status
    except Exception as e:
        return handle_error(e, "run_scan")

@scan_bp.route("/run-scoutsuite-gcp", methods=["POST"])
@token_required
def run_scan_gcp():
    try:
        user_id = request.form.get("user_id")
        project_id = request.form.get("project_id")
        gcp_file = request.files.get("file")  # the uploaded .json service account file

        if not project_id:
            return handle_error(
                ValueError("GCP Project ID required"),
                "run_scan_gcp", 400,
                "GCP Project ID required"
            )
        if not gcp_file:
            return handle_error(
                ValueError("GCP service account JSON file required"),
                "run_scan_gcp", 400,
                "GCP service account JSON file required"
            )

        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(mode="w+b", suffix=".json") as tmp_file:
            gcp_file.save(tmp_file.name)
            tmp_file.flush()  # make sure file is written

            # Run the scan
            result, status = run_scoutsuite_gcp(user_id, project_id, tmp_file.name)

            # Only decrement counter if scan was successful
            if result.get("success", False):
                counter_response = decrement_user_counter_in_keycloak(user_id)
                if not counter_response["success"]:
                    print(f"Warning: {counter_response['message']}")

        # tmp_file is auto-deleted here

        return jsonify(result), status

    except Exception as e:
        return handle_error(e, "run_scan_gcp")

@scan_bp.route("/run-scoutsuite-azure", methods=["POST"])
@token_required
def run_scan_azure():
    try:
        data = request.get_json(force=True)

        user_id = data.get("user_id")
        subscription_id = data.get("subscription_id")
        tenant_id = data.get("tenant_id")
        client_id = data.get("client_id")
        client_secret = data.get("client_secret")

        if not all([tenant_id, client_id, client_secret]):
            return handle_error(
                ValueError("Azure credentials (subscription_id, tenant_id, client_id, client_secret) are required"),
                "run_scan_azure",
                400,
                "Azure credentials (subscription_id, tenant_id, client_id, client_secret) are required"
            )

        result, status = run_scoutsuite_azure(
            user_id,
            subscription_id,
            tenant_id,
            client_id,
            client_secret
        )

        # Only decrement counter if scan was successful
        if result.get("success", False):
            counter_response = decrement_user_counter_in_keycloak(user_id)
            if not counter_response["success"]:
                # Optional: log this, but don't block the scan result
                print(f"Warning: {counter_response['message']}")

        return jsonify(result), status

    except Exception as e:
        return handle_error(e, "run_scan_azure",500,"credentials are wrong could you check once")


@scan_bp.route("/get-user-scans/<user_id>", methods=["GET"])
@token_required
def get_user_scans(user_id):
    try:
        scans = list(
            collection.find(
                {"user_id": user_id},
                {"_id": 0, "scan_id": 1, "cloud_provider": 1, "region": 1, "created_at": 1},
            ).sort("created_at", -1)
        )

        if not scans:
            return jsonify({"success": True, "scans": [], "message": "No scans found for this user"}), 200

        for scan in scans:
            if "created_at" in scan:
                ist_time = scan["created_at"].replace(tzinfo=timezone.utc) + timedelta(hours=5, minutes=30)
                scan["created_at"] = ist_time.isoformat()

        return jsonify({"success": True, "scans": scans}), 200
    except Exception as e:
        return handle_error(e, "get_user_scans")

@scan_bp.route("/delete-user-scan/<user_id>/<int:scan_id>", methods=["DELETE"])
@token_required
def delete_user_scan(user_id, scan_id):
    try:
        # Delete scan from MongoDB
        result = collection.delete_one({"user_id": user_id, "scan_id": scan_id})

        if result.deleted_count == 0:
            return jsonify({"success": False, "message": "Scan not found or already deleted"}), 404

        return jsonify({"success": True, "message": "Scan deleted successfully"}), 200

    except Exception as e:
        return handle_error(e, "delete_user_scan")


