import json
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session, require_admin
from app.api.v1.uploads import upload_image_to_r2
from app.core.config import get_settings
from app.repositories.event_repository import EventRepository
from app.repositories.order_repository import OrderRepository
from app.schemas.event import EventListRead, EventRead, EventWithOrderRead
from app.services.event_slug import build_event_slug
from app.services.r2_storage import R2StorageService


router = APIRouter(prefix="/events", tags=["events"])


def _serialize_event(event, *, order=None) -> dict:
    config = event.config if isinstance(event.config, dict) else {}
    template_id = config.get("template_id")

    return {
        "id": event.id,
        "slug": event.slug,
        "type": event.type,
        "template_id": template_id,
        "date": config.get("date"),
        "location": config.get("location"),
        "location_link": config.get("location_link"),
        "description": config.get("description"),
        "cover_image_url": config.get("cover_image_url"),
        "config": config,
        "is_example": event.is_example,
        "created_at": event.created_at,
        "updated_at": event.updated_at,
        "order": order,
        "template": (
            {
                "id": template_id,
                "name": config.get("template_name") or config.get("template_path") or "Template",
                "type": config.get("template_type") or "template",
                "path": config.get("template_path") or "",
                "created_at": event.created_at,
                "updated_at": event.updated_at,
            }
            if template_id
            else None
        ),
    }


@router.post("", response_model=EventRead, status_code=status.HTTP_201_CREATED)
async def create_event(
    type: Annotated[str, Form()],
    is_example: Annotated[bool, Form()] = False,
    time: Annotated[str | None, Form()] = None,
    config: Annotated[str, Form()] = "{}",
    file: Annotated[UploadFile | None, File()] = None,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    settings = get_settings()
    try:
        parsed_config = json.loads(config)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    if file is not None:
        upload = await upload_image_to_r2(file)
        parsed_config["cover_image_url"] = upload.url

    if time is not None and "time" not in parsed_config:
        parsed_config["time"] = time

    slug = await repository.generate_unique_slug(build_event_slug(event_type=type, config=parsed_config))
    event = await repository.create_with_order(
        event_data={
            "slug": slug,
            "type": type,
            "config": parsed_config,
            "is_example": is_example,
        },
        order_amount=settings.event_order_amount,
    )
    return EventRead.model_validate(_serialize_event(event))


@router.get("", response_model=list[EventListRead])
async def list_events(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> list[EventListRead]:
    repository = EventRepository(session)
    events = await repository.get_multi(limit=limit, offset=offset)
    return [EventListRead.model_validate(_serialize_event(event)) for event in events]


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
    return EventWithOrderRead.model_validate(_serialize_event(event, order=order))


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
    return EventRead.model_validate(_serialize_event(event))


@router.patch("/{event_id}", response_model=EventRead)
async def update_event(
    event_id: int,
    type: Annotated[str | None, Form()] = None,
    is_example: Annotated[bool | None, Form()] = None,
    time: Annotated[str | None, Form()] = None,
    config: Annotated[str | None, Form()] = None,
    file: Annotated[UploadFile | None, File()] = None,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> EventRead:
    repository = EventRepository(session)
    order_repository = OrderRepository(session)
    existing_event = await repository.get_by_id(event_id)
    if existing_event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

    try:
        parsed_config = json.loads(config) if config is not None else dict(existing_event.config)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    if file is not None:
        upload = await upload_image_to_r2(file)
        parsed_config["cover_image_url"] = upload.url

    if time is not None:
        parsed_config["time"] = time

    resolved_type = type if type is not None else existing_event.type

    data = {
        "type": type,
        "is_example": is_example,
    }
    if config is not None:
        data["config"] = parsed_config
    elif file is not None or time is not None:
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

    if is_example is True and not existing_event.is_example:
        existing_order = await order_repository.get_by_event_id(event_id)
        if existing_order is not None:
            await order_repository.delete(existing_order.id)
    elif is_example is False and existing_event.is_example:
        existing_order = await order_repository.get_by_event_id(event_id)
        if existing_order is None:
            await order_repository.create_for_event(event_id=event_id, amount=get_settings().event_order_amount)

    return EventRead.model_validate(_serialize_event(event))


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

    cover_image_url = event.config.get("cover_image_url") if isinstance(event.config, dict) else None
    if cover_image_url:
        storage = R2StorageService(get_settings())
        try:
            await run_in_threadpool(storage.delete_image_by_url, cover_image_url)
        except RuntimeError as exc:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc

    deleted = await repository.delete(event_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
