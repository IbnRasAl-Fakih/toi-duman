import React from "react";
import CheckIcon from "../../assets/check.jsx";
import RequestIcon from "../../assets/request.jsx";
import SettingsIcon from "../../assets/settings.jsx";
import ShareIcon from "../../assets/share.jsx";

const STEP_ITEMS = [
  {
    title: "Заявка",
    description: "Выберите шаблон и заполните анкету мероприятия.",
    icon: "request",
  },
  {
    title: "Настройка",
    description: "Мы адаптируем дизайн и добавим ваш контент.",
    icon: "settings",
  },
  {
    title: "Рассылка",
    description: "Получите ссылку для мгновенной отправки гостям.",
    icon: "share",
  },
  {
    title: "Контроль",
    description: "Отслеживайте подтверждения (RSVP) в реальном времени.",
    icon: "check",
  },
];

function StepIcon({ type }) {
  if (type === "request") {
    return <RequestIcon className="h-7 w-7" />;
  }

  if (type === "settings") {
    return <SettingsIcon className="h-7 w-7" />;
  }

  if (type === "share") {
    return <ShareIcon className="h-7 w-7" />;
  }

  return <CheckIcon className="h-7 w-7" />;
}

function StepCard({ title, description, icon }) {
  return (
    <article className="relative text-center">
      <div className="mx-auto flex h-[78px] w-[78px] items-center justify-center rounded-full border border-[#efe7da] bg-white text-[#8f6b1f] shadow-[0_10px_24px_rgba(31,34,43,0.06)]">
        <StepIcon type={icon} />
      </div>
      <h3 className="mt-7 text-[1.7rem] font-semibold leading-none tracking-[-0.03em] text-[#2a2b31]">{title}</h3>
      <p className="mx-auto mt-4 max-w-[17rem] text-[0.98rem] leading-7 text-[#7f8086]">{description}</p>
    </article>
  );
}

export default function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-6 md:px-5 md:pb-24 md:pt-8">
      <div className="mx-auto max-w-[780px] text-center">
        <h2 className="font-['Georgia','Times_New_Roman',serif] text-[2.55rem] leading-[0.96] tracking-[-0.04em] text-[#28292e] md:text-[3.4rem]">
          Путь к совершенству
        </h2>
        <p className="mx-auto mt-4 max-w-[36rem] text-[1rem] leading-8 text-[#8a8b91]">
          Четыре простых шага к запуску вашего праздничного сайта.
        </p>
      </div>

      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-[39px] hidden h-px bg-[#efe9dd] lg:block" />
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {STEP_ITEMS.map((item) => (
            <StepCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
