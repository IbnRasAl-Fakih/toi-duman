import React from "react";
import CreateEventDateField from "../../components/create-event-date-field.jsx";
import CreateEventTimeField from "../../components/create-event-time-field.jsx";
import GlobalNotification from "../../components/global-notification.jsx";
import LandingHeader from "../../components/landing/landing-header.jsx";
import CeremonialPalaceAudioToggle from "../../components/templates/ceremonial-palace-template/audio-toggle.jsx";
import { useAdminAuth } from "../../context/admin-auth-context.jsx";
import CeremonialPalacePage, {
  CEREMONIAL_PALACE_PATH,
  CEREMONIAL_PALACE_TYPE
} from "../templates/ceremonial-palace-page.jsx";

const PREVIEW_BASE_WIDTH = 430;
const DEFAULT_COVER_IMAGE = "/images/templates/ceremonial-palace/300592484d1f31590325.png.webp";

const initialForm = {
  type: "wedding",
  date: "",
  time: "",
  location: "Petit Chemin de Saint-Gilles 13200 Arles, France",
  locationLink: "",
  name: "Виктор, Паула",
  dayLabel: "Үйлену тойы",
  introTitle: "Құрметті ағайын-туыс, достар!",
  introParagraph1: "Өміріміздегі ең маңызды күндердің бірін сіздермен бірге қарсы алғымыз келеді.",
  introParagraph2: "Қуанышымызға ортақ болып, ақ тілектеріңізді арнасаңыздар, біз үшін үлкен мәртебе.",
  countdownTitle: "Тойдың басталуына қалды",
  timelineTitle: "Той бағдарламасы",
  schedule1Time: "16:00",
  schedule1Title: "Неке қию рәсімі",
  schedule2Time: "17:00",
  schedule2Title: "Қонақтарды қарсы алу",
  schedule3Time: "19:00",
  schedule3Title: "Кешкі ас",
  schedule4Time: "20:00",
  schedule4Title: "Той кеші",
  locationTitle: "Мекенжай",
  venue_name: "Chateau de Paon",
  mapLabel: "Картаны ашу",
  dressCodeTitle: "Галерея",
  dressCodeDescription: "Естелік сәттерімізден шағын галерея.",
  dressCodeNote: "Галереяға арналған суреттер.",
  detailsTitle: "Қосымша ақпарат",
  detailsDescription: "Қосымша сұрақтар бойынша той ұйымдастырушысына хабарласа аласыз.",
  organizerName: "Әмина",
  organizerPhone: "+31 6845965887",
  giftText:
    "Сіздердің келіп, қуанышымызға ортақ болғандарыңыз біз үшін ең үлкен сый. Егер сый жасауды қаласаңыздар, жас отбасымыздың болашағына қосқан үлестеріңізді ризашылықпен қабылдаймыз.",
  rsvpTitle: "Қатысуыңызды растаңыз",
  rsvpDescription: "Той дайындығын нақтылау үшін қатысатыныңызды белгілеуіңізді сұраймыз.",
  rsvpNamePlaceholder: "Аты-жөніңіз",
  rsvpSubmitLabel: "Жіберу",
  rsvpSubmittingLabel: "Жіберілуде...",
  rsvpYesLabel: "Иә, қуана қатысамын",
  rsvpNoLabel: "Өкінішке қарай, қатыса алмаймын",
  farewellTitle: "Сіздерді асыға күтеміз!",
  farewellSignature: "Виктор және Паула"
};

function parseDateValue(value) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function formatDateValue(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseTimeValue(value) {
  if (!value) {
    return null;
  }

  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function formatTimeValue(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "";
  }

  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function buildConfig(form) {
  return {
    template_path: CEREMONIAL_PALACE_PATH,
    template_type: CEREMONIAL_PALACE_TYPE,
    template_name: "Салтанат сарайы",
    date: form.date && form.time ? `${form.date}T${form.time}:00Z` : form.date || "",
    time: form.time,
    location: form.location,
    location_link: form.locationLink || null,
    cover_image_url: DEFAULT_COVER_IMAGE,
    name: form.name
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    dayLabel: form.dayLabel,
    introTitle: form.introTitle,
    introParagraph1: form.introParagraph1,
    introParagraph2: form.introParagraph2,
    countdownTitle: form.countdownTitle,
    timelineTitle: form.timelineTitle,
    schedule: [
      { time: form.schedule1Time, title: form.schedule1Title },
      { time: form.schedule2Time, title: form.schedule2Title },
      { time: form.schedule3Time, title: form.schedule3Title },
      { time: form.schedule4Time, title: form.schedule4Title }
    ].filter((item) => item.time.trim() || item.title.trim()),
    locationTitle: form.locationTitle,
    venue_name: form.venue_name,
    mapLabel: form.mapLabel,
    dressCodeTitle: form.dressCodeTitle,
    dressCodeDescription: form.dressCodeDescription,
    dressCodeNote: form.dressCodeNote,
    detailsTitle: form.detailsTitle,
    detailsDescription: form.detailsDescription,
    organizerName: form.organizerName,
    organizerPhone: form.organizerPhone,
    giftText: form.giftText,
    rsvpTitle: form.rsvpTitle,
    rsvpDescription: form.rsvpDescription,
    rsvpNamePlaceholder: form.rsvpNamePlaceholder,
    rsvpSubmitLabel: form.rsvpSubmitLabel,
    rsvpSubmittingLabel: form.rsvpSubmittingLabel,
    rsvpYesLabel: form.rsvpYesLabel,
    rsvpNoLabel: form.rsvpNoLabel,
    farewellTitle: form.farewellTitle,
    farewellSignature: form.farewellSignature
  };
}

function validateForm(form) {
  if (!form.name.trim()) {
    return "Жұптың есімдерін енгізіңіз.";
  }
  if (!form.date || !form.time) {
    return "Той күні мен уақытын таңдаңыз.";
  }
  if (!form.location.trim()) {
    return "Той мекенжайын енгізіңіз.";
  }
  if (!form.locationLink.trim()) {
    return "Карта сілтемесін қосыңыз.";
  }
  if (!form.venue_name.trim()) {
    return "Мейрамхана немесе орын атауын енгізіңіз.";
  }

  return "";
}

async function createTemplate7Event({ config, type, isExample }) {
  const payload = new FormData();
  payload.append("type", type);
  payload.append("is_example", String(isExample));
  payload.append("config", JSON.stringify(config));

  const response = await fetch("/api/v1/events/public-template-7", {
    method: "POST",
    body: payload
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Шақыруды жасау мүмкін болмады");
  }

  return data;
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-[2rem] leading-none text-[#8b6a34]" style={{ fontFamily: "var(--font-display)" }}>
      {children}
    </h2>
  );
}

function FieldLabel({ children }) {
  return <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#776d61]">{children}</span>;
}

function Field({ label, value, onChange, placeholder = "", multiline = false, rows = 3 }) {
  const className =
    "w-full rounded-[14px] border border-[#efe8de] bg-[#fcfbf8] px-4 py-3 text-[15px] text-[#413830] outline-none transition placeholder:text-[#b8aea1] focus:border-[#d7c094] focus:bg-white";

  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      {multiline ? (
        <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder} className={`${className} resize-y`} />
      ) : (
        <input value={value} onChange={onChange} placeholder={placeholder} className={className} />
      )}
    </label>
  );
}

function EventRow({ time, title, onTimeChange, onTitleChange }) {
  return (
    <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)]">
      <CreateEventTimeField label="Уақыты" selected={parseTimeValue(time)} onChange={(value) => onTimeChange(formatTimeValue(value))} />
      <Field label="Іс-шара" value={title} onChange={onTitleChange} placeholder="Неке қию рәсімі" />
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <section className="space-y-6 border-b border-[#ece5da] pb-10 last:border-b-0">
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  );
}

function PhonePreview({ form, createdEvent }) {
  const [isPreviewOpened, setIsPreviewOpened] = React.useState(false);
  const [previewAudioOverlay, setPreviewAudioOverlay] = React.useState({
    isOpened: false,
    isPlaying: false,
    onToggleAudio: null
  });
  const [previewNotifications, setPreviewNotifications] = React.useState([]);
  const previewEvent = React.useMemo(
    () => ({
      id: 0,
      slug: createdEvent?.slug || "preview-ceremonial-palace",
      type: form.type || "wedding",
      date: form.date && form.time ? `${form.date}T${form.time}:00Z` : `${new Date().toISOString().slice(0, 10)}T16:00:00Z`,
      location: form.location || "Petit Chemin de Saint-Gilles 13200 Arles, France",
      location_link: form.locationLink || "#",
      cover_image_url: DEFAULT_COVER_IMAGE,
      config: buildConfig(form),
      is_example: true
    }),
    [createdEvent?.slug, form]
  );
  const previewOrder = React.useMemo(() => ({ status: "paid" }), []);
  const phoneWidth = 286;
  const phoneHeight = 576;
  const screenLeft = 24;
  const screenTop = 19;
  const screenWidth = 356;
  const screenHeight = 772;
  const widthRatio = phoneWidth / 404;
  const heightRatio = phoneHeight / 811;
  const viewportLeft = screenLeft * widthRatio;
  const viewportTop = screenTop * heightRatio;
  const viewportWidth = screenWidth * widthRatio;
  const viewportHeight = screenHeight * heightRatio;
  const siteScale = viewportWidth / PREVIEW_BASE_WIDTH;
  const previewViewportHeight = viewportHeight / siteScale;
  const scaledOverlayStyle = {
    width: `${PREVIEW_BASE_WIDTH}px`,
    height: `${previewViewportHeight}px`,
    transform: `scale(${siteScale})`,
    transformOrigin: "top left"
  };

  React.useEffect(() => {
    if (!previewNotifications.length) {
      return undefined;
    }

    const timers = previewNotifications.map((notification) =>
      window.setTimeout(() => {
        setPreviewNotifications((current) => current.filter((item) => item.id !== notification.id));
      }, notification.duration ?? 4000)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [previewNotifications]);

  function closePreviewNotification(id) {
    setPreviewNotifications((current) => current.filter((item) => item.id !== id));
  }

  function handlePreviewNotify(notification) {
    setPreviewNotifications((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        duration: 4000,
        ...notification
      }
    ]);
  }

  return (
    <div className="xl:pt-2">
      <div className="relative mx-auto" style={{ height: `${phoneHeight}px`, width: `${phoneWidth}px` }}>
        <div
          className="absolute overflow-hidden bg-white shadow-[0_24px_60px_rgba(0,0,0,0.06)]"
          style={{
            left: `${viewportLeft}px`,
            top: `${viewportTop}px`,
            width: `${viewportWidth}px`,
            height: `${viewportHeight}px`
          }}
        >
          <div className={`preview-scroll-hidden h-full overflow-x-hidden bg-[#fbf6f1] ${isPreviewOpened ? "overflow-y-auto" : "overflow-y-hidden"}`}>
            <div
              style={{
                width: `${PREVIEW_BASE_WIDTH}px`,
                transform: `scale(${siteScale})`,
                transformOrigin: "top left",
                height: `${previewViewportHeight}px`
              }}
            >
              <CeremonialPalacePage
                event={previewEvent}
                order={previewOrder}
                previewMode
                previewViewportHeight={previewViewportHeight}
                onPreviewOpenChange={setIsPreviewOpened}
                onPreviewAudioOverlayChange={setPreviewAudioOverlay}
                onPreviewNotify={handlePreviewNotify}
              />
            </div>
          </div>
        </div>

        {(previewAudioOverlay.isOpened && typeof previewAudioOverlay.onToggleAudio === "function") || previewNotifications.length ? (
          <div
            className="pointer-events-none absolute z-40 overflow-hidden"
            style={{
              left: `${viewportLeft}px`,
              top: `${viewportTop}px`,
              width: `${viewportWidth}px`,
              height: `${viewportHeight}px`
            }}
          >
            <div className="relative" style={scaledOverlayStyle}>
              {previewAudioOverlay.isOpened && typeof previewAudioOverlay.onToggleAudio === "function" ? (
                <div className="pointer-events-auto absolute bottom-6 right-5">
                  <CeremonialPalaceAudioToggle
                    isPlaying={previewAudioOverlay.isPlaying}
                    onToggleAudio={previewAudioOverlay.onToggleAudio}
                    previewMode
                  />
                </div>
              ) : null}

              {previewNotifications.length ? (
                <GlobalNotification
                  notifications={previewNotifications}
                  onClose={closePreviewNotification}
                  className="absolute bottom-6 right-5 w-[22rem] max-w-[calc(100%-1.5rem)]"
                />
              ) : null}
            </div>
          </div>
        ) : null}

        <img src="/images/phone-mockup.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-contain" />
      </div>
    </div>
  );
}

export default function CeremonialPalaceFormPage() {
  const { isAuthenticated: isAdmin } = useAdminAuth();
  const [form, setForm] = React.useState(initialForm);
  const [isExample, setIsExample] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [createdEvent, setCreatedEvent] = React.useState(null);
  const [error, setError] = React.useState("");

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  async function handleCreate() {
    const validationError = validateForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      setIsCreating(true);
      const created = await createTemplate7Event({
        config: buildConfig(form),
        type: form.type,
        isExample: isAdmin && isExample
      });
      setCreatedEvent(created);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Шақыруды жасау мүмкін болмады.");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white text-[#3c3021]">
      <LandingHeader />

      <div className="flex-1 px-6 pb-10 pt-28">
        <div className="mx-auto max-w-[1360px] xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-12">
          <section className="min-w-0 space-y-12">
            <div className="max-w-[760px]">
              <h1 className="text-[2.4rem] leading-none text-[#8b6a34]" style={{ fontFamily: "var(--font-display)" }}>Салтанат сарайы</h1>
            </div>

            <FormSection title="Негізгі ақпарат">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field label="Жұптың есімдері" value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Виктор, Паула" />
                </div>
                <CreateEventDateField label="Күні" selected={parseDateValue(form.date)} onChange={(value) => updateField("date", formatDateValue(value))} />
                <CreateEventTimeField label="Уақыты" selected={parseTimeValue(form.time)} onChange={(value) => updateField("time", formatTimeValue(value))} />
                <div className="md:col-span-2">
                  <Field label="Мекенжай" value={form.location} onChange={(event) => updateField("location", event.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Карта сілтемесі" value={form.locationLink} onChange={(event) => updateField("locationLink", event.target.value)} placeholder="https://2gis.kz/..." />
                </div>
              </div>
            </FormSection>

            <FormSection title="Басты экран және кіріспе">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Жоғарғы жазу" value={form.dayLabel} onChange={(event) => updateField("dayLabel", event.target.value)} />
                <div className="md:col-span-2">
                  <Field label="Кіріспе тақырыбы" value={form.introTitle} onChange={(event) => updateField("introTitle", event.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Кіріспе мәтіні 1" value={form.introParagraph1} onChange={(event) => updateField("introParagraph1", event.target.value)} multiline rows={4} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Кіріспе мәтіні 2" value={form.introParagraph2} onChange={(event) => updateField("introParagraph2", event.target.value)} multiline rows={4} />
                </div>
              </div>
            </FormSection>

            <FormSection title="Кері санақ және бағдарлама">
              <div className="space-y-4">
                <Field label="Кері санақ тақырыбы" value={form.countdownTitle} onChange={(event) => updateField("countdownTitle", event.target.value)} />
                <Field label="Бағдарлама тақырыбы" value={form.timelineTitle} onChange={(event) => updateField("timelineTitle", event.target.value)} />
                <EventRow
                  time={form.schedule1Time}
                  title={form.schedule1Title}
                  onTimeChange={(value) => updateField("schedule1Time", value)}
                  onTitleChange={(event) => updateField("schedule1Title", event.target.value)}
                />
                <EventRow
                  time={form.schedule2Time}
                  title={form.schedule2Title}
                  onTimeChange={(value) => updateField("schedule2Time", value)}
                  onTitleChange={(event) => updateField("schedule2Title", event.target.value)}
                />
                <EventRow
                  time={form.schedule3Time}
                  title={form.schedule3Title}
                  onTimeChange={(value) => updateField("schedule3Time", value)}
                  onTitleChange={(event) => updateField("schedule3Title", event.target.value)}
                />
                <EventRow
                  time={form.schedule4Time}
                  title={form.schedule4Title}
                  onTimeChange={(value) => updateField("schedule4Time", value)}
                  onTitleChange={(event) => updateField("schedule4Title", event.target.value)}
                />
              </div>
            </FormSection>

            <FormSection title="Мекенжай және галерея">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Мекенжай тақырыбы" value={form.locationTitle} onChange={(event) => updateField("locationTitle", event.target.value)} />
                <Field label="Өтетін орын атауы" value={form.venue_name} onChange={(event) => updateField("venue_name", event.target.value)} />
                <div className="md:col-span-2">
                  <Field label="Карта батырмасы" value={form.mapLabel} onChange={(event) => updateField("mapLabel", event.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Галерея тақырыбы" value={form.dressCodeTitle} onChange={(event) => updateField("dressCodeTitle", event.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Field
                    label="Галерея сипаттамасы"
                    value={form.dressCodeDescription}
                    onChange={(event) => updateField("dressCodeDescription", event.target.value)}
                    multiline
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <Field label="Галерея ескертпесі" value={form.dressCodeNote} onChange={(event) => updateField("dressCodeNote", event.target.value)} multiline rows={4} />
                </div>
              </div>
            </FormSection>

            <FormSection title="Қосымша ақпарат және қатысу">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Қосымша ақпарат тақырыбы" value={form.detailsTitle} onChange={(event) => updateField("detailsTitle", event.target.value)} />
                <div className="md:col-span-2">
                  <Field label="Қосымша ақпарат мәтіні" value={form.detailsDescription} onChange={(event) => updateField("detailsDescription", event.target.value)} multiline rows={4} />
                </div>
                <Field label="Ұйымдастырушы аты" value={form.organizerName} onChange={(event) => updateField("organizerName", event.target.value)} />
                <Field label="Ұйымдастырушы телефоны" value={form.organizerPhone} onChange={(event) => updateField("organizerPhone", event.target.value)} />
                <div className="md:col-span-2">
                  <Field label="Сыйлық туралы мәтін" value={form.giftText} onChange={(event) => updateField("giftText", event.target.value)} multiline rows={4} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Қатысуды растау тақырыбы" value={form.rsvpTitle} onChange={(event) => updateField("rsvpTitle", event.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Қатысуды растау мәтіні" value={form.rsvpDescription} onChange={(event) => updateField("rsvpDescription", event.target.value)} multiline rows={4} />
                </div>
                <Field label="Аты-жөні placeholder" value={form.rsvpNamePlaceholder} onChange={(event) => updateField("rsvpNamePlaceholder", event.target.value)} />
                <Field label="Жіберу батырмасы" value={form.rsvpSubmitLabel} onChange={(event) => updateField("rsvpSubmitLabel", event.target.value)} />
                <Field label="Жіберіліп жатқандағы мәтін" value={form.rsvpSubmittingLabel} onChange={(event) => updateField("rsvpSubmittingLabel", event.target.value)} />
                <Field label="Иә жауабы" value={form.rsvpYesLabel} onChange={(event) => updateField("rsvpYesLabel", event.target.value)} />
                <Field label="Жоқ жауабы" value={form.rsvpNoLabel} onChange={(event) => updateField("rsvpNoLabel", event.target.value)} />
                <Field label="Қоштасу тақырыбы" value={form.farewellTitle} onChange={(event) => updateField("farewellTitle", event.target.value)} />
                <Field label="Қоштасу қолтаңбасы" value={form.farewellSignature} onChange={(event) => updateField("farewellSignature", event.target.value)} />
              </div>
            </FormSection>

            <section className="pt-2">
              {error ? <div className="mb-5 rounded-[14px] bg-[#fff1ee] px-4 py-3 text-sm text-[#a03f35]">{error}</div> : null}

              {isAdmin ? (
                <label className="mb-5 flex items-center gap-3 rounded-[16px] border border-[#efe8de] bg-[#fcfbf8] px-4 py-3 text-sm text-[#5f5346]">
                  <input
                    type="checkbox"
                    checked={isExample}
                    onChange={(event) => setIsExample(event.target.checked)}
                    className="h-4 w-4 appearance-none rounded-[4px] border border-[#d7c39e] bg-white bg-center bg-no-repeat checked:border-[#b89255] checked:bg-[#b89255]"
                    style={{
                      backgroundImage: isExample
                        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M3.5 8.5l2.5 2.5 6-6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
                        : "none"
                    }}
                  />
                  <span>Демо шақыру үшін тапсырыс жасамау</span>
                </label>
              ) : null}

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={isCreating}
                  className="rounded-full bg-[#d9bf88] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5a4517] disabled:opacity-50"
                >
                  {isCreating ? "Жасалуда..." : "Шақыру жасау"}
                </button>

                {createdEvent ? (
                  <a
                    href={`/${createdEvent.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#ddd1bc] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7d6b4f]"
                  >
                    Сайтты ашу
                  </a>
                ) : null}
              </div>

              {createdEvent ? (
                <div className="mt-5 text-sm text-[#7d7266]">
                  <div>
                    Slug: <span className="font-mono">{createdEvent.slug}</span>
                  </div>
                  <div className="mt-1">
                    URL: <span className="font-mono">{window.location.origin}/{createdEvent.slug}</span>
                  </div>
                </div>
              ) : null}
            </section>
          </section>

          <aside className="mt-12 xl:mt-0 xl:w-[320px]">
            <div className="xl:fixed xl:right-8 xl:top-28 xl:w-[286px]">
              <PhonePreview form={form} createdEvent={createdEvent} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}


