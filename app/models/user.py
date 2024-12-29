# Модель пользователя для базы данных
from app.extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.Integer, unique=True)
    first_name = db.Column(db.String(50), nullable=True)
    username = db.Column(db.String(50), unique=True, nullable=True)
    language_code = db.Column(db.String(10), nullable=False)
    is_premium_tg = db.Column(db.Boolean, default=False)
    photo_url = db.Column(db.String(255), nullable=True)
