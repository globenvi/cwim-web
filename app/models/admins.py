from app.extensions import db

from flask_login import UserMixin

class Admins(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.Integer, unique=True)
    first_name = db.Column(db.String(50), nullable=True)
    username = db.Column(db.String(50), unique=True, nullable=True)
    language_code = db.Column(db.String(10), nullable=False)
    is_premium_tg = db.Column(db.Boolean, default=False)
    photo_url = db.Column(db.String(255), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    currency = db.Column(db.String(3), default='RUB')
    notifications = db.Column(db.Boolean, default=True)