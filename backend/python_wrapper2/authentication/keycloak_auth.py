from keycloak import KeycloakAdmin
from functools import wraps
from flask import request, jsonify
import requests
from config import KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET

def get_keycloak_admin():
    return KeycloakAdmin(
        server_url=KEYCLOAK_URL,       # e.g. "http://localhost:8080/"
        username="admin",              # master realm admin username
        password="admin",# master realm admin password
        realm_name="cloud",           # authenticate against master realm
        verify=True
    )


def decrement_user_counter_in_keycloak(user_id):
    """
    Decrement the 'counter' attribute of a Keycloak user by 1 using user_id.
    Returns a standard success/failure response.
    """
    admin = get_keycloak_admin()
    users = admin.get_users({})   # Empty dict fetches all users
    
    try:
        # Fetch user details directly
        user = admin.get_user(user_id)
        if not user:
            return {"success": False, "message": "User not found"}

        # Get existing user details
        first_name = user.get("firstName")
        last_name = user.get("lastName")
        email = user.get("email")
        attributes = user.get("attributes", {})

        # Get current counter, default to 0 if not set
        current_counter = int(attributes.get("counter", [0])[0])

        if current_counter <= 0:
            return {"success": False, "message": "User has no remaining scans."}

        # Decrement counter
        new_counter = current_counter - 1
        attributes["counter"] = [str(new_counter)]

        # Prepare payload to update Keycloak
        payload = {
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "attributes": attributes
        }

        admin.update_user(user_id=user_id, payload=payload)

        # Return standard success response
        return {"success": True, "message": "Counter decremented successfully", "counter": new_counter}

    except Exception as e:
        return {"success": False, "message": f"Error updating user: {str(e)}"}

def get_user_counter_from_keycloak(user_id):
    """
    Fetch the current 'counter' attribute of a Keycloak user using user_id.
    Returns a standard success/failure response with the counter value.
    """
    admin = get_keycloak_admin()
    
    try:
        # Fetch user details directly
        user = admin.get_user(user_id)
        if not user:
            return {"success": False, "message": "User not found"}

        # Get attributes
        attributes = user.get("attributes", {})

        # Parse counter safely, default to 0 if not set or invalid
        try:
            current_counter = int(attributes.get("counter", [0])[0])
        except (ValueError, TypeError):
            current_counter = 0

        return {
            "success": True,
            "message": "Counter fetched successfully",
            "counter": current_counter
        }

    except Exception as e:
        return {"success": False, "message": f"Error fetching user counter: {str(e)}"}


def introspect_token(token):
    url = f"{KEYCLOAK_URL}realms/{KEYCLOAK_REALM}/protocol/openid-connect/token/introspect"
    response = requests.post(url, data={
        "token": token,
        "client_id": KEYCLOAK_CLIENT_ID,
        "client_secret": KEYCLOAK_CLIENT_SECRET
    })
    return response.json()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return jsonify({"error": "Missing token"}), 401
        result = introspect_token(token)
        if not result.get("active"):
            return jsonify({"error": "Invalid or expired token"}), 401
        request.user = {
            "user_id": result.get("sub"),
            "username": result.get("preferred_username"),
            "email": result.get("email"),
            "first_name": result.get("given_name"),
            "last_name": result.get("family_name"),
            "counter": result.get("counter"),
        }
        return f(*args, **kwargs)
    return decorated

def update_user_in_keycloak(username, first_name=None, last_name=None, email=None, counter=None):
    """
    Update user details and counter in Keycloak.
    Only fields provided (non-None) will be updated.
    """
    admin = get_keycloak_admin()  # your existing admin instance
    users = admin.get_users({"username": username})
    if not users:
        return {"error": "User not found"}
    
    user_id = users[0]["id"]
    payload = {}

    if first_name is not None:
        payload["firstName"] = first_name
    if last_name is not None:
        payload["lastName"] = last_name
    if email is not None:
        payload["email"] = email

    # Keycloak stores custom attributes in "attributes" dict
    if counter is not None:
        attributes = users[0].get("attributes", {})
        attributes["counter"] = [str(counter)]  # must be a list of strings
        payload["attributes"] = attributes

    admin.update_user(user_id=user_id, payload=payload)
    return {"message": f"User {username} updated successfully."}

