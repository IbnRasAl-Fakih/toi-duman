import React from "react";
import Footer from "../../components/footer.jsx";
import TemplatePaymentBanner from "../../components/template-payment-banner.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export const TEMPLATE_6_TYPE = "invitation_v6";
export const TEMPLATE_6_PATH = "templates/invitation-page_template_6.jsx";

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
  const date = new Date(event.date);
  const names = normalizeNames(event.config?.name);
  const leftName = names[0] || "Аружан";
  const rightName = names[1] || "Нұрлан";
  const hosts = typeof event.config?.hosts === "string" && event.config.hosts.trim() ? event.config.hosts.trim() : "";
  const venueName = typeof event.config?.venue_name === "string" ? event.config.venue_name.trim() : "";
  const coverImageUrl = event.cover_image_url || "/images/templates/template-6/hero-poster.png";
  const uploadedGalleryImages = Array.isArray(event.config?.gallery_image_urls)
    ? event.config.gallery_image_urls.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
  const fallbackGallery = [
    {
      src: coverImageUrl,
      alt: "Той орнының көрінісі"
    },
    {
      src: "/images/templates/template-6/swans-framed-ByH4RE7t.png",
      alt: "Жақтаудағы аққулар"
    },
    {
      src: "/images/templates/template-6/open6.png",
      alt: "Шақыру конверті"
    },
    {
      src: "/images/templates/template-6/venue-hedsor-DSq2yQw3.png",
      alt: "Өтетін орын иллюстрациясы"
    },
    {
      src: "/images/templates/template-6/eda6.png",
      alt: "Той дастарханы иллюстрациясы"
    },
    {
      src: "/images/templates/template-6/floral-vase-6x28LN74.png",
      alt: "Гүл ваза иллюстрациясы"
    }
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
    themeName: event.config?.theme || "Үлгі 6",
    couple: {
      left: leftName,
      right: rightName,
      combined: `${leftName} & ${rightName}`
    },
    hero: {
      envelopeUrl: "/images/templates/template-6/open6.png",
      introVideoUrl: "/images/templates/template-6/intro-video-new-XmwQeafK.mp4",
      posterUrl: coverImageUrl,
      videoUrl: "/images/templates/template-6/0417.mp4",
      dateLabel: formatLongDate(date),
      title: event.config?.heroTitle || "Үйлену тойына шақыру",
      subtitle: event.config?.heroSubtitle || "Сізді қуаныш пен махаббатқа толы ең ерекше күнімізге бірге куә болуға шақырамыз."
    },
    countdown: buildCountdownParts(date, nowTimestamp),
    intro: {
      title: event.config?.introTitle || "Қош келдіңіз!",
      description:
        event.description ||
        event.config?.introText ||
        "Сіздерді махаббат пен мейірімге толы үйлену тойымыздың қадірлі қонағы болуға шын жүректен шақырамыз."
    },
    details: {
      dateLabel: formatLongDate(date),
      timeLabel: formatTime(date),
      calendar: buildCalendarCells(date),
      locationLabel: event.location || "Алматы",
      venueLabel: venueName || "Той өтетін орын",
      venueImageUrl: "/images/templates/template-6/venue-hedsor-DSq2yQw3.png",
      mapUrl: event.location_link || "#",
      mapLabel: event.config?.mapLabel || "Карта арқылы ашу",
      hostsLabel: hosts || "Ата-аналар ақ батасын береді"
    },
    gallery: galleryItems,
    rsvp: {
      title: event.config?.rsvpTitle || "Қатысуды растау",
      description: event.config?.rsvpText || "Қатысуыңызды алдын ала растауыңызды сұраймыз.",
      submitLabel: event.config?.submitLabel || "Жіберу"
    }
  };
}

function SectionShell({ children, className = "", paper = false }) {
  return (
    <section
      className={`relative overflow-hidden ${paper ? "bg-[#fbf8f1]" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

function Divider({ iconSrc, className = "", imageClassName = "" }) {
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`}>
      <img src={iconSrc} alt="" className={`h-16 w-16 object-contain opacity-80 ${imageClassName}`} />
    </div>
  );
}

function MusicPlayingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
    </svg>
  );
}

function Countdown({ items }) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-3 text-center">
      {items.map((item) => (
        <div key={item.label} className="px-3 py-4">
          <div
            className="text-[1.9rem] leading-none text-[#8b6a34]"
            style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
          >
            {item.value}
          </div>
          <div className="mt-1 text-[0.78rem] uppercase tracking-[0.22em] text-[#b38d57]">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function GalleryCard({ item, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
    </div>
  );
}

function wrapSlideIndex(index, length) {
  return ((index % length) + length) % length;
}

function getSlideOffset(index, activeIndex, length) {
  const direct = index - activeIndex;
  const wrappedLeft = direct - length;
  const wrappedRight = direct + length;
  return [direct, wrappedLeft, wrappedRight].reduce((closest, current) =>
    Math.abs(current) < Math.abs(closest) ? current : closest
  );
}

function AtmosphereSlider({ items }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!items.length) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setActiveIndex((current) => wrapSlideIndex(current + 1, items.length));
    }, 4200);

    return () => {
      window.clearInterval(timerId);
    };
  }, [items.length]);

  return (
    <section className="relative px-0 py-8">
      <div className="relative h-[27rem] overflow-hidden">
        {items.map((item, index) => {
          const offset = getSlideOffset(index, activeIndex, items.length);
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          let translateX = "0%";
          let scale = 0.74;
          let opacity = 0;
          let widthClass = "w-[42%]";
          let zIndex = 0;

          if (offset === 0) {
            translateX = "0%";
            scale = 1;
            opacity = 1;
            widthClass = "w-[68%]";
            zIndex = 30;
          } else if (offset === -1) {
            translateX = "-73%";
            scale = 0.84;
            opacity = 0.72;
            widthClass = "w-[45%]";
            zIndex = 20;
          } else if (offset === 1) {
            translateX = "73%";
            scale = 0.84;
            opacity = 0.72;
            widthClass = "w-[45%]";
            zIndex = 20;
          } else if (offset < -1) {
            translateX = "-120%";
          } else if (offset > 1) {
            translateX = "120%";
          }

          return (
            <div
              key={`${item.src}-${index}`}
              className={`absolute left-1/2 top-0 aspect-[0.72] overflow-hidden rounded-[34px] bg-[#f6efe4] shadow-[0_28px_54px_rgba(138,113,73,0.18)] transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${widthClass}`}
              style={{
                transform: `translateX(calc(-50% + ${translateX})) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: isCenter ? "auto" : "none"
              }}
              aria-hidden={!isVisible}
            >
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(74,49,17,0.18)_100%)]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MusicMutedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  );
}

export default function InvitationTemplate6Page({ event, order }) {
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

  async function handleSubmit() {
    if (isExample) {
      notification.error("Для demo event ответы гостей отключены");
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
      notification.success("Жауабыңыз жіберілді");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Жауапты жіберу мүмкін болмады";
      notification.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isReadyToSubmit = Boolean(!isSubmitting && !isExample && isPaid && guestName.trim() && selectedStatus);
  const isDisabled = !isPaid || isSubmitting;

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

  function handleOpenInvitation() {
    const introVideo = introVideoRef.current;

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

      <main className="min-h-screen bg-[linear-gradient(180deg,#f7f1e7_0%,#f6efe5_38%,#f5efe7_100%)] px-0 py-0 text-[#3c3021] sm:px-3">
        <audio ref={audioRef} preload="metadata" loop src="/images/templates/template-6/wedding-background-music-yxy0nS2O.mp3" />
        <button
          type="button"
          onClick={handleToggleMusic}
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-[#8f713b] shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-md transition duration-300 hover:scale-[1.03]"
          aria-label={isMusicPlaying ? "Музыканы тоқтату" : "Музыканы қосу"}
        >
          {isMusicPlaying ? <MusicPlayingIcon /> : <MusicMutedIcon />}
        </button>

        <div className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-[#f8f4ed] shadow-[0_30px_80px_rgba(138,113,73,0.14)]">
          <div
            className={`absolute inset-x-0 top-0 z-40 h-[100svh] overflow-hidden bg-[#f8f4ed] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isEnvelopeOpen ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            aria-hidden={isEnvelopeOpen}
            onClick={handleOpenInvitation}
          >
            <video
              ref={introVideoRef}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
              playsInline
              muted
              preload="auto"
              poster={template.hero.envelopeUrl}
              onEnded={() => setIsEnvelopeOpen(true)}
            >
              <source src={template.hero.introVideoUrl} type="video/mp4" />
            </video>
            <button type="button" onClick={handleOpenInvitation} className="sr-only" aria-label="Шақыруды ашу" />
          </div>

          <SectionShell className="relative min-h-[100svh] bg-[#e9dfcf]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,8,0.42)_0%,rgba(16,12,8,0.5)_52%,rgba(16,12,8,0.6)_100%)]" />
            <img
              src={template.hero.posterUrl}
              alt={template.couple.combined}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isHeroReady ? "opacity-0" : "opacity-100"}`}
            />
            <video
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isHeroReady ? "opacity-100" : "opacity-0"}`}
              autoPlay
              muted
              loop
              playsInline
              poster={template.hero.posterUrl}
              onCanPlay={() => setIsHeroReady(true)}
            >
              <source src={template.hero.videoUrl} type="video/mp4" />
            </video>

            <div className="relative z-10 min-h-[100svh] px-6 pb-10 pt-6 text-center text-white">
              <div className="absolute inset-x-0 top-[7%] px-6 sm:top-[6%]">
                <h1
                  className="text-[3.7rem] leading-[0.82] drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                  style={{ fontFamily: '"Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive' }}
                >
                  <span className="block text-6xl font-normal leading-[0.9] text-white drop-shadow-lg md:text-8xl lg:text-9xl">
                    {template.couple.left}
                  </span>
                  <span className="relative my-4 block -translate-y-[40%] text-[2.05rem] leading-[0.7] md:my-5 md:text-[3rem] lg:text-[3.6rem]">
                    &amp;
                  </span>
                  <span className="block text-6xl font-normal leading-[0.9] text-white drop-shadow-lg md:text-8xl lg:text-9xl">
                    {template.couple.right}
                  </span>
                </h1>
              </div>

              <div className="absolute inset-x-0 bottom-10 w-full px-8 py-3">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <span className="h-px w-12 bg-white/70 md:w-24" />
                  <span className="text-xl text-white drop-shadow-lg">✦</span>
                  <span className="h-px w-12 bg-white/70 md:w-24" />
                </div>
                <p className="text-[1rem] uppercase tracking-[0.34em] text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
                  {template.hero.dateLabel}
                </p>
              </div>
            </div>
          </SectionShell>

          <div className="bg-[#faf6ef] px-5 pb-14 pt-10">
            <SectionShell paper className="bg-[radial-gradient(circle_at_top,#fffef9_0%,#f7f1e7_100%)] px-6 py-10">
              <img
                src="/images/templates/template-6/floral-vase-6x28LN74.png"
                alt=""
                className="mx-auto h-auto w-[98px] object-contain opacity-90"
              />
              <h2
                className="mt-5 text-center text-[3.1rem] italic leading-none text-[#8f713b]"
                style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
              >
                <span className="uppercase">Т</span>ой уақыты
              </h2>
              <p className="mt-3 text-center text-[0.8rem] uppercase tracking-[0.3em] text-[#b08d57]">
                {template.hero.dateLabel} күніне дейін
              </p>
              <Countdown items={template.countdown} />
            </SectionShell>

            <AtmosphereSlider items={template.gallery} />

            <Divider
              iconSrc="/images/templates/template-6/bow-illustration-DWFdIPv5.png"
              className="mt-4"
              imageClassName="h-32 w-32"
            />

            <SectionShell paper className="mt-6 bg-[#fffdfa] px-7 py-12">
              <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "url('/images/templates/template-6/phon6.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div className="relative z-10 text-center">
                <h2
                  className="text-[2.35rem] italic leading-none text-[#8f713b]"
                  style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
                >
                  {template.intro.title}
                </h2>
                <p
                  className="mx-auto mt-6 max-w-[300px] text-[1rem] leading-8 text-[#82673c]"
                  style={{ fontFamily: '"Template Welcome Serif", "Cormorant Garamond", "Times New Roman", serif' }}
                >
                  {template.intro.description}
                </p>
                <div className="mt-10 flex justify-center">
                  <img src="/images/templates/template-6/swans-framed-ByH4RE7t.png" alt="" className="h-auto w-[170px] object-contain opacity-85" />
                </div>
              </div>
            </SectionShell>

            <section className="mt-10 px-6 py-4">
              <div className="space-y-14 text-center">
                <div className="px-2 py-2">
                  <img
                    src="/images/templates/template-6/cupid-illustration-BO3_EWaD.png"
                    alt=""
                    className="mx-auto h-auto w-[98px] object-contain"
                  />
                  <p
                    className="mt-5 text-[1.9rem] leading-none text-[#8f713b]"
                    style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
                  >
                    Күні мен уақыты
                  </p>
                  <p
                    className="mt-3 text-center text-[2.8rem] leading-none text-[#b08d57]"
                    style={{ fontFamily: '"Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive' }}
                  >
                    {template.details.calendar.yearLabel}
                  </p>
                  <div className="mx-auto mt-5 max-w-[290px] rounded-[28px] bg-[linear-gradient(180deg,#fffdf8_0%,#f8f1e4_100%)] px-4 py-5 shadow-[0_16px_34px_rgba(160,131,78,0.08)] ring-1 ring-[#eadcc3]">
                    <div className="text-center text-[1rem] uppercase tracking-[0.22em] text-[#b4945d]">
                      {template.details.calendar.monthLabel}
                    </div>
                    <div className="mt-4 grid grid-cols-7 text-center text-[0.72rem] tracking-[0.08em] text-[#b79a68]">
                      {template.details.calendar.weekDays.map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-7 gap-y-2 text-[1rem] text-[#8b6a34]">
                      {template.details.calendar.cells.map((cell, index) => {
                        const isSelected = cell === template.details.calendar.day;

                        return (
                          <div key={`${cell || "empty"}-${index}`} className="flex justify-center">
                            {cell ? (
                              <span
                                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                                  isSelected
                                    ? "bg-[linear-gradient(180deg,#ecd5a7_0%,#d8b679_100%)] text-[#7a5724] shadow-[0_10px_20px_rgba(188,151,87,0.24)] ring-1 ring-[#e2c894]"
                                    : "text-[#9f8050]"
                                }`}
                              >
                                {cell}
                              </span>
                            ) : (
                              <span className="h-9 w-9" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <p
                    className="mt-2 text-[3rem] leading-none text-[#8f713b]"
                    style={{ fontFamily: '"Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive' }}
                  >
                    {template.details.timeLabel}
                  </p>
                </div>

                <div className="px-2 py-2">
                  <img
                    src={template.details.venueImageUrl}
                    alt={template.details.venueLabel}
                    className="mx-auto h-auto w-full max-w-[260px] object-contain"
                  />
                  <p
                    className="mt-5 text-[1.9rem] leading-none text-[#8f713b]"
                    style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
                  >
                    Өтетін орны
                  </p>
                  <p className="mt-2 text-[1rem] text-[#8f713b]">{template.details.locationLabel}</p>
                  <a
                    href={template.details.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#dbc39f] bg-white px-4 py-2 text-[0.82rem] font-semibold text-[#8f713b] transition duration-200 hover:bg-[#fcf7ef]"
                  >
                    <img src="/images/2gis-icon-logo.svg" alt="2GIS" className="h-4 w-4 shrink-0 object-contain" />
                    {template.details.mapLabel}
                  </a>
                </div>

                <div className="px-2 py-2">
                  <img
                    src="/images/templates/template-6/champagne-tower-Or6MBjHQ.png"
                    alt=""
                    className="mx-auto mb-4 h-auto w-[98px] object-contain"
                  />
                  <p
                    className="mt-10 text-[2.4rem] leading-none text-[#8f713b]"
                    style={{ fontFamily: '"Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive' }}
                  >
                    Той иелері
                  </p>
                  <p
                    className="mt-8 text-[1.35rem] leading-tight text-[#7a6035]"
                    style={{ fontFamily: '"Template Welcome Serif", "Times New Roman", serif' }}
                  >
                    {template.details.hostsLabel}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6 px-6 py-10">
              <h2
                className="text-center text-[2.75rem] leading-none text-[#8f713b]"
                style={{ fontFamily: '"Template Welcome Serif", "Times New Roman", serif' }}
              >
                {template.rsvp.title}
              </h2>

              <div className="mt-7 space-y-3">
                <input
                  type="text"
                  value={guestName}
                  onChange={(eventValue) => setGuestName(eventValue.target.value)}
                  disabled={isDisabled}
                  placeholder="Аты-жөніңізді енгізіңіз"
                  className="w-full rounded-[18px] border border-[#e8dcc7] bg-[#fffcf8] px-4 py-3.5 text-[15px] text-[#3f3325] outline-none placeholder:text-[#ae9a78] focus:border-[#c8a969] disabled:cursor-not-allowed disabled:opacity-60"
                />

                <div className="px-2 py-3 text-center">
                  <div className="flex items-center justify-center gap-3 text-[#b08d57]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-[1.55rem] w-[1.55rem]" aria-hidden="true">
                      <path
                        d="M16 19a4 4 0 0 0-8 0M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 19a4 4 0 0 0-3-3.87M17 11a3 3 0 1 0 0-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p
                      className="text-[1.7rem] leading-none text-[#8f713b]"
                      style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
                    >
                      Қонақтар саны
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-6">
                    <button
                      type="button"
                      disabled={isDisabled || guestCount <= 1}
                      onClick={() => (isDisabled ? null : setGuestCount((current) => Math.max(1, current - 1)))}
                      className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#eadfcd] bg-[#fffdfa] text-[1.5rem] text-[#a9824c] transition hover:bg-[#fcf6ed] disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Қонақ санын азайту"
                    >
                      -
                    </button>

                    <span
                      className="min-w-[2ch] text-center text-[1.6rem] text-[#7a6035]"
                      style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
                    >
                      {guestCount}
                    </span>

                    <button
                      type="button"
                      disabled={isDisabled || guestCount >= 10}
                      onClick={() => (isDisabled ? null : setGuestCount((current) => Math.min(10, current + 1)))}
                      className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#eadfcd] bg-[#fffdfa] text-[1.5rem] text-[#a9824c] transition hover:bg-[#fcf6ed] disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Қонақ санын көбейту"
                    >
                      +
                    </button>
                  </div>
                </div>

                {responseOptions.map((option) => {
                  const isSelected = selectedStatus === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => (isDisabled ? null : setSelectedStatus(option.value))}
                      className={`flex w-full items-center gap-4 px-1 py-2 text-left transition duration-300 ${
                        isDisabled ? "cursor-not-allowed opacity-60" : ""
                      }`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                        <span
                          className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition duration-300 ${
                            isSelected
                              ? "border-[#b57a24] bg-[#fffaf1] shadow-[0_4px_12px_rgba(175,118,33,0.18)]"
                              : "border-[#c9ab70]"
                          }`}
                        >
                          {isSelected ? (
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="relative h-[0.72rem] w-[0.72rem] text-[#b7771c]"
                            >
                              <circle cx="12" cy="12" r="10" fill="currentColor" />
                            </svg>
                          ) : null}
                        </span>
                      </span>
                      <span
                        className={`text-[1rem] leading-6 ${
                          isSelected ? "text-[#7a6035]" : "text-[#4a3a28]"
                        }`}
                        style={{
                          fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
                          textShadow: isSelected ? "0 2px 8px rgba(183,144,86,0.12)" : "none"
                        }}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={!isReadyToSubmit}
                onClick={handleSubmit}
                className={`mt-6 flex w-full items-center justify-center gap-2 px-4 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.18em] text-white transition ${
                  isReadyToSubmit ? "bg-[#8f713b] opacity-100 hover:bg-[#7a6032]" : "bg-[#c8b288] opacity-60"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
                <span
                  className="text-[1.35rem] tracking-[0.08em]"
                  style={{ fontFamily: '"Template Igrunok", "Times New Roman", serif' }}
                >
                  {isSubmitting ? "Жіберілуде..." : template.rsvp.submitLabel}
                </span>
              </button>
            </section>

            <Divider
              iconSrc="/images/templates/template-6/locket-illustration-B7vFK6H-.png"
              className="mt-2"
              imageClassName="h-auto w-[98px]"
            />

            <div className="pt-12">
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
