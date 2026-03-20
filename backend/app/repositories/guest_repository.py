from app.models.guest import Guest
from app.repositories.base import BaseRepository


class GuestRepository(BaseRepository[Guest]):
    model = Guest
