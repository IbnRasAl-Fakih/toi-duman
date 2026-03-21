from pydantic import BaseModel


class PresignedUploadResponse(BaseModel):
    upload_url: str
    file_key: str
    file_url: str
    expires_in: int
