"""add author to musics

Revision ID: 20260505_000022
Revises: 20260505_000021
Create Date: 2026-05-05 12:15:00
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260505_000022"
down_revision: str | None = "20260505_000021"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("musics", sa.Column("author", sa.String(length=255), nullable=True))


def downgrade() -> None:
    op.drop_column("musics", "author")
