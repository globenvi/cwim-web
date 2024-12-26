from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import Users, db
import os

WEBHOOK_LISTEN = "0.0.0.0"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cwim_db.db'
app.config['SECRET_KEY'] = "kljdklsahiopduy1y298e319hdskajh"
app.config['UPLOAD_FOLDER'] = 'static/product_images'  # Define upload folder for product images

db.init_app(app)

login_manager = LoginManager(app)
login_manager.login_view = "login"

# Create all tables on startup if they do not exist
with app.app_context():
    db.create_all()

def check_database():
    if is_database_empty():
        return redirect(url_for('install'))

# Check if the database is empty or has no users
def is_database_empty():
    return not db.session.query(Users).first()

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

@app.route('/install', methods=['GET', 'POST'])
def install():
    if request.method == "POST":
        # Create the first admin user
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not username or not email or not password:
            flash("Все поля обязательны для заполнения!", "danger")
            return redirect(url_for('install'))

        existing_user = Users.query.filter_by(username=username).first()
        if existing_user:
            flash("Пользователь с таким именем уже зарегистрирован!", "danger")
            return redirect(url_for('install'))

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        admin_user = Users(username=username, email=email, password=hashed_password, role='admin')
        db.session.add(admin_user)
        db.session.commit()

        flash("База данных установлена и первый администратор создан!", "success")
        return redirect(url_for('login'))

    return render_template('install.html')

    products = Products.query.all()
    return render_template('index.html', user=current_user, products=products)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not username or not email or not password:
            return redirect(url_for('register'))
            flash("Все поля обязательны для заполнения!", "danger")

        existing_user = Users.query.filter_by(username=username).first()
        if existing_user:
            return redirect(url_for('register'))
            flash("Пользователь с таким именем уже зарегистрирован!", "danger")

        existing_email = Users.query.filter_by(email=email).first()
        if existing_email:
            return redirect(url_for('register'))
            flash("Пользователь с таким email уже зарегистрирован!", "danger")

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        user = Users(username=username, email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
        flash("Вы успешно зарегистрировались!", "success")  

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        user = Users.query.filter_by(username=username).first()

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

@app.route('/profile/edit', methods=['GET', 'POST'])
@login_required
def edit_profile():
    user = Users.query.filter_by(username=current_user.username).first()

    if request.method == "POST":
        new_username = request.form.get('user_name')
        new_email = request.form.get('user_email')
        new_phone = request.form.get('user_phone')
        new_telegram_id = request.form.get('user_telegram_id')

        if new_username:
            user.username = new_username
        if new_email:
            user.email = new_email
        if new_phone:
            user.phone = new_phone
        if new_telegram_id:
            user.telegram_id = new_telegram_id

        db.session.commit()
        flash("Профиль успешно обновлен!", "success")
        return redirect(url_for('profile'))

    return render_template('edit_profile.html', user=user)

@app.route('/profile/t_notify', methods=['POST'])
def telegram_notifications():
    user = Users.query.filter_by(username=current_user.username).first()
    user.telegram_notifications = not user.telegram_notifications
    db.session.commit()
    return redirect(url_for('profile'))

@app.route('/profile/change_password', methods=['GET', 'POST'])
@login_required
def change_password():
    user = Users.query.filter_by(username=current_user.username).first()

    if request.method == "POST":
        current_password = request.form.get('current_password')
        new_password = request.form.get('new_password')

        if check_password_hash(user.password, current_password):
            hashed_new_password = generate_password_hash(new_password, method='pbkdf2:sha256')
            user.password = hashed_new_password
            db.session.commit()
            flash("Пароль успешно изменен!", "success")
            return redirect(url_for('profile'))
        else:
            flash("Неверный текущий пароль!", "danger")

    return render_template('change_password.html', user=user)

@app.route('/')
def index():
    return redirect(url_for('profile'))

@app.route('/logout')
def logout():
    logout_user()
    flash('Logged out successfully!', "success")
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(host=WEBHOOK_LISTEN, debug=False)
