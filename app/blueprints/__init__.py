# Регистрация всех маршрутов приложения
from app.blueprints.index import index
from app.blueprints.settings import settings

def register_blueprints(app):
    # Регистрация маршрута "test"
    app.register_blueprint(index, url_prefix="/")
    app.register_blueprint(settings, url_prefix="/settings")
