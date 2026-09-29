from datetime import datetime
from enum import Enum

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text
from sqlalchemy import Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class NotificationType(str, Enum):
    DOCUMENT_APPROVED = "DOCUMENT_APPROVED"
    DOCUMENT_REJECTED = "DOCUMENT_REJECTED"
    DOCUMENT_ASSIGNED = "DOCUMENT_ASSIGNED"
    DOCUMENT_SUBMITTED = "DOCUMENT_SUBMITTED"
    SYSTEM = "SYSTEM"


class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    notification_type: Mapped[NotificationType] = mapped_column(
        SQLEnum(NotificationType),
        nullable=False
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    is_read: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    email_sent: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    email_sent_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    user = relationship(
        "User"
    )