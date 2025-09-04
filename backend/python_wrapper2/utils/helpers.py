import traceback
from flask import jsonify

def handle_error(e, location="", status_code=500):
    
    print(f"\n❌ Error in {location}: {str(e)}")
    traceback.print_exc()
    return jsonify({"success": False, "message": str(e)}), status_code

