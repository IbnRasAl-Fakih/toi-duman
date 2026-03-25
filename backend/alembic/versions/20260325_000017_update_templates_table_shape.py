"""update templates table shape

Revision ID: 20260325_000017
Revises: 20260323_000016
Create Date: 2026-03-25 12:00:00
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260325_000017"
down_revision: str | None = "20260323_000016"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

    op.add_column(
        "templates",
        sa.Column("id_new", sa.UUID(), nullable=False, server_default=sa.text("gen_random_uuid()")),
    )
    op.add_column("templates", sa.Column("name", sa.String(length=255), nullable=True))
    op.add_column("templates", sa.Column("path", sa.String(length=500), nullable=True))

    op.execute("UPDATE templates SET name = type WHERE name IS NULL")
    op.execute("UPDATE templates SET path = 'templates/' || type || '-' || id::text WHERE path IS NULL")

    op.alter_column("templates", "name", nullable=False)
    op.alter_column("templates", "path", nullable=False)

    op.drop_constraint("templates_pkey", "templates", type_="primary")
    op.drop_column("templates", "id")
    op.alter_column("templates", "id_new", new_column_name="id")
    op.create_primary_key("templates_pkey", "templates", ["id"])

    op.drop_column("templates", "type")
    op.drop_column("templates", "amount")
    op.create_unique_constraint("uq_templates_path", "templates", ["path"])


def downgrade() -> None:
    op.add_column("templates", sa.Column("type", sa.String(length=100), nullable=True))
    op.add_column("templates", sa.Column("amount", sa.Numeric(10, 2), nullable=True))
    op.execute("UPDATE templates SET type = name WHERE type IS NULL")
    op.execute("UPDATE templates SET amount = 0 WHERE amount IS NULL")
    op.alter_column("templates", "type", nullable=False)
    op.alter_column("templates", "amount", nullable=False)

    op.add_column("templates", sa.Column("id_old", sa.Integer(), nullable=False))
    op.execute(
        """
        WITH numbered AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY created_at, updated_at) AS row_num
            FROM templates
        )
        UPDATE templates
        SET id_old = numbered.row_num
        FROM numbered
        WHERE templates.id = numbered.id
        """
    )

    op.drop_constraint("uq_templates_path", "templates", type_="unique")
    op.drop_constraint("templates_pkey", "templates", type_="primary")
    op.drop_column("templates", "id")
    op.alter_column("templates", "id_old", new_column_name="id")
    op.create_primary_key("templates_pkey", "templates", ["id"])

    op.drop_column("templates", "name")
    op.drop_column("templates", "path")
