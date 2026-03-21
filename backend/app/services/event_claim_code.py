import secrets


def generate_event_claim_code() -> str:
    alphabet = "23456789"
    return "".join(secrets.choice(alphabet) for _ in range(5))
