from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Blueprint

from app.extensions import db

from app.models.user import User

telegramAuth = Blueprint("telegramAuth", __name__)

@telegramAuth.route("/", methods=["GET", "POST"])
def telegramAuth_method():
    if request.method == "POST":
        auth_data = request.get_json()

        if not auth_data or 'id':
            return jsonify({"error": "Invalid data"}), 400
        else:
            user_id =  auth_data['id']
            match_user = User.query.filter_by(telegram_id=user_id).first()

            if match_user:
                login_user(match_user)
                return jsonify({"success": "User logged in"}), 200
            else:
                new_user = User(telegram_id=user_id, first_name=auth_data['first_name'], username=auth_data['username'], language_code=auth_data['language_code'], is_premium_tg=auth_data['is_premium'], photo_url=auth_data['photo_url'])
                db.session.add(new_user)
                db.session.commit()

                login_user(new_user)
                return jsonify({"success": "User registered and logged in"}), 200
            