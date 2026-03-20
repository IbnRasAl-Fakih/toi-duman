from collections.abc import Sequence
from typing import Any, Generic, TypeVar

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import Base


ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    model: type[ModelType]

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, data: dict[str, Any]) -> ModelType:
        instance = self.model(**data)
        self.session.add(instance)
        await self.session.commit()
        await self.session.refresh(instance)
        return instance

    async def get_by_id(self, object_id: Any) -> ModelType | None:
        statement = select(self.model).where(self.model.id == object_id)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()

    async def get_multi(self, *, limit: int = 100, offset: int = 0) -> Sequence[ModelType]:
        statement = select(self.model).limit(limit).offset(offset)
        result = await self.session.execute(statement)
        return result.scalars().all()

    async def update(self, object_id: Any, data: dict[str, Any]) -> ModelType | None:
        instance = await self.get_by_id(object_id)
        if instance is None:
            return None

        for field, value in data.items():
            setattr(instance, field, value)

        await self.session.commit()
        await self.session.refresh(instance)
        return instance

    async def delete(self, object_id: Any) -> bool:
        instance = await self.get_by_id(object_id)
        if instance is None:
            return False

        await self.session.delete(instance)
        await self.session.commit()
        return True
