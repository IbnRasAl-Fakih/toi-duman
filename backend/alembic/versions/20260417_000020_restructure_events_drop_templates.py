"""restructure events and drop templates

Revision ID: 20260417_000020
Revises: 20260325_000019
Create Date: 2026-04-17 19:20:00
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op


revision: str = "20260417_000020"
down_revision: str | None = "20260325_000019"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("events", sa.Column("is_example", sa.Boolean(), nullable=False, server_default=sa.text("false")))

    op.execute(
        """
        UPDATE events
        SET config = jsonb_strip_nulls(
            COALESCE(config::jsonb, '{}'::jsonb)
            || jsonb_build_object(
                'date', CASE WHEN date IS NOT NULL THEN to_char(date AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') END,
                'location', location,
                'location_link', location_link,
                'description', description,
                'cover_image_url', cover_image_url,
                'template_id', template_id
            )
            || COALESCE(
                (
                    SELECT jsonb_strip_nulls(
                        jsonb_build_object(
                            'template_name', t.name,
                            'template_type', t.type,
                            'template_path', t.path
                        )
                    )
                    FROM templates AS t
                    WHERE t.id = events.template_id
                ),
                '{}'::jsonb
            )
        )
        """
    )

    op.execute(
        """
        DELETE FROM orders
        USING events
        WHERE orders.event_id = events.id
          AND events.is_example = true
        """
    )

    op.drop_constraint("fk_events_template_id_templates", "events", type_="foreignkey")
    op.drop_column("events", "template_id")
    op.drop_column("events", "date")
    op.drop_column("events", "location")
    op.drop_column("events", "location_link")
    op.drop_column("events", "description")
    op.drop_column("events", "cover_image_url")
    op.drop_table("templates")


def downgrade() -> None:
    op.create_table(
        "templates",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("type", sa.String(length=100), nullable=False),
        sa.Column("path", sa.String(length=500), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint("id", name="templates_pkey"),
        sa.UniqueConstraint("path", name="uq_templates_path"),
    )

    op.add_column("events", sa.Column("cover_image_url", sa.Text(), nullable=True))
    op.add_column("events", sa.Column("description", sa.Text(), nullable=True))
    op.add_column("events", sa.Column("location_link", sa.Text(), nullable=True))
    op.add_column("events", sa.Column("location", sa.String(length=255), nullable=True))
    op.add_column("events", sa.Column("date", sa.DateTime(timezone=True), nullable=True))
    op.add_column("events", sa.Column("template_id", sa.UUID(), nullable=True))

    op.execute(
        """
        INSERT INTO templates (id, name, type, path, created_at, updated_at)
        SELECT DISTINCT
            COALESCE(
                NULLIF(config->>'template_id', '')::uuid,
                gen_random_uuid()
            ) AS id,
            COALESCE(NULLIF(config->>'template_name', ''), 'Template') AS name,
            COALESCE(NULLIF(config->>'template_type', ''), 'template') AS type,
            COALESCE(NULLIF(config->>'template_path', ''), 'templates/unknown.jsx') AS path,
            now(),
            now()
        FROM events
        """
    )

    op.execute(
        """
        UPDATE events
        SET
            template_id = NULLIF(config->>'template_id', '')::uuid,
            date = CASE
                WHEN NULLIF(config->>'date', '') IS NOT NULL THEN (config->>'date')::timestamptz
                ELSE NULL
            END,
            location = NULLIF(config->>'location', ''),
            location_link = NULLIF(config->>'location_link', ''),
            description = NULLIF(config->>'description', ''),
            cover_image_url = NULLIF(config->>'cover_image_url', '')
        """
    )

    op.alter_column("events", "template_id", nullable=False)
    op.alter_column("events", "date", nullable=False)
    op.alter_column("events", "location", nullable=False)
    op.create_foreign_key("fk_events_template_id_templates", "events", "templates", ["template_id"], ["id"], ondelete="RESTRICT")
    op.drop_column("events", "is_example")
