import os

# MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://admin:admin@localhost:27017/")
MONGO_DB = os.getenv("MONGO_DB", "scoutsuite")
SCAN_COLLECTION = os.getenv("SCAN_COLLECTION", "scan_results")

# Keycloak
KEYCLOAK_URL = os.getenv("KEYCLOAK_URL", "http://localhost:9000/")
KEYCLOAK_REALM = os.getenv("KEYCLOAK_REALM", "cloud")
KEYCLOAK_CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID", "cloud")
KEYCLOAK_CLIENT_SECRET = os.getenv("KEYCLOAK_CLIENT_SECRET", "WRUjvEpmSJW4UMNY9PNHurIy3FWIyxTM")


# AWS default region
AWS_DEFAULT_REGION = os.getenv("AWS_DEFAULT_REGION", "us-east-1")
