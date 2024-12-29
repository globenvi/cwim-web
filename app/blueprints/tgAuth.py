from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Blueprint
from app.extensions import db
from app.models.user import User
import logging

telegramAuth = Blueprint("telegramAuth", __name__)

# Настройка логирования
logging.basicConfig(level=logging.DEBUG)  # Уровень дебага, выводим в консоль

# @telegramAuth.route("/tgAuth", methods=["GET", "POST"])
# def telegramAuth_method():
#     if request.method == "POST":
#         try:
#             # Получаем данные из запроса
#             auth_data = request.get_json()

#             logging.debug("Полученные данные: %s", auth_data)  # Логируем полученные данные

#             # Проверка на наличие необходимых данных
#             if not auth_data or 'id' not in auth_data:
#                 logging.error("Ошибка: Отсутствует 'id' в данных")
#                 return jsonify({"error": "Invalid data, missing 'id'"}), 400

#             if 'first_name' not in auth_data or 'username' not in auth_data or 'language_code' not in auth_data:
#                 logging.error("Ошибка: Отсутствуют обязательные поля 'first_name', 'username', или 'language_code'")
#                 return jsonify({"error": "Missing required user information"}), 400

#             user_id = auth_data['id']
#             match_user = User.query.filter_by(telegram_id=user_id).first()

#             # Логируем, если пользователь найден
#             if match_user:
#                 logging.debug("Пользователь найден: %s", match_user)
#                 login_user(match_user)
#                 return jsonify({"success": "User logged in"}), 200
#             else:
#                 # Если пользователь не найден, создаем нового
#                 logging.debug("Пользователь не найден, создаем нового пользователя с id: %s", user_id)
#                 new_user = User(
#                     telegram_id=user_id,
#                     first_name=auth_data['first_name'],
#                     username=auth_data['username'],
#                     language_code=auth_data['language_code'],
#                     is_premium_tg=auth_data.get('is_premium', False),
#                     photo_url=auth_data.get('photo_url', None)
#                 )
#                 db.session.add(new_user)
#                 db.session.commit()

#                 login_user(new_user)
#                 logging.debug("Новый пользователь зарегистрирован и авторизован: %s", new_user)
#                 return jsonify({"success": "User registered and logged in"}), 200
#         except Exception as e:
#             logging.error("Ошибка при обработке запроса: %s", str(e))
#             return jsonify({"error": "Internal server error"}), 500
#     return jsonify({"error": "Invalid method, only POST allowed"}), 405


@telegramAuth.route("/tgAuth", methods=["POST"])
def telegramAuth_method():
    if request.method == "POST":
        data = request.get_json()
        # app.logger.debug("Полученные данные: %s", data)
        
        # Например, вернуть данные, которые были получены
        return jsonify({"status": "success", "received": data}), 200
