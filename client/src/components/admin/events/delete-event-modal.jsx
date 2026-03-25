export default function DeleteEventModal({ event, isDeleting, onConfirm, onClose }) {
  if (!event) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Закрыть окно подтверждения"
        onClick={isDeleting ? undefined : onClose}
        className="absolute inset-0 bg-[rgba(22,18,18,0.52)] backdrop-blur-sm"
      />

      <div className="relative w-full max-w-xl rounded-[32px] border border-black/10 bg-[#fffaf6] p-6 shadow-[0_28px_90px_rgba(31,24,21,0.18)] md:p-8">
        <p className="text-[11px] uppercase tracking-[0.34em] text-[#b42318]/60">Delete Event</p>
        <h2 className="mt-4 font-['Georgia','Times_New_Roman',serif] text-4xl leading-none text-[#7f1118]">
          Удалить событие?
        </h2>
        <p className="mt-5 text-sm leading-7 text-black/65 md:text-base">
          Будут удалены запись события <span className="font-medium text-[#1f1a17]">{event.slug}</span>, связанный заказ
          и обложка из Cloudflare.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-xs uppercase tracking-[0.18em] text-black/60 transition hover:border-[#7f1118]/25 hover:text-[#7f1118] disabled:cursor-default disabled:opacity-50"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.18em] text-white transition ${
              isDeleting ? "cursor-default bg-[#b42318]/50" : "bg-[#b42318] hover:bg-[#8f1d15]"
            }`}
          >
            {isDeleting ? "Удаление..." : "Подтвердить удаление"}
          </button>
        </div>
      </div>
    </div>
  );
}
