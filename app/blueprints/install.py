from flask import Blueprint, render_template, request, redirect, url_for
import os

install_app = Blueprint('install', __name__)

@install_app.route('/install', methods=['GET', 'POST'])
def install():
    if request.method == 'POST':
        # Получаем данные из формы
        secret_key = request.form.get('secret_key')
        bot_token = request.form.get('bot_token')
        admin_id = request.form.get('admin_id')
        database_url = request.form.get('database_url')

        # Сохраняем данные в .env
        with open(".env", "w") as env_file:
            env_file.write(f"SECRET_KEY={secret_key}\n")
            env_file.write(f"BOT_TOKEN={bot_token}\n")
            env_file.write(f"ADMIN_ID={admin_id}\n")
            env_file.write(f"DATABASE_URL={database_url}\n")

        return redirect(url_for('/'))  # Перенаправляем на главную страницу

    return render_template('install.html')  # Отображаем форму
