import secrets
from datetime import datetime, timedelta, timezone
from typing import Any

from app.core.config import get_settings


PASSWORD_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
PASSWORD_LENGTH = 12
VERIFICATION_CODE_ALPHABET = "23456789"
VERIFICATION_CODE_LENGTH = 6


def generate_password(length: int = PASSWORD_LENGTH) -> str:
    return "".join(secrets.choice(PASSWORD_ALPHABET) for _ in range(length))


def generate_verification_code(length: int = VERIFICATION_CODE_LENGTH) -> str:
    return "".join(secrets.choice(VERIFICATION_CODE_ALPHABET) for _ in range(length))


def get_password_hasher():
    from pwdlib import PasswordHash

    return PasswordHash.recommended()


def hash_password(password: str) -> str:
    return get_password_hasher().hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return get_password_hasher().verify(password, password_hash)


def validate_new_password(password: str) -> None:
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")

    has_letter = any(char.isalpha() for char in password)
    has_digit = any(char.isdigit() for char in password)

    if not has_letter or not has_digit:
        raise ValueError("Password must contain both letters and digits")


def create_access_token(subject: str, extra_claims: dict[str, Any] | None = None) -> str:
    import jwt

    settings = get_settings()
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.jwt_access_token_expire_minutes
    )
    payload: dict[str, Any] = {"sub": subject, "exp": expires_at}
    if extra_claims:
        payload.update(extra_claims)

    return jwt.encode(
        payload,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )


def create_refresh_token(subject: str, extra_claims: dict[str, Any] | None = None) -> str:
    import jwt

    settings = get_settings()
    expires_at = datetime.now(timezone.utc) + timedelta(
        days=settings.jwt_refresh_token_expire_days
    )
    payload: dict[str, Any] = {
        "sub": subject,
        "exp": expires_at,
        "type": "refresh",
    }
    if extra_claims:
        payload.update(extra_claims)

    return jwt.encode(
        payload,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )


def decode_access_token(token: str) -> dict[str, Any]:
    import jwt

    settings = get_settings()
    return jwt.decode(
        token,
        settings.jwt_secret_key,
        algorithms=[settings.jwt_algorithm],
    )


def decode_refresh_token(token: str) -> dict[str, Any]:
    payload = decode_access_token(token)
    if payload.get("type") != "refresh":
        raise ValueError("Invalid refresh token type")
    return payload
