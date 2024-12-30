from extensions import db

class Chats_bot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, unique=True)
    chat_name = db.Column(db.String(50), nullable=False)
    chat_type = db.Column(db.String(50), nullable=False)
    