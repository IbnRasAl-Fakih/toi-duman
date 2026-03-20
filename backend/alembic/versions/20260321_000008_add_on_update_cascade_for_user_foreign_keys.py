"""add on update cascade for user foreign keys

Revision ID: 20260321_000008
Revises: 20260320_000007
Create Date: 2026-03-21 00:10:00

"""

from collections.abc import Sequence

from alembic import op


revision: str = "20260321_000008"
down_revision: str | None = "20260320_000007"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.drop_constraint("events_user_id_fkey", "events", type_="foreignkey")
    op.drop_constraint("reviews_user_id_fkey", "reviews", type_="foreignkey")

    op.create_foreign_key(
        "events_user_id_fkey",
        "events",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
        onupdate="CASCADE",
    )
    op.create_foreign_key(
        "reviews_user_id_fkey",
        "reviews",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
        onupdate="CASCADE",
    )


def downgrade() -> None:
    op.drop_constraint("events_user_id_fkey", "events", type_="foreignkey")
    op.drop_constraint("reviews_user_id_fkey", "reviews", type_="foreignkey")

    op.create_foreign_key(
        "events_user_id_fkey",
        "events",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "reviews_user_id_fkey",
        "reviews",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )
