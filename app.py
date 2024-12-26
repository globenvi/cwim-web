from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from models import Users, Products, db
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cwim_db.db'
app.config['SECRET_KEY'] = "kljdklsahiopduy1y298e319hdskajh"
app.config['UPLOAD_FOLDER'] = 'static/product_images'  # Папка для загрузки изображений

db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager(app)
login_manager.login_view = "login"

# Создание таблиц в базе данных при запуске приложения
with app.app_context():
    if not os.path.exists("cwim_db.db"):
        db.create_all()
        print("База данных создана!")

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

# Проверка пустой базы данных
def is_database_empty():
    return not Users.query.first()

@app.route('/install', methods=['GET', 'POST'])
def install():
    if request.method == "POST":
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not username or not email or not password:
            flash("Все поля обязательны для заполнения!", "danger")
            return redirect(url_for('install'))

        if Users.query.filter_by(username=username).first():
            flash("Пользователь с таким именем уже существует!", "danger")
            return redirect(url_for('install'))

        hashed_password = generate_password_hash(password)
        admin_user = Users(username=username, email=email, password=hashed_password, role='admin')
        db.session.add(admin_user)
        db.session.commit()

        flash("Установлена база данных и создан администратор!", "success")
        return redirect(url_for('login'))

    return render_template('install.html')

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@login_required
def index_page():
    if request.method == "POST":
        product_name = request.form.get('product_name')
        product_description = request.form.get('product_description')
        product_price = request.form.get('product_price')
        product_category = request.form.get('product_category')
        product_tags = request.form.get('product_tags')
        product_images = request.files.getlist('product_photos')

        # Сохранение изображений
        image_filenames = []
        for image in product_images:
            if image:
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
                image.save(image_path)
                image_filenames.append(image.filename)

        new_product = Products(
            name=product_name,
            description=product_description,
            price=float(product_price),
            category=product_category,
            tags=product_tags,
            images=",".join(image_filenames)
        )
        db.session.add(new_product)
        db.session.commit()

        flash("Продукт успешно добавлен!", "success")
        return redirect(url_for('index_page'))

    products = Products.query.all()
    return render_template('index.html', user=current_user, products=products)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not username or not email or not password:
            flash("Все поля обязательны для заполнения!", "danger")
            return redirect(url_for('register'))

        if Users.query.filter_by(username=username).first():
            flash("Пользователь с таким именем уже существует!", "danger")
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password)
        user = Users(username=username, email=email, password=hashed_password, role='user')
        db.session.add(user)
        db.session.commit()

        flash("Вы успешно зарегистрировались!", "success")
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')

        user = Users.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            flash("Вы вошли в систему!", "success")
            return redirect(url_for('index_page'))

        flash("Неправильные email или пароль!", "danger")
        return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash("Вы вышли из системы!", "success")
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True)
