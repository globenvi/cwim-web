from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Blueprint
from app.extensions import db
from app.models.users import Users
import logging

telegramAuth = Blueprint("telegramAuth", __name__)

# Настройка логирования
logging.basicConfig(level=logging.DEBUG)  # Уровень дебага, выводим в консоль

@telegramAuth.route("/tgAuth", methods=["GET", "POST"])
@telegramAuth.route("/tgAuth", methods=["POST"])
@telegramAuth.route("/tgAuth", methods=["POST"])
def telegramAuth_method():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No JSON body found"}), 400
        
        user = data.get("user")
        if not user:
            return jsonify({"status": "error", "message": "No user data provided"}), 400

        # Получение данных из JSON
        telegram_id = user.get("id")
        first_name = user.get("first_name")
        username = user.get("username")
        language_code = user.get("language_code")
        is_premium_tg = user.get("is_premium")
        photo_url = user.get("photo_url")

        # Проверка наличия пользователя в базе данных
        existing_user = Users.query.filter_by(telegram_id=telegram_id).first()
        if existing_user:
            # Обновление данных пользователя
            existing_user.first_name = first_name
            existing_user.username = username
            existing_user.language_code = language_code
            existing_user.is_premium_tg = is_premium_tg
            existing_user.photo_url = photo_url
            db.session.commit()

            login_user(existing_user)
            return jsonify({
                "status": "success",
                "message": "User data updated",
                "user": {
                    "id": existing_user.telegram_id,
                    "first_name": existing_user.first_name,
                    "username": existing_user.username,
                    "language_code": existing_user.language_code,
                    "is_premium": existing_user.is_premium_tg,
                    "photo_url": existing_user.photo_url,
                }
            }), 200
        else:
            # Создание нового пользователя
            new_user = Users(
                telegram_id=telegram_id,
                first_name=first_name,
                username=username,
                language_code=language_code,
                is_premium_tg=is_premium_tg,
                photo_url=photo_url,
            )
            db.session.add(new_user)
            db.session.commit()

            login_user(new_user)
            return jsonify({
                "status": "success",
                "message": "New user created",
                "user": {
                    "id": new_user.telegram_id,
                    "first_name": new_user.first_name,
                    "username": new_user.username,
                    "language_code": new_user.language_code,
                    "is_premium": new_user.is_premium_tg,
                    "photo_url": new_user.photo_url,
                }
            }), 201
    except Exception as e:
        logging.error(f"Error processing user data: {str(e)}")
        return jsonify({"status": "error", "error_log": str(e)}), 500

    # На случай, если запрос не был обработан
    return jsonify({"status": "error", "message": "Unknown error occurred"}), 500
