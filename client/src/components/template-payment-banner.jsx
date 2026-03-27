import { Link } from "react-router-dom";

function formatAmount(value) {
  const numericValue = Number(value) || 0;

  return `${Math.trunc(numericValue).toLocaleString("ru-RU")} ₸`;
}

export default function TemplatePaymentBanner({
  order,
  backgroundClass = "bg-[rgba(20,18,18,0.82)]",
  buttonClass = "bg-[#7f1118] hover:bg-[#5d0b11]",
  infoCardClass = "border-white/10 bg-white/6 text-[#f8f2ec]/88",
  infoLabelClass = "text-[#f8f2ec]/58",
  infoValueClass = "text-[#f8f2ec]"
}) {
  const paymentPath = order?.id ? `/payment/${order.id}` : "/payment";

  return (
    <div
      className={`sticky inset-x-0 top-0 z-50 border-b border-black/10 text-[#f8f2ec] shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl ${backgroundClass}`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#f8f2ec]/60">Template Locked</p>
          <h2 className="mt-1 font-['Georgia','Times_New_Roman',serif] text-xl leading-tight md:text-2xl">
            Приглашение пока не оплачено
          </h2>
          <p className="mt-1 text-sm leading-5 text-[#f8f2ec]/78">
            После подтверждения оплаты приглашение станет доступно по этому адресу.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:min-w-[300px]">
          {order ? (
            <div className={`grid gap-1.5 rounded-[18px] border px-4 py-2.5 text-sm backdrop-blur-md ${infoCardClass}`}>
              <InfoRow label="Заказ" value={order.id} labelClass={infoLabelClass} valueClass={infoValueClass} />
              <InfoRow label="Сумма" value={formatAmount(order.amount)} labelClass={infoLabelClass} valueClass={infoValueClass} />
            </div>
          ) : null}

          <Link
            to={paymentPath}
            className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(127,17,24,0.22)] transition ${buttonClass}`}
          >
            Перейти к оплате
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, labelClass, valueClass }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-1.5 last:border-b-0 last:pb-0">
      <span className={`text-[10px] uppercase tracking-[0.22em] ${labelClass}`}>{label}</span>
      <span className={`text-right text-sm ${valueClass}`}>{value || "—"}</span>
    </div>
  );
}
