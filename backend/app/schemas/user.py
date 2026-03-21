from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class UserRead(BaseModel):
    id: str = Field(validation_alias="public_id")
    email: str | None = None
    role: str
    email_verified_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class UserCreateResponse(UserRead):
    generated_password: str
