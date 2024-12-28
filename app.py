import os
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from environs import Env
from models import Users, db  # Ensure your `models.py` defines Users and initializes db

# Load environment variables from .env file
env = Env()
env.read_env()

# Correct database URI format (change it to match your setup)

WEBHOOK_LISTEN = "0.0.0.0"

app = Flask(__name__)
app.config['SECRET_KEY'] = env("SECRET_KEY", "default_secret")
# Вместо строки для MySQL используйте SQLite:
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'


app.config['UPLOAD_FOLDER'] = 'static/product_images'  # Define upload folder for product images

login_manager = LoginManager(app)
login_manager.login_view = "login"

# Initialize the database with app context
db.init_app(app)

# Initialize Migrate
migrate = Migrate(app, db)


@app.route('/')
def index_page():
    return render_template('index.html')



if __name__ == '__main__':
    # Initialize the database tables if they don't exist
    with app.app_context():
        db.create_all()

    app.run(debug=True, host=WEBHOOK_LISTEN)
