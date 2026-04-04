function IntroDivider({ flip = false }) {
  return (
    <svg
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      className={`block h-[42px] w-full ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        fill="#ffffff"
        d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z"
      />
    </svg>
  );
}

export default function InvitationIntroTemplate3({ template }) {
  return (
    <section className="relative z-10 -mt-[18px] overflow-visible text-[#111111]">
      <div className="absolute inset-x-0 top-0 z-20 -translate-y-[41px]">
        <IntroDivider flip />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-[41px]">
        <IntroDivider />
      </div>

      <div className="relative z-10 bg-white px-4">
        <div className="grid grid-cols-4 gap-2">
          {template.countdown.map((item) => (
            <div
              key={item.label}
              className="rounded-full bg-[#9d9286] px-1 py-3 text-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
            >
              <div className="text-[1.1rem] font-bold leading-none">{item.value}</div>
              <div className="mt-1 font-['Segoe_UI','Arial',sans-serif] text-[0.68rem] font-semibold uppercase leading-none">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pt-9 text-center">
          <h2 className="font-['Times_New_Roman','Cambria',serif] text-[1.95rem] italic font-bold leading-none">
            {template.intro.title}
          </h2>
          <p className="mx-auto mt-5 font-['Segoe_UI','Arial',sans-serif] text-[1rem] leading-[1.55] text-black/42">
            {template.intro.description}
          </p>
        </div>
      </div>
    </section>
  );
}
