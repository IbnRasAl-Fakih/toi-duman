from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MusicPayload(BaseModel):
    title: str
    author: str | None = None
    url: str
    is_published: bool = False


class MusicRead(MusicPayload):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
