"""add user password reset fields

Revision ID: 20260321_000010
Revises: 20260321_000009
Create Date: 2026-03-21 00:55:00

"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


revision: str = "20260321_000010"
down_revision: str | None = "20260321_000009"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("password_reset_code_hash", sa.String(length=255), nullable=True))
    op.add_column("users", sa.Column("password_reset_expires_at", sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "password_reset_expires_at")
    op.drop_column("users", "password_reset_code_hash")
