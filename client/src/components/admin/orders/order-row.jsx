function formatDateTime(value) {
  return new Date(value).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatAmount(value) {
  const numericValue = Number(value) || 0;

  return `${Math.trunc(numericValue).toLocaleString("ru-RU")} ₸`;
}

export default function OrderRow({ order, onRequestStatusChange }) {
  const nextStatus = order.status === "paid" ? "unpaid" : "paid";

  return (
    <div className="grid grid-cols-1 gap-3 px-5 py-4 text-sm text-black/70 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr_1.1fr]">
      <div>
        <p className="font-medium text-[#1f1a17]">{order.id}</p>
        <p className="mt-1 text-xs text-black/45">{formatDateTime(order.created_at)}</p>
      </div>
      <div>{order.event_id}</div>
      <div>{formatAmount(order.amount)}</div>
      <div>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
            order.status === "paid" ? "bg-[#0d7a3b]/10 text-[#0d7a3b]" : "bg-[#7f1118]/10 text-[#7f1118]"
          }`}
        >
          {order.status}
        </span>
      </div>
      <div>
        <button
          type="button"
          onClick={() => onRequestStatusChange(order, nextStatus)}
          className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-black/60 transition hover:border-[#7f1118]/25 hover:text-[#7f1118]"
        >
          {nextStatus === "paid" ? "Подтвердить оплату" : "Отменить оплату"}
        </button>
      </div>
    </div>
  );
}
