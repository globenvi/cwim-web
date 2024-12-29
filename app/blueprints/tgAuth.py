from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Blueprint

telegramAuth = Blueprint("telegramAuth", __name__)

@telegramAuth.route("/telegramAuth", methods=["GET", "POST"])
def telegramAuth_method():
    if request.method == "POST":


        print("telegramAuth_method")
    return render_template('telegramAuth.html')