export default function ChangeOrderStatusModal({ order, nextStatus, isUpdating, onConfirm, onClose }) {
  if (!order || !nextStatus) {
    return null;
  }

  const actionLabel = nextStatus === "paid" ? "төлемді растау" : "төлемді болдырмау";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Растау терезесін жабу"
        onClick={isUpdating ? undefined : onClose}
        className="absolute inset-0 bg-[rgba(22,18,18,0.52)] backdrop-blur-sm"
      />

      <div className="relative w-full max-w-xl rounded-[32px] border border-black/10 bg-[#fffaf6] p-6 shadow-[0_28px_90px_rgba(31,24,21,0.18)] md:p-8">
        <p className="text-[11px] uppercase tracking-[0.34em] text-[#7f1118]/60">Күйді өзгерту</p>
        <h2 className="mt-4 font-['Georgia','Times_New_Roman',serif] text-4xl leading-none text-[#7f1118]">
          Тапсырыс күйін өзгерту керек пе?
        </h2>
        <p className="mt-5 text-sm leading-7 text-black/65 md:text-base">
          Сіз <span className="font-medium text-[#1f1a17]">{order.id}</span> тапсырысы үшін {actionLabel} әрекетін жасамақсыз.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-xs uppercase tracking-[0.18em] text-black/60 transition hover:border-[#7f1118]/25 hover:text-[#7f1118] disabled:cursor-default disabled:opacity-50"
          >
            Болдырмау
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isUpdating}
            className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.18em] text-white transition ${
              isUpdating ? "cursor-default bg-[#7f1118]/50" : "bg-[#7f1118] hover:bg-[#5d0b11]"
            }`}
          >
            {isUpdating ? "Сақталуда..." : "Растау"}
          </button>
        </div>
      </div>
    </div>
  );
}
