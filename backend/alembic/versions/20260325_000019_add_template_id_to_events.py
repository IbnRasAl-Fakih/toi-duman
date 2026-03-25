"""add template id to events

Revision ID: 20260325_000019
Revises: 20260325_000018
Create Date: 2026-03-25 21:15:00
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260325_000019"
down_revision: str | None = "20260325_000018"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("events", sa.Column("template_id", sa.UUID(), nullable=True))

    op.execute(
        """
        INSERT INTO templates (name, type, path)
        SELECT 'Template 1', 'invitation_v1', 'templates/invitation-page_template_1.jsx'
        WHERE NOT EXISTS (SELECT 1 FROM templates)
        """
    )
    op.execute(
        """
        UPDATE events
        SET template_id = (
            SELECT id
            FROM templates
            ORDER BY created_at, name
            LIMIT 1
        )
        WHERE template_id IS NULL
        """
    )

    op.alter_column("events", "template_id", nullable=False)
    op.create_foreign_key("fk_events_template_id_templates", "events", "templates", ["template_id"], ["id"], ondelete="RESTRICT")


def downgrade() -> None:
    op.drop_constraint("fk_events_template_id_templates", "events", type_="foreignkey")
    op.drop_column("events", "template_id")
