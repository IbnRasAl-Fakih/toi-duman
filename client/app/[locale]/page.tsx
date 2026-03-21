import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale).home;

  return (
    <div className="home-page">
      <section className="hero" id="top">
        <div className="container hero__grid">
          <div className="hero__content">
            <p className="eyebrow">{dictionary.eyebrow}</p>
            <h1>{dictionary.title}</h1>
            <p className="hero__text">{dictionary.text}</p>

            <div className="hero__actions">
              <a className="button" href="#packages">
                {dictionary.choosePlan}
              </a>
              <a className="button button--ghost" href="#features">
                {dictionary.viewFeatures}
              </a>
            </div>

            <ul className="hero__features">
              {dictionary.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="hero-card">
            <div className="hero-card__top">
              <span className="hero-card__badge">{dictionary.sampleBadge}</span>
              <span className="hero-card__time">18:00</span>
            </div>
            <h2>Ayana & Nursultan</h2>
            <p className="hero-card__date">{dictionary.sampleDate}</p>
            <div className="hero-card__preview">
              <div className="hero-card__line" />
              <div className="hero-card__line hero-card__line--short" />
              <div className="hero-card__photo" />
            </div>
            <div className="hero-card__footer">
              <span>{dictionary.sampleStatus}</span>
              <span>{dictionary.sampleMap}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats__grid">
          {dictionary.stats.map((item) => (
            <article className="stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">{dictionary.whyEyebrow}</p>
            <h2>{dictionary.whyTitle}</h2>
          </div>

          <div className="feature-grid">
            {dictionary.whyCards.map((card) => (
              <article className="feature-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container showcase">
          <div>
            <p className="eyebrow">{dictionary.includeEyebrow}</p>
            <h2>{dictionary.includeTitle}</h2>
            <p className="section-text">{dictionary.includeText}</p>
          </div>

          <div className="showcase__list">
            {dictionary.includeItems.map((item, index) => (
              <div className="showcase__item" key={item}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="packages">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">{dictionary.pricingEyebrow}</p>
            <h2>{dictionary.pricingTitle}</h2>
          </div>

          <div className="pricing-grid">
            {dictionary.packages.map((item) => (
              <article
                className={
                  item.featured ? "price-card price-card--featured" : "price-card"
                }
                key={item.title}
              >
                <p className="price-card__title">{item.title}</p>
                <strong>{item.price}</strong>
                <p>{item.text}</p>
                <button className="button" type="button">
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
