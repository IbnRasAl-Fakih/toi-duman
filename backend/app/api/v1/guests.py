from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.api.dependencies import get_session
from app.repositories.guest_repository import GuestRepository
from app.schemas.guest import GuestRead


router = APIRouter(prefix="/guests", tags=["guests"])


@router.post("", response_model=GuestRead, status_code=status.HTTP_201_CREATED)
async def create_guest(
    event_id: Annotated[int, Form()],
    name: Annotated[str, Form()],
    status: Annotated[str, Form()],
    count: Annotated[int, Form()] = 1,
    comment: Annotated[str | None, Form()] = None,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> GuestRead:
    repository = GuestRepository(session)
    return await repository.create(
        {
            "event_id": event_id,
            "name": name,
            "status": status,
            "count": count,
            "comment": comment,
        }
    )


@router.get("", response_model=list[GuestRead])
async def list_guests(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> list[GuestRead]:
    repository = GuestRepository(session)
    return list(await repository.get_multi(limit=limit, offset=offset))


@router.get("/{guest_id}", response_model=GuestRead)
async def get_guest(
    guest_id: int,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> GuestRead:
    repository = GuestRepository(session)
    guest = await repository.get_by_id(guest_id)
    if guest is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Guest not found")
    return guest


@router.patch("/{guest_id}", response_model=GuestRead)
async def update_guest(
    guest_id: int,
    event_id: Annotated[int | None, Form()] = None,
    name: Annotated[str | None, Form()] = None,
    status: Annotated[str | None, Form()] = None,
    count: Annotated[int | None, Form()] = None,
    comment: Annotated[str | None, Form()] = None,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> GuestRead:
    repository = GuestRepository(session)
    guest = await repository.update(
        guest_id,
        {
            key: value
            for key, value in {
                "event_id": event_id,
                "name": name,
                "status": status,
                "count": count,
                "comment": comment,
            }.items()
            if value is not None
        },
    )
    if guest is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Guest not found")
    return guest


@router.delete("/{guest_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_guest(
    guest_id: int,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> None:
    repository = GuestRepository(session)
    deleted = await repository.delete(guest_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Guest not found")
