from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.order import OrderRead


class EventBase(BaseModel):
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


class EventWithOrderRead(EventRead):
    order: OrderRead | None = None
