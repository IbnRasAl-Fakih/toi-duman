import json
from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.api.dependencies import get_session
from app.api.v1.user_serializers import parse_event_or_review_user_id, serialize_event
from app.repositories.event_repository import EventRepository
from app.repositories.user_repository import UserRepository
from app.schemas.event import EventRead


router = APIRouter(prefix="/events", tags=["events"])


@router.post("", response_model=EventRead, status_code=status.HTTP_201_CREATED)
async def create_event(
    user_id: Annotated[str, Form()],
    slug: Annotated[str, Form()],
    type: Annotated[str, Form()],
    date: Annotated[str, Form()],
    location: Annotated[str, Form()],
    location_link: Annotated[str | None, Form()] = None,
    description: Annotated[str | None, Form()] = None,
    cover_image_url: Annotated[str | None, Form()] = None,
    config: Annotated[str, Form()] = "{}",
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    event = await repository.create(
        {
            "user_id": parse_event_or_review_user_id(user_id),
            "slug": slug,
            "type": type,
            "date": date,
            "location": location,
            "location_link": location_link,
            "description": description,
            "cover_image_url": cover_image_url,
            "config": json.loads(config),
        }
    )
    return await serialize_event(event, UserRepository(session))


@router.get("", response_model=list[EventRead])
async def list_events(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> list[EventRead]:
    repository = EventRepository(session)
    user_repository = UserRepository(session)
    events = await repository.get_multi(limit=limit, offset=offset)
    return [await serialize_event(event, user_repository) for event in events]


@router.get("/{event_id}", response_model=EventRead)
async def get_event(
    event_id: int,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    event = await repository.get_by_id(event_id)
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return await serialize_event(event, UserRepository(session))


@router.patch("/{event_id}", response_model=EventRead)
async def update_event(
    event_id: int,
    user_id: Annotated[str | None, Form()] = None,
    slug: Annotated[str | None, Form()] = None,
    type: Annotated[str | None, Form()] = None,
    date: Annotated[str | None, Form()] = None,
    location: Annotated[str | None, Form()] = None,
    location_link: Annotated[str | None, Form()] = None,
    description: Annotated[str | None, Form()] = None,
    cover_image_url: Annotated[str | None, Form()] = None,
    config: Annotated[str | None, Form()] = None,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    data = {
        "user_id": parse_event_or_review_user_id(user_id) if user_id is not None else None,
        "slug": slug,
        "type": type,
        "date": date,
        "location": location,
        "location_link": location_link,
        "description": description,
        "cover_image_url": cover_image_url,
    }
    if config is not None:
        data["config"] = json.loads(config)

    event = await repository.update(
        event_id,
        {key: value for key, value in data.items() if value is not None},
    )
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return await serialize_event(event, UserRepository(session))


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(
    event_id: int,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> None:
    repository = EventRepository(session)
    deleted = await repository.delete(event_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
