import { Link } from "react-router-dom";

export default function TemplatePaymentBanner({ order }) {
  const paymentPath = order?.id ? `/payment/${order.id}` : "/payment";

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[rgba(20,18,18,0.72)] text-[#f8f2ec] shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[#f8f2ec]/60">Template Locked</p>
          <h2 className="mt-2 font-['Georgia','Times_New_Roman',serif] text-2xl leading-none md:text-3xl">
            Template пока не оплачен
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#f8f2ec]/78 md:text-base">
            После подтверждения оплаты приглашение станет доступно по этому адресу. Пока шаблон закрыт для просмотра.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:min-w-[320px]">
          {order ? (
            <div className="grid gap-2 rounded-[20px] border border-white/10 bg-white/6 px-4 py-3 text-sm text-[#f8f2ec]/88 backdrop-blur-md">
              <InfoRow label="Заказ" value={order.id} />
              <InfoRow label="Статус" value={order.status} />
              <InfoRow label="Сумма" value={order.amount} />
            </div>
          ) : null}

          <Link
            to={paymentPath}
            className="inline-flex items-center justify-center rounded-full bg-[#7f1118] px-6 py-3 text-xs uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_rgba(127,17,24,0.26)] transition hover:bg-[#5d0b11]"
          >
            Перейти к оплате
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
      <span className="text-xs uppercase tracking-[0.24em] text-[#f8f2ec]/58">{label}</span>
      <span className="text-right text-sm text-[#f8f2ec]">{value || "—"}</span>
    </div>
  );
}
