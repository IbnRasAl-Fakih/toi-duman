import React from "react";
import InvitationDetailsTemplate3 from "../../components/templates/template-3/invitation-details.jsx";
import InvitationHeroTemplate3 from "../../components/templates/template-3/invitation-hero.jsx";
import InvitationIntroTemplate3 from "../../components/templates/template-3/invitation-intro.jsx";
import InvitationMessageTemplate3 from "../../components/templates/template-3/invitation-message.jsx";
import InvitationRsvpTemplate3 from "../../components/templates/template-3/invitation-rsvp.jsx";
import TemplatePaymentBanner from "../../components/template-payment-banner.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export const TEMPLATE_3_TYPE = "wedding";
export const TEMPLATE_3_PATH = "templates/invitation-page_template_3.jsx";

const ORDER_STATUS_PAID = "paid";
const responseOptions = [
  { value: "yes", label: "Келемін" },
  { value: "no", label: "Келе алмаймын" },
];

const monthNames = [
  "қаңтар",
  "ақпан",
  "наурыз",
  "сәуір",
  "мамыр",
  "маусым",
  "шілде",
  "тамыз",
  "қыркүйек",
  "қазан",
  "қараша",
  "желтоқсан",
];

function formatTime(date) {
  return date.toLocaleTimeString("kk-KZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateLabel(date) {
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} жыл`;
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

function buildCountdownParts(date, nowTimestamp) {
  const diff = date.getTime() - nowTimestamp;

  if (diff <= 0) {
    return [
      { label: "күн", value: "00" },
      { label: "сағат", value: "00" },
      { label: "минут", value: "00" },
      { label: "секунд", value: "00" },
    ];
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: "күн", value: String(days).padStart(2, "0") },
    { label: "сағат", value: String(hours).padStart(2, "0") },
    { label: "минут", value: String(minutes).padStart(2, "0") },
    { label: "секунд", value: String(seconds).padStart(2, "0") },
  ];
}

export function mapEventToTemplate3(event, nowTimestamp = Date.now()) {
  const date = new Date(event.date);
  const names = normalizeNames(event.config?.name);
  const leftName = names[0] || "Санжар";
  const rightName = names[1] || "Айлана";
  const hosts = typeof event.config?.hosts === "string" && event.config.hosts.trim() ? event.config.hosts.trim() : "";
  const venueName = typeof event.config?.venue_name === "string" ? event.config.venue_name.trim() : "";
  const location = event.location || "Алматы қ-сы";
  const mapUrl = event.location_link || "#";

  return {
    id: event.id,
    slug: event.slug,
    name: event.config?.theme || "Template 3",
    heroImageUrl: event.cover_image_url || "/images/templates/template-3/hero-background.webp",
    couple: {
      left: leftName,
      right: rightName,
    },
    hero: {
      kicker: "Үйлену тойға шақыру",
      dateLabel: formatDateLabel(date),
    },
    intro: {
      title: "Құрметті қонақтар!",
      description:
        event.description ||
        "Балаларымыздың жаңа шаңырақ көтеруіне арналған салтанатты тойымыздың куәсі болып, ақ дастарханымыздан дәм татуға шақырамыз!",
    },
    countdown: buildCountdownParts(date, nowTimestamp),
    details: {
      backgroundImageUrl: "/images/templates/template-3/details-backgorund.webp",
      aboutTitle: "Той жайлы",
      hostsLabel: "Той иелері:",
      hosts,
      timeTitle: "Той уақыты",
      dateLabel: formatDateLabel(date),
      timeLabel: formatTime(date),
      placeTitle: "Той мекенжайы",
      location,
      venue: venueName,
      mapUrl,
    },
    message: {
      paragraphs: [
        "Қадірлі қонағымыз! Тағдырымыздағы ең маңызды әрі бақытты күндердің бірі жақындап қалды.",
        "Бұл қуанышты сәтті сізбен бірге өткізіп, бақытымызды бөліскіміз келеді.",
        "Сізді салтанатты мерекелік дастарханымыздың қадірлі қонағы ретінде көруге қуаныштымыз!",
      ],
    },
    rsvp: {
      title: "Құрметті қонақ, тойға қатысуыңызды растауыңызды сұраймыз!",
      backgroundImageUrl: "/images/templates/template-3/rspv-background.webp",
      nameLabel: "Есіміңіз",
      namePlaceholder: "Аты-жөніңіз",
      questionLabel: "Келе аласыз ба?",
    },
  };
}

export default function InvitationTemplate3Page({ event, order }) {
  const [guestName, setGuestName] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [nowTimestamp, setNowTimestamp] = React.useState(() => Date.now());
  const notification = useNotification();
  const template = React.useMemo(() => mapEventToTemplate3(event, nowTimestamp), [event, nowTimestamp]);
  const isPaid = order?.status === ORDER_STATUS_PAID;

  React.useEffect(() => {
    document.documentElement.classList.add("theme-template-3");

    const timerId = window.setInterval(() => {
      setNowTimestamp(Date.now());
    }, 1000);

    return () => {
      document.documentElement.classList.remove("theme-template-3");
      window.clearInterval(timerId);
    };
  }, []);

  async function handleSubmit() {
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
        body: payload,
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
    <div className="min-h-screen bg-[#ece7e1]">
      {!isPaid ? (
        <TemplatePaymentBanner
          order={order}
          backgroundClass="bg-[rgba(116,107,97,0.9)]"
          buttonClass="bg-[#928679] hover:bg-[#7f7468]"
          infoCardClass="border-white/15 bg-white/8 text-white/90"
          infoLabelClass="text-white/70"
          infoValueClass="text-white"
        />
      ) : null}

      <main className="mx-auto w-full max-w-[420px] overflow-hidden bg-[#ece7e1] shadow-[0_0_0_1px_rgba(120,105,90,0.14)]">
        <InvitationHeroTemplate3 template={template} />
        <InvitationIntroTemplate3 template={template} />
        <InvitationDetailsTemplate3 template={template} />
        <InvitationMessageTemplate3 template={template} />
        <InvitationRsvpTemplate3
          template={template}
          guestName={guestName}
          selectedStatus={selectedStatus}
          onGuestNameChange={setGuestName}
          onSelectStatus={setSelectedStatus}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          responseOptions={responseOptions}
        />
      </main>
    </div>
  );
}
