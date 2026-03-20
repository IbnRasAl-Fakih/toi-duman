import secrets


ID_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"
ID_LENGTH = 6
ROLE_PREFIXES = {
    "client": "CL-",
    "admin": "AD-",
}


def get_prefix_for_role(role: str) -> str:
    prefix = ROLE_PREFIXES.get(role)
    if prefix is None:
        raise ValueError(f"Unsupported role for id generation: {role}")

    return prefix


def generate_id(role: str, length: int = ID_LENGTH) -> str:
    get_prefix_for_role(role)
    return "".join(secrets.choice(ID_ALPHABET) for _ in range(length))
