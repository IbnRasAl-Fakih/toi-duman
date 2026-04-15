import React from "react";

const TEMPLATE_ITEMS = [
  {
    title: "Қою минимализм",
    image: "/images/image_2026-04-14_23-11-04.png",
  },
  {
    title: "Заманауи типографика",
    image: "/images/image_2026-04-14_23-14-17.png",
  },
  {
    title: "Атмосфералы классика",
    image: "/images/image_2026-04-14_23-16-22.png",
  },
  {
    title: "Премиум жарық",
    image: "/images/image_2026-04-14_23-16-54.png",
  },
];

function TemplateCard({ title, image, className = "" }) {
  return (
    <article className={className}>
      <div className="overflow-hidden rounded-[22px] bg-[#17181d] shadow-[0_22px_48px_rgba(20,23,31,0.12)]">
        <img src={image} alt={title} className="block aspect-[4/5.4] w-full object-cover" />
      </div>
    </article>
  );
}

export default function LandingTemplates() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-6 md:px-5 md:pb-24 md:pt-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#b28a2d]">Біздің үлгілер</p>
          <h2 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-[2.55rem] leading-[0.94] tracking-[-0.04em] text-[#27282d] md:text-[3.4rem]">
            Әсемдік галереясы
          </h2>
        </div>

        <div className="flex flex-col items-center gap-5 pt-2 lg:items-end">

          <a
            href="#templates"
            className="inline-flex items-center gap-3 text-base font-semibold text-[#a27b24] transition duration-300 hover:text-[#87651b]"
          >
            <span>Барлық жұмыстарды көру</span>
            <span aria-hidden="true" className="text-lg leading-none">
              →
            </span>
          </a>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TemplateCard title={TEMPLATE_ITEMS[0].title} image={TEMPLATE_ITEMS[0].image} className="xl:pt-0" />
        <TemplateCard title={TEMPLATE_ITEMS[1].title} image={TEMPLATE_ITEMS[1].image} className="xl:pt-10" />
        <TemplateCard title={TEMPLATE_ITEMS[2].title} image={TEMPLATE_ITEMS[2].image} className="xl:pt-0" />
        <TemplateCard title={TEMPLATE_ITEMS[3].title} image={TEMPLATE_ITEMS[3].image} className="xl:pt-10" />
      </div>
    </section>
  );
}
