import json
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session, require_admin
from app.api.v1.uploads import upload_image_to_r2
from app.core.config import get_settings
from app.repositories.event_repository import EventRepository
from app.repositories.order_repository import OrderRepository
from app.repositories.template_repository import TemplateRepository
from app.schemas.event import EventListRead, EventRead, EventWithOrderRead
from app.services.event_datetime import combine_event_datetime
from app.services.event_slug import build_event_slug
from app.services.r2_storage import R2StorageService


router = APIRouter(prefix="/events", tags=["events"])


@router.post("", response_model=EventRead, status_code=status.HTTP_201_CREATED)
async def create_event(
    type: Annotated[str, Form()],
    template_id: Annotated[UUID, Form()],
    date: Annotated[str, Form()],
    location: Annotated[str, Form()],
    time: Annotated[str | None, Form()] = None,
    location_link: Annotated[str | None, Form()] = None,
    description: Annotated[str | None, Form()] = None,
    cover_image_url: Annotated[str | None, Form()] = None,
    config: Annotated[str, Form()] = "{}",
    file: Annotated[UploadFile | None, File()] = None,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    template_repository = TemplateRepository(session)
    settings = get_settings()
    parsed_config = json.loads(config)
    template = await template_repository.get_by_id(template_id)
    if template is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Template not found")
    try:
        parsed_date = combine_event_datetime(date_value=date, time_value=time)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    resolved_cover_image_url = cover_image_url
    if file is not None:
        upload = await upload_image_to_r2(file)
        resolved_cover_image_url = upload.url

    slug = await repository.generate_unique_slug(build_event_slug(event_type=type, config=parsed_config))
    event = await repository.create_with_order(
        event_data={
            "slug": slug,
            "type": type,
            "template_id": template_id,
            "date": parsed_date,
            "location": location,
            "location_link": location_link,
            "description": description,
            "cover_image_url": resolved_cover_image_url,
            "config": parsed_config,
        },
        order_amount=settings.event_order_amount,
    )
    return EventRead.model_validate(event)


@router.get("", response_model=list[EventListRead])
async def list_events(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> list[EventListRead]:
    repository = EventRepository(session)
    events = await repository.get_multi(limit=limit, offset=offset)
    return [EventListRead.model_validate(event) for event in events]


@router.get("/slug/{slug}", response_model=EventWithOrderRead)
async def get_event_by_slug(
    slug: str,
    session: AsyncSession = Depends(get_session),
) -> EventWithOrderRead:
    event_repository = EventRepository(session)
    order_repository = OrderRepository(session)
    event = await event_repository.get_by_slug(slug)
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    order = await order_repository.get_by_event_id(event.id)
    return EventWithOrderRead.model_validate(
        {
            **EventRead.model_validate(event).model_dump(),
            "order": order,
            "template": event.template,
        }
    )


@router.get("/{event_id}", response_model=EventRead)
async def get_event(
    event_id: int,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    event = await repository.get_by_id(event_id)
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return EventRead.model_validate(event)


@router.patch("/{event_id}", response_model=EventRead)
async def update_event(
    event_id: int,
    type: Annotated[str | None, Form()] = None,
    template_id: Annotated[UUID | None, Form()] = None,
    date: Annotated[str | None, Form()] = None,
    time: Annotated[str | None, Form()] = None,
    location: Annotated[str | None, Form()] = None,
    location_link: Annotated[str | None, Form()] = None,
    description: Annotated[str | None, Form()] = None,
    cover_image_url: Annotated[str | None, Form()] = None,
    config: Annotated[str | None, Form()] = None,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    template_repository = TemplateRepository(session)
    existing_event = await repository.get_by_id(event_id)
    if existing_event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    if template_id is not None:
        template = await template_repository.get_by_id(template_id)
        if template is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Template not found")

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
        "template_id": template_id,
        "date": parsed_date,
        "location": location,
        "location_link": location_link,
        "description": description,
        "cover_image_url": cover_image_url,
    }
    if config is not None:
        data["config"] = parsed_config

    if type is not None or config is not None:
        data["slug"] = await repository.generate_unique_slug(
            build_event_slug(event_type=resolved_type, config=parsed_config),
            exclude_event_id=event_id,
        )

    event = await repository.update(
        event_id,
        {key: value for key, value in data.items() if value is not None},
    )
    return EventRead.model_validate(event)


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(
    event_id: int,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> None:
    repository = EventRepository(session)
    event = await repository.get_by_id(event_id)
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

    if event.cover_image_url:
        storage = R2StorageService(get_settings())
        try:
            await run_in_threadpool(storage.delete_image_by_url, event.cover_image_url)
        except RuntimeError as exc:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc

    deleted = await repository.delete(event_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
