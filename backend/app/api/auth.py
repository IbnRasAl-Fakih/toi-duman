from typing import Annotated

from fastapi import Depends, Form, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session
from app.repositories.user_repository import UserRepository
from app.core.config import get_settings
from app.core.security import decode_access_token, decode_refresh_token


bearer_scheme = HTTPBearer()


class LoginForm:
    def __init__(
        self,
        identifier: Annotated[str, Form()],
        password: Annotated[str, Form()],
    ) -> None:
        self.identifier = identifier
        self.password = password


async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(bearer_scheme)],
    session: AsyncSession = Depends(get_session),
):
    import jwt

    repository = UserRepository(session)

    try:
        payload = decode_access_token(credentials.credentials)
    except jwt.InvalidTokenError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        ) from exc

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )

    user = await repository.get_by_public_id(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user


async def require_admin(current_user=Depends(get_current_user)):
    if current_user.role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    return current_user


def get_refresh_token_from_cookie(request: Request) -> str:
    settings = get_settings()
    refresh_token = request.cookies.get(settings.jwt_refresh_cookie_name)
    if refresh_token is not None:
        return refresh_token

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Refresh token is missing",
    )


async def get_current_user_from_refresh_token(
    refresh_token: str = Depends(get_refresh_token_from_cookie),
    session: AsyncSession = Depends(get_session),
):
    import jwt

    repository = UserRepository(session)

    try:
        payload = decode_refresh_token(refresh_token)
    except (jwt.InvalidTokenError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        ) from exc

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    user = await repository.get_by_public_id(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user
