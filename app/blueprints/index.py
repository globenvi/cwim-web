# Маршрут тестового Blueprint
from flask import Blueprint, render_template
from flask_login import current_user

from app.utils.env_utils import is_env_configured

index = Blueprint("index", __name__)

@index.route("/")
def index_page():
    if is_env_configured():
        return render_template("index.html", user=current_user)
    else:
        return render_template("install.html", user=current_user)
