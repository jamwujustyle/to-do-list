import re
import secrets
import smtplib
from email.message import EmailMessage

token = secrets.token_urlsafe(32)

print(token)


def is_valid_email(email):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None


print(is_valid_email("jamwujustyle@gmail.com"))


def send_confirmation_link(email, token):
    confirmation_link = f"http://localhost:8000/confirm?token={token}"

    msg = EmailMessage()
    msg["Subject"] = "Confirm Your Email Address"
    msg["From"] = "jamwujustyle@gmail.com"
    msg["To"] = email
    msg.set_content(f"hi, ")


print(send_confirmation_link())
