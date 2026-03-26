from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status

from app.api.dependencies import get_admin_settings, require_admin
from app.core.config import Settings
from app.services.admin_auth import build_admin_session_value, verify_admin_credentials


router = APIRouter(prefix="/admin", tags=["admin"])


class AdminLoginPayload(BaseModel):
    username: str
    password: str


@router.post("/login")
async def admin_login(
    payload: AdminLoginPayload,
    response: Response,
    settings: Settings = Depends(get_admin_settings),
) -> dict[str, bool]:
    if not verify_admin_credentials(username=payload.username, password=payload.password, settings=settings):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    response.set_cookie(
        key=settings.admin_session_cookie_name,
        value=build_admin_session_value(settings=settings),
        max_age=settings.admin_session_max_age_seconds,
        httponly=True,
        samesite="lax",
        secure=settings.app_env != "local",
        path="/",
    )
    return {"ok": True}


@router.post("/logout")
async def admin_logout(
    response: Response,
    settings: Settings = Depends(get_admin_settings),
) -> dict[str, bool]:
    response.delete_cookie(key=settings.admin_session_cookie_name, path="/")
    return {"ok": True}


@router.get("/me")
async def admin_me(
    request: Request,
    settings: Settings = Depends(get_admin_settings),
    _admin: None = Depends(require_admin),
) -> dict[str, str]:
    return {"username": settings.admin_username}
