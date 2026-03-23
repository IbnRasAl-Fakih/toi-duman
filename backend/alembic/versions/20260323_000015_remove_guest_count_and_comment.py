"""remove guest count and comment

Revision ID: 20260323_000015
Revises: 20260323_000014
Create Date: 2026-03-23 17:10:00.000000
"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "20260323_000015"
down_revision: Union[str, None] = "20260323_000014"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE guests DROP COLUMN IF EXISTS count")
    op.execute("ALTER TABLE guests DROP COLUMN IF EXISTS comment")


def downgrade() -> None:
    raise NotImplementedError("Downgrade is not supported for 20260323_000015")
