from app.core.user_identity import build_public_user_id, parse_public_user_id
from app.models.event import Event
from app.models.review import Review
from app.repositories.user_repository import UserRepository
from app.schemas.event import EventRead
from app.schemas.review import ReviewRead


async def serialize_event(event: Event, user_repository: UserRepository) -> EventRead:
    user = await user_repository.get_by_id(event.user_id)
    user_id = event.user_id if user is None else build_public_user_id(user.prefix, event.user_id)

    return EventRead.model_validate(
        {
            "id": event.id,
            "user_id": user_id,
            "slug": event.slug,
            "type": event.type,
            "date": event.date,
            "location": event.location,
            "location_link": event.location_link,
            "description": event.description,
            "cover_image_url": event.cover_image_url,
            "config": event.config,
            "created_at": event.created_at,
            "updated_at": event.updated_at,
        }
    )


async def serialize_review(review: Review, user_repository: UserRepository) -> ReviewRead:
    user = await user_repository.get_by_id(review.user_id)
    user_id = review.user_id if user is None else build_public_user_id(user.prefix, review.user_id)

    return ReviewRead.model_validate(
        {
            "id": review.id,
            "event_id": review.event_id,
            "user_id": user_id,
            "text": review.text,
            "is_published": review.is_published,
            "created_at": review.created_at,
            "updated_at": review.updated_at,
        }
    )


def parse_event_or_review_user_id(public_user_id: str) -> str:
    _, raw_user_id = parse_public_user_id(public_user_id)
    return raw_user_id
