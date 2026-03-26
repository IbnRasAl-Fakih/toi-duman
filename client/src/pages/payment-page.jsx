import React from "react";
import { useParams } from "react-router-dom";
import InfoPill from "../components/payment/info-pill.jsx";
import PaymentCard from "../components/payment/payment-card.jsx";
import PaymentStep from "../components/payment/payment-step.jsx";

const PAYMENT_PHONE = process.env.REACT_APP_PAYMENT_PHONE || "";
const PAYMENT_ACCOUNT = process.env.REACT_APP_PAYMENT_ACCOUNT || "";
const PAYMENT_USER_NAME = process.env.REACT_APP_PAYMENT_USER_NAME || "";
const WHATSAPP_PHONE = process.env.REACT_APP_WHATSAPP_PHONE || "";

function formatAmount(value) {
  if (value == null) return null;

  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);

  return new Intl.NumberFormat("ru-RU").format(numeric);
}

function formatAccountForDisplay(value) {
  return String(value || "")
    .replace(/\s+/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatPhoneForDisplay(value) {
  const digits = String(value || "").replace(/\D+/g, "");

  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  }

  return String(value || "").trim();
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

  const resolvedOrderId = order?.id || orderId || "";
  const resolvedAmount = order?.amount ? `${formatAmount(order.amount)} ₸` : "";
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${buildWhatsappMessage(resolvedOrderId)}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f1ea] text-[#201815]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-[#b91c1c]/10 blur-3xl" />
        <div className="absolute right-[-60px] top-[140px] h-[260px] w-[260px] rounded-full bg-[#d97706]/10 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[18%] h-[260px] w-[260px] rounded-full bg-[#7f1118]/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 lg:px-10 lg:py-10">
        <header className="rounded-[36px] border border-black/10 bg-white/75 px-6 py-6 shadow-[0_24px_80px_rgba(31,24,21,0.08)] backdrop-blur-xl md:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="lg:pr-6">
              <p className="text-xs uppercase tracking-[0.38em] text-[#7f1118]/55">Payment Page</p>
              <h1 className="mt-7 font-['Georgia','Times_New_Roman',serif] text-4xl leading-[0.94] text-[#7f1118] md:text-6xl">
                Оплата пригласительной
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-black/65 md:text-base">
                Переведите оплату на Kaspi, затем отправьте чек в WhatsApp.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#7f1118]/10 bg-[#fffaf6] p-5 lg:self-stretch">
              <p className="text-xs uppercase tracking-[0.28em] text-black/45">Статус</p>
              <div className="mt-3 space-y-3">
                <InfoPill label="Заказ" value={isLoading ? "Загрузка..." : resolvedOrderId} />
                <InfoPill label="Сумма" value={isLoading ? "..." : resolvedAmount} />
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-[36px] border border-black/10 bg-[#1a1616] p-6 text-[#f8f2ec] shadow-[0_28px_80px_rgba(18,16,16,0.18)] md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 bg-[#7f1118] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white">
              Как активировать
            </span>
          </div>

          <div className="mt-6 grid gap-4">
            <PaymentStep
              index="01"
              title="Сделайте перевод"
              text={
                <p>
                  Отправьте оплату на номер Kaspi или на счет ниже
                  {resolvedAmount ? (
                    <>
                      {" "}на сумму <strong className="font-semibold text-[#f8f2ec]">{resolvedAmount}</strong>
                    </>
                  ) : null}
                  .
                </p>
              }
            />

            <div className="my-4 grid gap-4 md:grid-cols-2">
              <PaymentCard
                eyebrow="Kaspi номер"
                value={formatPhoneForDisplay(PAYMENT_PHONE)}
                copyValue={PAYMENT_PHONE}
                ownerName={PAYMENT_USER_NAME}
                hint="Перевод по номеру телефона"
              />
              <PaymentCard
                eyebrow="Kaspi счет"
                value={formatAccountForDisplay(PAYMENT_ACCOUNT)}
                copyValue={PAYMENT_ACCOUNT}
                ownerName={PAYMENT_USER_NAME}
                hint="Можно отправить перевод по реквизитам"
              />
            </div>

            <PaymentStep
              index="02"
              title="Отправьте чек в WhatsApp"
              text={
                <p>
                  Пришлите чек в WhatsApp и укажите номер заказа
                  {resolvedOrderId ? (
                    <>
                      : <strong className="font-semibold text-[#f8f2ec]">{resolvedOrderId}</strong>
                    </>
                  ) : null}
                  .
                </p>
              }
            />

            <div className="flex justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#1f8f51] px-5 py-3 text-xs uppercase tracking-[0.16em] text-white shadow-[0_14px_32px_rgba(31,143,81,0.24)] transition hover:bg-[#187443]"
              >
                Отправить чек в WhatsApp
              </a>
            </div>
          </div>
        </section>

        {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
      </section>
    </main>
  );
}
