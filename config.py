# Конфигурация приложения
import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'jklhdaisuhiuqh9138h98dhsa898dh1hukdashjk')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
