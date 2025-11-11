from flask import Flask
from flask_cors import CORS
from routes.scan_routes import scan_bp
from routes.user_routes import user_bp
from routes.arn_routes import arn
from config import Frontend_URL
import os


app = Flask(__name__)
#CORS(app, supports_credentials=True)
CORS(app, supports_credentials=True, origins=[Frontend_URL])

# Register Blueprints
app.register_blueprint(scan_bp, url_prefix="/scans")
app.register_blueprint(user_bp, url_prefix="/users")
app.register_blueprint(arn, url_prefix="/arn")

if __name__ == "__main__":
    print("🚀 Flask API starting...")
    
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 4000))
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"

    app.run(host=host, port=port, debug=debug)



