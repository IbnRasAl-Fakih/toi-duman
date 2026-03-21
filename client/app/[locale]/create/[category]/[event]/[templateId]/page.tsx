import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, Locale } from "@/lib/i18n";
import { getTemplateById } from "@/lib/templateCatalog";

type TemplatePreviewPageProps = {
  params: Promise<{
    locale: string;
    category: string;
    event: string;
    templateId: string;
  }>;
};

function getPreviewContent(locale: Locale, event: string) {
  const contentByEvent = {
    wedding: {
      ru: {
        names: "Aruzhan & Dias",
        occasion: "С радостью приглашаем вас на наше торжество",
        date: "25 июля 2026",
        time: "17:00",
        location: "Royal Tulip, Алматы",
      },
      kk: {
        names: "Aruzhan & Dias",
        occasion: "Сіздерді біздің салтанатты кешімізге шақырамыз",
        date: "25 шілде 2026",
        time: "17:00",
        location: "Royal Tulip, Алматы",
      },
    },
    nikah: {
      ru: {
        names: "Amina & Nurzhan",
        occasion: "Приглашаем разделить с нами день никаха",
        date: "14 августа 2026",
        time: "15:00",
        location: "Grand Hall, Астана",
      },
      kk: {
        names: "Amina & Nurzhan",
        occasion: "Никах күніне ортақтасуға шақырамыз",
        date: "14 тамыз 2026",
        time: "15:00",
        location: "Grand Hall, Астана",
      },
    },
  } as const;

  return contentByEvent[event as keyof typeof contentByEvent]?.[locale] ?? {
    names: "Toi Duman Event",
    occasion: locale === "ru" ? "Ваше приглашение" : "Сіздің шақыруыңыз",
    date: locale === "ru" ? "Дата будет здесь" : "Күні осында болады",
    time: "18:00",
    location: locale === "ru" ? "Локация мероприятия" : "Іс-шара локациясы",
  };
}

function getUiText(locale: Locale) {
  if (locale === "kk") {
    return {
      back: "Үлгілерге оралу",
      eyebrow: "Шақыруды алдын ала қарау",
      text: "Клиент дәл осы экранда болашақ шақыруының стилін, мәтіннің орналасуын және жалпы атмосферасын көре алады.",
      summary: "Үлгі туралы",
      style: "Стиль",
      price: "Бағасы",
      badge: "Белгі",
      choose: "Осы үлгіні таңдау",
      date: "Күні",
      time: "Уақыты",
      location: "Өтетін орны",
    };
  }

  return {
    back: "Назад к шаблонам",
    eyebrow: "Предпросмотр приглашения",
    text: "На этом экране клиент уже видит, как будет выглядеть само приглашение: композицию, настроение, иерархию текста и общий стиль.",
    summary: "О шаблоне",
    style: "Стиль",
    price: "Цена",
    badge: "Бейдж",
    choose: "Выбрать этот шаблон",
    date: "Дата",
    time: "Время",
    location: "Локация",
  };
}

const toneClass = {
  pearl: "bg-[linear-gradient(180deg,rgba(255,250,245,0.92),rgba(248,239,230,0.9)),rgba(255,255,255,0.84)]",
  rose: "bg-[linear-gradient(180deg,rgba(255,245,247,0.94),rgba(255,230,236,0.9)),rgba(255,255,255,0.84)]",
  sage: "bg-[linear-gradient(180deg,rgba(245,252,247,0.94),rgba(224,244,234,0.92)),rgba(255,255,255,0.84)]",
  nocturne: "bg-[linear-gradient(180deg,rgba(246,244,255,0.94),rgba(227,223,249,0.92)),rgba(255,255,255,0.84)]",
} as const;

export default async function TemplatePreviewPage({
  params,
}: TemplatePreviewPageProps) {
  const { locale, category, event, templateId } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const templateResult = getTemplateById(locale, category, event, templateId);

  if (!templateResult) {
    notFound();
  }

  const { eventTemplates, template } = templateResult;
  const preview = getPreviewContent(locale, event);
  const ui = getUiText(locale);

  return (
    <section className="px-0 py-10">
      <div className="mx-auto w-[min(calc(100%-32px),1180px)]">
        <Link
          className="inline-flex items-center gap-2 font-sans text-[1.02rem] font-semibold text-[#72675d]"
          href={`/${locale}/create/${category}/${event}`}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2]"
            viewBox="0 0 24 24"
          >
            <path d="m15 6-6 6 6 6" />
          </svg>
          {ui.back}
        </Link>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-[0.92rem] uppercase tracking-[0.14em] text-[#9a6f43]">
              {ui.eyebrow}
            </p>
            <h1 className="m-0 text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02]">
              {template.name}
            </h1>
            <p className="mt-4 text-[1.05rem] leading-[1.75] text-[#72675d]">{ui.text}</p>
          </div>
          <Link
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#b78654] px-6 text-[0.98rem] font-semibold text-white shadow-[0_16px_30px_rgba(123,92,60,0.16)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
            href={`/${locale}/login`}
          >
            {ui.choose}
          </Link>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.82fr)]">
          <article
            className={`rounded-[32px] border border-[rgba(116,93,72,0.08)] p-8 shadow-[0_18px_42px_rgba(102,81,61,0.08)] ${toneClass[template.tone]}`}
          >
            <span className="inline-flex rounded-full bg-white/80 px-3 py-1 font-sans text-[0.82rem] uppercase tracking-[0.08em] text-[#9a6f43]">
              {eventTemplates.eyebrow}
            </span>
            <div className="relative mt-6 rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62)),radial-gradient(circle_at_top,rgba(255,255,255,0.86),transparent_58%)] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
              <div className="pointer-events-none absolute inset-x-10 top-5 h-28 bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_68%)]" />
              <p className="relative text-[0.98rem] leading-[1.7] text-[#72675d]">{preview.occasion}</p>
              <h2 className="relative mt-5 text-[clamp(2.4rem,4vw,4.4rem)] leading-[0.96]">
                {preview.names}
              </h2>
              <div className="my-6 h-px bg-[linear-gradient(90deg,transparent,rgba(123,92,60,0.4),transparent)]" />
              <dl className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-white/55 p-4">
                  <dt className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                    {ui.date}
                  </dt>
                  <dd className="mt-2 text-[0.95rem] leading-[1.5]">{preview.date}</dd>
                </div>
                <div className="rounded-2xl bg-white/55 p-4">
                  <dt className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                    {ui.time}
                  </dt>
                  <dd className="mt-2 text-[0.95rem] leading-[1.5]">{preview.time}</dd>
                </div>
                <div className="rounded-2xl bg-white/55 p-4">
                  <dt className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                    {ui.location}
                  </dt>
                  <dd className="mt-2 text-[0.95rem] leading-[1.5]">{preview.location}</dd>
                </div>
              </dl>
            </div>
          </article>

          <aside className="rounded-[32px] border border-[rgba(116,93,72,0.08)] bg-white/80 p-8 shadow-[0_18px_42px_rgba(102,81,61,0.08)]">
            <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#9a6f43]">
              {ui.summary}
            </p>
            <h2 className="mt-3 text-[1.8rem] leading-[1.12]">{eventTemplates.title}</h2>
            <p className="mt-3 leading-[1.75] text-[#72675d]">{eventTemplates.text}</p>

            <div className="mt-6 grid gap-3">
              <div className="grid gap-1 rounded-2xl border border-[rgba(116,93,72,0.08)] bg-white/75 p-4">
                <span className="font-sans text-[0.76rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                  {ui.style}
                </span>
                <strong>{template.style}</strong>
              </div>
              <div className="grid gap-1 rounded-2xl border border-[rgba(116,93,72,0.08)] bg-white/75 p-4">
                <span className="font-sans text-[0.76rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                  {ui.price}
                </span>
                <strong>{template.price}</strong>
              </div>
              <div className="grid gap-1 rounded-2xl border border-[rgba(116,93,72,0.08)] bg-white/75 p-4">
                <span className="font-sans text-[0.76rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                  {ui.badge}
                </span>
                <strong>{template.badge}</strong>
              </div>
            </div>

            <Link
              className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#b78654] px-6 text-[0.98rem] font-semibold text-white shadow-[0_16px_30px_rgba(123,92,60,0.16)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
              href={`/${locale}/login`}
            >
              {ui.choose}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
