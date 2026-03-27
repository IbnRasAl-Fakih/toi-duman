export default function InvitationRsvpTemplate1({
  template,
  guestName,
  onGuestNameChange,
  selectedStatus,
  onSelectStatus,
  onSubmit,
  isSubmitting,
  responseOptions
}) {
  const isReadyToSubmit = Boolean(guestName.trim() && selectedStatus && !isSubmitting);

  return (
    <section className="px-5 pb-14 pt-10 text-center md:px-7 md:pb-16 md:pt-12 lg:px-[9vw] lg:py-[88px]">
      <img
        src="/images/templates/template-1/roses-top.svg"
        alt=""
        className="mx-auto w-full max-w-[320px] md:max-w-[360px]"
      />
      <h3 className="mx-auto mt-7 max-w-[290px] text-[1.375rem] uppercase leading-[1.6] italic md:max-w-[360px] md:text-2xl lg:max-w-[760px] lg:text-[1.75rem]">
        {template.rsvp.title}
      </h3>

      <div className="mx-auto mt-7 max-w-[310px] md:max-w-[360px] lg:max-w-[760px]">
        <label className="block text-left">
          <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-[#7f1118]/60">ФИО</span>
          <input
            type="text"
            value={guestName}
            onChange={(event) => onGuestNameChange(event.target.value)}
            placeholder="Введите ваше ФИО"
            className="w-full rounded-[24px] border border-[#7f1118]/25 bg-white/60 px-5 py-4 text-lg text-[#7f1118] outline-none transition placeholder:text-[#7f1118]/35 focus:border-[#7f1118] focus:bg-white"
          />
        </label>
      </div>

      <div className="mx-auto mt-5 grid max-w-[310px] gap-3.5 md:max-w-[360px] lg:max-w-[760px]">
        {responseOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`flex w-full items-center gap-3.5 rounded-[24px] border px-[18px] py-[15px] text-left md:px-[22px] md:py-[18px] ${
              selectedStatus === option.value ? "border-[#7f1118] bg-[#7f1118]/5" : "border-[#7f1118]/25 bg-white/35"
            }`}
            onClick={() => onSelectStatus(option.value)}
          >
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-[#7f1118]">
              {selectedStatus === option.value ? <span className="h-3 w-3 rounded-full bg-[#7f1118]" /> : null}
            </span>
            <span className="text-lg md:text-xl">{option.label}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={`mt-5 inline-flex items-center justify-center rounded-full px-10 py-[15px] text-base uppercase tracking-[0.12em] text-white shadow-[0_18px_35px_rgba(127,17,24,0.3)] md:px-[54px] md:py-[18px] md:text-lg ${
          isReadyToSubmit ? "bg-[#7f1118]" : "cursor-default bg-[#7f1118]/45"
        }`}
        onClick={onSubmit}
      >
        {isSubmitting ? "Отправка..." : "Ответить"}
      </button>

      <div className="mt-16 font-['Palatino_Linotype','Book_Antiqua','Palatino',serif] text-[1.625rem] italic md:mt-[70px] md:text-[1.75rem]">
        С уважением:
      </div>
      <div
        className="mx-auto mt-4 h-16 w-40 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/icons/templates/template-1/line-heart.svg')" }}
      />
      <div className="mt-4 text-lg font-semibold uppercase tracking-[0.12em] md:text-[1.375rem]">
        {template.couple.signature}
      </div>
    </section>
  );
}