from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class WorkflowAction(Base):
    __tablename__ = "workflow_actions"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    document_id: Mapped[int] = mapped_column(
        ForeignKey("documents.id"),
        nullable=False
    )

    performed_by: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    action: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    from_status: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    to_status: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    comment: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    document = relationship(
        "Document"
    )

    performer = relationship(
        "User"
    )

    document = relationship(
        "Document",
        back_populates="workflow_actions"
    )