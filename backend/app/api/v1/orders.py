from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session, require_admin
from app.repositories.order_repository import OrderRepository
from app.schemas.order import OrderRead
from app.models.order import ORDER_STATUS_PAID, ORDER_STATUS_UNPAID


router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("", response_model=list[OrderRead])
async def list_orders(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> list[OrderRead]:
    repository = OrderRepository(session)
    return list(await repository.get_multi(limit=limit, offset=offset))


@router.get("/{order_id}", response_model=OrderRead)
async def get_order(
    order_id: str,
    session: AsyncSession = Depends(get_session),
) -> OrderRead:
    repository = OrderRepository(session)
    order = await repository.get_by_id(order_id)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@router.patch("/{order_id}/paid", response_model=OrderRead)
async def update_order_paid_at(
    order_id: str,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> OrderRead:
    repository = OrderRepository(session)
    order = await repository.mark_as_paid(order_id)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@router.patch("/{order_id}/status", response_model=OrderRead)
async def update_order_status(
    order_id: str,
    status_value: Annotated[str, Form(alias="status")],
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> OrderRead:
    if status_value not in {ORDER_STATUS_PAID, ORDER_STATUS_UNPAID}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported order status")

    repository = OrderRepository(session)
    order = await repository.set_status(order_id, status_value)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(
    order_id: str,
    _admin: None = Depends(require_admin),
    session: AsyncSession = Depends(get_session),
) -> None:
    repository = OrderRepository(session)
    deleted = await repository.delete(order_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
