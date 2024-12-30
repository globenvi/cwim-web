# Маршрут тестового Blueprint
from flask import Blueprint, render_template
from flask_login import current_user

index = Blueprint("index", __name__)

@index.route("/")
def index_page():
    return render_template("index.html", user=current_user)
