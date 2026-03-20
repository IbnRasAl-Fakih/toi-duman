from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ReviewBase(BaseModel):
    event_id: int
    user_id: str
    text: str
    is_published: bool = False


class ReviewCreate(ReviewBase):
    pass


class ReviewUpdate(BaseModel):
    event_id: int | None = None
    user_id: str | None = None
    text: str | None = None
    is_published: bool | None = None


class ReviewRead(ReviewBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
