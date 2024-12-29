# Регистрация всех маршрутов приложения
from app.blueprints.index import index
from app.blueprints.settings import settings
from app.blueprints.tgAuth import telegramAuth

def register_blueprints(app):
    # Регистрация маршрута "Главная страница"
    app.register_blueprint(index, url_prefix="/")
    
    #Регистрация маршрута "Страница Настройки"
    app.register_blueprint(settings, url_prefix="/settings")

    #Регистрация маршрута "Страница Авторизации" (Маршрут для обработки POST)
    app.register_blueprint(telegramAuth, url_prefix="/telegramAuth")
