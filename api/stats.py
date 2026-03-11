from flask import Blueprint, jsonify

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/')
def get_stats():
    return jsonify({
        "bots": 3,
        "status": "operational"
    })
