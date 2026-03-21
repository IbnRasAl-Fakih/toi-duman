from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class OrderBase(BaseModel):
    event_id: int
    amount: Decimal
    status: str
    paid_at: datetime | None = None


class OrderRead(OrderBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
