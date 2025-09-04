from flask import Flask
from flask_cors import CORS
from routes.scan_routes import scan_bp
from routes.user_routes import user_bp

app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5000"])

# Register Blueprints
app.register_blueprint(scan_bp, url_prefix="/scans")
app.register_blueprint(user_bp, url_prefix="/users")

if __name__ == "__main__":
    print("🚀 Flask API starting...")
    app.run(debug=True)



