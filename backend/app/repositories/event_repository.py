from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.models.event import Event
from app.models.order import ORDER_STATUS_UNPAID, Order
from app.repositories.base import BaseRepository
from app.services.order_id import generate_order_id


class EventRepository(BaseRepository[Event]):
    model = Event

    async def get_multi(self, *, limit: int = 100, offset: int = 0):
        statement = select(self.model).options(selectinload(self.model.template)).limit(limit).offset(offset)
        result = await self.session.execute(statement)
        return result.scalars().all()

    async def get_by_slug(self, slug: str) -> Event | None:
        statement = select(self.model).options(selectinload(self.model.template)).where(self.model.slug == slug)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()

    async def generate_unique_slug(self, base_slug: str, *, exclude_event_id: int | None = None) -> str:
        candidate = base_slug
        suffix = 2

        while True:
            existing_event = await self.get_by_slug(candidate)
            if existing_event is None or existing_event.id == exclude_event_id:
                return candidate
            candidate = f"{base_slug}-{suffix}"
            suffix += 1

    async def _generate_unique_order_id(self) -> str:
        while True:
            candidate = generate_order_id()
            existing_order = await self.session.get(Order, candidate)
            if existing_order is None:
                return candidate

    async def create_with_order(self, *, event_data: dict, order_amount: Decimal) -> Event:
        event = Event(**event_data)
        self.session.add(event)
        await self.session.flush()

        order = Order(
            id=await self._generate_unique_order_id(),
            event_id=event.id,
            amount=order_amount,
            status=ORDER_STATUS_UNPAID,
            paid_at=None,
        )
        self.session.add(order)

        await self.session.commit()
        await self.session.refresh(event)
        return event
