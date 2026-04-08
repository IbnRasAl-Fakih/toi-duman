import React, { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Как быстро будет готов наш сайт?",
    answer:
      "Настройка сайта на основе шаблона занимает от 24 до 48 часов после предоставления всех данных. Индивидуальные проекты занимают до 7 рабочих дней.",
  },
  {
    question: "Как я получу список подтвержденных гостей?",
    answer:
      "Все ответы гостей собираются в одном месте. Вы получаете удобный список подтверждений, отказов и дополнительных комментариев в цифровом формате.",
  },
  {
    question: "Будет ли сайт работать после мероприятия?",
    answer:
      "Да. Сайт продолжит работать по ссылке и после праздника, если вы захотите сохранить его как цифровую память о событии.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <article className="rounded-[20px] border border-[#f1ede5] bg-white shadow-[0_8px_24px_rgba(26,31,44,0.03)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-7"
      >
        <span className="text-[1.05rem] font-semibold leading-7 text-[#2c2d32] md:text-[1.15rem]">{item.question}</span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-xl font-semibold text-[#9a741d] transition duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          ˅
        </span>
      </button>

      {isOpen ? (
        <div className="px-6 pb-6 text-[0.95rem] leading-7 text-[#7c7d84] md:px-7 md:pb-6">
          <p className="max-w-[56rem]">{item.answer}</p>
        </div>
      ) : null}
    </article>
  );
}

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-8 md:px-5 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-[980px]">
        <h2 className="text-center font-['Georgia','Times_New_Roman',serif] text-[2.55rem] leading-[0.96] tracking-[-0.04em] text-[#28292e] md:text-[3.4rem]">
          Часто задаваемые вопросы
        </h2>

        <div className="mt-12 space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
