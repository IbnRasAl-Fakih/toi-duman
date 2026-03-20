from app.core.id_generator import ROLE_PREFIXES


def build_public_user_id(prefix: str, user_id: str) -> str:
    return f"{prefix}{user_id}"


def parse_public_user_id(public_user_id: str) -> tuple[str, str]:
    for prefix in ROLE_PREFIXES.values():
        if public_user_id.startswith(prefix):
            raw_user_id = public_user_id[len(prefix):]
            if raw_user_id:
                return prefix, raw_user_id

    raise ValueError("Invalid user ID format")
