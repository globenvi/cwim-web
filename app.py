import os
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from environs import Env
from models import Users, db  # Ensure your `models.py` defines Users and initializes db
from sqlalchemy import create_engine

def generate_env_file():
    """Generate .env file with default values if it doesn't exist."""
    if not os.path.exists('.env'):
        with open('.env', 'w') as f:
            f.write(
                """
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DBNAME=test_db
SECRET_KEY=default_secret
                """.strip()
            )
        print(".env file has been created with default values.")

def is_database_connection_successful(db_url):
    """Check if the database connection is successful."""
    try:
        engine = create_engine(db_url)
        connection = engine.connect()
        connection.close()
        return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False

# Generate .env file if it doesn't exist
generate_env_file()

# Load environment variables from .env file
env = Env()
env.read_env()

# Generate DATABASE URI from environment variables
MYSQL_HOST = env("MYSQL_HOST", "localhost")
MYSQL_PORT = env("MYSQL_PORT", "3306")
MYSQL_USER = env("MYSQL_USER", "root")
MYSQL_PASSWORD = env("MYSQL_PASSWORD", "")
MYSQL_DBNAME = env("MYSQL_DBNAME", "test_db")
DB_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DBNAME}"

WEBHOOK_LISTEN = "0.0.0.0"

app = Flask(__name__)
app.config['SECRET_KEY'] = env("SECRET_KEY", "default_secret")
app.config['UPLOAD_FOLDER'] = 'static/product_images'  # Define upload folder for product images

login_manager = LoginManager(app)
login_manager.login_view = "login"

migrate = Migrate(app, db)

@app.route('/check_db_connection', methods=['POST'])
def check_db_connection():
    """Check database connection and return JSON response."""
    host = request.json.get('db_host')
    port = request.json.get('db_port')
    user = request.json.get('db_user')
    password = request.json.get('db_password')
    dbname = request.json.get('db_name')

    if not all([host, port, user, password, dbname]):
        return jsonify({"success": False, "message": "Не все параметры переданы."}), 400

    db_url = f"mysql+pymysql://{user}:{password}@{host}:{port}/{dbname}"

    if is_database_connection_successful(db_url):
        return jsonify({"success": True, "message": "Подключение успешно."}), 200
    else:
        return jsonify({"success": False, "message": "Не удалось подключиться к базе данных."}), 400


@app.route('/', methods=['GET', 'POST'])
def index():
    # Check if the database is set up properly
    if not is_database_connection_successful(DB_URL):
        return redirect(url_for('install'))  # Redirect to install page if DB is not connected

    # If everything is fine, proceed to the main page
    return redirect(url_for('login'))

@app.route('/install', methods=['GET', 'POST'])
def install():
    if request.method == "POST":
        # Collect database and admin information from the user
        host = request.form.get('mysql_host')
        port = request.form.get('mysql_port')
        user = request.form.get('mysql_user')
        password = request.form.get('mysql_password')
        dbname = request.form.get('mysql_dbname')
        username = request.form.get('admin_username')
        email = request.form.get('admin_email')
        admin_password = request.form.get('admin_password')

        if not all([host, port, user, password, dbname, username, email, admin_password]):
            flash("Все поля обязательны для заполнения!", "danger")
            return redirect(url_for('install'))

        new_db_url = f"mysql+pymysql://{user}:{password}@{host}:{port}/{dbname}"

        if not is_database_connection_successful(new_db_url):
            flash("Не удалось подключиться к базе данных. Проверьте данные и попробуйте снова.", "danger")
            return redirect(url_for('install'))

        # Update .env file with new database settings
        with open('.env', 'w') as f:
            f.write(
                f"MYSQL_HOST={host}\nMYSQL_PORT={port}\nMYSQL_USER={user}\nMYSQL_PASSWORD={password}\nMYSQL_DBNAME={dbname}\nSECRET_KEY={env('SECRET_KEY')}\n"
            )

        # Initialize database
        app.config['SQLALCHEMY_DATABASE_URI'] = new_db_url
        db.init_app(app)
        with app.app_context():
            db.create_all()

        # Create the first admin user
        hashed_password = generate_password_hash(admin_password, method='pbkdf2:sha256')
        admin_user = Users(username=username, email=email, password=hashed_password, role='admin')
        db.session.add(admin_user)
        db.session.commit()

        flash("База данных установлена и первый администратор создан!", "success")
        return redirect(url_for('login'))

    return render_template('install.html')

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')
        user = Users.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            login_user(user)
            flash("Успешная авторизация!", "success")
            return redirect(url_for('profile'))  # После входа перенаправляем на профиль
        else:
            flash("Неверный логин или пароль!", "danger")

    return render_template('login.html')

@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    user = Users.query.filter_by(username=current_user.username).first()
    return render_template('profile.html', user=user)

@app.route('/logout')
def logout():
    logout_user()
    flash('Logged out successfully!', "success")
    return redirect(url_for('login'))

if __name__ == '__main__':
    if is_database_connection_successful(DB_URL):
        app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
        db.init_app(app)
        with app.app_context():
            db.create_all()
    else:
        print("Database connection failed. Redirecting to install page.")

    app.run(debug=False, host=WEBHOOK_LISTEN)
