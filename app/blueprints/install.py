from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
import os
import sqlalchemy
from flask_sqlalchemy import SQLAlchemy

install_app = Blueprint('install', __name__, url_prefix='/install')
db = SQLAlchemy()

@install_app.route('/', methods=['GET', 'POST'])
def install():
    if request.method == 'POST':
        bot_token = request.form.get('bot_token')
        admin_id = request.form.get('admin_id')
        db_type = request.form.get('db_type')

        if db_type == 'local':
            database_url = 'sqlite:///app.db'
        else:
            db_host = request.form.get('db_host')
            db_port = request.form.get('db_port')
            db_name = request.form.get('db_name')
            db_user = request.form.get('db_user')
            db_password = request.form.get('db_password')

            database_url = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

            # Проверка подключения к базе данных через AJAX
            try:
                engine = sqlalchemy.create_engine(database_url)
                connection = engine.connect()
                connection.close()
                connection_status = 'success'
                message = 'Подключение к базе данных успешно!'
            except Exception as e:
                connection_status = 'error'
                message = f"Ошибка подключения к базе данных: {str(e)}"

            return jsonify({
                'status': connection_status,
                'message': message
            })

        # Сохраняем настройки в .env
        with open(".env", "w") as env_file:
            env_file.write(f"BOT_TOKEN={bot_token}\n")
            env_file.write(f"ADMIN_ID={admin_id}\n")
            env_file.write(f"DATABASE_URL={database_url}\n")

        return redirect(url_for('index'))

    return render_template('install.html')

