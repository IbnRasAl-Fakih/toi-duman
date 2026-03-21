from datetime import datetime

from pydantic import BaseModel, ConfigDict


class GuestBase(BaseModel):
    event_id: int
    name: str
    status: str
    count: int = 1
    comment: str | None = None


class GuestRead(GuestBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
