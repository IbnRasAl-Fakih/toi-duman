"""remove unused modules

Revision ID: 20260323_000014
Revises: 20260321_000013
Create Date: 2026-03-23 16:30:00.000000
"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "20260323_000014"
down_revision: Union[str, None] = "20260321_000013"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("DROP TABLE IF EXISTS event_claims CASCADE")
    op.execute("DROP TABLE IF EXISTS reviews CASCADE")

    op.execute("ALTER TABLE events DROP CONSTRAINT IF EXISTS events_user_id_fkey")
    op.execute("DROP INDEX IF EXISTS ix_events_user_id")
    op.execute("ALTER TABLE events DROP COLUMN IF EXISTS user_id")
    op.execute("ALTER TABLE events DROP COLUMN IF EXISTS is_created_by_admin")

    op.execute("DROP TABLE IF EXISTS users CASCADE")
    op.execute("DROP TYPE IF EXISTS user_role")


def downgrade() -> None:
    raise NotImplementedError("Downgrade is not supported for 20260323_000014")
