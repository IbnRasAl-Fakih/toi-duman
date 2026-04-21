import React from "react";
import Template5AudioToggle from "../../components/templates/theatre-of-love-template/audio-toggle.jsx";
import InvitationCountdownTemplate5 from "../../components/templates/theatre-of-love-template/invitation-countdown.jsx";
import InvitationDetailsTemplate5 from "../../components/templates/theatre-of-love-template/invitation-details.jsx";
import InvitationHeroTemplate5 from "../../components/templates/theatre-of-love-template/invitation-hero.jsx";
import InvitationNoteTemplate5 from "../../components/templates/theatre-of-love-template/invitation-note.jsx";
import InvitationRsvpTemplate5 from "../../components/templates/theatre-of-love-template/invitation-rsvp.jsx";
import InvitationTimelineTemplate5 from "../../components/templates/theatre-of-love-template/invitation-timeline.jsx";
import Footer from "../../components/footer.jsx";
import TemplatePaymentBanner from "../../components/template-payment-banner.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export const THEATRE_OF_LOVE_TYPE = "wedding";
export const THEATRE_OF_LOVE_PATH = "templates/theatre-of-love-page.jsx";

const ORDER_STATUS_PAID = "paid";

const monthFormatter = new Intl.DateTimeFormat("ru-RU", { month: "long" });

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

function formatDateLabel(date) {
  return `${date.getDate()} ${monthFormatter.format(date)} ${date.getFullYear()}`;
}

function formatTime(date) {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function buildCountdownParts(date, nowTimestamp) {
  const diff = date.getTime() - nowTimestamp;

  if (diff <= 0) {
    return [
      { label: "күн", value: "00" },
      { label: "сағат", value: "00" },
      { label: "минут", value: "00" },
      { label: "секунд", value: "00" }
    ];
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: "күн", value: pad(days) },
    { label: "сағат", value: pad(hours) },
    { label: "минут", value: pad(minutes) },
    { label: "секунд", value: pad(seconds) }
  ];
}

function getConfigText(config, key, fallback) {
  return typeof config?.[key] === "string" && config[key].trim() ? config[key].trim() : fallback;
}

export function mapEventToTemplate5(event, nowTimestamp = Date.now()) {
  const config = event.config || {};
  const date = new Date(event.date);
  const names = normalizeNames(config?.name);
  const leftName = names[0] || "Данияр";
  const rightName = names[1] || "Аружан";
  const hosts = getConfigText(config, "hosts", "Сіздерді асыға күтеміз");
  const venueName = getConfigText(config, "venue_name", "Grand Ballroom");
  const scheduleItems =
    Array.isArray(config?.schedule) && config.schedule.length
      ? config.schedule
      : [
          { time: "18:30", title: "Қонақтарды қарсы алу" },
          { time: "19:30", title: "Тойдың басталуы" }
        ];
  const rsvpOptions =
    Array.isArray(config?.rsvpOptions) && config.rsvpOptions.length
      ? config.rsvpOptions
      : [
          { value: "yes", label: getConfigText(config, "rsvpYesLabel", "Иә, келемін") },
          { value: "no", label: getConfigText(config, "rsvpNoLabel", "Өкінішке қарай, келе алмаймын") }
        ];

  return {
    id: event.id,
    slug: event.slug,
    title: getConfigText(config, "theme", "Template 5"),
    couple: {
      left: leftName,
      right: rightName,
      signature: `${leftName} & ${rightName}`
    },
    intro: {
      overline: getConfigText(config, "overline", "INVITATION"),
      title: getConfigText(config, "heroTitle", `${leftName}\n${rightName}`),
      message: event.description || getConfigText(config, "introText", "Сізді қуана қарсы аламыз")
    },
    hero: {
      openLabel: getConfigText(config, "heroOpenLabel", "Ашу"),
      openAriaLabel: getConfigText(config, "heroOpenAriaLabel", "Шақыруды ашу"),
      scrollLabel: getConfigText(config, "heroScrollLabel", "Төмен сырғыту")
    },
    details: {
      day: pad(date.getDate()),
      month: monthFormatter.format(date),
      year: String(date.getFullYear()),
      dateLabel: formatDateLabel(date),
      timeLabel: formatTime(date),
      placeLabel: event.location || "Алматы",
      galleryImages: Array.isArray(config?.galleryImages) && config.galleryImages.length ? config.galleryImages : null,
      labels: {
        date: getConfigText(config, "detailsDateLabel", "Күні"),
        time: getConfigText(config, "detailsTimeLabel", "Уақыты"),
        place: getConfigText(config, "detailsPlaceLabel", "Өтетін орны")
      }
    },
    countdown: {
      title: getConfigText(config, "countdownTitle", "Тойдың басталуына қалды"),
      items: buildCountdownParts(date, nowTimestamp)
    },
    venue: {
      sectionLabel: getConfigText(config, "venueSectionLabel", "Өтетін орны"),
      subtitle: getConfigText(config, "venueSubtitle", "Мереке осы жерде өтеді"),
      title: getConfigText(config, "venueTitle", venueName),
      location: event.location || "Алматы",
      dateLabel: formatDateLabel(date),
      mapUrl: event.location_link || "#",
      mapLabel: getConfigText(config, "mapLabel", "Картаны ашу")
    },
    timeline: {
      title: getConfigText(config, "timelineTitle", "Бағдарлама"),
      items: scheduleItems
    },
    note: {
      title: getConfigText(config, "noteTitle", "Келетініңіз біз үшін қуаныш"),
      text: getConfigText(
        config,
        "noteText",
        "Тойды алдын ала дайындау үшін қатысатыныңызды ертерек растауыңызды сұраймыз."
      )
    },
    hosts: {
      label: getConfigText(config, "hostsLabel", "Ізгі тілекпен"),
      value: hosts
    },
    rsvp: {
      title: getConfigText(config, "rsvpTitle", "Қатысуыңызды растаңыз"),
      description: getConfigText(config, "rsvpDescription", "Төмендегі форманы толтырып, жауабыңызды жіберіңіз."),
      namePlaceholder: getConfigText(config, "rsvpNamePlaceholder", "Аты-жөніңіз"),
      submitLabel: getConfigText(config, "rsvpSubmitLabel", "Жауап жіберу"),
      submittingLabel: getConfigText(config, "rsvpSubmittingLabel", "Жіберілуде..."),
      options: rsvpOptions
    }
  };
}

export default function TheatreOfLovePage({
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
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isInvitationOpened, setIsInvitationOpened] = React.useState(false);
  const audioRef = React.useRef(null);
  const notification = useNotification();
  const template = React.useMemo(() => mapEventToTemplate5(event, nowTimestamp), [event, nowTimestamp]);
  const isExample = event.is_example === true;
  const isPaid = order?.status === ORDER_STATUS_PAID;

  React.useEffect(() => {
    if (typeof onPreviewOpenChange === "function") {
      onPreviewOpenChange(isInvitationOpened);
    }
  }, [isInvitationOpened, onPreviewOpenChange]);

  React.useEffect(() => {
    if (typeof onPreviewAudioOverlayChange === "function") {
      onPreviewAudioOverlayChange({
        isOpened: isInvitationOpened,
        isPlaying,
        onToggleAudio: handleToggleAudio
      });
    }
  }, [isInvitationOpened, isPlaying, onPreviewAudioOverlayChange]);

  React.useEffect(() => {
    if (!previewMode) {
      document.documentElement.classList.add("theme-template-5");
    }

    const timerId = window.setInterval(() => {
      setNowTimestamp(Date.now());
    }, 1000);

    const audio = audioRef.current;
    const handleEnded = () => {
      if (!audio) {
        return;
      }

      audio.currentTime = 0;
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    };
    const handlePlay = () => {
      setIsPlaying(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
    };

    if (audio) {
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    if (!previewMode && !isInvitationOpened) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      if (!previewMode) {
        document.documentElement.classList.remove("theme-template-5");
      }
      window.clearInterval(timerId);
      if (!previewMode) {
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousHtmlOverflow;
      }

      if (audio) {
        audio.pause();
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      }
    };
  }, [isInvitationOpened, previewMode]);

  React.useEffect(() => {
    if (!isInvitationOpened) {
      return undefined;
    }

    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    let isCancelled = false;
    const startPlayback = () => {
      audio.play().catch(() => {
        if (!isCancelled) {
          setIsPlaying(false);
        }
      });
    };

    if (audio.readyState >= 2) {
      startPlayback();
      return () => {
        isCancelled = true;
      };
    }

    audio.load();
    audio.addEventListener("canplay", startPlayback, { once: true });

    return () => {
      isCancelled = true;
      audio.removeEventListener("canplay", startPlayback);
    };
  }, [isInvitationOpened]);

  async function handleToggleAudio() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  function handleOpenInvitation() {
    setIsInvitationOpened(true);
  }

  async function handleSubmit() {
    if (previewMode) {
      setIsSubmitting(true);
      window.setTimeout(() => {
        setGuestName("");
        setSelectedStatus("");
        setIsSubmitting(false);
        if (typeof onPreviewNotify === "function") {
          onPreviewNotify({ type: "success", message: "Жауабыңыз сәтті жіберілді" });
        } else {
          notification.success("Жауабыңыз сәтті жіберілді");
        }
      }, 250);
      return;
    }

    if (isExample) {
      notification.error("Demo event үшін қонақ жауаптары өшірілген");
      return;
    }

    if (!isPaid) {
      notification.error("Жауап жіберу үлгі төленгеннен кейін қолжетімді болады");
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
      notification.success("Жауабыңыз сәтті жіберілді");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Жауапты жіберу мүмкін болмады";
      notification.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`${previewMode ? "relative" : "min-h-screen "}bg-[linear-gradient(180deg,#fff6f1_0%,#fdf3ee_32%,#fff9f5_100%)]`}>
      {!isExample && !isPaid ? (
        <TemplatePaymentBanner
          order={order}
          backgroundClass="bg-[rgba(143,64,52,0.94)]"
          buttonClass="bg-[#723127] text-[#fff9f5] hover:bg-[#60271f]"
          infoCardClass="border-white/20 bg-white/10 text-[#fff9f5]"
          infoLabelClass="text-white/70"
          infoValueClass="text-white"
        />
      ) : null}

      <audio ref={audioRef} preload="auto" src="/musics/intro-music-CzqJOUtA.mp3" />

      <main
        className={`mx-auto w-full max-w-[430px] overflow-hidden bg-[#fff9f5] shadow-[0_0_0_1px_rgba(171,110,95,0.08),0_36px_80px_rgba(110,46,37,0.12)] ${
          isInvitationOpened ? (previewMode ? "min-h-[100svh]" : "min-h-screen") : "h-[100svh]"
        }`}
        style={
          previewMode && previewViewportHeight
            ? isInvitationOpened
              ? { minHeight: `${previewViewportHeight}px` }
              : { height: `${previewViewportHeight}px` }
            : undefined
        }
      >
        {isInvitationOpened && !previewMode ? <Template5AudioToggle isPlaying={isPlaying} onToggleAudio={handleToggleAudio} /> : null}

        <InvitationHeroTemplate5
          template={template}
          isOpened={isInvitationOpened}
          onOpen={handleOpenInvitation}
          viewportHeight={previewMode ? previewViewportHeight : null}
        />
        {isInvitationOpened ? (
          <>
            <InvitationDetailsTemplate5 template={template} viewportHeight={previewMode ? previewViewportHeight : null} />
            <InvitationCountdownTemplate5 template={template} viewportHeight={previewMode ? previewViewportHeight : null} />
            <InvitationTimelineTemplate5 template={template} viewportHeight={previewMode ? previewViewportHeight : null} />
            <InvitationNoteTemplate5 template={template} />
            <InvitationRsvpTemplate5
              template={template}
              guestName={guestName}
              selectedStatus={selectedStatus}
              onGuestNameChange={setGuestName}
              onSelectStatus={setSelectedStatus}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isPaid={previewMode || (!isExample && isPaid)}
            />
            <div className="px-5 pb-5">
              <Footer />
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
