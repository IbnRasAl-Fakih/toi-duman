from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session, require_admin
from app.repositories.music_repository import MusicRepository
from app.schemas.music import MusicPayload, MusicRead


router = APIRouter(prefix="/musics", tags=["musics"])


def _normalize_payload(payload: MusicPayload) -> dict:
    title = payload.title.strip()
    url = payload.url.strip()
    if not title:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Music title is required")
    if not url:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Music URL is required")

    return {
        "title": title,
        "author": payload.author.strip() if isinstance(payload.author, str) and payload.author.strip() else None,
        "url": url,
        "is_published": payload.is_published,
    }


@router.get("/published", response_model=list[MusicRead])
async def list_published_musics(
    session: AsyncSession = Depends(get_session),
) -> list[MusicRead]:
    repository = MusicRepository(session)
    return [MusicRead.model_validate(item) for item in await repository.get_published()]


@router.get("", response_model=list[MusicRead])
async def list_musics(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> list[MusicRead]:
    repository = MusicRepository(session)
    return [MusicRead.model_validate(item) for item in await repository.get_multi(limit=limit, offset=offset)]


@router.post("", response_model=MusicRead, status_code=status.HTTP_201_CREATED)
async def create_music(
    payload: MusicPayload,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> MusicRead:
    repository = MusicRepository(session)
    music = await repository.create(_normalize_payload(payload))
    return MusicRead.model_validate(music)


@router.patch("/{music_id}", response_model=MusicRead)
async def update_music(
    music_id: int,
    payload: MusicPayload,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> MusicRead:
    repository = MusicRepository(session)
    music = await repository.update(music_id, _normalize_payload(payload))
    if music is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Music not found")
    return MusicRead.model_validate(music)


@router.delete("/{music_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_music(
    music_id: int,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> None:
    repository = MusicRepository(session)
    deleted = await repository.delete(music_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Music not found")
