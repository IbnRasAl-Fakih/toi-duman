import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getEventTemplates } from "@/lib/templateCatalog";

type TemplatePageProps = {
  params: Promise<{ locale: string; category: string; event: string }>;
};

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
    <section className="templates-page">
      <div className="container">
        <Link className="templates-page__back" href={`/${locale}/create/${category}`}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m15 6-6 6 6 6" />
          </svg>
          {dictionary.back}
        </Link>

        <div className="templates-page__hero">
          <p className="eyebrow">{dictionary.eyebrow}</p>
          <h1>{dictionary.title}</h1>
          <p>{dictionary.text}</p>
        </div>

        <div className="template-grid">
          {dictionary.templates.map((template) => (
            <article className={`template-card template-card--${template.tone}`} key={template.id}>
              <div className="template-card__preview">
                <span className="template-card__badge">{template.badge}</span>
                <div className="template-card__screen">
                  <div className="template-card__line" />
                  <div className="template-card__line template-card__line--short" />
                  <div className="template-card__art" />
                </div>
              </div>

              <div className="template-card__body">
                <div>
                  <h2>{template.name}</h2>
                  <p>{template.style}</p>
                </div>
                <strong>{template.price}</strong>
              </div>

              <Link
                className="template-card__button"
                href={`/${locale}/create/${category}/${event}/${template.id}`}
              >
                {dictionary.choose}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
