from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    role: str


class RefreshResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AuthenticatedUser(BaseModel):
    id: str = Field(validation_alias="public_id")
    email: str | None = None
    role: str
    email_verified_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class EmailVerificationRequestResponse(BaseModel):
    message: str
    email: str
    expires_in_minutes: int


class EmailVerificationResponse(BaseModel):
    message: str
    email: str


class PasswordChangeResponse(BaseModel):
    message: str


class PasswordResetRequestResponse(BaseModel):
    message: str
    email: str
    expires_in_minutes: int


class PasswordResetResponse(BaseModel):
    message: str
