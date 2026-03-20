from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class OrderBase(BaseModel):
    event_id: int
    amount: Decimal
    status: str
    paid_at: datetime | None = None


class OrderCreate(OrderBase):
    pass


class OrderUpdate(BaseModel):
    event_id: int | None = None
    amount: Decimal | None = None
    status: str | None = None
    paid_at: datetime | None = None


class OrderRead(OrderBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
