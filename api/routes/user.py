from flask import Blueprint, request, jsonify
from auth.keycloak import update_user_in_keycloak
from utils.error import handle_error
from jose import jwt

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/user-details", methods=["GET"])
def user_details():
    try:
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return handle_error(ValueError("Authorization token missing"), "user_details", 400)

        decoded = jwt.get_unverified_claims(token)

        return jsonify({
            "success": True,
            "data": {
                "username": decoded.get("preferred_username"),
                "email": decoded.get("email"),
                "first_name": decoded.get("given_name"),
                "last_name": decoded.get("family_name"),
                "full_name": decoded.get("name"),
                "counter": decoded.get("counter"),
            }
        }), 200

    except Exception as e:
        return handle_error(e, "user_details")


@user_bp.route("/update-user", methods=["POST"])
def update_user():
    try:
        data = request.json or {}
        username = data.get("username")
        first_name = data.get("firstName")
        last_name = data.get("lastName")
        email = data.get("email")

        if not username:
            return handle_error(ValueError("Username is required"), "update_user", 400)

        result = update_user_in_keycloak(username, first_name, last_name, email)

        if "message" in result:
            return jsonify({
                "success": True,
                "message": result["message"]
            }), 200
        else:
            # Keycloak update failed
            return handle_error(Exception(result.get("error", "Update failed")), "update_user", 400)

    except Exception as e:
        return handle_error(e, "update_user")

# from flask import Blueprint, request, jsonify
# from authentication.keycloak_auth import token_required, update_user_in_keycloak
# from utils.error import handle_error
# from jose import jwt

# user_bp = Blueprint("user_bp", __name__)

# @user_bp.route("/user-details", methods=["GET"])
# @token_required
# def user_details():
#     try:
#         token = request.headers.get('Authorization', '').replace("Bearer ", "")
#         decoded = jwt.get_unverified_claims(token)
#         return jsonify({
#             "success": True,
#             "data": {
#                 "username": decoded.get("preferred_username"),
#                 "email": decoded.get("email"),
#                 "first_name": decoded.get("given_name"),
#                 "last_name": decoded.get("family_name"),
#                 "full_name": decoded.get("name"),
#                 "counter": decoded.get("counter"),
#             }
#         })
#     except Exception as e:
#         return handle_error(e, "user_details")

# @user_bp.route("/update-user", methods=["POST"])
# def update_user():
#     try:
#         data = request.json
#         username = data.get("username")
#         first_name = data.get("firstName")
#         last_name = data.get("lastName")
#         email = data.get("email")

#         if not username:
#             return jsonify({"success": False, "message": "Username required"}), 400

#         result = update_user_in_keycloak(username, first_name, last_name, email)
#         if "message" in result:
#             return jsonify({"success": True, "message": result["message"]})
#         else:
#             return jsonify({"success": False, "message": result.get("error", "Update failed")})
#     except Exception as e:
#         return handle_error(e, "update_user")
