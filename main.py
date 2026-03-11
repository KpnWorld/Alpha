from flask import Flask, render_template, jsonify, request
from api.stats import stats_bp
from api.dashboard import dashboard_bp
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'dev-secret-change-in-prod')

# Register
app.register_blueprint(stats_bp,     url_prefix='/api/stats')
app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')

# Main Route
@app.route('/')
def index():
    return render_template('index.html')

# Bot Homes
@app.route('/musubi')
def musubi():
    return render_template('bots/musubi.html')

@app.route('/denki')
def denki():
    return render_template('bots/denki.html')

@app.route('/fate')
def fate():
    return render_template('bots/fate.html')

# Dashboard
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard/login.html')

@app.route('/dashboard/overview')
def dashboard_overview():
    return render_template('dashboard/overview.html')

# Health
@app.route('/health')
def health():
    return jsonify({
        "status":  "ok",
        "company": "KpnWorld",
        "bots":    ["Musubi", "Denki", "Fate"]
    })

# 404
@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404

# RUN
if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(os.getenv('PORT', 8080)),
        debug=os.getenv('FLASK_ENV') == 'development'
    )
