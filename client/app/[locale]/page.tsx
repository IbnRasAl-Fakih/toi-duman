import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const containerClass = "mx-auto w-[min(calc(100%-32px),1180px)]";
const eyebrowClass = "mb-3 text-[0.92rem] uppercase tracking-[0.14em] text-[#9a6f43]";
const buttonClass =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-center font-sans text-[0.95rem] font-semibold transition duration-300";
const solidButtonClass = `${buttonClass} bg-[#b78654] text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] hover:scale-105 hover:brightness-105`;
const ghostButtonClass = `${buttonClass} border border-[rgba(116,93,72,0.12)] bg-[rgba(255,255,255,0.72)] text-[#2d2621] shadow-[0_8px_24px_rgba(95,72,50,0.06)] hover:-translate-y-0.5`;
const glassCardClass =
  "rounded-[32px] border border-white/70 bg-white/78 shadow-[0_24px_80px_rgba(123,92,60,0.12)] backdrop-blur-[12px]";

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale).home;

  return (
    <div>
      <section className="px-0 pb-8 pt-14" id="top">
        <div className={`${containerClass} grid items-center gap-7 lg:grid-cols-[1.2fr_0.8fr]`}>
          <div>
            <p className={eyebrowClass}>{dictionary.eyebrow}</p>
            <h1 className="m-0 text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.98]">
              {dictionary.title}
            </h1>
            <p className="mt-4 text-[1.05rem] leading-[1.8] text-[#72675d]">
              {dictionary.text}
            </p>

            <div className="mt-6 flex flex-wrap gap-3.5">
              <a className={solidButtonClass} href="#packages">
                {dictionary.choosePlan}
              </a>
              <a className={ghostButtonClass} href="#features">
                {dictionary.viewFeatures}
              </a>
            </div>

            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {dictionary.features.map((feature) => (
                <li
                  className="list-none rounded-full border border-[rgba(116,93,72,0.08)] bg-white/70 px-4 py-3 text-center font-sans text-[0.96rem] font-semibold text-[#72675d]"
                  key={feature}
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${glassCardClass} p-8`}>
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-[rgba(183,134,84,0.1)] px-3 py-1 font-sans text-[0.9rem] font-semibold text-[#9a6f43]">
                {dictionary.sampleBadge}
              </span>
              <span className="rounded-full bg-[rgba(183,134,84,0.1)] px-3 py-1 font-sans text-[0.9rem] font-semibold text-[#9a6f43]">
                18:00
              </span>
            </div>
            <h2 className="mt-6 text-[clamp(2rem,3vw,2.8rem)] leading-[1.02]">
              Ayana & Nursultan
            </h2>
            <p className="text-[#72675d]">{dictionary.sampleDate}</p>
            <div className="mt-5 grid gap-3 rounded-[28px] bg-[rgba(255,255,255,0.54)] p-5">
              <div className="h-3 w-full rounded-full bg-[rgba(183,134,84,0.16)]" />
              <div className="h-3 w-3/5 rounded-full bg-[rgba(183,134,84,0.16)]" />
              <div className="h-44 rounded-[24px] bg-[linear-gradient(135deg,rgba(183,134,84,0.2),rgba(255,255,255,0.45)),radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_50%)]" />
            </div>
            <div className="mt-5 flex items-center justify-between gap-4 font-sans text-sm font-semibold text-[#72675d]">
              <span>{dictionary.sampleStatus}</span>
              <span>{dictionary.sampleMap}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-0 py-4">
        <div className={`${containerClass} grid gap-5 md:grid-cols-3`}>
          {dictionary.stats.map((item) => (
            <article className={`${glassCardClass} p-6`} key={item.label}>
              <strong className="block text-4xl">{item.value}</strong>
              <span className="mt-2 block text-[#72675d]">{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="px-0 py-10" id="features">
        <div className={containerClass}>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className={eyebrowClass}>{dictionary.whyEyebrow}</p>
            <h2 className="m-0 text-[clamp(2rem,4vw,3.4rem)] leading-[0.98]">
              {dictionary.whyTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {dictionary.whyCards.map((card) => (
              <article className={`${glassCardClass} p-7`} key={card.title}>
                <h3 className="m-0 text-[1.35rem]">{card.title}</h3>
                <p className="mt-3 text-[#72675d]">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/40 px-0 py-10">
        <div className={`${containerClass} grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start`}>
          <div>
            <p className={eyebrowClass}>{dictionary.includeEyebrow}</p>
            <h2 className="m-0 text-[clamp(2rem,4vw,3.4rem)] leading-[0.98]">
              {dictionary.includeTitle}
            </h2>
            <p className="mt-4 text-[1.05rem] leading-[1.8] text-[#72675d]">
              {dictionary.includeText}
            </p>
          </div>

          <div className="grid gap-4">
            {dictionary.includeItems.map((item, index) => (
              <div className={`${glassCardClass} flex items-center gap-4 p-5`} key={item}>
                <strong className="text-2xl">{String(index + 1).padStart(2, "0")}</strong>
                <span className="text-[#72675d]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-0 py-10" id="packages">
        <div className={containerClass}>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className={eyebrowClass}>{dictionary.pricingEyebrow}</p>
            <h2 className="m-0 text-[clamp(2rem,4vw,3.4rem)] leading-[0.98]">
              {dictionary.pricingTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {dictionary.packages.map((item) => (
              <article
                className={`${glassCardClass} flex flex-col gap-4 p-7 ${
                  item.featured ? "ring-2 ring-[#d8b38d]" : ""
                }`}
                key={item.title}
              >
                <p className="m-0 text-[1.35rem] font-semibold">{item.title}</p>
                <strong className="text-4xl">{item.price}</strong>
                <p className="text-[#72675d]">{item.text}</p>
                <button className={`${solidButtonClass} mt-auto`} type="button">
                  {dictionary.chooseButton}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
