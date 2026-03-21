import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type InvitationsPageProps = {
  params: Promise<{ locale: string }>;
};

type InvitationOrder = {
  id: string;
  title: string;
  eventType: string;
  amount: string;
  createdAt: Date;
  paidAt?: Date;
};

const MS_IN_DAY = 1000 * 60 * 60 * 24;

function buildOrders(now: Date): InvitationOrder[] {
  const daysAgo = (days: number) => new Date(now.getTime() - days * MS_IN_DAY);

  return [
    {
      id: "td-1042",
      title: "Aruzhan & Dias",
      eventType: "Wedding Invitation",
      amount: "7 900 ₸",
      createdAt: daysAgo(9),
      paidAt: daysAgo(7),
    },
    {
      id: "td-1056",
      title: "Amina Besik Toi",
      eventType: "Family Celebration",
      amount: "4 900 ₸",
      createdAt: daysAgo(3),
    },
    {
      id: "td-1029",
      title: "Anniversary Evening",
      eventType: "Holiday Invitation",
      amount: "7 900 ₸",
      createdAt: daysAgo(10),
    },
  ];
}

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale === "kk" ? "kk-KZ" : "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function InvitationsPage({ params }: InvitationsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale).invitationsPage;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(`/${locale}/login`);
  }

  const now = new Date();
  const orders = buildOrders(now);

  const paidOrders = orders.filter((order) => order.paidAt);
  const unpaidOrders = orders
    .filter((order) => !order.paidAt)
    .filter((order) => now.getTime() - order.createdAt.getTime() <= 7 * MS_IN_DAY)
    .map((order) => ({
      ...order,
      daysLeft: Math.max(
        1,
        7 - Math.floor((now.getTime() - order.createdAt.getTime()) / MS_IN_DAY)
      ),
    }));

  return (
    <section className="orders-page">
      <div className="container">
        <Link className="orders-page__back" href={`/${locale}`}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m15 6-6 6 6 6" />
          </svg>
          {dictionary.back}
        </Link>

        <div className="orders-page__hero">
          <p className="eyebrow">{dictionary.eyebrow}</p>
          <h1>{dictionary.title}</h1>
          <p>{dictionary.text}</p>
          <p className="orders-page__user">User ID: {currentUser.id}</p>
        </div>

        <div className="orders-layout">
          <section className="orders-section">
            <div className="orders-section__head">
              <h2>{dictionary.paidSection}</h2>
              <span className="orders-section__badge orders-section__badge--paid">
                {paidOrders.length}
              </span>
            </div>

            {paidOrders.length ? (
              <div className="orders-list">
                {paidOrders.map((order) => (
                  <article className="order-card order-card--paid" key={order.id}>
                    <div className="order-card__main">
                      <div>
                        <p className="order-card__title">{order.title}</p>
                        <p className="order-card__meta">
                          {order.eventType} • {order.id}
                        </p>
                      </div>
                      <span className="order-card__status order-card__status--paid">
                        {dictionary.statusPaid}
                      </span>
                    </div>
                    <div className="order-card__details">
                      <span>{order.amount}</span>
                      <span>
                        {dictionary.paidAt}: {formatDate(order.paidAt!, locale)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="orders-empty">{dictionary.emptyPaid}</p>
            )}
          </section>

          <section className="orders-section">
            <div className="orders-section__head">
              <h2>{dictionary.unpaidSection}</h2>
              <span className="orders-section__badge orders-section__badge--unpaid">
                {unpaidOrders.length}
              </span>
            </div>

            {unpaidOrders.length ? (
              <div className="orders-list">
                {unpaidOrders.map((order) => (
                  <article className="order-card order-card--unpaid" key={order.id}>
                    <div className="order-card__main">
                      <div>
                        <p className="order-card__title">{order.title}</p>
                        <p className="order-card__meta">
                          {order.eventType} • {order.id}
                        </p>
                      </div>
                      <span className="order-card__status order-card__status--unpaid">
                        {dictionary.statusUnpaid}
                      </span>
                    </div>
                    <div className="order-card__details">
                      <span>{order.amount}</span>
                      <span>
                        {dictionary.createdAt}: {formatDate(order.createdAt, locale)}
                      </span>
                    </div>
                    <p className="order-card__notice">
                      {dictionary.visibleFor}: {order.daysLeft} дн.
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="orders-empty">{dictionary.emptyUnpaid}</p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
