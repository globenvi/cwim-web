# Маршрут тестового Blueprint
from flask import Blueprint, render_template, url_for, redirect, request, flash
from flask_login import login_required, current_user

settings = Blueprint("settings", __name__)

@settings.route("/")
def settings_page():
    # Тестовый маршрут возвращает строку "Hello, Flask!"
    return render_template('settings.html', user=current_user)
