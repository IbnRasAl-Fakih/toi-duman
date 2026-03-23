import secrets
from datetime import datetime, timezone

ORDER_ID_PREFIX = "ORD-"
ORDER_ID_RANDOM_LENGTH = 4
ORDER_ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"


def generate_order_id(created_at: datetime | None = None) -> str:
    timestamp = created_at or datetime.now(timezone.utc)
    date_part = timestamp.strftime("%d%m%y")
    random_part = "".join(
        secrets.choice(ORDER_ID_ALPHABET) for _ in range(ORDER_ID_RANDOM_LENGTH)
    )
    return f"{ORDER_ID_PREFIX}{date_part}-{random_part}"
