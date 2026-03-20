from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class EventBase(BaseModel):
    user_id: str
    slug: str
    type: str
    date: datetime
    location: str
    location_link: str | None = None
    description: str | None = None
    cover_image_url: str | None = None
    config: dict[str, Any] = Field(default_factory=dict)


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    user_id: str | None = None
    slug: str | None = None
    type: str | None = None
    date: datetime | None = None
    location: str | None = None
    location_link: str | None = None
    description: str | None = None
    cover_image_url: str | None = None
    config: dict[str, Any] | None = None


class EventRead(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
