import Heart from "./heart.jsx";

export default function InvitationIntroTemplate1({ template }) {
  return (
    <section className="rounded-[36px] bg-[#78aeca] px-6 py-9 text-center text-white shadow-[0_18px_36px_rgba(91,145,173,0.18)]">
      <div className="flex justify-center">
        <img src="/images/templates/template-1/ornament.svg" alt="" className="w-full max-w-[110px]" />
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">{template.intro.title}</p>
      <p className="mt-5 text-[11px] uppercase tracking-[0.08em] text-white/75">{template.intro.overline}</p>
      <div className="mt-3 font-['Georgia','Times_New_Roman',serif] text-[28px] italic">{template.couple.signature}</div>
      <p className="mx-auto mt-5 max-w-[270px] text-[10px] uppercase leading-5 tracking-[0.04em] text-white/80">{template.intro.subtitle}</p>

      <div className="mt-6 text-[13px] font-semibold uppercase tracking-[0.08em]">{template.venue.title}</div>
      <div className="mt-3 text-[12px]">{template.calendar.fullDateLabel}</div>

      <div className="mx-auto mt-7 max-w-[260px]">
        <div className="grid grid-cols-7 gap-y-2 text-[11px] font-semibold text-white/80">
          {template.calendar.weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-y-2 text-[13px] font-semibold">
          {template.calendar.grid.map((cell, index) => {
            const isActive = cell === template.calendar.day;

            return (
              <span
                key={`${cell ?? "empty"}-${index}`}
                className={`relative mx-auto h-9 w-8 flex items-center justify-center ${
                  isActive ? "text-white" : ""
                }`}
              >
                {isActive ? (
                  <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <Heart className="template1-heart-marker " />
                  </span>
                ) : null}
                <span className={`relative z-[2] ${isActive ? "-translate-y-[3px] text-[12px]" : ""}`}>{cell ?? ""}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-[18px] font-semibold">сағат {template.calendar.time}</div>
      <div className="mt-5 text-[14px]">{template.venue.city}</div>

      <a
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#eff8fb] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5d95b3]"
        href={template.venue.mapUrl}
        target="_blank"
        rel="noreferrer"
      >
        <img src="/images/2gis-icon-logo.svg" alt="" className="h-4 w-4" />
        Карта арқылы ашу
      </a>

      <div className="mt-6 flex justify-center">
        <img src="/images/templates/template-1/ornament.svg" alt="" className="w-full max-w-[110px] rotate-180" />
      </div>

      <div className="mt-7 grid grid-cols-4 gap-2">
        {template.calendar.countdown.map((item) => (
          <div key={item.label}>
            <div className="text-[22px] font-semibold tracking-[0.08em]">{item.value}</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.08em] text-white/80">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
