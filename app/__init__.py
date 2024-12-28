# Инициализация Flask-приложения, расширений и маршрутов
from flask import Flask
from app.extensions import db, migrate
from app.blueprints import register_blueprints

def create_app(config_class="config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Подключение расширений
    db.init_app(app)
    migrate.init_app(app, db)

    # Регистрация маршрутов (blueprints)
    register_blueprints(app)

    return app
