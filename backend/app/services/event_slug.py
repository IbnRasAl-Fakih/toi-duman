import re
import unicodedata
from typing import Any


def _normalize_slug_part(value: str) -> str:
    normalized = unicodedata.normalize("NFKC", value).strip().lower()
    normalized = re.sub(r"[^\w\s-]", " ", normalized, flags=re.UNICODE)
    normalized = re.sub(r"[-\s]+", "-", normalized, flags=re.UNICODE)
    return normalized.strip("-_")


def _extract_name_part(config: dict[str, Any]) -> str:
    name = config.get("name")
    if isinstance(name, list):
        parts = [str(item).strip() for item in name if str(item).strip()]
        return " ".join(parts)
    if name is None:
        return ""
    return str(name).strip()


def build_event_slug(*, event_type: str, config: dict[str, Any], user_id: str) -> str:
    parts = [
        _normalize_slug_part(event_type),
        _normalize_slug_part(_extract_name_part(config)),
        _normalize_slug_part(user_id),
    ]
    slug = "-".join(part for part in parts if part)
    return slug or _normalize_slug_part(user_id)
