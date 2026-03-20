from decimal import Decimal
from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.api.dependencies import get_session
from app.repositories.order_repository import OrderRepository
from app.schemas.order import OrderRead


router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
async def create_order(
    event_id: Annotated[int, Form()],
    amount: Annotated[Decimal, Form()],
    status: Annotated[str, Form()],
    paid_at: Annotated[str | None, Form()] = None,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> OrderRead:
    repository = OrderRepository(session)
    return await repository.create(
        {
            "event_id": event_id,
            "amount": amount,
            "status": status,
            "paid_at": paid_at,
        }
    )


@router.get("", response_model=list[OrderRead])
async def list_orders(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> list[OrderRead]:
    repository = OrderRepository(session)
    return list(await repository.get_multi(limit=limit, offset=offset))


@router.get("/{order_id}", response_model=OrderRead)
async def get_order(
    order_id: int,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> OrderRead:
    repository = OrderRepository(session)
    order = await repository.get_by_id(order_id)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@router.patch("/{order_id}", response_model=OrderRead)
async def update_order(
    order_id: int,
    event_id: Annotated[int | None, Form()] = None,
    amount: Annotated[Decimal | None, Form()] = None,
    status: Annotated[str | None, Form()] = None,
    paid_at: Annotated[str | None, Form()] = None,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> OrderRead:
    repository = OrderRepository(session)
    order = await repository.update(
        order_id,
        {
            key: value
            for key, value in {
                "event_id": event_id,
                "amount": amount,
                "status": status,
                "paid_at": paid_at,
            }.items()
            if value is not None
        },
    )
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(
    order_id: int,
    _: object = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> None:
    repository = OrderRepository(session)
    deleted = await repository.delete(order_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
