import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type CategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
};

const whatsappLink =
  "https://wa.me/77770146919?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC!%20Toi%20Duman%20%D0%B1%D0%BE%D0%B9%D1%8B%D0%BD%D1%88%D0%B0%20%D0%BA%D0%B5%D2%A3%D0%B5%D1%81%20%D0%B0%D0%BB%D2%93%D1%8B%D0%BC%20%D0%BA%D0%B5%D0%BB%D0%B5%D0%B4%D1%96.";

export default async function CreateCategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale).create.categoryPages[category];

  if (!dictionary) {
    notFound();
  }

  return (
    <section className="px-0 py-10">
      <div className="mx-auto w-[min(calc(100%-32px),1180px)]">
        <Link
          className="inline-flex items-center gap-2 font-sans text-[1.02rem] font-semibold text-[#72675d]"
          href={`/${locale}/create`}
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
          <h1 className="m-0 text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02]">
            {dictionary.title}
          </h1>
          <p className="mt-4 text-[1.08rem] leading-[1.8] text-[#72675d]">
            {dictionary.text}
          </p>
        </div>

        <div className="mt-8 grid gap-7">
          {dictionary.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-[1.5rem]">{section.title}</h2>
              <div className="grid gap-4">
                {section.items.map((item) => (
                  <Link
                    className="flex flex-col gap-4 rounded-[28px] border border-[rgba(116,93,72,0.08)] bg-white/80 px-6 py-5 shadow-[0_16px_34px_rgba(102,81,61,0.08)] transition hover:-translate-y-0.5 md:flex-row md:items-center md:justify-between"
                    href={`/${locale}/create/${category}/${item.slug}`}
                    key={item.title}
                  >
                    <span className="flex items-start gap-4">
                      <span className="text-[1.8rem]" aria-hidden="true">
                        {item.emoji}
                      </span>
                      <span className="grid gap-1">
                        <strong className="text-[1.28rem]">{item.title}</strong>
                        <small className="text-[0.98rem] leading-[1.6] text-[#72675d]">
                          {item.description}
                        </small>
                      </span>
                    </span>
                    <span className="flex items-center gap-3 font-sans text-[0.96rem] font-semibold text-[#72675d]">
                      <span>{item.count}</span>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2]"
                        viewBox="0 0 24 24"
                      >
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-8 rounded-[32px] border border-[rgba(103,215,151,0.34)] bg-[radial-gradient(circle_at_top,rgba(203,255,225,0.5),transparent_42%),linear-gradient(180deg,rgba(243,255,248,0.9),rgba(234,255,242,0.72))] p-8 shadow-[0_24px_50px_rgba(74,151,104,0.1)]">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22c55e] text-white shadow-[0_18px_34px_rgba(18,183,106,0.18)]">
            <svg
              aria-hidden="true"
              className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2]"
              viewBox="0 0 24 24"
            >
              <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H9l-4 4v-4.5Z" />
              <path d="M9 9h6M9 12h4" />
            </svg>
          </div>
          <h3 className="text-[clamp(1.5rem,3vw,2rem)]">{dictionary.helpTitle}</h3>
          <p className="mt-3 text-[1.02rem] leading-[1.8] text-[#4f6f5b]">
            {dictionary.helpText}
          </p>
          <a
            className="mt-6 inline-flex min-h-[54px] items-center gap-2 rounded-full bg-[#22c55e] px-6 font-semibold text-white shadow-[0_18px_34px_rgba(18,183,106,0.18)] transition duration-300 hover:scale-105 hover:brightness-105"
            href={whatsappLink}
            rel="noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.9]"
              viewBox="0 0 24 24"
            >
              <path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z" />
              <path d="M9.2 8.7c.2-.4.5-.4.7-.4h.6c.2 0 .4 0 .6.5l.6 1.4c.1.3.1.5-.1.8l-.5.6c-.1.2-.2.3 0 .6.3.6 1.1 1.7 2.4 2.4.2.1.4.1.6 0l.7-.8c.2-.2.4-.3.7-.2l1.3.6c.4.2.5.3.5.6v.6c0 .2-.1.5-.4.7-.4.2-1 .4-1.6.2-.9-.2-2-.8-3.1-1.8-1.4-1.2-2.2-2.6-2.5-3.6-.2-.7 0-1.3.2-1.6Z" />
            </svg>
            {dictionary.helpButton}
          </a>
        </aside>
      </div>
    </section>
  );
}
