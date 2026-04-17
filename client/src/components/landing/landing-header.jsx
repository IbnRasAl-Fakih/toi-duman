import React from "react";

const WHATSAPP_PHONE = process.env.REACT_APP_WHATSAPP_PHONE || "";

const NAV_ITEMS = [
  { href: "/#templates", label: "Үлгілер" },
  { href: "/#how-it-works", label: "Қалай жұмыс істейді" },
  { href: "/#pricing", label: "Бағалар" },
  { href: "/#faq", label: "FAQ" },
];

function buildWhatsappHref() {
  if (!WHATSAPP_PHONE) {
    return "";
  }

  const message = encodeURIComponent("Сәлеметсіз бе! Цифрлық шақырулар туралы толығырақ білгім келеді.");
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
}

export default function LandingHeader() {
  const whatsappHref = buildWhatsappHref();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="landing-header-shell pointer-events-auto bg-[rgba(255,255,255,0.96)] shadow-[0_10px_26px_rgba(26,31,44,0.06)] backdrop-blur-md">
        <div className="relative mx-auto max-w-[1240px] px-4 py-3.5 text-[#6d6d72] md:px-5 md:py-4">
          <div className="landing-header-glow absolute inset-x-[22%] bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(188,150,73,0.08),rgba(188,150,73,0.45),rgba(188,150,73,0.08),transparent)]" />

          <div className="flex items-center justify-between gap-6">
            <a
              href="/"
              className="shrink-0 font-['Georgia','Times_New_Roman',serif] text-[1.05rem] font-semibold tracking-[-0.03em] text-[#9a741d] transition duration-300 hover:text-[#7f5e14] md:text-[1.2rem]"
            >
              priglasitelnoe.com
            </a>

            <div className="ml-auto flex items-center gap-4 md:gap-5">
              <nav className="hidden items-center gap-5 text-[0.88rem] font-medium text-[#7a7a81] lg:flex">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative transition duration-300 hover:text-[#23242a]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <a
                href={whatsappHref || "#contacts"}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-full bg-[#9a741d] px-5 py-2 text-[0.84rem] font-semibold text-white shadow-[0_10px_20px_rgba(154,116,29,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#846216] md:px-6 md:text-[0.9rem]"
              >
                Тапсырыс беру
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
