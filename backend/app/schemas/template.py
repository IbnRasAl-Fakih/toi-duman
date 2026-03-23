from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class TemplateBase(BaseModel):
    type: str
    amount: Decimal


class TemplateCreate(TemplateBase):
    pass


class TemplateUpdate(BaseModel):
    type: str | None = None
    amount: Decimal | None = None


class TemplateRead(TemplateBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
