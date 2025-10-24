from flask import Flask
from flask_cors import CORS
from routes.scan import scan_bp
from routes.user import user_bp
from routes.arn import arn
from config import FRONTEND_URL, FLASK_HOST, FLASK_PORT, FLASK_DEBUG


app = Flask(__name__)
#CORS(app, supports_credentials=True)
CORS(app, supports_credentials=True, origins=[FRONTEND_URL])

# Register Blueprints
app.register_blueprint(scan_bp, url_prefix="/scans")
app.register_blueprint(user_bp, url_prefix="/users")
app.register_blueprint(arn, url_prefix="/arn")

if __name__ == "__main__":
    print("🚀 Flask API starting...")
    
    host = FLASK_HOST
    port = FLASK_PORT
    debug = FLASK_DEBUG

    app.run(host=host, port=port, debug=debug)



