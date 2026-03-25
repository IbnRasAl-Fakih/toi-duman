import React from "react";
import ChangeOrderStatusModal from "../../components/admin/orders/change-order-status-modal.jsx";
import OrdersEmptyState from "../../components/admin/orders/orders-empty-state.jsx";
import OrdersTable from "../../components/admin/orders/orders-table.jsx";
import AdminShell from "../../components/admin-shell.jsx";

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false);
  const [error, setError] = React.useState("");
  const [pendingStatusChange, setPendingStatusChange] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/v1/orders");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Не удалось загрузить список заказов");
        }

        if (isMounted) {
          setOrders(data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "Неизвестная ошибка");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleStatusChange() {
    if (!pendingStatusChange) {
      return;
    }

    const payload = new FormData();
    payload.append("status", pendingStatusChange.nextStatus);

    try {
      setIsUpdatingStatus(true);
      setError("");

      const response = await fetch(`/api/v1/orders/${pendingStatusChange.order.id}/status`, {
        method: "PATCH",
        body: payload
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Не удалось обновить статус заказа");
      }

      setOrders((current) => current.map((item) => (item.id === pendingStatusChange.order.id ? data : item)));
      setPendingStatusChange(null);
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Не удалось обновить статус заказа");
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  return (
    <>
      <AdminShell
        title="Список заказов"
        description="Раздел для контроля заказов по событиям. Здесь можно быстро увидеть ID заказа, привязанный event, сумму и текущий статус оплаты."
      >
        {isLoading ? (
          <OrdersEmptyState text="Загружаем заказы..." />
        ) : error ? (
          <OrdersEmptyState text={error} tone="error" />
        ) : orders.length === 0 ? (
          <OrdersEmptyState text="Заказов пока нет." />
        ) : (
          <OrdersTable
            orders={orders}
            onRequestStatusChange={(order, nextStatus) => setPendingStatusChange({ order, nextStatus })}
          />
        )}
      </AdminShell>

      <ChangeOrderStatusModal
        order={pendingStatusChange?.order || null}
        nextStatus={pendingStatusChange?.nextStatus || ""}
        isUpdating={isUpdatingStatus}
        onConfirm={handleStatusChange}
        onClose={() => {
          if (!isUpdatingStatus) {
            setPendingStatusChange(null);
          }
        }}
      />
    </>
  );
}
