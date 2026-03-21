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
    <section className="category-page">
      <div className="container">
        <Link className="category-page__back" href={`/${locale}/create`}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m15 6-6 6 6 6" />
          </svg>
          {dictionary.back}
        </Link>

        <div className="category-page__hero">
          <h1>{dictionary.title}</h1>
          <p>{dictionary.text}</p>
        </div>

        <div className="category-sections">
          {dictionary.sections.map((section) => (
            <section className="category-section" key={section.title}>
              <h2>{section.title}</h2>
              <div className="category-list">
                {section.items.map((item) => (
                  <Link
                    className="category-row"
                    href={`/${locale}/create/${category}/${item.slug}`}
                    key={item.title}
                  >
                    <span className="category-row__left">
                      <span className="category-row__emoji" aria-hidden="true">
                        {item.emoji}
                      </span>
                      <span className="category-row__copy">
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </span>
                    </span>
                    <span className="category-row__right">
                      <span>{item.count}</span>
                      <svg aria-hidden="true" viewBox="0 0 24 24">
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="category-help">
          <div className="category-help__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H9l-4 4v-4.5Z" />
              <path d="M9 9h6M9 12h4" />
            </svg>
          </div>
          <h3>{dictionary.helpTitle}</h3>
          <p>{dictionary.helpText}</p>
          <a
            className="category-help__button"
            href={whatsappLink}
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
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
