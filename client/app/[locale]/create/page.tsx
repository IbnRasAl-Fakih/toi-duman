import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type CreatePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CreatePage({ params }: CreatePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale).create;

  return (
    <section className="create-page">
      <div className="container">
        <Link className="create-page__back" href={`/${locale}`}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m15 6-6 6 6 6" />
          </svg>
          {dictionary.back}
        </Link>

        <div className="create-page__hero">
          <p className="eyebrow">{dictionary.eyebrow}</p>
          <h1>{dictionary.title}</h1>
          <p className="create-page__text">{dictionary.text}</p>
        </div>

        <div className="create-grid">
          {dictionary.categories.map((item) => (
            <article
              className={`create-card create-card--${item.tone}`}
              key={item.title}
            >
              <span className="create-card__orb" aria-hidden="true" />
              <div className="create-card__emoji" aria-hidden="true">
                {item.emoji}
              </div>
              <h2>{item.title}</h2>
              <p className="create-card__count">{item.count}</p>
              <p className="create-card__description">{item.description}</p>
              <Link
                className="create-card__button"
                href={`/${locale}/create/${item.slug}`}
              >
                {dictionary.choose}
                <span aria-hidden="true">›</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
