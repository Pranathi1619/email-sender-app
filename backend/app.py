from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from models import db, EmailRecord  # Import db and EmailRecord from models

# Initialize Flask app
app = Flask(__name__)

# Configure Flask app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # SQLite database URI, can be changed to MySQL/PostgreSQL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Change to your mail server
app.config['MAIL_PORT'] = 465  # Port for SSL
app.config['MAIL_USE_SSL'] = True  # Enable SSL
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'  # Your email address
app.config['MAIL_PASSWORD'] = 'your_password'  # Your email password

# Initialize db and mail objects
db.init_app(app)
mail = Mail(app)

@app.route('/')
def home():
    return 'Welcome to the Email Sender App!'

# Route to send email
@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        # Get email details from the request body
        subject = request.json.get('subject')
        body = request.json.get('body')
        recipient = request.json.get('recipient')
        sender = app.config['MAIL_USERNAME']  # Sender email

        # Create email message
        msg = Message(subject=subject,
                      body=body,
                      sender=sender,
                      recipients=[recipient])

        # Send email using Flask-Mail
        mail.send(msg)

        # Save the email record to the database
        email_record = EmailRecord(subject=subject, body=body, sender=sender, recipient=recipient)
        db.session.add(email_record)
        db.session.commit()

        return jsonify({'message': 'Email sent successfully!'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)


