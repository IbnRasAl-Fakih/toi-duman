import React from "react";

const TESTIMONIALS = [
  {
    quote:
      "Цифрлық шақыру шетелдегі туыстарымыз үшін өте ыңғайлы болды. Ештеңе басып шығарудың қажеті болмады, ал қонақтар интерактивті картаға қатты риза болды.",
    author: "Айжан М., Алматы",
  },
  {
    quote:
      "Біздің той үшін тамаша шешім болды. Қонақтар тізімі сайттағы форма арқылы өздігінен жиналды. Уақытты қатты үнемдеді.",
    author: "Бауыржан С., Астана",
  },
];

function QuoteMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 text-[#e3d2ab]" fill="currentColor" aria-hidden="true">
      <path d="M17.5 10C10.8 11.4 7 16.3 7 23.3c0 4 2.4 6.7 6.2 6.7 3.4 0 5.8-2.3 5.8-5.5 0-3.2-2.2-5.2-5.1-5.2h-.7c.8-2.5 2.9-4.8 5.8-5.9L17.5 10Zm15 0C25.8 11.4 22 16.3 22 23.3c0 4 2.4 6.7 6.2 6.7 3.4 0 5.8-2.3 5.8-5.5 0-3.2-2.2-5.2-5.1-5.2h-.7c.8-2.5 2.9-4.8 5.8-5.9L32.5 10Z" />
    </svg>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <article className="border-l-2 border-[#efe5d4] pl-7">
      <p className="landing-serif text-[1.65rem] italic leading-[1.55] text-[#6d6458]">
        "{quote}"
      </p>
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#6f7077]">— {author}</p>
    </article>
  );
}

export default function LandingTestimonials() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-8 md:px-5 md:pb-24 md:pt-10">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.25fr] lg:items-start">
        <div className="pt-5">
          <QuoteMark />
          <h2 className="landing-serif mt-7 text-[2.55rem] leading-[0.98] tracking-[-0.04em] text-[#2a2b31] md:text-[3.4rem]">
            Біздің
            <br />
            <span className="text-[#a17922] italic">клиенттердің пікірі</span>
          </h2>
        </div>

        <div className="space-y-8">
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.author} {...item} />
          ))}

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[#b9954a] px-6 py-3 text-[0.95rem] font-semibold text-[#9a741d] transition duration-300 hover:-translate-y-0.5 hover:bg-[#fbf7ee]"
          >
            Барлық пікірді көру
          </button>
        </div>
      </div>
    </section>
  );
}
