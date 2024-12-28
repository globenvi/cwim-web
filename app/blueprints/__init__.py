# Регистрация всех маршрутов приложения
from app.blueprints.index import test

def register_blueprints(app):
    # Регистрация маршрута "test"
    app.register_blueprint(test, url_prefix="/")
