# Маршрут тестового Blueprint
from flask import Blueprint, render_template

test = Blueprint("index", __name__)

@test.route("/")
def index():
    # Тестовый маршрут возвращает строку "Hello, Flask!"
    return render_template('index.html')
