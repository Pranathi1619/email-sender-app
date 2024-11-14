from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class EmailRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    sent_time = db.Column(db.DateTime, nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    body = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"<EmailRecord {self.email}>"

