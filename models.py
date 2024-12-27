from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    phone = db.Column(db.String(10), nullable=True)
    telegram_id = db.Column(db.String(256), nullable=True, unique=True)
    telegram_notifications = db.Column(db.Boolean(), default=True)

class Admins(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    phone = db.Column(db.String(10), nullable=True)
    telegram_id = db.Column(db.String(256), nullable=True, unique=True)
    telegram_notifications = db.Column(db.Boolean(), default=True)