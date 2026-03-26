import base64
import hashlib
import hmac
import json
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, Request, status

from app.core.config import Settings


def verify_admin_credentials(*, username: str, password: str, settings: Settings) -> bool:
    return hmac.compare_digest(username, settings.admin_username) and hmac.compare_digest(password, settings.admin_password)


def build_admin_session_value(*, settings: Settings) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(seconds=settings.admin_session_max_age_seconds)
    payload = {"sub": settings.admin_username, "exp": int(expires_at.timestamp())}
    payload_bytes = json.dumps(payload, separators=(",", ":"), sort_keys=True).encode("utf-8")
    encoded_payload = base64.urlsafe_b64encode(payload_bytes).decode("ascii").rstrip("=")
    signature = _sign_value(encoded_payload, settings.admin_session_secret)
    return f"{encoded_payload}.{signature}"


def require_admin_request(*, request: Request, settings: Settings) -> None:
    cookie_value = request.cookies.get(settings.admin_session_cookie_name)
    if not cookie_value:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin authentication required")

    try:
        encoded_payload, provided_signature = cookie_value.split(".", 1)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin session") from exc

    expected_signature = _sign_value(encoded_payload, settings.admin_session_secret)
    if not hmac.compare_digest(provided_signature, expected_signature):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin session")

    payload = _decode_payload(encoded_payload)
    if payload.get("sub") != settings.admin_username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin session")

    expires_at = payload.get("exp")
    if not isinstance(expires_at, int) or expires_at <= int(datetime.now(timezone.utc).timestamp()):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin session expired")


def _sign_value(value: str, secret: str) -> str:
    digest = hmac.new(secret.encode("utf-8"), value.encode("utf-8"), hashlib.sha256).digest()
    return base64.urlsafe_b64encode(digest).decode("ascii").rstrip("=")


def _decode_payload(encoded_payload: str) -> dict:
    padded_payload = encoded_payload + "=" * (-len(encoded_payload) % 4)
    payload_bytes = base64.urlsafe_b64decode(padded_payload.encode("ascii"))
    return json.loads(payload_bytes.decode("utf-8"))
