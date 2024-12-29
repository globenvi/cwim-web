# Маршрут тестового Blueprint
from flask import Blueprint, render_template

index = Blueprint("index", __name__)

@index.route("/")
def index_page():
    return render_template('index.html')
