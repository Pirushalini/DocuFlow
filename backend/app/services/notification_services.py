from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.notification import Notification, NotificationType
from app.models.user import User
from app.services.email_services import send_notification_email


async def create_notification(
    db: Session,
    user_id: int,
    notification_type: NotificationType,
    title: str,
    message: str,
):
    user = db.scalar(
        select(User).where(User.id == user_id)
    )

    if user is None:
        raise ValueError("User not found")

    notification = Notification(
        user_id=user_id,
        notification_type=notification_type,
        title=title,
        message=message,
        is_read=False,
        email_sent=False,
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    try:
        await send_notification_email(
            recipient_email=user.email,
            title=title,
            message=message,
        )

        notification.email_sent = True
        notification.email_sent_at = datetime.utcnow()

        db.commit()
        db.refresh(notification)

    except Exception:
        db.rollback()

    return notification