# Инициализация Flask-приложения, расширений и маршрутов
from flask import Flask, redirect, url_for, request
from app.extensions import db, migrate
from app.blueprints import register_blueprints
from app.extensions import login_manager

from app.utils.env_utils import create_empty_env, is_env_configured

from app.models.users import Users

def create_app(config_class="config.Config"):
    app = Flask(__name__)

    # Создаём пустой .env, если его нет
    create_empty_env()

    # Проверяем, настроен ли .env
    if is_env_configured():
        # Загружаем конфигурацию
        app.config.from_object(config_class)

        # Подключение расширений
        db.init_app(app)
        migrate.init_app(app, db)
        login_manager.init_app(app)

        # Создание таблицы пользователей
        with app.app_context():
            db.create_all()

        # Настройка login_manager
        login_manager.login_view = 'tgAuth.telegramAuth_method'

        @login_manager.user_loader
        def load_user(user_id):
            return Users.query.get(int(user_id))
        
        return redirect(url_for('install.install'))
    else:
        # Если .env не настроен, перенаправляем на /install
        @app.before_request
        def redirect_to_install():
            if not is_env_configured() and not request.endpoint.startswith('install.install'):
                return redirect(url_for('install.install'))

    # Регистрация маршрутов (blueprints)
    register_blueprints(app)

    return app
