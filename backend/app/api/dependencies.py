from collections.abc import AsyncGenerator

from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import Settings, get_settings
from app.db.session import get_db
from app.services.admin_auth import require_admin_request


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async for session in get_db():
        yield session


def get_admin_settings() -> Settings:
    return get_settings()


def require_admin(
    request: Request,
    settings: Settings = Depends(get_admin_settings),
) -> None:
    require_admin_request(request=request, settings=settings)
