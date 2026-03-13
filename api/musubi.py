"""
api/musubi.py
─────────────────────────────────────────────────────────
Bot pushes stats every 60s via POST /api/musubi/stats.
Website caches the last payload in memory and serves it
via GET /api/musubi/stats for the public Musubi page.

No Supabase. No auth on GET. Bot push protected by X-API-Secret.
"""

from __future__ import annotations

import logging
import os
from datetime import datetime, timezone
from functools import wraps

from flask import Blueprint, jsonify, request

log = logging.getLogger("kww.musubi")

musubi_bp = Blueprint("musubi", __name__)

# ── In-memory cache (resets on restart, bot repopulates within 60s) ──────────
_stats_cache: dict = {}

def _now() -> str:
    return datetime.now(timezone.utc).isoformat()

# ── Auth ──────────────────────────────────────────────────────────────────────

def require_bot_secret(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        secret = os.environ.get("API_SECRET", "")
        if not secret:
            return jsonify({"error": "Server misconfigured"}), 500
        if request.headers.get("X-API-Secret") != secret:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

# ── Receive push from bot ─────────────────────────────────────────────────────

@musubi_bp.route("/stats", methods=["POST"])
@require_bot_secret
def receive_stats():
    """Bot POSTs full snapshot every 60s."""
    payload = request.get_json(silent=True)
    if not payload or not isinstance(payload, dict):
        return jsonify({"error": "Invalid payload"}), 400

    _stats_cache.clear()
    _stats_cache.update(payload)
    _stats_cache["received_at"] = _now()

    log.debug(
        "Stats received — active_calls:%s guilds:%s users:%s callboard:%s",
        payload.get("active_calls"),
        payload.get("registered_guilds"),
        payload.get("total_users"),
        len(payload.get("callboard", [])),
    )
    return jsonify({"ok": True})

# ── Serve to public page ──────────────────────────────────────────────────────

@musubi_bp.route("/stats", methods=["GET"])
def get_stats():
    """Public endpoint — Musubi homepage fetches this for live stats."""
    if not _stats_cache:
        return jsonify({
            "active_calls":      0,
            "registered_guilds": 0,
            "total_users":       0,
            "callboard":         [],
            "received_at":       None,
        })
    return jsonify(_stats_cache)