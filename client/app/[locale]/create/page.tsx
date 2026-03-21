import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type CreatePageProps = {
  params: Promise<{ locale: string }>;
};

const toneStyles = {
  rose: {
    orb: "bg-[radial-gradient(circle,#ff8ca8,transparent_65%)]",
    emoji: "bg-[linear-gradient(135deg,#ffd8e4,#fff5f7)]",
    button: "bg-[linear-gradient(135deg,#ff2d71,#ff4f84)]",
  },
  violet: {
    orb: "bg-[radial-gradient(circle,#9d47ff,transparent_65%)]",
    emoji: "bg-[linear-gradient(135deg,#efe2ff,#f6f0ff)]",
    button: "bg-[linear-gradient(135deg,#9d47ff,#3f83f8)]",
  },
  emerald: {
    orb: "bg-[radial-gradient(circle,#0bc767,transparent_65%)]",
    emoji: "bg-[linear-gradient(135deg,#dcfff0,#f4fff9)]",
    button: "bg-[linear-gradient(135deg,#0bc767,#10b981)]",
  },
  gold: {
    orb: "bg-[radial-gradient(circle,#e6a842,transparent_65%)]",
    emoji: "bg-[linear-gradient(135deg,#fff1d6,#fff8ea)]",
    button: "bg-[linear-gradient(135deg,#e6a842,#cf8542)]",
  },
} as const;

export default async function CreatePage({ params }: CreatePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale).create;

  return (
    <section className="px-0 py-10">
      <div className="mx-auto w-[min(calc(100%-32px),1180px)]">
        <Link
          className="inline-flex items-center gap-2 font-sans text-[1.05rem] font-semibold text-[#72675d]"
          href={`/${locale}`}
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
          <h1 className="m-0 text-[clamp(2.6rem,5vw,5rem)] leading-[1.02]">
            {dictionary.title}
          </h1>
          <p className="mt-4 text-[1.15rem] leading-[1.8] text-[#72675d]">
            {dictionary.text}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {dictionary.categories.map((item) => {
            const tone = toneStyles[item.tone];

            return (
              <article
                className="relative overflow-hidden rounded-[32px] border border-[rgba(116,93,72,0.08)] bg-white/85 p-8 shadow-[0_22px_60px_rgba(92,74,56,0.12)]"
                key={item.title}
              >
                <span
                  aria-hidden="true"
                  className={`absolute right-[-40px] top-[-40px] h-36 w-36 opacity-15 ${tone.orb}`}
                />
                <div
                  aria-hidden="true"
                  className={`mb-5 grid h-[88px] w-[88px] place-items-center rounded-[28px] text-[3.4rem] shadow-[0_18px_38px_rgba(92,74,56,0.15)] ${tone.emoji}`}
                >
                  {item.emoji}
                </div>
                <h2 className="text-[clamp(2rem,3vw,2.8rem)] leading-[1.05]">{item.title}</h2>
                <p className="mt-3 text-[1.1rem] font-semibold text-[#9a6f43]">{item.count}</p>
                <p className="mt-2 text-[1.02rem] leading-[1.75] text-[#72675d]">
                  {item.description}
                </p>
                <Link
                  className={`mt-6 inline-flex min-h-[54px] items-center gap-2 rounded-full px-6 text-[1.05rem] font-semibold text-white shadow-[0_18px_34px_rgba(92,74,56,0.14)] transition duration-300 hover:scale-105 hover:brightness-105 ${tone.button}`}
                  href={`/${locale}/create/${item.slug}`}
                >
                  {dictionary.choose}
                  <span aria-hidden="true">›</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
