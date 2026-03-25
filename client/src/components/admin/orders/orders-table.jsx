import OrderRow from "./order-row.jsx";

export default function OrdersTable({ orders, onRequestStatusChange }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-[#fcfaf7]">
      <div className="grid grid-cols-[1.4fr_0.7fr_0.8fr_1fr_1fr_1.1fr] gap-4 border-b border-black/10 px-5 py-4 text-xs uppercase tracking-[0.24em] text-black/40">
        <span>Заказ</span>
        <span>Event ID</span>
        <span>Сумма</span>
        <span>Статус</span>
        <span>Paid At</span>
        <span>Действие</span>
      </div>

      <div className="divide-y divide-black/8">
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} onRequestStatusChange={onRequestStatusChange} />
        ))}
      </div>
    </div>
  );
}
