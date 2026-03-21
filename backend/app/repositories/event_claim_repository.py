from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.event import Event
from app.models.event_claim import EventClaim
from app.repositories.base import BaseRepository
from app.services.event_claim_code import generate_event_claim_code
from app.services.event_slug import build_event_slug


CLAIM_EXPIRE_HOURS = 3


class EventClaimRepository(BaseRepository[EventClaim]):
    model = EventClaim

    async def _generate_unique_code(self) -> str:
        while True:
            code = generate_event_claim_code()
            statement = select(self.model).where(self.model.code == code)
            result = await self.session.execute(statement)
            existing_claim = result.scalar_one_or_none()
            if existing_claim is None:
                return code

    async def create_claim(self, *, event_id: int, created_by_admin_id: str) -> EventClaim:
        code = await self._generate_unique_code()
        claim = EventClaim(
            event_id=event_id,
            code=code,
            expires_at=datetime.now(timezone.utc) + timedelta(hours=CLAIM_EXPIRE_HOURS),
            created_by_admin_id=created_by_admin_id,
        )
        self.session.add(claim)
        await self.session.commit()
        await self.session.refresh(claim)
        return claim

    async def get_active_by_code(self, code: str) -> EventClaim | None:
        statement = select(self.model).where(self.model.code == code)
        result = await self.session.execute(statement)
        claim = result.scalar_one_or_none()
        if claim is None or claim.used_at is not None:
            return None
        if claim.expires_at < datetime.now(timezone.utc):
            return None
        return claim

    async def claim_event(self, *, code: str, user_id: str) -> Event:
        claim = await self.get_active_by_code(code)
        if claim is None:
            raise ValueError("Invalid or expired claim code")

        event = await self.session.get(Event, claim.event_id)
        if event is None:
            raise ValueError("Event not found")

        event.user_id = user_id
        event.slug = build_event_slug(
            event_type=event.type,
            config=event.config,
            user_id=user_id,
        )
        claim.used_at = datetime.now(timezone.utc)
        claim.claimed_by_user_id = user_id

        await self.session.commit()
        await self.session.refresh(event)
        return event
