export default function InvitationCalendarTemplate1({ template }) {
  return (
    <section className="px-5 pb-8 text-center md:px-7 md:pb-10 lg:px-[9vw] lg:py-[88px]">
      <div className="text-[1.125rem] uppercase tracking-[0.34em] md:text-[1.25rem] md:tracking-[0.45em] lg:text-[1.5rem]">
        {template.calendar.month}
      </div>
      <div className="mt-4 flex justify-center gap-0.5 md:mt-5">
        {template.calendar.dateRow.map((item) => (
          <span
            key={item}
            className={`relative flex h-14 w-14 items-center justify-center text-[1.75rem] md:h-16 md:w-16 md:text-[2rem] ${
              item === template.calendar.day ? "text-[#7f1118] text-[2.75rem] md:text-[3.25rem]" : "text-[#d2b9af]"
            }`}
          >
            {item === template.calendar.day ? (
              <span className="absolute inset-0 rounded-full border-2 border-[#7f1118]" />
            ) : null}
            {item}
          </span>
        ))}
      </div>
      <div className="mt-3 text-base tracking-[0.24em] text-[#7f1118]/60 md:mt-4 md:text-lg">в {template.calendar.time}</div>
      <div className="mt-3 text-[4.25rem] leading-none md:mt-4 md:text-[5.125rem] lg:text-[6.5rem]">
        {template.calendar.year}
      </div>
      <div className="mt-5 grid gap-2">
        {template.calendar.weekDays.map((day) => (
          <div
            key={day}
            className={`mx-auto w-full max-w-[270px] px-4 py-2 text-center text-[0.95rem] uppercase tracking-[0.2em] md:max-w-[320px] md:text-lg md:tracking-[0.35em] lg:max-w-[520px] ${
              day === template.calendar.weekday ? "rounded-[18px] border-2 border-[#7f1118] text-[#7f1118]" : "text-[#7f1118]/80"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </section>
  );
}
