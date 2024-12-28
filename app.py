from flask import Flask, render_template, request, redirect, url_for, flash, jsonify


WEBHOOK_LISTEN = "0.0.0.0"

app = Flask(__name__)
app.config['SECRET_KEY'] = "893728917hiudkajsh9812"
# # Вместо строки для MySQL используйте SQLite:
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'


# app.config['UPLOAD_FOLDER'] = 'static/product_images'  # Define upload folder for product images

# login_manager = LoginManager(app)
# login_manager.login_view = "login"

# # Initialize the database with app context
# db.init_app(app)

# # Initialize Migrate
# migrate = Migrate(app, db)

# @app.route('/', methods=['GET', 'POST'])
# def index():
#     # Redirect to login page
#     return redirect(url_for('login'))

# @login_manager.user_loader
# def load_user(user_id):
#     return Users.query.get(int(user_id))

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == "POST":
#         email = request.form.get('email')
#         password = request.form.get('password')
#         user = Users.query.filter_by(email=email).first()

#         if user and check_password_hash(user.password, password):
#             login_user(user)
#             return jsonify({'success': True, 'message': 'Успешная авторизация', 'type': 'success'}), 200
#         else:
#             return jsonify({'success': False, 'message': 'Неверный email или пароль', 'type': 'danger'}), 400  # Ошибка авторизации

#     return render_template('login.html')


@app.route('/index', methods=['GET', 'POST'])
@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html') 


if __name__ == '__main__':
    app.run(debug=True, host=WEBHOOK_LISTEN)
