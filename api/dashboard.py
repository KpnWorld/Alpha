from flask import Blueprint, jsonify

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/')
def get_dashboard():
    return jsonify({
        "status": "ok"
    })
