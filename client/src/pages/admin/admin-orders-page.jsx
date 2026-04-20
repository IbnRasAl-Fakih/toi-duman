import React from "react";
import ChangeOrderStatusModal from "../../components/admin/orders/change-order-status-modal.jsx";
import OrdersEmptyState from "../../components/admin/orders/orders-empty-state.jsx";
import OrdersTable from "../../components/admin/orders/orders-table.jsx";
import AdminShell from "../../components/admin-shell.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false);
  const [error, setError] = React.useState("");
  const [pendingStatusChange, setPendingStatusChange] = React.useState(null);
  const notification = useNotification();

  React.useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/v1/orders");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Тапсырыстар тізімін жүктеу мүмкін болмады");
        }

        if (isMounted) {
          setOrders(data);
        }
      } catch (requestError) {
        if (isMounted) {
          const message = requestError instanceof Error ? requestError.message : "Белгісіз қате";
          setError(message);
          notification.error(message);
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
  }, [notification]);

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
        throw new Error(data.detail || "Тапсырыс күйін жаңарту мүмкін болмады");
      }

      setOrders((current) => current.map((item) => (item.id === pendingStatusChange.order.id ? data : item)));
      setPendingStatusChange(null);
      notification.success(
        pendingStatusChange.nextStatus === "paid" ? "Төлем расталды" : "Тапсырыс күйі жаңартылды"
      );
    } catch (statusError) {
      const message = statusError instanceof Error ? statusError.message : "Тапсырыс күйін жаңарту мүмкін болмады";
      setError(message);
      notification.error(message);
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  return (
    <>
      <AdminShell
        title="Тапсырыстар тізімі"
        description="Бұл бөлімде оқиғаларға қатысты тапсырыстарды бақылап, тапсырыс ID-сын, байланысқан оқиғаны, соманы және төлем күйін көруге болады."
      >
        {isLoading ? (
          <OrdersEmptyState text="Тапсырыстар жүктелуде..." />
        ) : error ? (
          <OrdersEmptyState text={error} tone="error" />
        ) : orders.length === 0 ? (
          <OrdersEmptyState text="Әзірге тапсырыстар жоқ." />
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
