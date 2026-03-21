from decimal import Decimal

from sqlalchemy import desc, select

from app.models.event import Event
from app.models.order import ORDER_STATUS_UNPAID, Order
from app.repositories.base import BaseRepository
from app.services.order_id import generate_order_id


class EventRepository(BaseRepository[Event]):
    model = Event

    async def get_latest_by_user_id(self, user_id: str) -> Event | None:
        statement = (
            select(self.model)
            .where(self.model.user_id == user_id)
            .order_by(desc(self.model.created_at), desc(self.model.id))
        )
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()

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
