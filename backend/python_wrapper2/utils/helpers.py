import traceback
from flask import jsonify

def handle_error(e, location="", status_code=500, user_message="Internal Server Error"):
    print(f"Error in {location}: {str(e)}")
    traceback.print_exc()

    # Send only a safe message to frontend
    return jsonify({"success": False, "message": user_message}), status_code

