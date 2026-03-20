from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import require_admin
from app.api.dependencies import get_session
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserRead


router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserRead])
async def list_users(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _: object = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> list[UserRead]:
    repository = UserRepository(session)
    return list(await repository.get_multi(limit=limit, offset=offset))


@router.get("/{user_id}", response_model=UserRead)
async def get_user(
    user_id: str,
    _: object = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> UserRead:
    repository = UserRepository(session)
    user = await repository.get_by_public_id(user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.patch("/{user_id}/email", response_model=UserRead)
async def update_user_email(
    user_id: str,
    email: Annotated[str | None, Form()] = None,
    _: object = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> UserRead:
    repository = UserRepository(session)
    existing_user = await repository.get_by_public_id(user_id)
    if existing_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    data = {
        "email": email,
    }
    user = await repository.update(
        existing_user.id,
        {key: value for key, value in data.items() if value is not None},
    )
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.patch("/{user_id}/role", response_model=UserRead)
async def update_user_role(
    user_id: str,
    role: Annotated[str, Form()],
    _: object = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> UserRead:
    repository = UserRepository(session)
    user = await repository.update_role(user_id, role)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: str,
    _: object = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> None:
    repository = UserRepository(session)
    existing_user = await repository.get_by_public_id(user_id)
    if existing_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    deleted = await repository.delete(existing_user.id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
