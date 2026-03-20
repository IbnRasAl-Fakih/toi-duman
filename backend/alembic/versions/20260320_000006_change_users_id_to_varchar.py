"""change users id to varchar

Revision ID: 20260320_000006
Revises: 20260320_000005
Create Date: 2026-03-20 22:05:00

"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


revision: str = "20260320_000006"
down_revision: str | None = "20260320_000005"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("id_new", sa.String(length=20), nullable=True))
    op.execute('UPDATE users SET id_new = id::text')
    op.alter_column("users", "id_new", nullable=False)

    op.add_column("events", sa.Column("user_id_new", sa.String(length=20), nullable=True))
    op.execute('UPDATE events SET user_id_new = user_id::text')
    op.alter_column("events", "user_id_new", nullable=False)

    op.add_column("reviews", sa.Column("user_id_new", sa.String(length=20), nullable=True))
    op.execute('UPDATE reviews SET user_id_new = user_id::text')
    op.alter_column("reviews", "user_id_new", nullable=False)

    op.drop_constraint("events_user_id_fkey", "events", type_="foreignkey")
    op.drop_constraint("reviews_user_id_fkey", "reviews", type_="foreignkey")
    op.drop_constraint("users_pkey", "users", type_="primary")

    op.drop_index("ix_events_user_id", table_name="events")
    op.drop_index("ix_reviews_user_id", table_name="reviews")

    op.drop_column("events", "user_id")
    op.drop_column("reviews", "user_id")
    op.drop_column("users", "id")

    op.alter_column("users", "id_new", new_column_name="id")
    op.alter_column("events", "user_id_new", new_column_name="user_id")
    op.alter_column("reviews", "user_id_new", new_column_name="user_id")

    op.create_primary_key("users_pkey", "users", ["id"])
    op.create_foreign_key("events_user_id_fkey", "events", "users", ["user_id"], ["id"], ondelete="CASCADE")
    op.create_foreign_key("reviews_user_id_fkey", "reviews", "users", ["user_id"], ["id"], ondelete="CASCADE")

    op.create_index("ix_events_user_id", "events", ["user_id"], unique=False)
    op.create_index("ix_reviews_user_id", "reviews", ["user_id"], unique=False)


def downgrade() -> None:
    raise NotImplementedError("Downgrade is not supported after switching users.id to generated varchar(20).")
