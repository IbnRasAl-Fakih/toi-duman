"""create musics table

Revision ID: 20260505_000021
Revises: 20260417_000020
Create Date: 2026-05-05 11:30:00
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260505_000021"
down_revision: str | None = "20260417_000020"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "musics",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("url", sa.Text(), nullable=False),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint("id", name="musics_pkey"),
    )
    op.create_index("ix_musics_is_published", "musics", ["is_published"])


def downgrade() -> None:
    op.drop_index("ix_musics_is_published", table_name="musics")
    op.drop_table("musics")
