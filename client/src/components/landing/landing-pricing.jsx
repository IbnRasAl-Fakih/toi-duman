import React from "react";

const WHATSAPP_PHONE = process.env.REACT_APP_WHATSAPP_PHONE || "";

const PRICING_ITEMS = [
  {
    name: "Стандартный сайт",
    price: "7 000",
    suffix: "₸",
    features: ["Готовый шаблон", "Интерактивная карта", "Таймер обратного отсчета", "Бессрочный доступ по ссылке", "Сбор ответов гостей (RSVP)", "Личный кабинет со списком гостей"],
    cta: "Выбрать план",
    featured: false,
  },
  {
    name: "Продвинутый RSVP",
    price: "10 000",
    suffix: "₸",
    features: [
      "Продвинутый RSVP",
      "Музыкальное сопровождение",
    ],
    cta: "Выбрать план",
    featured: true,
    badge: "Популярный",
  },
  {
    name: "Индивидуальный",
    price: "15 000",
    suffix: "₸",
    features: ["Дизайн с нуля (Custom)", "Уникальная анимация", "Мультиязычность (KZ/RU/EN)"],
    cta: "Консультация",
    featured: false,
  },
];

function buildWhatsappHref(planName) {
  if (!WHATSAPP_PHONE) {
    return "";
  }

  const message = encodeURIComponent(`Здравствуйте! Хочу узнать подробнее о тарифе "${planName}".`);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
}

function CheckMark() {
  return <span className="mt-1 text-[#a17b22]">✓</span>;
}

function PricingCard({ name, price, suffix, features, cta, featured = false, badge }) {
  const whatsappHref = buildWhatsappHref(name);

  return (
    <article
      className={`relative flex h-full flex-col rounded-[24px] bg-white px-7 py-8 shadow-[0_16px_44px_rgba(26,31,44,0.05)] ${
        featured ? "border-2 border-[#cda24b] shadow-[0_24px_54px_rgba(161,123,34,0.16)]" : "border border-[#f0ece4]"
      }`}
    >
      {badge ? (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cda24b] px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white">
          {badge}
        </div>
      ) : null}

      <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[#73747a]">{name}</p>
      <div className="mt-4 flex items-end gap-1 font-['Georgia','Times_New_Roman',serif] text-[#23242a]">
        <span className="text-[2.8rem] font-semibold leading-none tracking-[-0.05em]">{price}</span>
        <span className="pb-1 text-[1.35rem]">{suffix}</span>
      </div>

      <ul className="mt-7 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[0.95rem] leading-7 text-[#66686f]">
            <CheckMark />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={whatsappHref || "#contacts"}
        target={whatsappHref ? "_blank" : undefined}
        rel={whatsappHref ? "noreferrer" : undefined}
        className={`mt-auto inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-[0.98rem] font-semibold transition duration-300 hover:-translate-y-0.5 ${
          featured
            ? "bg-[#9a741d] text-white shadow-[0_12px_24px_rgba(154,116,29,0.22)] hover:bg-[#825f16]"
            : "border border-[#b9954a] text-[#9a741d] hover:bg-[#fbf7ee]"
        }`}
      >
        {cta}
      </a>
    </article>
  );
}

export default function LandingPricing() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-8 md:px-5 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-[700px] text-center">
        <h2 className="font-['Georgia','Times_New_Roman',serif] text-[2.55rem] leading-[0.96] tracking-[-0.04em] text-[#28292e] md:text-[3.4rem]">
          Тарифные планы
        </h2>
        <p className="mx-auto mt-4 max-w-[31rem] text-[1rem] leading-8 text-[#8a8b91]">
          Выберите формат сайта для вашего торжества.
        </p>
      </div>

      <div className="mt-12 grid gap-5 xl:grid-cols-3 xl:items-stretch">
        {PRICING_ITEMS.map((item) => (
          <PricingCard key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
}
