from sqlalchemy import select

from app.models.music import Music
from app.repositories.base import BaseRepository


class MusicRepository(BaseRepository[Music]):
    model = Music

    async def get_multi(self, *, limit: int = 100, offset: int = 0):
        statement = select(self.model).order_by(self.model.created_at.desc()).limit(limit).offset(offset)
        result = await self.session.execute(statement)
        return result.scalars().all()

    async def get_published(self):
        statement = select(self.model).where(self.model.is_published.is_(True)).order_by(self.model.title.asc())
        result = await self.session.execute(statement)
        return result.scalars().all()
