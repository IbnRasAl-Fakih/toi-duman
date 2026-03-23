from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session
from app.repositories.template_repository import TemplateRepository
from app.schemas.template import TemplateCreate, TemplateRead, TemplateUpdate


router = APIRouter(prefix="/templates", tags=["templates"])


@router.post("", response_model=TemplateRead, status_code=status.HTTP_201_CREATED)
async def create_template(
    payload: TemplateCreate,
    session: AsyncSession = Depends(get_session),
) -> TemplateRead:
    repository = TemplateRepository(session)
    template = await repository.create(payload.model_dump())
    return TemplateRead.model_validate(template)


@router.get("", response_model=list[TemplateRead])
async def list_templates(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    session: AsyncSession = Depends(get_session),
) -> list[TemplateRead]:
    repository = TemplateRepository(session)
    templates = await repository.get_multi(limit=limit, offset=offset)
    return [TemplateRead.model_validate(template) for template in templates]


@router.get("/{template_id}", response_model=TemplateRead)
async def get_template(
    template_id: int,
    session: AsyncSession = Depends(get_session),
) -> TemplateRead:
    repository = TemplateRepository(session)
    template = await repository.get_by_id(template_id)
    if template is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Template not found")
    return TemplateRead.model_validate(template)


@router.patch("/{template_id}", response_model=TemplateRead)
async def update_template(
    template_id: int,
    payload: TemplateUpdate,
    session: AsyncSession = Depends(get_session),
) -> TemplateRead:
    repository = TemplateRepository(session)
    template = await repository.update(
        template_id,
        payload.model_dump(exclude_none=True),
    )
    if template is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Template not found")
    return TemplateRead.model_validate(template)


@router.delete("/{template_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_template(
    template_id: int,
    session: AsyncSession = Depends(get_session),
) -> None:
    repository = TemplateRepository(session)
    deleted = await repository.delete(template_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Template not found")
