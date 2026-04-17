import React from "react";
import Footer from "../../components/footer.jsx";
import TemplatePaymentBanner from "../../components/template-payment-banner.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export const TEMPLATE_4_TYPE = "invitation_v4";
export const TEMPLATE_4_PATH = "templates/invitation-page_template_4.jsx";

const ORDER_STATUS_PAID = "paid";
const BORDER_COLOR = "#9b5962";
const PAPER_COLOR = "#f6eedc";
const CARD_COLOR = "#93535d";
const CARD_TEXT_COLOR = "#f8efe6";
const responseOptions = [
  { value: "yes", label: "Иә, мен келемін!" },
  { value: "no", label: "Өкінішке орай, келе алмаймын" }
];

const monthNamesKk = [
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

function formatDisplayName(name) {
  const value = String(name || "").trim();
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createMonthCalendar(date) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const cells = [];

  for (let index = 0; index < startOffset; index += 1) {
    cells.push("");
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(String(day));
  }

  while (cells.length % 7 !== 0) {
    cells.push("");
  }

  return cells;
}

function formatTime(date) {
  return date.toLocaleTimeString("kk-KZ", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatHeroDate(date) {
  return `${date.getFullYear()} жылы ${monthNamesKk[date.getMonth()]} айының ${date.getDate()} күні`;
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

export function mapEventToTemplate4(event, nowTimestamp = Date.now()) {
  const date = new Date(event.date);
  const names = normalizeNames(event.config?.name);
  const leftName = names[0] || "Азамат";
  const rightName = names[1] || "Ару";
  const signature = names.length ? names.join(" & ") : `${leftName} & ${rightName}`;
  const familyLabel = typeof event.config?.hosts === "string" && event.config.hosts.trim() ? event.config.hosts.trim() : "";
  const monthCalendar = createMonthCalendar(date);

  return {
    id: event.id,
    slug: event.slug,
    coverImageUrl: event.cover_image_url || "",
    name: event.config?.theme || "Template 4",
    couple: {
      left: formatDisplayName(leftName),
      right: formatDisplayName(rightName),
      signature
    },
    hero: {
      greeting: event.config?.greeting || "ҚҰРМЕТТІ АҒАЙЫН-ТУЫС, ҚҰДА-ЖЕКЖАТ, ДОС-ЖАРАН!",
      subtitle: event.config?.subtitle || "Сіздерді балаларымыздың:"
    },
    intro: {
      title: event.config?.introTitle || `${leftName} & ${rightName}`,
      text:
        event.description ||
        event.config?.introText ||
        "Шаңырақ көтеру тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз",
      overline: event.config?.overline || "Сіздерді балаларымыздың"
    },
    calendar: {
      title: event.config?.calendarTitle || "Той уақыты",
      heroDate: formatHeroDate(date),
      monthLabel: monthNamesKk[date.getMonth()],
      year: date.getFullYear(),
      day: String(date.getDate()),
      time: formatTime(date).replace(":", " : "),
      cells: monthCalendar,
      weekDays: weekDayLabels,
      fullDateLabel: `${date.getFullYear()} жыл ${monthNamesKk[date.getMonth()].toLowerCase()} айының ${date.getDate()} күні`,
      countdown: buildCountdownParts(date, nowTimestamp)
    },
    venue: {
      title: event.config?.venueTitle || "Той уақыты",
      location: event.location || "Astana, Farhi Hall",
      place: typeof event.config?.venue_name === "string" ? event.config.venue_name : "",
      mapUrl: event.location_link || "#",
      mapLabel: event.config?.mapLabel || "КАРТА АРҚЫЛЫ АШУ"
    },
    hosts: {
      title: event.config?.hostsTitle || "Той иелері",
      names: familyLabel || "Сырымбетовтар әулеті"
    },
    rsvp: {
      title: event.config?.rsvpTitle || "Сіз келесіз бе?",
      submitLabel: event.config?.submitLabel || "ЖІБЕРУ",
      description: event.config?.rsvpFooter || "Тойымыздың қадірлі қонақтары болыңыз!"
    }
  };
}

function MusicIcon({ isPlaying }) {
  if (isPlaying) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="6" y="5" width="3" height="14" rx="1.5" fill="currentColor" />
        <rect x="15" y="5" width="3" height="14" rx="1.5" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path d="M8 6.2v11.6L18 12 8 6.2Z" fill="currentColor" />
    </svg>
  );
}

function OrnamentMotif({ className = "" }) {
  return (
    <svg viewBox="0 0 120 64" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 40c6 0 11-5 11-11S26 18 20 18c-7 0-12 5-12 12 0 8 6 15 15 15 10 0 15-8 19-15 5 7 10 15 19 15s15-7 19-15c4 7 9 15 19 15 9 0 15-7 15-15 0-7-5-12-12-12-6 0-11 5-11 11s5 11 11 11"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 8c0 9-9 14-16 20m16-20c0 9 9 14 16 20"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SideOrnament({ side }) {
  return (
    <div
      className={`pointer-events-none absolute ${side}-0 top-0 bottom-0 z-10 flex w-[30px] justify-center overflow-hidden`}
      aria-hidden="true"
    >
      <div
        className={`absolute left-1/2 top-1/2 h-[27px] w-[5000px] -translate-x-1/2 -translate-y-1/2 opacity-95 ${
          side === "right" ? "rotate-90" : "-rotate-90"
        }`}
        style={{
          backgroundImage: "url('/images/templates/template-4/3.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "351px 27px"
        }}
      />
    </div>
  );
}

function SectionCard({ children, className = "", dark = false }) {
  return (
    <section
      className={`rounded-[46px] px-8 py-10 shadow-[0_10px_30px_rgba(77,38,44,0.08)] ${className}`}
      style={{
        background: dark ? CARD_COLOR : PAPER_COLOR,
        color: dark ? CARD_TEXT_COLOR : "#1e1a18"
      }}
    >
      {children}
    </section>
  );
}

function Countdown({ items }) {
  return (
    <div className="mt-8 flex items-start justify-center gap-2 text-center text-[#f6eadf]">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="min-w-[46px]">
            <div className="text-[1.55rem] font-semibold leading-none tracking-[0.03em]">{item.value}</div>
            <div className="mt-1.5 text-[0.82rem]">{item.label}</div>
          </div>
          {index < items.length - 1 ? <div className="pt-0.5 text-[1.55rem] leading-none text-[#ead2c9]">|</div> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function Template4Hero({ template, isPlaying, onToggleAudio }) {
  const coverImageUrl = template.coverImageUrl || "/images/templates/template-1/couple-photo.svg";

  return (
    <section className="relative">
      <div className="overflow-hidden rounded-b-[42px] bg-[#e8dcc4] shadow-[0_18px_42px_rgba(96,60,52,0.12)]">
        <img src={coverImageUrl} alt="Той иелері" className="aspect-[4/5] w-full rounded-b-[42px] object-cover" />
      </div>

      <div className="mt-7 flex items-center justify-center gap-4 text-[color:var(--ornament-color)]">
        <img
          src="/images/templates/template-4/3.svg"
          alt=""
          className="h-auto w-full max-w-[250px] opacity-95"
        />
      </div>
    </section>
  );
}

function Template4Intro({ template }) {
  return (
    <SectionCard dark className="mt-10 text-center">
      <p className="mx-auto max-w-[520px] text-[1.05rem] uppercase leading-[1.45] tracking-[0.08em] text-[#f6e7de]">
        {template.hero.greeting}
      </p>

      <p className="mt-9 text-[1.15rem] text-[#f7e8df]">{template.intro.overline}</p>
      <h2
        className="mt-5 text-[2.9rem] leading-none text-white"
        style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
      >
        {template.intro.title}
      </h2>
      <p className="mx-auto mt-8 max-w-[540px] text-[1.18rem] leading-[1.7] text-[#f4e5dc]">
        {template.intro.text}
      </p>
    </SectionCard>
  );
}

function Template4Calendar({ template }) {
  return (
    <SectionCard dark className="mt-10 text-center">
      <h3 className="text-[1.9rem] font-semibold text-white">{template.calendar.title}</h3>
      <p className="mt-5 text-[1rem] leading-relaxed text-[#f3dfd9]">{template.calendar.fullDateLabel}</p>

      <div className="mx-auto mt-7 max-w-[320px] rounded-[28px] bg-white/5 px-4 py-5 ring-1 ring-white/10">
        <div className="mb-3 grid grid-cols-7 text-center text-[0.82rem] font-medium tracking-[0.02em] text-[#f1d9d1]">
          {template.calendar.weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-[1.15rem] font-semibold text-[#fff4ec]">
          {template.calendar.cells.map((cell, index) => {
            const isSelected = cell === template.calendar.day;

            return (
              <div key={`${cell || "empty"}-${index}`} className="flex justify-center">
                {cell ? (
                  <span
                    className={`relative inline-flex h-9 w-9 items-center justify-center ${
                      isSelected
                        ? "rounded-full bg-[#f7e8dc] font-bold text-[#93535d] ring-2 ring-[#f3d4c9] shadow-[0_6px_18px_rgba(249,231,222,0.28)]"
                        : ""
                    }`}
                  >
                    <span className={`relative ${isSelected ? "-translate-y-[1px]" : ""}`}>{cell}</span>
                  </span>
                ) : (
                  <span className="h-9 w-9" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}

function Template4Venue({ template, targetDate }) {
  return (
    <SectionCard dark className="mt-10 text-center">
      <div className="text-[2rem] font-semibold text-white">{template.calendar.time}</div>
      <p className="mt-7 text-[1.22rem] text-[#f6e4db]">{template.venue.location}</p>
      {template.venue.place ? <p className="mt-1.5 text-[1.12rem] text-[#edd4cd]">{template.venue.place}</p> : null}

      <a
        href={template.venue.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex max-w-full items-center gap-2 rounded-2xl bg-[#f6e8d0] px-3 py-2 text-[0.78rem] font-semibold tracking-[0.01em] text-[#9f605f]"
      >
        <img src="/images/2gis-icon-logo.svg" alt="2GIS" className="h-5 w-5 shrink-0 object-contain" />
        <span className="whitespace-nowrap">{template.venue.mapLabel}</span>
      </a>

      <Countdown items={template.calendar.countdown} />
    </SectionCard>
  );
}

function Template4Hosts({ template }) {
  return (
    <SectionCard dark className="mt-10 text-center">
      <div className="flex justify-center">
        <img
          src="/images/templates/template-4/decor.png"
          alt=""
          className="h-auto w-full max-w-[120px] opacity-95"
        />
      </div>
      <p className="mt-4 text-[1.2rem] text-[#f5e4db]">{template.hosts.title}</p>
      <p
        className="mt-4 text-[2rem] text-white"
        style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
      >
        {template.hosts.names}
      </p>
      <div className="mt-5 flex justify-center">
        <img
          src="/images/templates/template-4/decor.png"
          alt=""
          className="h-auto w-full max-w-[120px] rotate-180 opacity-95"
        />
      </div>
    </SectionCard>
  );
}

function Template4Rsvp({
  template,
  guestName,
  selectedStatus,
  onGuestNameChange,
  onSelectStatus,
  onSubmit,
  isSubmitting,
  isPaid,
  responseOptions
}) {
  const isReadyToSubmit = Boolean(isPaid && guestName.trim() && selectedStatus && !isSubmitting);
  const isDisabled = !isPaid || isSubmitting;

  return (
    <section className="pb-12 pt-12">
      <div className="mx-auto max-w-[380px]">
        <h3
          className="text-center text-[2.65rem] leading-none text-black"
          style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
        >
          {template.rsvp.title}
        </h3>

        <div className="mt-8 space-y-3">
          <label className="block">
            <input
              type="text"
              value={guestName}
              onChange={(event) => onGuestNameChange(event.target.value)}
              disabled={isDisabled}
              placeholder="Аты-жөніңізді енгізіңіз"
              className="w-full rounded-[8px] border border-[#ded7d2] bg-white px-4 py-3 text-[15px] text-[#332c29] outline-none placeholder:text-[#9f9a96] focus:border-[#9b5962] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>

          <div className="space-y-3">
            {responseOptions.map((option) => {
              const isSelected = selectedStatus === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => (isDisabled ? null : onSelectStatus(option.value))}
                  className={`flex w-full items-center gap-4 rounded-[12px] border px-4 py-4 text-left transition duration-200 ${
                    isDisabled ? "cursor-not-allowed opacity-50" : ""
                  } ${
                    isSelected
                      ? "border-[#93535d] bg-[#93535d] text-white shadow-[0_12px_24px_rgba(147,83,93,0.18)]"
                      : "border-[#ded7d2] bg-white text-[#332c29] hover:border-[#b97c84] hover:bg-[#fbf1f2]"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition ${
                      isSelected ? "border-white/90 bg-white text-[#93535d]" : "border-[#93535d] bg-transparent text-transparent"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-[#93535d]" : "bg-transparent"}`} />
                  </span>
                  <span className={`text-[15px] ${isSelected ? "text-white" : "text-[#332c29]"}`}>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          disabled={!isReadyToSubmit}
          className={`mt-6 h-14 w-full rounded-[12px] text-[1rem] font-semibold uppercase tracking-[0.14em] text-white ${
            isReadyToSubmit ? "opacity-100" : "opacity-60"
          }`}
          style={{ backgroundColor: CARD_COLOR }}
          onClick={onSubmit}
        >
          {isSubmitting ? "Жіберілуде..." : template.rsvp.submitLabel}
        </button>

        <p className="mt-12 text-center text-[1.9rem] leading-[1.45] text-[#2a2320]">{template.rsvp.description}</p>
      </div>
    </section>
  );
}

function Template4Footer() {
  return (
    <div className="px-6 pb-5 pt-0">
      <Footer />
    </div>
  );
}

export default function InvitationTemplate4Page({ event, order }) {
  const [guestName, setGuestName] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [nowTimestamp, setNowTimestamp] = React.useState(() => Date.now());
  const template = React.useMemo(() => mapEventToTemplate4(event, nowTimestamp), [event, nowTimestamp]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);
  const isExample = event.is_example === true;
  const isPaid = order?.status === ORDER_STATUS_PAID;
  const notification = useNotification();

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  React.useEffect(() => {
    const timerId = window.setInterval(() => {
      setNowTimestamp(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  async function handleSubmit() {
    if (isExample) {
      notification.error("Для demo event ответы гостей отключены");
      return;
    }

    if (!isPaid) {
      notification.error("Отправка ответов будет доступна после оплаты шаблона");
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

  return (
    <>
      {!isExample && !isPaid ? (
        <TemplatePaymentBanner
          order={order}
          backgroundClass="bg-[rgba(147,83,93,0.94)]"
          buttonClass="bg-[#7f414b] text-[#fff7f0] hover:bg-[#6f3740]"
          infoCardClass="border-white/20 bg-[#7f414b] text-[#fff7f0]"
          infoLabelClass="text-[#f6ddd4]/72"
          infoValueClass="text-[#fff7f0]"
        />
      ) : null}
      <main
        className="min-h-screen bg-[#f4ecdb] px-4 pt-0 text-[#2b2321]"
        style={{
          "--ornament-color": BORDER_COLOR
        }}
      >
        <audio ref={audioRef} preload="metadata" src="/audio/template-4-theme.mp3" />
        <div className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-[#fbf5e7] px-[42px] pb-0 pt-0 shadow-[0_24px_80px_rgba(92,59,51,0.10)]">
          <SideOrnament side="left" />
          <SideOrnament side="right" />
          <div className="mx-auto max-w-[390px] pb-0 pt-0">
            <Template4Hero template={template} isPlaying={isPlaying} onToggleAudio={handleToggleAudio} />
            <Template4Intro template={template} />
            <Template4Calendar template={template} />
            <Template4Venue template={template} />
            <Template4Hosts template={template} />
            <Template4Rsvp
              template={template}
              guestName={guestName}
              selectedStatus={selectedStatus}
              onGuestNameChange={setGuestName}
              onSelectStatus={setSelectedStatus}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isPaid={!isExample && isPaid}
              responseOptions={responseOptions}
            />
          </div>

          <Template4Footer />
        </div>
      </main>
    </>
  );
}
