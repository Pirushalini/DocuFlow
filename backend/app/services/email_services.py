import os

from dotenv import load_dotenv
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType

load_dotenv()


mail_config = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", "587")),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=os.getenv("MAIL_STARTTLS", "True").lower() == "true",
    MAIL_SSL_TLS=os.getenv("MAIL_SSL_TLS", "False").lower() == "true",
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
)


async def send_notification_email(
    recipient_email: str,
    title: str,
    message: str,
):
    email_message = MessageSchema(
        subject=title,
        recipients=[recipient_email],
        body=message,
        subtype=MessageType.plain,
    )

    fast_mail = FastMail(mail_config)

    await fast_mail.send_message(email_message)