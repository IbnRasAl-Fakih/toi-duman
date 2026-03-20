"""split user prefix from id

Revision ID: 20260321_000009
Revises: 20260321_000008
Create Date: 2026-03-21 00:40:00

"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


revision: str = "20260321_000009"
down_revision: str | None = "20260321_000008"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("prefix", sa.String(length=3), nullable=True))

    op.drop_constraint("events_user_id_fkey", "events", type_="foreignkey")
    op.drop_constraint("reviews_user_id_fkey", "reviews", type_="foreignkey")

    op.execute("UPDATE users SET prefix = split_part(id, '-', 1) || '-'")
    op.execute("UPDATE users SET id = split_part(id, '-', 2)")
    op.execute("UPDATE events SET user_id = split_part(user_id, '-', 2)")
    op.execute("UPDATE reviews SET user_id = split_part(user_id, '-', 2)")

    op.alter_column("users", "prefix", nullable=False)

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


def downgrade() -> None:
    op.drop_constraint("events_user_id_fkey", "events", type_="foreignkey")
    op.drop_constraint("reviews_user_id_fkey", "reviews", type_="foreignkey")

    op.execute(
        """
        UPDATE events
        SET user_id = users.prefix || users.id
        FROM users
        WHERE events.user_id = users.id
        """
    )
    op.execute(
        """
        UPDATE reviews
        SET user_id = users.prefix || users.id
        FROM users
        WHERE reviews.user_id = users.id
        """
    )
    op.execute("UPDATE users SET id = prefix || id")

    op.drop_column("users", "prefix")

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
