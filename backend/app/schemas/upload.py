from pydantic import BaseModel


class UploadImageRead(BaseModel):
    key: str
    url: str
