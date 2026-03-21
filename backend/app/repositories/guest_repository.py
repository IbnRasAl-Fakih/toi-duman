from sqlalchemy import select

from app.models.guest import Guest
from app.repositories.base import BaseRepository


class GuestRepository(BaseRepository[Guest]):
    model = Guest

    async def get_by_event_id(self, event_id: int) -> list[Guest]:
        statement = select(self.model).where(self.model.event_id == event_id).order_by(self.model.id.asc())
        result = await self.session.execute(statement)
        return list(result.scalars().all())
