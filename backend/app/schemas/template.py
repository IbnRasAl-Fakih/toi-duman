from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class TemplateBase(BaseModel):
    name: str
    type: str
    path: str


class TemplateCreate(TemplateBase):
    pass


class TemplateUpdate(BaseModel):
    name: str | None = None
    type: str | None = None
    path: str | None = None


class TemplateRead(TemplateBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
