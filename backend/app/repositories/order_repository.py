from datetime import datetime, timezone
from decimal import Decimal

from app.models.order import ORDER_STATUS_PAID, ORDER_STATUS_UNPAID, Order
from app.repositories.base import BaseRepository
from app.services.order_id import generate_order_id


class OrderRepository(BaseRepository[Order]):
    model = Order

    async def _generate_unique_order_id(self, created_at: datetime | None = None) -> str:
        while True:
            candidate = generate_order_id(created_at)
            existing_order = await self.get_by_id(candidate)
            if existing_order is None:
                return candidate

    async def create_for_event(self, *, event_id: int, amount: Decimal) -> Order:
        return await super().create(
            {
                "id": await self._generate_unique_order_id(),
                "event_id": event_id,
                "amount": amount,
                "status": ORDER_STATUS_UNPAID,
                "paid_at": None,
            }
        )

    async def mark_as_paid(self, order_id: int) -> Order | None:
        order = await self.get_by_id(order_id)
        if order is None:
            return None

        order.status = ORDER_STATUS_PAID
        order.paid_at = datetime.now(timezone.utc)

        await self.session.commit()
        await self.session.refresh(order)
        return order
