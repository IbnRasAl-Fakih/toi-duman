from pathlib import Path
from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends, Form, HTTPException, status

from app.api.auth import get_current_user
from app.integrations.storage.r2 import R2StorageService
from app.models.user import User
from app.schemas.storage import PresignedUploadResponse


router = APIRouter(prefix="/uploads", tags=["uploads"])

PRESIGNED_UPLOAD_EXPIRES_IN = 3600


def _sanitize_folder(folder: str) -> str:
    parts = [part for part in folder.strip("/").split("/") if part and part not in {".", ".."}]
    return "/".join(parts)


def _build_file_key(*, user_id: str, file_name: str, folder: str | None = None) -> str:
    extension = Path(file_name).suffix.lower()
    safe_folder = _sanitize_folder(folder or "uploads")
    return f"{safe_folder}/{user_id}/{uuid4().hex}{extension}"


@router.post("/presigned-url", response_model=PresignedUploadResponse)
async def create_presigned_upload_url(
    file_name: Annotated[str, Form()],
    content_type: Annotated[str, Form()],
    folder: Annotated[str | None, Form()] = None,
    current_user: User = Depends(get_current_user),
) -> PresignedUploadResponse:
    if not file_name.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="file_name is required")
    if not content_type.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="content_type is required")

    file_key = _build_file_key(
        user_id=current_user.public_id,
        file_name=file_name,
        folder=folder,
    )

    try:
        storage = R2StorageService()
        upload_url = storage.generate_presigned_put_url(
            key=file_key,
            expires_in=PRESIGNED_UPLOAD_EXPIRES_IN,
            content_type=content_type,
        )
        file_url = storage.get_public_url(file_key)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc

    return PresignedUploadResponse(
        upload_url=upload_url,
        file_key=file_key,
        file_url=file_url,
        expires_in=PRESIGNED_UPLOAD_EXPIRES_IN,
    )
