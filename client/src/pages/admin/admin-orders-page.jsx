import React from "react";
import AdminShell from "../../components/admin-shell.jsx";

function formatDateTime(value) {
  return new Date(value).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

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

  return (
    <AdminShell
      title="Список заказов"
      description="Раздел для контроля заказов по событиям. Здесь можно быстро увидеть ID заказа, привязанный event, сумму и текущий статус оплаты."
    >
      {isLoading ? (
        <EmptyState text="Загружаем заказы..." />
      ) : error ? (
        <EmptyState text={error} tone="error" />
      ) : orders.length === 0 ? (
        <EmptyState text="Заказов пока нет." />
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-black/10 bg-[#fcfaf7]">
          <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_1fr] gap-4 border-b border-black/10 px-5 py-4 text-xs uppercase tracking-[0.24em] text-black/40">
            <span>Заказ</span>
            <span>Event ID</span>
            <span>Сумма</span>
            <span>Статус</span>
          </div>

          <div className="divide-y divide-black/8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-1 gap-3 px-5 py-4 text-sm text-black/70 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]"
              >
                <div>
                  <p className="font-medium text-[#1f1a17]">{order.id}</p>
                  <p className="mt-1 text-xs text-black/45">{formatDateTime(order.created_at)}</p>
                </div>
                <div>{order.event_id}</div>
                <div>{order.amount}</div>
                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                      order.status === "paid"
                        ? "bg-[#0d7a3b]/10 text-[#0d7a3b]"
                        : "bg-[#7f1118]/10 text-[#7f1118]"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function EmptyState({ text, tone = "default" }) {
  return (
    <div
      className={`rounded-[28px] border px-5 py-10 text-center text-sm ${
        tone === "error" ? "border-[#b42318]/15 bg-[#fff4f2] text-[#b42318]" : "border-black/10 bg-[#fcfaf7] text-black/55"
      }`}
    >
      {text}
    </div>
  );
}
