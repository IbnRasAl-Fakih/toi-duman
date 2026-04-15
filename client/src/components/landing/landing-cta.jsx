import React from "react";

const WHATSAPP_PHONE = process.env.REACT_APP_WHATSAPP_PHONE || "";

function buildWhatsappHref() {
  if (!WHATSAPP_PHONE) {
    return "";
  }

  const message = encodeURIComponent("Сәлеметсіз бе! Өзімнің сайт-шақыруымды жасағым келеді.");
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
}

export default function LandingCta() {
  const whatsappHref = buildWhatsappHref();

  return (
    <section className="relative mx-auto w-full max-w-[1240px] overflow-hidden px-4 pb-16 pt-10 md:px-5 md:pb-20 md:pt-12">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(243,239,232,0.82),rgba(243,239,232,0.34)_48%,transparent_72%)]" />
      <div className="absolute left-1/2 top-8 h-[460px] w-[460px] -translate-x-1/2 opacity-60">
        <div className="absolute left-1/2 top-0 h-[265px] w-[135px] -translate-x-1/2 rounded-t-[120px] bg-[#faf8f3]" />
        <div className="absolute bottom-0 left-[24px] h-[255px] w-[195px] rotate-[14deg] rounded-[220px_220px_0_220px] bg-[#faf8f3]" />
        <div className="absolute bottom-0 right-[24px] h-[255px] w-[195px] -rotate-[14deg] rounded-[220px_220px_220px_0] bg-[#faf8f3]" />
      </div>

      <div className="relative mx-auto flex max-w-[900px] flex-col items-center text-center">
        <h2 className="font-['Georgia','Times_New_Roman',serif] text-[3.4rem] leading-[0.94] tracking-[-0.05em] text-[#232429] md:text-[4.7rem]">
          Мерекені
          <br />
          <span className="text-[#a17922] italic">бүгін бастаңыз</span>
        </h2>

        <p className="mt-7 max-w-[36rem] text-[1.2rem] leading-9 text-[#7a7c82]">
          Қонақтарыңызды іс-шара басталмай тұрып-ақ таңғалдыратын цифрлық туынды жасаңыз.
        </p>

        <a
          href={whatsappHref || "#contacts"}
          target={whatsappHref ? "_blank" : undefined}
          rel={whatsappHref ? "noreferrer" : undefined}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#b58b31] px-9 py-4 text-[1.3rem] font-semibold text-white shadow-[0_18px_36px_rgba(181,139,49,0.26)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9b7424]"
        >
          Өз сайтыңызды жасау
        </a>
      </div>
    </section>
  );
}
