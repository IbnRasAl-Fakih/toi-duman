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


class EventRead(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
