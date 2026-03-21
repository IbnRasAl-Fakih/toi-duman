"""change orders id to varchar

Revision ID: 20260321_000011
Revises: 20260321_000010
Create Date: 2026-03-21 01:25:00

"""

from collections.abc import Sequence
from datetime import timezone
import secrets

from alembic import op
import sqlalchemy as sa


revision: str = "20260321_000011"
down_revision: str | None = "20260321_000010"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None

ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"


def _generate_order_id(created_at) -> str:
    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)
    date_part = created_at.strftime("%d%m%y")
    random_part = "".join(secrets.choice(ALPHABET) for _ in range(4))
    return f"ORD-{date_part}-{random_part}"


def upgrade() -> None:
    op.add_column("orders", sa.Column("id_new", sa.String(length=20), nullable=True))

    connection = op.get_bind()
    rows = connection.execute(sa.text("SELECT id, created_at FROM orders ORDER BY created_at, id")).fetchall()
    used_ids: set[str] = set()

    for row in rows:
        new_id = _generate_order_id(row.created_at)
        while new_id in used_ids:
            new_id = _generate_order_id(row.created_at)
        used_ids.add(new_id)

        connection.execute(
            sa.text("UPDATE orders SET id_new = :new_id WHERE id = :old_id"),
            {"new_id": new_id, "old_id": row.id},
        )

    op.alter_column("orders", "id_new", nullable=False)
    op.drop_constraint("orders_pkey", "orders", type_="primary")
    op.drop_column("orders", "id")
    op.alter_column("orders", "id_new", new_column_name="id")
    op.create_primary_key("orders_pkey", "orders", ["id"])


def downgrade() -> None:
    raise NotImplementedError("Downgrade is not supported after switching orders.id to generated varchar.")
