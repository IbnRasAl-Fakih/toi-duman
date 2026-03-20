"""add user email verification fields

Revision ID: 20260320_000007
Revises: 20260320_000006
Create Date: 2026-03-20 23:10:00

"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


revision: str = "20260320_000007"
down_revision: str | None = "20260320_000006"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("pending_email", sa.String(length=255), nullable=True))
    op.add_column("users", sa.Column("email_verification_code_hash", sa.String(length=255), nullable=True))
    op.add_column("users", sa.Column("email_verification_expires_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("users", sa.Column("email_verified_at", sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "email_verified_at")
    op.drop_column("users", "email_verification_expires_at")
    op.drop_column("users", "email_verification_code_hash")
    op.drop_column("users", "pending_email")
