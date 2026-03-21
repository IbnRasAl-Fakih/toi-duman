import json
from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user, require_admin
from app.api.dependencies import get_session
from app.api.v1.user_serializers import serialize_event
from app.core.config import get_settings
from app.models.user import User, UserRole
from app.repositories.event_claim_repository import CLAIM_EXPIRE_HOURS, EventClaimRepository
from app.repositories.event_repository import EventRepository
from app.repositories.user_repository import UserRepository
from app.schemas.event_claim import EventClaimCodeResponse, EventClaimResponse
from app.schemas.event import EventRead
from app.services.event_datetime import combine_event_datetime
from app.services.event_slug import build_event_slug


router = APIRouter(prefix="/events", tags=["events"])


@router.post("", response_model=EventRead, status_code=status.HTTP_201_CREATED)
async def create_event(
    type: Annotated[str, Form()],
    date: Annotated[str, Form()],
    location: Annotated[str, Form()],
    time: Annotated[str | None, Form()] = None,
    location_link: Annotated[str | None, Form()] = None,
    description: Annotated[str | None, Form()] = None,
    cover_image_url: Annotated[str | None, Form()] = None,
    config: Annotated[str, Form()] = "{}",
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    settings = get_settings()
    parsed_config = json.loads(config)
    try:
        parsed_date = combine_event_datetime(date_value=date, time_value=time)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    slug = build_event_slug(
        event_type=type,
        config=parsed_config,
        user_id=current_user.id,
    )
    event = await repository.create_with_order(
        event_data={
            "user_id": current_user.id,
            "slug": slug,
            "type": type,
            "date": parsed_date,
            "location": location,
            "location_link": location_link,
            "description": description,
            "cover_image_url": cover_image_url,
            "config": parsed_config,
            "is_created_by_admin": current_user.role == UserRole.admin,
        },
        order_amount=settings.event_order_amount,
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
    type: Annotated[str | None, Form()] = None,
    date: Annotated[str | None, Form()] = None,
    time: Annotated[str | None, Form()] = None,
    location: Annotated[str | None, Form()] = None,
    location_link: Annotated[str | None, Form()] = None,
    description: Annotated[str | None, Form()] = None,
    cover_image_url: Annotated[str | None, Form()] = None,
    config: Annotated[str | None, Form()] = None,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    existing_event = await repository.get_by_id(event_id)
    if existing_event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

    parsed_config = json.loads(config) if config is not None else existing_event.config
    resolved_type = type if type is not None else existing_event.type
    parsed_date = None
    if date is not None or time is not None:
        try:
            parsed_date = combine_event_datetime(
                date_value=date if date is not None else existing_event.date.strftime("%Y-%m-%d"),
                time_value=time if time is not None else existing_event.date.strftime("%H:%M"),
            )
        except ValueError as exc:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    data = {
        "type": type,
        "date": parsed_date,
        "location": location,
        "location_link": location_link,
        "description": description,
        "cover_image_url": cover_image_url,
    }
    if config is not None:
        data["config"] = parsed_config

    if type is not None or config is not None:
        data["slug"] = build_event_slug(
            event_type=resolved_type,
            config=parsed_config,
            user_id=current_user.id,
        )

    event = await repository.update(
        event_id,
        {key: value for key, value in data.items() if value is not None},
    )
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


@router.post("/{event_id}/claim-code", response_model=EventClaimCodeResponse)
async def create_event_claim_code(
    event_id: int,
    current_user: User = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> EventClaimCodeResponse:
    event_repository = EventRepository(session)
    claim_repository = EventClaimRepository(session)

    event = await event_repository.get_by_id(event_id)
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    if not event.is_created_by_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Claim code can be created only for admin-created events",
        )

    claim = await claim_repository.create_claim(
        event_id=event_id,
        created_by_admin_id=current_user.id,
    )
    return EventClaimCodeResponse(
        event_id=event_id,
        code=claim.code,
        expires_at=claim.expires_at,
    )


@router.post("/claim", response_model=EventClaimResponse)
async def claim_event(
    code: Annotated[str, Form()],
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EventClaimResponse:
    claim_repository = EventClaimRepository(session)

    try:
        event = await claim_repository.claim_event(code=code, user_id=current_user.id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    return EventClaimResponse(
        message=f"Event claimed successfully.",
        event_id=event.id,
    )
