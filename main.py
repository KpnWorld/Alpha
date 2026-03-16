from flask import Flask, jsonify
from flask_cors import CORS
from api.musubi import musubi_bp
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret-change-in-prod")

# Allow React dev server to call Flask API
CORS(app, origins=["http://localhost:3000", os.getenv("FRONTEND_URL", "")])

# Blueprints
app.register_blueprint(musubi_bp, url_prefix="/api/musubi")


# Health
@app.route("/health")
def health():
    return jsonify(
        {"status": "ok", "company": "KpnWorld", "bots": ["Musubi", "Denki", "Fate"]}
    )


# RUN
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8080)),
        debug=os.getenv("FLASK_ENV") == "development",
    )
