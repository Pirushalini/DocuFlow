"""create roles table

Revision ID: 6351f29252d9
Revises: 268edf269ef0
Create Date: 2026-09-25
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "6351f29252d9"
down_revision: Union[str, Sequence[str], None] = "268edf269ef0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create roles table."""
    op.create_table(
        "roles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.PrimaryKeyConstraint("id"),
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