import React from "react";
import InvitationHero from "../../components/templates/template-2/invitation-hero.jsx";
import InvitationBody from "../../components/templates/template-2/invitation-body.jsx";
import InvitationRsvp from "../../components/templates/template-2/invitation-rsvp.jsx";
import InvitationVenue from "../../components/templates/template-2/invitation-venue.jsx";
import Footer from "../../components/footer.jsx";
import TemplatePaymentBanner from "../../components/template-payment-banner.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export const TEMPLATE_2_TYPE = "wedding";
export const TEMPLATE_2_PATH = "templates/invitation-page_template_2.jsx";

const ORDER_STATUS_PAID = "paid";
const responseOptions = [
  { value: "yes", label: "Иә, мен келемін!" },
  { value: "no", label: "Өкінішке орай, келе алмаймын" }
];

const monthNames = [
  "Қаңтар",
  "Ақпан",
  "Наурыз",
  "Сәуір",
  "Мамыр",
  "Маусым",
  "Шілде",
  "Тамыз",
  "Қыркүйек",
  "Қазан",
  "Қараша",
  "Желтоқсан"
];

const weekDayLabels = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"];

function formatTime(date) {
  return date.toLocaleTimeString("kk-KZ", {
    hour: "2-digit",
    minute: "2-digit"
  });
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

function buildCalendarGrid(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const cells = Array.from({ length: startOffset + daysInMonth }, (_, index) => {
    if (index < startOffset) {
      return null;
    }

    return index - startOffset + 1;
  });

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function buildCountdownParts(date, nowTimestamp) {
  const diff = date.getTime() - nowTimestamp;

  if (diff <= 0) {
    return [
      { label: "Күн", value: "00" },
      { label: "Сағат", value: "00" },
      { label: "Минут", value: "00" },
      { label: "Секунд", value: "00" }
    ];
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: "Күн", value: String(days).padStart(2, "0") },
    { label: "Сағат", value: String(hours).padStart(2, "0") },
    { label: "Минут", value: String(minutes).padStart(2, "0") },
    { label: "Секунд", value: String(seconds).padStart(2, "0") }
  ];
}

export function mapEventToTemplate2(event, nowTimestamp = Date.now()) {
  const date = new Date(event.date);
  const names = normalizeNames(event.config?.name);
  const leftName = names[0] || "Асыл";
  const rightName = names[1] || "Әсем";
  const signature = names.length ? names.join(" & ") : `${leftName} & ${rightName}`;
  const familyLabel = typeof event.config?.hosts === "string" && event.config.hosts.trim() ? event.config.hosts.trim() : "";
  const hostLabel = "Той иелері";

  return {
    id: event.id,
    slug: event.slug,
    name: event.config?.theme || "Template 2",
    coverImageUrl: event.cover_image_url || "",
    couple: {
      left: leftName,
      right: rightName,
      signature
    },
    intro: {
      title: "Құрметті ағайын-туыс, құда-жекжат, дос-жаран!",
      subtitle:
        "Шаңырақ көтеру тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз",
      overline: "Сіздерді балаларымыз"
    },
    calendar: {
      month: monthNames[date.getMonth()],
      year: String(date.getFullYear()),
      time: formatTime(date),
      day: date.getDate(),
      grid: buildCalendarGrid(date),
      weekDays: weekDayLabels,
      fullDateLabel: `${date.getFullYear()} жыл ${monthNames[date.getMonth()].toLowerCase()} айының ${date.getDate()} күні`,
      countdown: buildCountdownParts(date, nowTimestamp)
    },
    venue: {
      title: "Той уақыты",
      city: event.location || "???",
      place: typeof event.config?.venue_name === "string" ? event.config.venue_name : "",
      mapUrl: event.location_link || "#"
    },
    hosts: {
      title: hostLabel,
      family: familyLabel
    },
    rsvp: {
      title: "Сіз келесіз бе?",
      description: "Тойымыздың қадірлі қонақтары болыңыз!"
    }
  };
}

export default function InvitationTemplate2Page({ event, order }) {
  const [guestName, setGuestName] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [nowTimestamp, setNowTimestamp] = React.useState(() => Date.now());
  const template = React.useMemo(() => mapEventToTemplate2(event, nowTimestamp), [event, nowTimestamp]);
  const isPaid = order?.status === ORDER_STATUS_PAID;
  const notification = useNotification();

  React.useEffect(() => {
    document.documentElement.classList.add("theme-template-2");

    const timerId = window.setInterval(() => {
      setNowTimestamp(Date.now());
    }, 1000);

    return () => {
      document.documentElement.classList.remove("theme-template-2");
      window.clearInterval(timerId);
    };
  }, []);

  async function handleSubmit() {
    if (!isPaid) {
      notification.error("Жауаптар шаблон төленгеннен кейін ғана қолжетімді");
      return;
    }

    if (!guestName.trim()) {
      notification.error("Аты-жөніңізді енгізіңіз");
      return;
    }

    if (!selectedStatus) {
      notification.error("Жауап нұсқасын таңдаңыз");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("event_id", String(template.id));
      payload.append("name", guestName.trim());
      payload.append("status", selectedStatus);

      const response = await fetch("/api/v1/guests", {
        method: "POST",
        body: payload
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Жауапты жіберу мүмкін болмады");
      }

      setGuestName("");
      setSelectedStatus("");
      notification.success("Жауабыңыз жіберілді");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Жауапты жіберу мүмкін болмады";
      notification.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#dceff2]">
      {!isPaid ? (
        <TemplatePaymentBanner
          order={order}
          backgroundClass="bg-[rgba(111,167,198,0.88)]"
          buttonClass="bg-[#6fa7c6] hover:bg-[#5f98b8]"
          infoCardClass="border-white/20 bg-[#6fa7c6]/65 text-white"
          infoLabelClass="text-white/80"
          infoValueClass="text-white"
        />
      ) : null}
      <main className="min-h-screen bg-[#dceff2] px-3 py-6 pb-3 text-[#23495b] sm:px-5">
        <div className="mx-auto w-full max-w-[430px] border-x-2 border-[#79aeca] px-3 sm:px-4">
          <div className="space-y-8">
            <InvitationHero template={template} />
            <InvitationBody template={template} />
            <InvitationVenue template={template} />
            <InvitationRsvp
              template={template}
              guestName={guestName}
              selectedStatus={selectedStatus}
              onGuestNameChange={setGuestName}
              onSelectStatus={setSelectedStatus}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isPaid={isPaid}
              responseOptions={responseOptions}
            />
            <div className="px-5 pt-2">
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
