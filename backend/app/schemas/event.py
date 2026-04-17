from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.order import OrderRead
from app.schemas.template import TemplateRead


class EventBase(BaseModel):
    slug: str
    type: str
    template_id: UUID | None = None
    date: datetime | None = None
    location: str | None = None
    location_link: str | None = None
    description: str | None = None
    cover_image_url: str | None = None
    config: dict[str, Any] = Field(default_factory=dict)
    is_example: bool = False


class EventRead(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class EventListRead(EventRead):
    template: TemplateRead | None = None


class EventWithOrderRead(EventRead):
    order: OrderRead | None = None
    template: TemplateRead | None = None
