import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getEventTemplates } from "@/lib/templateCatalog";

type TemplatePageProps = {
  params: Promise<{ locale: string; category: string; event: string }>;
};

const tonePreview = {
  pearl: "bg-[linear-gradient(180deg,#fff7f0,#fff2e5)]",
  rose: "bg-[linear-gradient(180deg,#fff1f5,#ffe8ef)]",
  sage: "bg-[linear-gradient(180deg,#f2fbf4,#e3f6e8)]",
  nocturne: "bg-[linear-gradient(180deg,#f4f0ff,#e8e0ff)]",
} as const;

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { locale, category, event } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getEventTemplates(locale, category, event);

  if (!dictionary) {
    notFound();
  }

  return (
    <section className="px-0 py-10">
      <div className="mx-auto w-[min(calc(100%-32px),1180px)]">
        <Link
          className="inline-flex items-center gap-2 font-sans text-[1.02rem] font-semibold text-[#72675d]"
          href={`/${locale}/create/${category}`}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2]"
            viewBox="0 0 24 24"
          >
            <path d="m15 6-6 6 6 6" />
          </svg>
          {dictionary.back}
        </Link>

        <div className="mt-6 max-w-4xl">
          <p className="mb-3 text-[0.92rem] uppercase tracking-[0.14em] text-[#9a6f43]">
            {dictionary.eyebrow}
          </p>
          <h1 className="m-0 text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02]">
            {dictionary.title}
          </h1>
          <p className="mt-4 text-[1.06rem] leading-[1.8] text-[#72675d]">
            {dictionary.text}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {dictionary.templates.map((template) => (
            <article
              className="overflow-hidden rounded-[28px] border border-[rgba(116,93,72,0.08)] bg-white/80 shadow-[0_18px_42px_rgba(102,81,61,0.08)]"
              key={template.id}
            >
              <div className={`relative p-6 ${tonePreview[template.tone]}`}>
                <span className="inline-flex rounded-full bg-white/70 px-3 py-1 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#9a6f43]">
                  {template.badge}
                </span>
                <div className="mt-5 rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-[0_16px_34px_rgba(102,81,61,0.08)]">
                  <div className="h-3 w-full rounded-full bg-[rgba(183,134,84,0.14)]" />
                  <div className="mt-3 h-3 w-3/5 rounded-full bg-[rgba(183,134,84,0.14)]" />
                  <div className="mt-4 h-40 rounded-[20px] bg-[linear-gradient(135deg,rgba(255,255,255,0.58),rgba(183,134,84,0.18)),radial-gradient(circle_at_top,rgba(255,255,255,0.74),transparent_52%)]" />
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <h2 className="text-[1.18rem]">{template.name}</h2>
                  <p className="mt-2 text-[0.95rem] text-[#72675d]">{template.style}</p>
                </div>
                <strong className="whitespace-nowrap">{template.price}</strong>
              </div>

              <div className="px-6 pb-6">
                <Link
                  className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#b78654] px-6 text-[0.98rem] font-semibold text-white shadow-[0_14px_28px_rgba(123,92,60,0.16)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
                  href={`/${locale}/create/${category}/${event}/${template.id}`}
                >
                  {dictionary.choose}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
