from app.extensions import db

class Settings_bot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    menu_button_text = db.Column(db.String(50), nullable=False)
    mini_app_button_text = db.Column(db.String(50), nullable=False)
    token = db.Column(db.String(255), nullable=False)
    photo_url = db.Column(db.String(255), nullable=True)
    web_app_url = db.Column(db.String(255), nullable=True)