"""add is_created_by_admin to events

Revision ID: 20260321_000013
Revises: 20260321_000012
Create Date: 2026-03-21 02:25:00

"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


revision: str = "20260321_000013"
down_revision: str | None = "20260321_000012"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "events",
        sa.Column("is_created_by_admin", sa.Boolean(), nullable=False, server_default=sa.text("false")),
    )


def downgrade() -> None:
    op.drop_column("events", "is_created_by_admin")
