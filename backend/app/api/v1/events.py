import json
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, Request, UploadFile, status
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session, require_admin
from app.api.v1.uploads import upload_image_to_r2
from app.core.config import get_settings
from app.repositories.event_repository import EventRepository
from app.repositories.order_repository import OrderRepository
from app.schemas.event import EventListRead, EventRead, EventWithOrderRead
from app.services.admin_auth import require_admin_request
from app.services.event_slug import build_event_slug
from app.services.r2_storage import R2StorageService


router = APIRouter(prefix="/events", tags=["events"])

PUBLIC_TEMPLATE_5_REQUIRED_FIELDS = {
    "date": "Date is required",
    "location": "Location is required",
    "location_link": "Map link is required",
    "name": "Name is required",
    "heroTitle": "Hero title is required",
    "venueTitle": "Venue title is required",
}
PUBLIC_TEMPLATE_6_REQUIRED_FIELDS = {
    "date": "Date is required",
    "location": "Location is required",
    "location_link": "Map link is required",
    "name": "Name is required",
    "heroTitle": "Hero title is required",
}
PUBLIC_TEMPLATE_7_REQUIRED_FIELDS = {
    "date": "Date is required",
    "location": "Location is required",
    "location_link": "Map link is required",
    "name": "Name is required",
    "venue_name": "Venue name is required",
}


def _get_config_text(config: dict, key: str) -> str:
    value = config.get(key)
    return value.strip() if isinstance(value, str) else ""


def _validate_public_template_5_config(config: dict) -> None:
    for field, detail in PUBLIC_TEMPLATE_5_REQUIRED_FIELDS.items():
        value = config.get(field)
        if isinstance(value, list):
            if not any(str(item).strip() for item in value):
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
            continue

        if not isinstance(value, str) or not value.strip():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)

    gallery_images = config.get("galleryImages")
    if not isinstance(gallery_images, list) or len(gallery_images) < 3 or len(gallery_images) > 4:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload 3 or 4 gallery images")

    if not _get_config_text(config, "time") and not _get_config_text(config, "date").endswith("Z"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Event time is required")


def _validate_public_template_6_config(config: dict) -> None:
    for field, detail in PUBLIC_TEMPLATE_6_REQUIRED_FIELDS.items():
        value = config.get(field)
        if isinstance(value, list):
            if not any(str(item).strip() for item in value):
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
            continue

        if not isinstance(value, str) or not value.strip():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)

    gallery_images = config.get("gallery_image_urls")
    if not isinstance(gallery_images, list) or len(gallery_images) < 3 or len(gallery_images) > 6:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload 3 to 6 gallery images")

    if not _get_config_text(config, "time") and not _get_config_text(config, "date").endswith("Z"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Event time is required")


def _validate_public_template_7_config(config: dict) -> None:
    for field, detail in PUBLIC_TEMPLATE_7_REQUIRED_FIELDS.items():
        value = config.get(field)
        if isinstance(value, list):
            if not any(str(item).strip() for item in value):
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
            continue

        if not isinstance(value, str) or not value.strip():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)

    if not _get_config_text(config, "time") and not _get_config_text(config, "date").endswith("Z"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Event time is required")


async def _cleanup_uploaded_images(urls: list[str]) -> None:
    if not urls:
        return

    storage = R2StorageService(get_settings())
    for url in urls:
        try:
            await run_in_threadpool(storage.delete_image_by_url, url)
        except RuntimeError:
            continue


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


@router.post("/public-template-5", response_model=EventWithOrderRead, status_code=status.HTTP_201_CREATED)
async def create_public_template_5_event(
    request: Request,
    type: Annotated[str, Form()] = "wedding",
    is_example: Annotated[bool, Form()] = False,
    config: Annotated[str, Form()] = "{}",
    gallery_files: Annotated[list[UploadFile] | None, File()] = None,
    session: AsyncSession = Depends(get_session),
) -> EventWithOrderRead:
    repository = EventRepository(session)
    settings = get_settings()

    if is_example:
        require_admin_request(request=request, settings=settings)

    try:
        parsed_config = json.loads(config)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    if not isinstance(parsed_config, dict):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Config must be an object")

    uploads = gallery_files or []
    if len(uploads) < 3 or len(uploads) > 4:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload 3 or 4 gallery images")

    parsed_config["galleryImages"] = [file.filename or f"gallery-{index}" for index, file in enumerate(uploads, start=1)]
    _validate_public_template_5_config(parsed_config)

    parsed_config["template_path"] = "templates/invitation-page_template_5.jsx"
    parsed_config["template_type"] = "invitation_v5"
    parsed_config["template_name"] = "Махаббат театры"

    event_type = str(type or "wedding")
    uploaded_urls: list[str] = []
    try:
        parsed_config["galleryImages"] = []
        for file in uploads:
            upload = await upload_image_to_r2(file)
            parsed_config["galleryImages"].append(upload.url)
            uploaded_urls.append(upload.url)

        slug = await repository.generate_unique_slug(build_event_slug(event_type=event_type, config=parsed_config))
        event = await repository.create_with_order(
            event_data={
                "slug": slug,
                "type": event_type,
                "config": parsed_config,
                "is_example": is_example,
            },
            order_amount=settings.event_order_amount,
        )
    except Exception:
        await _cleanup_uploaded_images(uploaded_urls)
        raise

    order_repository = OrderRepository(session)
    order = await order_repository.get_by_event_id(event.id)
    return EventWithOrderRead.model_validate(_serialize_event(event, order=order))


@router.post("/public-template-6", response_model=EventWithOrderRead, status_code=status.HTTP_201_CREATED)
async def create_public_template_6_event(
    request: Request,
    type: Annotated[str, Form()] = "wedding",
    is_example: Annotated[bool, Form()] = False,
    config: Annotated[str, Form()] = "{}",
    cover_file: Annotated[UploadFile | None, File()] = None,
    gallery_files: Annotated[list[UploadFile] | None, File()] = None,
    session: AsyncSession = Depends(get_session),
) -> EventWithOrderRead:
    repository = EventRepository(session)
    settings = get_settings()

    if is_example:
        require_admin_request(request=request, settings=settings)

    try:
        parsed_config = json.loads(config)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    if not isinstance(parsed_config, dict):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Config must be an object")

    uploads = gallery_files or []
    if len(uploads) < 3 or len(uploads) > 6:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload 3 to 6 gallery images")

    parsed_config["gallery_image_urls"] = [file.filename or f"gallery-{index}" for index, file in enumerate(uploads, start=1)]
    _validate_public_template_6_config(parsed_config)

    parsed_config["template_path"] = "templates/invitation-page_template_6.jsx"
    parsed_config["template_type"] = "invitation_v6"
    parsed_config["template_name"] = "Ғашықтар бағы"

    event_type = str(type or "wedding")
    uploaded_urls: list[str] = []
    cover_url: str | None = None
    try:
        if cover_file is not None:
            cover_upload = await upload_image_to_r2(cover_file)
            cover_url = cover_upload.url
            parsed_config["cover_image_url"] = cover_url
            uploaded_urls.append(cover_url)

        parsed_config["gallery_image_urls"] = []
        for file in uploads:
            upload = await upload_image_to_r2(file)
            parsed_config["gallery_image_urls"].append(upload.url)
            uploaded_urls.append(upload.url)

        slug = await repository.generate_unique_slug(build_event_slug(event_type=event_type, config=parsed_config))
        event = await repository.create_with_order(
            event_data={
                "slug": slug,
                "type": event_type,
                "config": parsed_config,
                "is_example": is_example,
            },
            order_amount=settings.event_order_amount,
        )
    except Exception:
        await _cleanup_uploaded_images(uploaded_urls)
        raise

    order_repository = OrderRepository(session)
    order = await order_repository.get_by_event_id(event.id)
    return EventWithOrderRead.model_validate(_serialize_event(event, order=order))


@router.post("/public-template-7", response_model=EventWithOrderRead, status_code=status.HTTP_201_CREATED)
async def create_public_template_7_event(
    request: Request,
    type: Annotated[str, Form()] = "wedding",
    is_example: Annotated[bool, Form()] = False,
    config: Annotated[str, Form()] = "{}",
    session: AsyncSession = Depends(get_session),
) -> EventWithOrderRead:
    repository = EventRepository(session)
    settings = get_settings()

    if is_example:
        require_admin_request(request=request, settings=settings)

    try:
        parsed_config = json.loads(config)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    if not isinstance(parsed_config, dict):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Config must be an object")

    _validate_public_template_7_config(parsed_config)

    parsed_config["template_path"] = "templates/ceremonial-palace-page.jsx"
    parsed_config["template_type"] = "invitation_v7"
    parsed_config["template_name"] = "Салтанат сарайы"
    parsed_config["cover_image_url"] = parsed_config.get("cover_image_url") or "/images/templates/ceremonial-palace/300592484d1f31590325.png.webp"

    event_type = str(type or "wedding")
    slug = await repository.generate_unique_slug(build_event_slug(event_type=event_type, config=parsed_config))
    event = await repository.create_with_order(
        event_data={
            "slug": slug,
            "type": event_type,
            "config": parsed_config,
            "is_example": is_example,
        },
        order_amount=settings.event_order_amount,
    )

    order_repository = OrderRepository(session)
    order = await order_repository.get_by_event_id(event.id)
    return EventWithOrderRead.model_validate(_serialize_event(event, order=order))


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
