from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    file_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    file_size: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    file_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    uploaded_by: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    category_id: Mapped[int | None] = mapped_column(
        ForeignKey("categories.id"),
        nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="UPLOADED"
    )

    version: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1
    )

    extracted_text: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    reviewed_by: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True
    )

    reviewed_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )

    rejection_reason: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    checksum: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    uploader = relationship(
        "User",
        foreign_keys=[uploaded_by]
    )

    reviewer = relationship(
        "User",
        foreign_keys=[reviewed_by]
    )

    category = relationship(
        "Category",
        back_populates="documents"
    )

    versions = relationship(
        "DocumentVersion",
        back_populates="document",
        cascade="all, delete-orphan"
    )

    workflow_actions = relationship(
        "WorkflowAction",
        back_populates="document",
        cascade="all, delete-orphan"
    )