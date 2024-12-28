import os

# Структура проекта
STRUCTURE = {
    # Основное приложение
    "app": {
        "__init__.py": """# Инициализация Flask-приложения, расширений и маршрутов
from flask import Flask
from app.extensions import db, migrate
from app.blueprints import register_blueprints

def create_app(config_class="config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Подключение расширений
    db.init_app(app)
    migrate.init_app(app, db)

    # Регистрация маршрутов (blueprints)
    register_blueprints(app)

    return app
""",
        "extensions.py": """# Расширения Flask (SQLAlchemy и Flask-Migrate)
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()
""",
        "blueprints": {
            "__init__.py": """# Регистрация всех маршрутов приложения
from app.blueprints.test import test

def register_blueprints(app):
    # Регистрация маршрута "test"
    app.register_blueprint(test, url_prefix="/test")
""",
            "test.py": """# Маршрут тестового Blueprint
from flask import Blueprint

test = Blueprint("test", __name__)

@test.route("/")
def index():
    # Тестовый маршрут возвращает строку "Hello, Flask!"
    return "Hello, Flask!"
""",
        },
        "models": {
            "__init__.py": "",
            "user.py": """# Модель пользователя для базы данных
from app.extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
""",
        },
        "templates": {
            "base.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flask App</title>
</head>
<body>
    <h1>Welcome to Flask!</h1>
</body>
</html>
""",
        },
        "static": {
            "css": {},
            "js": {},
        },
    },
    "tests": {
        "__init__.py": "",
        "test_app.py": """# Тесты для проверки работы маршрутов
import pytest
from app import create_app

@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"
    })
    return app

def test_index(app):
    # Проверка тестового маршрута "/test/"
    client = app.test_client()
    response = client.get("/test/")
    assert response.status_code == 200
    assert b"Hello, Flask!" in response.data
""",
    },
    "config.py": """# Конфигурация приложения
import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
""",
    "run.py": """# Запуск приложения
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
""",
    "requirements.txt": """# Зависимости приложения
Flask
Flask-SQLAlchemy
Flask-Migrate
pytest
""",
}


def create_structure(base_path, structure):
    """
    Рекурсивно создаёт файлы и папки из переданной структуры.
    :param base_path: базовый путь для структуры
    :param structure: словарь, описывающий структуру
    """
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)


# Основная функция
if __name__ == "__main__":
    current_directory = os.getcwd()  # Получаем текущую рабочую директорию
    print(f"Создаём проект в: {current_directory}")
    create_structure(current_directory, STRUCTURE)
    print("Проект Flask успешно создан!")
