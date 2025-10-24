import os

# MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://admin:admin@localhost:27017/")
MONGO_DB = os.getenv("MONGO_DB", "scoutsuite")
SCAN_COLLECTION = os.getenv("SCAN_COLLECTION", "scan_results")

# Keycloak
KEYCLOAK_URL = os.getenv("KEYCLOAK_URL", "http://localhost:9000/")
KEYCLOAK_REALM = os.getenv("KEYCLOAK_REALM", "cspm")
KEYCLOAK_CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID", "cloud")
KEYCLOAK_CLIENT_SECRET = os.getenv("KEYCLOAK_CLIENT_SECRET", "WRUjvEpmSJW4UMNY9PNHurIy3FWIyxTM")
KEYCLOAK_ADMIN_USERNAME = os.getenv("KEYCLOAK_ADMIN_USERNAME","admin")
KEYCLOAK_ADMIN_PASSWORD=os.getenv("KEYCLOAK_ADMIN_PASSWORD","admin")


# AWS default region
AWS_DEFAULT_REGION = os.getenv("AWS_DEFAULT_REGION", "us-east-1")

# Frontend URL
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/")

# Flask API Settings
FLASK_HOST = os.getenv("FLASK_HOST", "0.0.0.0")
FLASK_PORT = int(os.getenv("FLASK_PORT", 5000))
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"