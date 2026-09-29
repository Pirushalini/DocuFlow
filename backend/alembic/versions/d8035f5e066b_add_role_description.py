"""add role description

Revision ID: d8035f5e066b
Revises: 874e062ebdb8
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "d8035f5e066b"
down_revision: Union[str, Sequence[str], None] = "874e062ebdb8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Recreate roles table with description."""
    op.create_table(
        "roles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
    )

    op.create_index(
        op.f("ix_roles_id"),
        "roles",
        ["id"],
        unique=False,
    )


def downgrade() -> None:
    """Drop roles table."""
    op.drop_index(
        op.f("ix_roles_id"),
        table_name="roles",
    )
    op.drop_table("roles")