import React from "react";
import WhatsappIcon from "../../assets/whatsapp.jsx";

const WHATSAPP_PHONE = process.env.REACT_APP_WHATSAPP_PHONE || "";

function buildWhatsappHref() {
  if (!WHATSAPP_PHONE) {
    return "";
  }

  const message = encodeURIComponent("Здравствуйте! Хочу узнать подробнее о цифровых приглашениях.");
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
}

export default function LandingHero() {
  const whatsappHref = buildWhatsappHref();

  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-16 pt-28 md:px-5 md:pb-20 md:pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(390px,590px)] lg:gap-8">
        <div className="max-w-[31rem]">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#b28a2d]">
            Цифровая элегантность
          </p>

          <h1 className="mt-6 font-['Georgia','Times_New_Roman',serif] text-[2.95rem] leading-[0.9] tracking-[-0.04em] text-[#2a2a2f] md:text-[4rem]">
            Ваше идеальное
            <br />
            приглашение в
            <br />
            <span className="text-[#a17922] italic">формате веб-сайта</span>
          </h1>

          <p className="mt-6 max-w-[27rem] text-[1rem] leading-7 text-[#7e7f84]">
            Гармоничное сочетание казахских традиций с современными технологиями. Создайте стильный
            интерактивный сайт для вашего торжества за считанные минуты.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#templates"
              className="inline-flex items-center justify-center rounded-full bg-[#a27b24] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(162,123,36,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#8b691d]"
            >
              Выбрать дизайн
            </a>

            <a
              href={whatsappHref || "#contacts"}
              target={whatsappHref ? "_blank" : undefined}
              rel={whatsappHref ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cfe8d8] bg-[#effaf3] px-6 py-3 text-sm font-semibold text-[#1f8c4d] transition duration-300 hover:-translate-y-0.5 hover:border-[#b7ddc5] hover:bg-[#e4f7eb] hover:text-[#187640]"
            >
              <WhatsappIcon className="h-4 w-4" />
              <span>Написать в Whatsapp</span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[580px]">
          <div className="relative ml-auto w-[88%] origin-bottom-left rotate-[1.8deg]">
            <div className="absolute inset-x-[8%] bottom-[-4%] h-[14%] rounded-full bg-[radial-gradient(circle,rgba(26,31,44,0.14),transparent_68%)] blur-2xl" />
            <img
              src="/images/hero.jpg"
              alt="Превью цифрового приглашения"
              className="relative z-10 block w-full rounded-[30px] object-cover shadow-[0_30px_80px_rgba(26,31,44,0.18)]"
            />
          </div>

          <div className="absolute bottom-[5%] left-[2%] z-20 max-w-[12rem] rounded-[18px] bg-white px-4 py-3.5 shadow-[0_18px_40px_rgba(26,31,44,0.14)]">
            <p className="font-['Georgia','Times_New_Roman',serif] text-base italic leading-7 text-[#a17922]">
              "Удобно, красиво и очень современно."
            </p>
            <p className="mt-2 text-xs font-medium text-[#9a9ba1]">Современный сайт для вашего торжества</p>
          </div>
        </div>
      </div>
    </section>
  );
}
