from datetime import datetime

from pydantic import BaseModel


class EventClaimCodeResponse(BaseModel):
    event_id: int
    code: str
    expires_at: datetime


class EventClaimResponse(BaseModel):
    message: str
    event_id: int
