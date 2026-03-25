"""add type to templates

Revision ID: 20260325_000018
Revises: 20260325_000017
Create Date: 2026-03-25 20:45:00
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260325_000018"
down_revision: str | None = "20260325_000017"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("templates", sa.Column("type", sa.String(length=100), nullable=True))
    op.execute("UPDATE templates SET type = name WHERE type IS NULL")
    op.alter_column("templates", "type", nullable=False)


def downgrade() -> None:
    op.drop_column("templates", "type")
