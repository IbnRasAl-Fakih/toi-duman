import React from "react";
import { Link, useParams } from "react-router-dom";

const PAYMENT_PHONE = process.env.REACT_APP_PAYMENT_PHONE || "";
const PAYMENT_ACCOUNT = process.env.REACT_APP_PAYMENT_ACCOUNT || "";
const WHATSAPP_PHONE = process.env.REACT_APP_WHATSAPP_PHONE || "";

console.log("PaymentPage config:", { PAYMENT_PHONE, PAYMENT_ACCOUNT, WHATSAPP_PHONE });

function formatAmount(value) {
  if (value == null) return null;

  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);

  return new Intl.NumberFormat("ru-RU").format(numeric);
}

function buildWhatsappMessage(orderId) {
  const suffix = orderId ? ` Номер заказа: ${orderId}.` : "";
  return encodeURIComponent(`Здравствуйте! Отправляю чек по оплате пригласительной.${suffix}`);
}

export default function PaymentPage() {
  const { orderId } = useParams();
  const [order, setOrder] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(Boolean(orderId));
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    async function loadOrder() {
      if (!orderId) {
        setOrder(null);
        setIsLoading(false);
        setError("");
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`/api/v1/orders/${orderId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Не удалось загрузить заказ");
        }

        if (isMounted) {
          setOrder(data);
        }
      } catch (requestError) {
        if (isMounted) {
          setOrder(null);
          setError(requestError instanceof Error ? requestError.message : "Не удалось загрузить заказ");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadOrder();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${buildWhatsappMessage(orderId)}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f1ea] text-[#201815]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-[#b91c1c]/10 blur-3xl" />
        <div className="absolute right-[-60px] top-[140px] h-[260px] w-[260px] rounded-full bg-[#d97706]/10 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[18%] h-[260px] w-[260px] rounded-full bg-[#7f1118]/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 lg:px-10 lg:py-10">
        <header className="rounded-[36px] border border-black/10 bg-white/75 px-6 py-6 shadow-[0_24px_80px_rgba(31,24,21,0.08)] backdrop-blur-xl md:px-8 lg:px-10">
          <p className="text-xs uppercase tracking-[0.38em] text-[#7f1118]/55">Payment Page</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_320px] lg:items-end">
            <div>
              <h1 className="font-['Georgia','Times_New_Roman',serif] text-4xl leading-[0.94] text-[#7f1118] md:text-6xl">
                Оплата пригласительной
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-black/65 md:text-base">
                Переведите оплату на Kaspi, затем отправьте чек в WhatsApp. Если номер заказа уже есть, приложите его к
                сообщению, чтобы подтвердить оплату быстрее.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#7f1118]/10 bg-[#fffaf6] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-black/45">Статус</p>
              <div className="mt-3 space-y-3">
                <InfoPill
                  label="Заказ"
                  value={isLoading ? "Загрузка..." : order?.id || orderId || "Будет выдан после оформления"}
                />
                <InfoPill label="Оплата" value={isLoading ? "Проверяем..." : order?.status || "Ожидается"} />
                <InfoPill
                  label="Сумма"
                  value={isLoading ? "..." : order?.amount ? `${formatAmount(order.amount)} ₸` : "Уточняется у менеджера"}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_380px]">
          <section className="rounded-[36px] border border-black/10 bg-[#1a1616] p-6 text-[#f8f2ec] shadow-[0_28px_80px_rgba(18,16,16,0.18)] md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/70">
                Kaspi Transfer
              </span>
              <span className="rounded-full border border-white/15 bg-[#7f1118] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white">
                3 шага до активации
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              <PaymentStep
                index="01"
                title="Сделайте перевод"
                text="Отправьте оплату на номер Kaspi или на счет ниже. Лучше переводить точную сумму, чтобы заказ было проще найти."
              />
              <PaymentStep
                index="02"
                title="Сохраните чек"
                text="После перевода сохраните или сделайте скриншот подтверждения оплаты в приложении Kaspi."
              />
              <PaymentStep
                index="03"
                title="Отправьте чек в WhatsApp"
                text="Пришлите чек в WhatsApp и укажите номер заказа. Если номера заказа еще нет, просто напишите свое имя или название события."
              />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <PaymentCard
                eyebrow="Kaspi номер"
                value={PAYMENT_PHONE}
                hint="Перевод по номеру телефона"
              />
              <PaymentCard
                eyebrow="Kaspi счет"
                value={PAYMENT_ACCOUNT}
                hint="Можно отправить перевод по реквизитам"
              />
            </div>
          </section>

          <aside className="grid gap-6">
            <section className="rounded-[36px] border border-black/10 bg-white/80 p-6 shadow-[0_24px_70px_rgba(31,24,21,0.08)] backdrop-blur-xl md:p-7">
              <p className="text-xs uppercase tracking-[0.32em] text-black/45">Что отправить в WhatsApp</p>
              <div className="mt-5 rounded-[26px] bg-[#fcf7f2] p-5">
                <p className="text-sm leading-7 text-black/70">
                  1. Чек или скриншот оплаты
                  <br />
                  2. Номер заказа: <span className="font-medium text-[#7f1118]">{orderId || "если уже есть"}</span>
                  <br />
                  3. Имя заказчика или название события
                </p>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#1f8f51] px-6 py-4 text-sm uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(31,143,81,0.28)] transition hover:bg-[#187443]"
              >
                Отправить чек в WhatsApp
              </a>

              <p className="mt-4 text-xs leading-6 text-black/45">
                Замените номера в коде страницы на реальные реквизиты Kaspi и рабочий WhatsApp перед публикацией.
              </p>
            </section>

            <section className="rounded-[36px] border border-[#7f1118]/12 bg-[#fff7f1] p-6 shadow-[0_24px_70px_rgba(31,24,21,0.06)]">
              <p className="text-xs uppercase tracking-[0.32em] text-[#7f1118]/55">Примечание</p>
              <p className="mt-4 text-sm leading-7 text-black/65">
                {error
                  ? `Не удалось загрузить заказ: ${error}. Страница все равно подойдет для ручной оплаты.`
                  : orderId
                  ? "Если заказ уже создан, номер заказа автоматически подставлен в инструкцию и сообщение WhatsApp."
                  : "Если номер заказа еще не выдан, страницу можно использовать как универсальную инструкцию по оплате."}
              </p>

              <Link
                to="/admin/orders"
                className="mt-5 inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-xs uppercase tracking-[0.2em] text-black/60 transition hover:border-[#7f1118]/25 hover:text-[#7f1118]"
              >
                Открыть список заказов
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

function PaymentStep({ index, title, text }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
      <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">{index}</p>
      <h2 className="mt-3 text-2xl font-medium text-[#f8f2ec]">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/70">{text}</p>
    </article>
  );
}

function PaymentCard({ eyebrow, value, hint }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[rgba(248,242,236,0.06)] p-5">
      <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">{eyebrow}</p>
      <p className="mt-3 text-sm leading-6 text-white/58">{hint}</p>
      <p className="mt-3 break-words font-['Georgia','Times_New_Roman',serif] text-2xl leading-tight text-white">
        {value}
      </p>
    </div>
  );
}

function InfoPill({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-full bg-white px-4 py-3 text-sm text-black/70 shadow-[0_10px_24px_rgba(31,24,21,0.06)]">
      <span className="text-[11px] uppercase tracking-[0.24em] text-black/40">{label}</span>
      <span className="max-w-[55%] truncate text-right font-medium text-[#7f1118]">{value}</span>
    </div>
  );
}
