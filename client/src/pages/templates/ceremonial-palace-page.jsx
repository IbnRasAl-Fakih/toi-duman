import React from "react";
import Footer from "../../components/footer.jsx";
import TemplatePaymentBanner from "../../components/template-payment-banner.jsx";
import CeremonialPalaceAudioToggle from "../../components/templates/ceremonial-palace-template/audio-toggle.jsx";
import InvitationCountdownCeremonialPalace from "../../components/templates/ceremonial-palace-template/invitation-countdown.jsx";
import InvitationDetailsCeremonialPalace from "../../components/templates/ceremonial-palace-template/invitation-details.jsx";
import InvitationDressCodeCeremonialPalace from "../../components/templates/ceremonial-palace-template/invitation-dress-code.jsx";
import InvitationHeroCeremonialPalace from "../../components/templates/ceremonial-palace-template/invitation-hero.jsx";
import InvitationIntroCeremonialPalace from "../../components/templates/ceremonial-palace-template/invitation-intro.jsx";
import InvitationLocationCeremonialPalace from "../../components/templates/ceremonial-palace-template/invitation-location.jsx";
import InvitationRsvpCeremonialPalace from "../../components/templates/ceremonial-palace-template/invitation-rsvp.jsx";
import InvitationTimelineCeremonialPalace from "../../components/templates/ceremonial-palace-template/invitation-timeline.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export const CEREMONIAL_PALACE_TYPE = "wedding";
export const CEREMONIAL_PALACE_PATH = "templates/ceremonial-palace-page.jsx";

const ORDER_STATUS_PAID = "paid";

function pad(value) {
  return String(value).padStart(2, "0");
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

function getText(config, key, fallback) {
  return typeof config?.[key] === "string" && config[key].trim() ? config[key].trim() : fallback;
}

function formatHeroDate(date) {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`;
}

function formatLongDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function formatCountdown(date, nowTimestamp) {
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
    { label: "Күн", value: pad(days) },
    { label: "Сағат", value: pad(hours) },
    { label: "Минут", value: pad(minutes) },
    { label: "Секунд", value: pad(seconds) }
  ];
}

export function mapEventToCeremonialPalace(event, nowTimestamp = Date.now()) {
  const config = event.config || {};
  const names = normalizeNames(config.name);
  const uploadedGalleryImages = Array.isArray(config.gallery_image_urls)
    ? config.gallery_image_urls.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
  const date = new Date(event.date);
  const leftName = names[0] || "Виктор";
  const rightName = names[1] || "Паула";
  const schedule =
    Array.isArray(config.schedule) && config.schedule.length
      ? config.schedule
      : [
          { time: "16:00", title: "Неке қию рәсімі" },
          { time: "17:00", title: "Қонақтарды қарсы алу" },
          { time: "19:00", title: "Кешкі ас" },
          { time: "20:00", title: "Той кеші" }
        ];

  return {
    id: event.id,
    slug: event.slug,
    couple: {
      left: leftName,
      right: rightName,
      combined: `${leftName} & ${rightName}`
    },
    hero: {
      dayLabel: getText(config, "dayLabel", "Үйлену тойы"),
      dateLabel: formatHeroDate(date),
      videoUrl: "/images/templates/ceremonial-palace/IMG_6230.MP4"
    },
    intro: {
      title: getText(config, "introTitle", "Құрметті ағайын-туыс, достар!"),
      paragraphs: [
        getText(config, "introParagraph1", "Өміріміздегі ең маңызды күндердің бірін сіздермен бірге қарсы алғымыз келеді."),
        getText(config, "introParagraph2", "Қуанышымызға ортақ болып, ақ тілектеріңізді арнасаңыздар, біз үшін үлкен мәртебе.")
      ]
    },
    countdown: {
      title: getText(config, "countdownTitle", "Тойдың басталуына қалды"),
      items: formatCountdown(date, nowTimestamp)
    },
    timeline: {
      title: getText(config, "timelineTitle", "Той бағдарламасы"),
      items: schedule
    },
    location: {
      title: getText(config, "locationTitle", "Мекенжай"),
      venue: getText(config, "venue_name", "Chateau de Paon"),
      address: event.location || "Мекенжай жақын арада хабарланады",
      mapUrl: event.location_link || "#",
      mapLabel: getText(config, "mapLabel", "Картаны ашу"),
      dateLabel: formatLongDate(date)
    },
    dressCode: {
      title: getText(config, "dressCodeTitle", "Галерея"),
      description: getText(config, "dressCodeDescription", "Естелік сәттерімізден шағын галерея."),
      note: getText(config, "dressCodeNote", "Галереяға арналған суреттер."),
      galleryImages: uploadedGalleryImages
    },
    details: {
      title: getText(config, "detailsTitle", "Қосымша ақпарат"),
      description: getText(config, "detailsDescription", "Қосымша сұрақтар бойынша той ұйымдастырушысына хабарласа аласыз."),
      organizerName: getText(config, "organizerName", "Әмина"),
      organizerPhone: getText(config, "organizerPhone", "+7 777 777 77 77"),
      giftText: getText(
        config,
        "giftText",
        "Сіздердің келіп, қуанышымызға ортақ болғандарыңыз біз үшін ең үлкен сый. Егер сый жасауды қаласаңыздар, жас отбасымыздың болашағына қосқан үлестеріңізді ризашылықпен қабылдаймыз."
      )
    },
    rsvp: {
      title: getText(config, "rsvpTitle", "Қатысуыңызды растаңыз"),
      description: getText(config, "rsvpDescription", "Той дайындығын нақтылау үшін қатысатыныңызды белгілеуіңізді сұраймыз."),
      namePlaceholder: getText(config, "rsvpNamePlaceholder", "Аты-жөніңіз"),
      submitLabel: getText(config, "rsvpSubmitLabel", "Жіберу"),
      submittingLabel: getText(config, "rsvpSubmittingLabel", "Жіберілуде..."),
      options: [
        { value: "yes", label: getText(config, "rsvpYesLabel", "Иә, қуана қатысамын") },
        { value: "no", label: getText(config, "rsvpNoLabel", "Өкінішке қарай, қатыса алмаймын") }
      ]
    },
    farewell: {
      title: getText(config, "farewellTitle", "Сіздерді асыға күтеміз!"),
      signature: getText(config, "farewellSignature", `${leftName} және ${rightName}`),
      imageAlt: getText(config, "farewellImageAlt", "Жас жұбайлардың суреті")
    }
  };
}
export default function CeremonialPalacePage({
  event,
  order,
  previewMode = false,
  previewViewportHeight = null,
  onPreviewOpenChange,
  onPreviewAudioOverlayChange,
  onPreviewNotify
}) {
  const [guestName, setGuestName] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [nowTimestamp, setNowTimestamp] = React.useState(() => Date.now());
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);
  const audioRef = React.useRef(null);
  const notification = useNotification();
  const template = React.useMemo(() => mapEventToCeremonialPalace(event, nowTimestamp), [event, nowTimestamp]);
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

    const handlePlay = () => setIsMusicPlaying(true);
    const handlePause = () => setIsMusicPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  React.useEffect(() => {
    if (previewMode) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (!isOpened) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpened, previewMode]);

  React.useEffect(() => {
    if (typeof onPreviewOpenChange === "function") {
      onPreviewOpenChange(isOpened);
    }
  }, [isOpened, onPreviewOpenChange]);

  React.useEffect(() => {
    if (typeof onPreviewAudioOverlayChange === "function") {
      onPreviewAudioOverlayChange({
        isOpened,
        isPlaying: isMusicPlaying,
        onToggleAudio: handleToggleMusic
      });
    }
  }, [isMusicPlaying, isOpened, onPreviewAudioOverlayChange]);

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

  async function handleOpenInvitation() {
    setIsOpened(true);
    const audio = audioRef.current;

    if (!audio) {
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
      notification.error("Демо шақыруда қонақ жауаптары өшірулі");
      return;
    }

    if (!isPaid) {
      notification.error("Қонақ жауаптары шаблон төленгеннен кейін қолжетімді болады");
      return;
    }

    if (!guestName.trim()) {
      notification.error("Аты-жөніңізді енгізіңіз");
      return;
    }

    if (!selectedStatus) {
      notification.error("Қатысу жауабын таңдаңыз");
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
    <>
      {!isExample && !isPaid ? (
        <TemplatePaymentBanner
          order={order}
          backgroundClass="bg-[rgba(122,6,38,0.94)]"
          buttonClass="bg-[#f4ebe5] text-[#7a0626] hover:bg-[#ffffff]"
          infoCardClass="border-white/20 bg-white/10 text-[#fff8f2]"
          infoLabelClass="text-white/70"
          infoValueClass="text-white"
        />
      ) : null}

      <main className={`${previewMode ? "relative" : "min-h-screen"} bg-[linear-gradient(180deg,#fbf6f1_0%,#f7f0ea_100%)]`}>
        <audio ref={audioRef} preload="metadata" loop src="/musics/Alex-Warren-Ordinary.mp3" />
        {!previewMode && isOpened ? <CeremonialPalaceAudioToggle isPlaying={isMusicPlaying} onToggleAudio={handleToggleMusic} /> : null}

        <div
          className={`mx-auto w-full max-w-[430px] overflow-hidden bg-[#fbf6f1] shadow-[0_30px_80px_rgba(73,48,53,0.14)] ${
            isOpened ? (previewMode ? "min-h-[100svh]" : "min-h-screen") : "h-[100svh]"
          }`}
          style={
            previewMode && previewViewportHeight
              ? isOpened
                ? { minHeight: `${previewViewportHeight}px` }
                : { height: `${previewViewportHeight}px` }
              : undefined
          }
        >
          <InvitationHeroCeremonialPalace
            template={template}
            isOpened={isOpened}
            onOpen={handleOpenInvitation}
            viewportHeight={previewMode ? previewViewportHeight : null}
          />

          {isOpened ? (
            <>
              <InvitationIntroCeremonialPalace template={template} />
              <InvitationCountdownCeremonialPalace template={template} />
              <InvitationTimelineCeremonialPalace template={template} />
              <InvitationLocationCeremonialPalace template={template} />
              <InvitationDressCodeCeremonialPalace template={template} />
              <InvitationDetailsCeremonialPalace template={template} />
              <InvitationRsvpCeremonialPalace
                template={template}
                guestName={guestName}
                selectedStatus={selectedStatus}
                onGuestNameChange={setGuestName}
                onSelectStatus={setSelectedStatus}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isPaid={previewMode || (!isExample && isPaid)}
              />
              <div className="bg-[#7a0626] px-5 pb-5 pt-6">
                <Footer className="text-white/65" dividerClassName="bg-white/15" />
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
