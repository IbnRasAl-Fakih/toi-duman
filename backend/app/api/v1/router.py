from fastapi import APIRouter

from app.api.v1.admin import router as admin_router
from app.api.v1.events import router as events_router
from app.api.v1.guests import router as guests_router
from app.api.v1.orders import router as orders_router
from app.api.v1.templates import router as templates_router
from app.api.v1.uploads import router as uploads_router


api_router = APIRouter()
api_router.include_router(admin_router)
api_router.include_router(events_router)
api_router.include_router(guests_router)
api_router.include_router(orders_router)
api_router.include_router(templates_router)
api_router.include_router(uploads_router)
