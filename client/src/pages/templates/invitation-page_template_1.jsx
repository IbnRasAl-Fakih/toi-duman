import React from "react";
import InvitationCalendarTemplate1 from "../../components/template-1/invitation-calendar_template_1.jsx";
import InvitationHeroTemplate1 from "../../components/template-1/invitation-hero_template_1.jsx";
import InvitationIntroTemplate1 from "../../components/template-1/invitation-intro_template_1.jsx";
import InvitationRsvpTemplate1 from "../../components/template-1/invitation-rsvp_template_1.jsx";
import InvitationVenueTemplate1 from "../../components/template-1/invitation-venue_template_1.jsx";
import TemplatePaymentBanner from "../../components/template-payment-banner.jsx";

export const TEMPLATE_1_TYPE = "wedding";
export const TEMPLATE_1_PATH = "templates/invitation-page_template_1.jsx";

const ORDER_STATUS_PAID = "paid";

const responseOptions = [
  { value: "yes", label: "Да, я приду!" },
  { value: "no", label: "К сожалению, не смогу" }
];

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

const weekdayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

function formatTime(date) {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function buildDateRow(date) {
  return [-2, -1, 0, 1, 2].map((offset) => {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + offset);
    return String(nextDate.getDate()).padStart(2, "0");
  });
}

function buildWeekDays(date) {
  const startIndex = date.getDay();
  return Array.from({ length: 7 }, (_, index) => weekdayNames[(startIndex + index + 4) % 7]);
}

function normalizeNames(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function mapEventToTemplate1(event) {
  const date = new Date(event.date);
  const names = normalizeNames(event.config?.name);
  const leftName = names[0] || "Имя";
  const rightName = names[1] || "Имя";
  const signature = names.length ? names.join(" & ") : `${leftName} & ${rightName}`;

  return {
    id: event.slug,
    name: event.config?.theme || "Template 1",
    category: event.type === "wedding" ? "Свадебное приглашение" : "Приглашение",
    coverImageUrl: event.cover_image_url || "",
    couple: {
      left: leftName,
      right: rightName,
      signature
    },
    intro: {
      title: "Дорогие гости!",
      paragraphs: event.description
        ? [event.description]
        : ["Мы будем рады разделить с вами этот день и провести его в кругу близких и дорогих людей."]
    },
    calendar: {
      month: monthNames[date.getMonth()],
      year: String(date.getFullYear()),
      time: formatTime(date),
      day: String(date.getDate()).padStart(2, "0"),
      weekday: weekdayNames[date.getDay()],
      dateRow: buildDateRow(date),
      weekDays: buildWeekDays(date)
    },
    venue: {
      title: "Наш адрес:",
      city: event.location,
      place: "",
      type: "",
      mapUrl: event.location_link || "#"
    },
    rsvp: {
      title: "Дорогой гость, просим подтвердить ваше участие"
    }
  };
}

export default function InvitationTemplate1Page({ event, order }) {
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const template = React.useMemo(() => mapEventToTemplate1(event), [event]);
  const isPaid = order?.status === ORDER_STATUS_PAID;

  function handleSubmit() {
    if (!selectedStatus) {
      return;
    }
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#240f11] to-[#111112] font-['Georgia','Times_New_Roman',serif] text-[#f5e7dc]">
        <section className="w-full">
          <div className="w-full bg-[#f5e7dc] text-[#7f1118]">
            <InvitationHeroTemplate1 template={template} />
            <div className="w-full bg-[#f5e7dc]">
              <InvitationIntroTemplate1 template={template} />
              <InvitationCalendarTemplate1 template={template} />
              <InvitationVenueTemplate1 template={template} />
              <InvitationRsvpTemplate1
                template={template}
                selectedStatus={selectedStatus}
                onSelectStatus={setSelectedStatus}
                onSubmit={handleSubmit}
                responseOptions={responseOptions}
              />
            </div>
          </div>
        </section>
      </main>
      {!isPaid ? <TemplatePaymentBanner order={order} /> : null}
    </>
  );
}
