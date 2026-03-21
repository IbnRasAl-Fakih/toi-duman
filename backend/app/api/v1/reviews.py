from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.api.dependencies import get_session
from app.api.v1.user_serializers import serialize_review
from app.models.user import User
from app.repositories.event_repository import EventRepository
from app.repositories.review_repository import ReviewRepository
from app.repositories.user_repository import UserRepository
from app.schemas.review import ReviewRead


router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.post("", response_model=ReviewRead, status_code=status.HTTP_201_CREATED)
async def create_review(
    comment: Annotated[str, Form()],
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> ReviewRead:
    event_repository = EventRepository(session)
    repository = ReviewRepository(session)
    latest_event = await event_repository.get_latest_by_user_id(current_user.id)
    if latest_event is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User has no events to attach a review to",
        )

    review = await repository.create(
        {
            "event_id": latest_event.id,
            "user_id": current_user.id,
            "text": comment,
            "is_published": False,
        }
    )
    return await serialize_review(review, UserRepository(session))


@router.get("", response_model=list[ReviewRead])
async def list_reviews(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> list[ReviewRead]:
    repository = ReviewRepository(session)
    user_repository = UserRepository(session)
    reviews = await repository.get_multi(limit=limit, offset=offset)
    return [await serialize_review(review, user_repository) for review in reviews]


@router.get("/{review_id}", response_model=ReviewRead)
async def get_review(
    review_id: int,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> ReviewRead:
    repository = ReviewRepository(session)
    review = await repository.get_by_id(review_id)
    if review is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
    return await serialize_review(review, UserRepository(session))


@router.patch("/{review_id}", response_model=ReviewRead)
async def update_review(
    review_id: int,
    comment: Annotated[str | None, Form()] = None,
    is_published: Annotated[bool | None, Form()] = None,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> ReviewRead:
    repository = ReviewRepository(session)
    review = await repository.update(
        review_id,
        {
            key: value
            for key, value in {
                "text": comment,
                "is_published": is_published,
            }.items()
            if value is not None
        },
    )
    if review is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
    return await serialize_review(review, UserRepository(session))


@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_review(
    review_id: int,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> None:
    repository = ReviewRepository(session)
    deleted = await repository.delete(review_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
