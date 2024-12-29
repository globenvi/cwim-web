# Маршрут тестового Blueprint
from flask import Blueprint, render_template

settings = Blueprint("settings", __name__)

@settings.route("/")
def settings_page():
    # Тестовый маршрут возвращает строку "Hello, Flask!"
    return render_template('settings.html')
