from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.concurrency import run_in_threadpool

from app.api.dependencies import require_admin
from app.core.config import get_settings
from app.schemas.upload import UploadAudioRead, UploadImageRead
from app.services.r2_storage import R2StorageService


router = APIRouter(prefix="/uploads", tags=["uploads"])

ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
}
MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024
ALLOWED_AUDIO_TYPES = {
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/aac",
    "audio/ogg",
    "audio/webm",
    "audio/mp4",
}
MAX_AUDIO_SIZE_BYTES = 40 * 1024 * 1024


async def upload_image_to_r2(file: UploadFile) -> UploadImageRead:
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Filename is required")

    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported image type")

    content = await file.read()
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty file")

    if len(content) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File is too large")

    storage = R2StorageService(get_settings())
    try:
        key, url = await run_in_threadpool(
            storage.upload_image,
            content=content,
            filename=file.filename,
            content_type=file.content_type,
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc

    return UploadImageRead(key=key, url=url)


async def upload_audio_to_r2(file: UploadFile) -> UploadAudioRead:
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Filename is required")

    if file.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported audio type")

    content = await file.read()
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty file")

    if len(content) > MAX_AUDIO_SIZE_BYTES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Audio file is too large")

    storage = R2StorageService(get_settings())
    try:
        key, url = await run_in_threadpool(
            storage.upload_audio,
            content=content,
            filename=file.filename,
            content_type=file.content_type,
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc

    return UploadAudioRead(key=key, url=url)


@router.post("/images", response_model=UploadImageRead, status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile = File(...), _admin: None = Depends(require_admin)) -> UploadImageRead:
    return await upload_image_to_r2(file)


@router.post("/public-images", response_model=UploadImageRead, status_code=status.HTTP_201_CREATED)
async def upload_public_image(file: UploadFile = File(...)) -> UploadImageRead:
    return await upload_image_to_r2(file)


@router.post("/audio", response_model=UploadAudioRead, status_code=status.HTTP_201_CREATED)
async def upload_audio(file: UploadFile = File(...), _admin: None = Depends(require_admin)) -> UploadAudioRead:
    return await upload_audio_to_r2(file)
