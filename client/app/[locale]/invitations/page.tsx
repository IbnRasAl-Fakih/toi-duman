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
    <section className="px-0 py-10">
      <div className="mx-auto w-[min(calc(100%-32px),1180px)]">
        <Link
          className="inline-flex items-center gap-2 font-sans text-[1.02rem] font-semibold text-[#72675d]"
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
          <h1 className="m-0 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02]">
            {dictionary.title}
          </h1>
          <p className="mt-4 text-[1.04rem] leading-[1.8] text-[#72675d]">
            {dictionary.text}
          </p>
          <p className="mt-4 font-sans text-[0.95rem] font-semibold text-[#9a6f43]">
            User ID: {currentUser.id}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[32px] border border-[rgba(116,93,72,0.08)] bg-white/75 p-7 shadow-[0_18px_40px_rgba(102,81,61,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[1.15rem]">{dictionary.paidSection}</h2>
              <span className="rounded-full bg-[rgba(16,185,129,0.12)] px-3 py-1 font-sans text-[0.92rem] font-semibold text-[#0f8d54]">
                {paidOrders.length}
              </span>
            </div>

            {paidOrders.length ? (
              <div className="mt-5 grid gap-4">
                {paidOrders.map((order) => (
                  <article
                    className="rounded-[28px] border border-[rgba(116,93,72,0.08)] bg-[linear-gradient(180deg,rgba(240,255,247,0.96),rgba(255,255,255,0.9))] p-5"
                    key={order.id}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-[1.08rem] font-semibold">{order.title}</p>
                        <p className="mt-2 text-[0.95rem] text-[#72675d]">
                          {order.eventType} • {order.id}
                        </p>
                      </div>
                      <span className="rounded-full bg-[rgba(16,185,129,0.12)] px-3 py-1 font-sans text-[0.82rem] font-bold uppercase text-[#0f8d54]">
                        {dictionary.statusPaid}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-2 text-[0.92rem] text-[#72675d]">
                      <span>{order.amount}</span>
                      <span>
                        {dictionary.paidAt}: {formatDate(order.paidAt!, locale)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-[1rem] leading-[1.7] text-[#72675d]">
                {dictionary.emptyPaid}
              </p>
            )}
          </section>

          <section className="rounded-[32px] border border-[rgba(116,93,72,0.08)] bg-white/75 p-7 shadow-[0_18px_40px_rgba(102,81,61,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[1.15rem]">{dictionary.unpaidSection}</h2>
              <span className="rounded-full bg-[rgba(245,158,11,0.14)] px-3 py-1 font-sans text-[0.92rem] font-semibold text-[#b45309]">
                {unpaidOrders.length}
              </span>
            </div>

            {unpaidOrders.length ? (
              <div className="mt-5 grid gap-4">
                {unpaidOrders.map((order) => (
                  <article
                    className="rounded-[28px] border border-[rgba(116,93,72,0.08)] bg-[linear-gradient(180deg,rgba(255,249,238,0.96),rgba(255,255,255,0.9))] p-5"
                    key={order.id}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-[1.08rem] font-semibold">{order.title}</p>
                        <p className="mt-2 text-[0.95rem] text-[#72675d]">
                          {order.eventType} • {order.id}
                        </p>
                      </div>
                      <span className="rounded-full bg-[rgba(245,158,11,0.14)] px-3 py-1 font-sans text-[0.82rem] font-bold uppercase text-[#b45309]">
                        {dictionary.statusUnpaid}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-2 text-[0.92rem] text-[#72675d]">
                      <span>{order.amount}</span>
                      <span>
                        {dictionary.createdAt}: {formatDate(order.createdAt, locale)}
                      </span>
                    </div>
                    <p className="mt-4 text-[0.9rem] font-bold text-[#9a6f43]">
                      {dictionary.visibleFor}: {order.daysLeft} дн.
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-[1rem] leading-[1.7] text-[#72675d]">
                {dictionary.emptyUnpaid}
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
