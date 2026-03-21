"""create event claims table

Revision ID: 20260321_000012
Revises: 20260321_000011
Create Date: 2026-03-21 02:05:00

"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


revision: str = "20260321_000012"
down_revision: str | None = "20260321_000011"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "event_claims",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("event_id", sa.Integer(), nullable=False),
        sa.Column("code", sa.String(length=16), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("used_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by_admin_id", sa.String(length=20), nullable=False),
        sa.Column("claimed_by_user_id", sa.String(length=20), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.ForeignKeyConstraint(["event_id"], ["events.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["created_by_admin_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["claimed_by_user_id"], ["users.id"], ondelete="SET NULL"),
        sa.UniqueConstraint("code", name="uq_event_claims_code"),
    )
    op.create_index("ix_event_claims_event_id", "event_claims", ["event_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_event_claims_event_id", table_name="event_claims")
    op.drop_table("event_claims")
