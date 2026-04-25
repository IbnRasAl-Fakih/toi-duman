import React from "react";
import Footer from "../../components/footer.jsx";
import TemplatePaymentBanner from "../../components/template-payment-banner.jsx";
import AtmosphereSlider from "../../components/templates/romance-garden-template/atmosphere-slider.jsx";
import RomanceGardenAudioToggle from "../../components/templates/romance-garden-template/audio-toggle.jsx";
import RomanceGardenDivider from "../../components/templates/romance-garden-template/divider.jsx";
import InvitationCountdownTemplate6 from "../../components/templates/romance-garden-template/invitation-countdown.jsx";
import InvitationDetailsTemplate6 from "../../components/templates/romance-garden-template/invitation-details.jsx";
import InvitationHeroTemplate6 from "../../components/templates/romance-garden-template/invitation-hero.jsx";
import InvitationIntroTemplate6 from "../../components/templates/romance-garden-template/invitation-intro.jsx";
import InvitationRsvpTemplate6 from "../../components/templates/romance-garden-template/invitation-rsvp.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export const ROMANCE_GARDEN_TYPE = "wedding";
export const ROMANCE_GARDEN_PATH = "templates/romance-garden-page.jsx";

const ORDER_STATUS_PAID = "paid";

const responseOptions = [
  { value: "yes", label: "Иә, қуана келемін" },
  { value: "no", label: "Өкінішке орай, келе алмаймын" }
];

const monthNamesKk = [
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
  "желтоқсан"
];

const weekDaysKk = ["ДС", "СС", "СР", "БС", "ЖМ", "СБ", "ЖС"];

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

function formatTime(date) {
  return date.toLocaleTimeString("kk-KZ", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatLongDate(date) {
  return `${date.getDate()} ${monthNamesKk[date.getMonth()]} ${date.getFullYear()}`;
}

function buildCountdownParts(date, nowTimestamp) {
  const diff = date.getTime() - nowTimestamp;

  if (diff <= 0) {
    return [
      { label: "күн", value: "00" },
      { label: "сағат", value: "00" },
      { label: "минут", value: "00" }
    ];
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return [
    { label: "күн", value: String(days).padStart(2, "0") },
    { label: "сағат", value: String(hours).padStart(2, "0") },
    { label: "минут", value: String(minutes).padStart(2, "0") }
  ];
}

function buildCalendarCells(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mondayBasedStart = (firstDay.getDay() + 6) % 7;
  const cells = Array(mondayBasedStart).fill("");

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(String(day));
  }

  while (cells.length % 7 !== 0) {
    cells.push("");
  }

  return {
    monthLabel: monthNamesKk[month],
    yearLabel: String(year),
    weekDays: weekDaysKk,
    day: String(date.getDate()),
    cells
  };
}

export function mapEventToTemplate6(event, nowTimestamp = Date.now()) {
  const config = event.config || {};
  const date = new Date(event.date);
  const names = normalizeNames(config.name);
  const leftName = names[0] || "Аружан";
  const rightName = names[1] || "Нұрлан";
  const hosts = typeof config.hosts === "string" && config.hosts.trim() ? config.hosts.trim() : "";
  const venueName = typeof config.venue_name === "string" ? config.venue_name.trim() : "";
  const coverImageUrl = event.cover_image_url || "/images/templates/romance-garden/hero-poster.png";
  const uploadedGalleryImages = Array.isArray(config.gallery_image_urls)
    ? config.gallery_image_urls.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
  const fallbackGallery = [
    { src: coverImageUrl, alt: "Той орнының көрінісі" },
    { src: "/images/templates/romance-garden/swans-framed-ByH4RE7t.png", alt: "Жақтаудағы аққулар" },
    { src: "/images/templates/romance-garden/open6.png", alt: "Шақыру конверті" },
    { src: "/images/templates/romance-garden/venue-hedsor-DSq2yQw3.png", alt: "Өтетін орын иллюстрациясы" },
    { src: "/images/templates/romance-garden/eda6.png", alt: "Той дастарханы иллюстрациясы" },
    { src: "/images/templates/romance-garden/floral-vase-6x28LN74.png", alt: "Гүл ваза иллюстрациясы" }
  ];
  const galleryItems = uploadedGalleryImages.length
    ? uploadedGalleryImages.map((src, index) => ({
        src,
        alt: `Фото молодоженов ${index + 1}`
      }))
    : fallbackGallery;

  return {
    id: event.id,
    slug: event.slug,
    themeName: config.theme || "Үлгі 6",
    couple: {
      left: leftName,
      right: rightName,
      combined: `${leftName} & ${rightName}`
    },
    hero: {
      envelopeUrl: "/images/templates/romance-garden/open6.png",
      introVideoUrl: "/images/templates/romance-garden/intro-video-new-XmwQeafK.mp4",
      posterUrl: coverImageUrl,
      videoUrl: "/images/templates/romance-garden/0417.mp4",
      dateLabel: formatLongDate(date),
      title: config.heroTitle || "Үйлену тойына шақыру",
      subtitle: config.heroSubtitle || "Сізді қуаныш пен махаббатқа толы ең ерекше күнімізге бірге куә болуға шақырамыз."
    },
    countdown: buildCountdownParts(date, nowTimestamp),
    intro: {
      title: config.introTitle || "Қош келдіңіз!",
      description:
        event.description ||
        config.introText ||
        "Сіздерді махаббат пен мейірімге толы үйлену тойымыздың қадірлі қонағы болуға шын жүректен шақырамыз."
    },
    details: {
      dateLabel: formatLongDate(date),
      timeLabel: formatTime(date),
      calendar: buildCalendarCells(date),
      locationLabel: event.location || "Алматы",
      venueLabel: venueName || "Той өтетін орын",
      venueImageUrl: "/images/templates/romance-garden/venue-hedsor-DSq2yQw3.png",
      mapUrl: event.location_link || "#",
      mapLabel: config.mapLabel || "Карта арқылы ашу",
      hostsLabel: hosts || "Ата-аналар ақ батасын береді"
    },
    gallery: galleryItems,
    rsvp: {
      title: config.rsvpTitle || "Қатысуды растау",
      description: config.rsvpText || "Қатысуыңызды алдын ала растауыңызды сұраймыз.",
      namePlaceholder: config.rsvpNamePlaceholder || "Аты-жөніңізді енгізіңіз",
      guestCountLabel: config.guestCountLabel || "Қонақтар саны",
      submitLabel: config.submitLabel || "Жіберу",
      submittingLabel: config.submittingLabel || "Жіберілуде...",
      options: responseOptions
    }
  };
}

export default function RomanceGardenPage({
  event,
  order,
  previewMode = false,
  previewViewportHeight = null,
  onPreviewOpenChange = undefined,
  onPreviewAudioOverlayChange = undefined,
  onPreviewNotify = undefined
}) {
  const [guestName, setGuestName] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [guestCount, setGuestCount] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [nowTimestamp, setNowTimestamp] = React.useState(() => Date.now());
  const [isHeroReady, setIsHeroReady] = React.useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = React.useState(false);
  const introVideoRef = React.useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const audioRef = React.useRef(null);
  const notification = useNotification();
  const template = React.useMemo(() => mapEventToTemplate6(event, nowTimestamp), [event, nowTimestamp]);
  const isExample = event.is_example === true;
  const isPaid = order?.status === ORDER_STATUS_PAID;

  React.useEffect(() => {
    const timerId = window.setInterval(() => {
      setNowTimestamp(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    const handlePause = () => setIsMusicPlaying(false);
    const handlePlay = () => setIsMusicPlaying(true);

    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.pause();
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  React.useEffect(() => {
    if (previewMode) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (!isEnvelopeOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isEnvelopeOpen, previewMode]);

  React.useEffect(() => {
    if (!previewMode || typeof onPreviewOpenChange !== "function") {
      return;
    }

    onPreviewOpenChange(isEnvelopeOpen);
  }, [isEnvelopeOpen, onPreviewOpenChange, previewMode]);

  React.useEffect(() => {
    if (!previewMode || typeof onPreviewAudioOverlayChange !== "function") {
      return;
    }

    onPreviewAudioOverlayChange({
      isOpened: isEnvelopeOpen,
      isPlaying: isMusicPlaying,
      onToggleAudio: handleToggleMusic
    });
  }, [handleToggleMusic, isEnvelopeOpen, isMusicPlaying, onPreviewAudioOverlayChange, previewMode]);

  async function startMusicPlayback() {
    const audio = audioRef.current;
    if (!audio || !audio.paused) {
      return;
    }

    try {
      await audio.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  }

  async function handleSubmit() {
    if (previewMode) {
      setIsSubmitting(true);
      window.setTimeout(() => {
        setGuestName("");
        setSelectedStatus("");
        setGuestCount(1);
        setIsSubmitting(false);
        if (typeof onPreviewNotify === "function") {
          onPreviewNotify({ type: "success", message: "Жауабыңыз жіберілді" });
        } else {
          notification.success("Жауабыңыз жіберілді");
        }
      }, 250);
      return;
    }

    if (isExample) {
      notification.error("Demo event үшін қонақ жауаптары өшірілген");
      return;
    }

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
      payload.append("guest_count", String(guestCount));

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
      setGuestCount(1);
      notification.success("Жауабыңыз жіберілді");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Жауапты жіберу мүмкін болмады";
      notification.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleMusic() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch {
        setIsMusicPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsMusicPlaying(false);
  }

  function handleHeroReady() {
    setIsHeroReady(true);
  }

  function handleOpenInvitation() {
    const introVideo = introVideoRef.current;
    startMusicPlayback();

    if (!introVideo) {
      setIsEnvelopeOpen(true);
      return;
    }

    introVideo.currentTime = 0;
    introVideo.play().catch(() => {
      setIsEnvelopeOpen(true);
    });
  }

  return (
    <>
      {!isExample && !isPaid ? (
        <TemplatePaymentBanner
          order={order}
          backgroundClass="bg-[rgba(143,113,59,0.94)]"
          buttonClass="bg-[#6f5327] text-[#fffaf2] hover:bg-[#5f4520]"
          infoCardClass="border-white/18 bg-[#7b6130] text-[#fff7eb]"
          infoLabelClass="text-white/70"
          infoValueClass="text-white"
        />
      ) : null}

      <main
        className={`${previewMode ? "relative" : "min-h-screen sm:px-3"} bg-[linear-gradient(180deg,#f7f1e7_0%,#f6efe5_38%,#f5efe7_100%)] px-0 py-0 text-[#3c3021]`}
      >
        <audio ref={audioRef} preload="metadata" loop src="/musics/wedding-background-music-yxy0nS2O.mp3" />
        {!previewMode ? <RomanceGardenAudioToggle isPlaying={isMusicPlaying} onToggleAudio={handleToggleMusic} /> : null}

        <div
          className={`relative mx-auto w-full max-w-[430px] overflow-hidden bg-[#f8f4ed] shadow-[0_30px_80px_rgba(138,113,73,0.14)] ${
            isEnvelopeOpen ? (previewMode ? "" : "min-h-screen") : previewMode ? "" : "h-[100svh]"
          }`}
          style={
            previewMode && previewViewportHeight
              ? isEnvelopeOpen
                ? { minHeight: `${previewViewportHeight}px` }
                : { height: `${previewViewportHeight}px` }
              : undefined
          }
        >
          <InvitationHeroTemplate6
            template={template}
            introVideoRef={introVideoRef}
            isEnvelopeOpen={isEnvelopeOpen}
            onOpenInvitation={handleOpenInvitation}
            isHeroReady={isHeroReady}
            onIntroEnded={() => setIsEnvelopeOpen(true)}
            onHeroReady={handleHeroReady}
            viewportHeight={previewMode ? previewViewportHeight : null}
          />

          {isEnvelopeOpen ? (
            <div className="bg-[#faf6ef] px-5 pt-10">
              <InvitationCountdownTemplate6 template={template} />
              <AtmosphereSlider items={template.gallery} />

              <RomanceGardenDivider
                iconSrc="/images/templates/romance-garden/bow-illustration-DWFdIPv5.png"
                className="mt-4"
                imageClassName="h-32 w-32"
              />

              <InvitationIntroTemplate6 template={template} />
              <InvitationDetailsTemplate6 template={template} />
              <InvitationRsvpTemplate6
                template={template}
                guestName={guestName}
                selectedStatus={selectedStatus}
                guestCount={guestCount}
                onGuestNameChange={setGuestName}
                onSelectStatus={setSelectedStatus}
                onGuestCountChange={setGuestCount}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isPaid={previewMode || (!isExample && isPaid)}
              />

              <RomanceGardenDivider
                iconSrc="/images/templates/romance-garden/locket-illustration-B7vFK6H-.png"
                className="mt-2"
                imageClassName="h-auto w-[98px]"
              />

              <div className="px-5 pb-5 pt-12">
                <Footer />
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
