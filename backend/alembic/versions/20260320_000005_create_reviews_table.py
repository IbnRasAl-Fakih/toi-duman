"""create reviews table

Revision ID: 20260320_000005
Revises: 20260320_000004
Create Date: 2026-03-20 21:18:00

"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


revision: str = "20260320_000005"
down_revision: str | None = "20260320_000004"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "reviews",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("event_id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.ForeignKeyConstraint(["event_id"], ["events.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
    )
    op.create_index("ix_reviews_event_id", "reviews", ["event_id"], unique=False)
    op.create_index("ix_reviews_user_id", "reviews", ["user_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_reviews_user_id", table_name="reviews")
    op.drop_index("ix_reviews_event_id", table_name="reviews")
    op.drop_table("reviews")
