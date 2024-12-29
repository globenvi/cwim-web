from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Blueprint
from app.extensions import db
from app.models.user import User
import logging


telegramAuth = Blueprint("telegramAuth", __name__)


@telegramAuth.route("/tgAuth", methods=["POST"])
def telegramAuth_method():
    if request.method == "POST":
        data = request.get_json()
        # app.logger.debug("Полученные данные: %s", data)
        
        # Например, вернуть данные, которые были получены
        return jsonify({"status": "success", "received": data}), 200
