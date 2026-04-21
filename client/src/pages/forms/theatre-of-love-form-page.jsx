import React from "react";
import CreateEventDateField from "../../components/create-event-date-field.jsx";
import CreateEventTimeField from "../../components/create-event-time-field.jsx";
import GlobalNotification from "../../components/global-notification.jsx";
import LandingHeader from "../../components/landing/landing-header.jsx";
import Template5AudioToggle from "../../components/templates/theatre-of-love-template/audio-toggle.jsx";
import TheatreOfLovePage, { THEATRE_OF_LOVE_PATH, THEATRE_OF_LOVE_TYPE } from "../templates/theatre-of-love-page.jsx";

const initialForm = {
  type: "wedding",
  date: "",
  time: "",
  location: "",
  locationLink: "",
  name: "Данияр, Аружан",
  description: "Сізді қуана қарсы аламыз",
  overline: "ШАҚЫРУ",
  heroTitle: "Данияр\nАружан",
  introText: "Сізді қуана қарсы аламыз",
  heroOpenLabel: "Ашу",
  heroOpenAriaLabel: "Шақыруды ашу",
  heroScrollLabel: "Төмен сырғыту",
  detailsDateLabel: "Күні",
  detailsTimeLabel: "Уақыты",
  detailsPlaceLabel: "Өтетін орны",
  countdownTitle: "Тойдың басталуына қалды",
  venueSectionLabel: "Өтетін орны",
  venueSubtitle: "Мереке осы жерде өтеді",
  venue_name: "Grand Ballroom",
  venueTitle: "Grand Ballroom",
  mapLabel: "Картаны ашу",
  timelineTitle: "Бағдарлама",
  schedule1Time: "18:30",
  schedule1Title: "Қонақтарды қарсы алу",
  schedule2Time: "19:30",
  schedule2Title: "Тойдың басталуы",
  schedule3Time: "",
  schedule3Title: "",
  schedule4Time: "",
  schedule4Title: "",
  noteTitle: "Келетініңіз біз үшін қуаныш",
  noteText: "Тойды алдын ала дайындау үшін қатысатыныңызды ертерек растауыңызды сұраймыз.",
  hostsLabel: "Ізгі тілекпен",
  hosts: "Данияр мен Аружанның отбасы",
  rsvpTitle: "Қатысуыңызды растаңыз",
  rsvpDescription: "Төмендегі форманы толтырып, жауабыңызды жіберіңіз.",
  rsvpNamePlaceholder: "Аты-жөніңіз",
  rsvpSubmitLabel: "Жауап жіберу",
  rsvpSubmittingLabel: "Жіберілуде...",
  rsvpYesLabel: "Иә, келемін",
  rsvpNoLabel: "Өкінішке қарай, келе алмаймын"
};

const GALLERY_MIN = 3;
const GALLERY_MAX = 4;
const PREVIEW_BASE_WIDTH = 430;

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

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function buildConfig(form, galleryImageUrls = []) {
  return {
    template_path: THEATRE_OF_LOVE_PATH,
    template_type: THEATRE_OF_LOVE_TYPE,
    template_name: "Махаббат театры",
    date: form.date && form.time ? `${form.date}T${form.time}:00Z` : form.date || "",
    location: form.location,
    location_link: form.locationLink || null,
    description: form.description || null,
    name: form.name
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    overline: form.overline,
    heroTitle: form.heroTitle,
    introText: form.introText,
    heroOpenLabel: form.heroOpenLabel,
    heroOpenAriaLabel: form.heroOpenAriaLabel,
    heroScrollLabel: form.heroScrollLabel,
    detailsDateLabel: form.detailsDateLabel,
    detailsTimeLabel: form.detailsTimeLabel,
    detailsPlaceLabel: form.detailsPlaceLabel,
    countdownTitle: form.countdownTitle,
    venueSectionLabel: form.venueSectionLabel,
    venueSubtitle: form.venueSubtitle,
    venue_name: form.venue_name,
    venueTitle: form.venueTitle,
    mapLabel: form.mapLabel,
    timelineTitle: form.timelineTitle,
    schedule: [
      { time: form.schedule1Time, title: form.schedule1Title },
      { time: form.schedule2Time, title: form.schedule2Title },
      { time: form.schedule3Time, title: form.schedule3Title },
      { time: form.schedule4Time, title: form.schedule4Title }
    ].filter((item) => item.time.trim() || item.title.trim()),
    noteTitle: form.noteTitle,
    noteText: form.noteText,
    hostsLabel: form.hostsLabel,
    hosts: form.hosts,
    rsvpTitle: form.rsvpTitle,
    rsvpDescription: form.rsvpDescription,
    rsvpNamePlaceholder: form.rsvpNamePlaceholder,
    rsvpSubmitLabel: form.rsvpSubmitLabel,
    rsvpSubmittingLabel: form.rsvpSubmittingLabel,
    rsvpYesLabel: form.rsvpYesLabel,
    rsvpNoLabel: form.rsvpNoLabel,
    galleryImages: galleryImageUrls
  };
}

function validateForm(form, galleryFiles) {
  if (!form.name.trim()) {
    return "Жұптың есімдерін енгізіңіз.";
  }
  if (!form.date || !form.time) {
    return "Оқиға күні мен басталу уақытын толтырыңыз.";
  }
  if (!form.venueTitle.trim()) {
    return "Залдың немесе мейрамхананың атауын енгізіңіз.";
  }
  if (!form.location.trim()) {
    return "Нақты мекенжайды енгізіңіз.";
  }
  if (!form.locationLink.trim()) {
    return "Карта сілтемесін қосыңыз.";
  }
  if (galleryFiles.length < GALLERY_MIN || galleryFiles.length > GALLERY_MAX) {
    return "3-тен 4-ке дейін фото жүктеңіз.";
  }
  return "";
}

async function createTemplate5Event({ config, type, galleryFiles }) {
  const payload = new FormData();
  payload.append("type", type);
  payload.append("config", JSON.stringify(config));
  galleryFiles.forEach((item) => {
    payload.append("gallery_files", item.file);
  });

  const response = await fetch("/api/v1/events/public-template-5", {
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

function Field({ label, value, onChange, placeholder = "", type = "text", multiline = false, rows = 3 }) {
  const className =
    "w-full rounded-[14px] border border-[#efe8de] bg-[#fcfbf8] px-4 py-3 text-[15px] text-[#413830] outline-none transition placeholder:text-[#b8aea1] focus:border-[#d7c094] focus:bg-white";

  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      {multiline ? (
        <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder} className={`${className} resize-y`} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={className} />
      )}
    </label>
  );
}

function EventRow({ time, title, onTimeChange, onTitleChange }) {
  return (
    <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)]">
      <CreateEventTimeField label="Уақыт" selected={parseTimeValue(time)} onChange={(value) => onTimeChange(formatTimeValue(value))} />
      <Field label="Оқиға" value={title} onChange={onTitleChange} placeholder="Тойдың басталуы" />
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <section className="space-y-6 border-b border-[#ece5da] pb-10">
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  );
}

function PhonePreview({ form, galleryFiles, createdEvent }) {
  const [isPreviewOpened, setIsPreviewOpened] = React.useState(false);
  const [previewAudioOverlay, setPreviewAudioOverlay] = React.useState({
    isOpened: false,
    isPlaying: false,
    onToggleAudio: null
  });
  const [previewNotifications, setPreviewNotifications] = React.useState([]);
  const previewUrls = React.useMemo(() => galleryFiles.map((item) => item.previewUrl), [galleryFiles]);
  const previewEvent = React.useMemo(
    () => ({
      id: 0,
      slug: createdEvent?.slug || "preview-template-5",
      type: form.type || "wedding",
      date: form.date && form.time ? `${form.date}T${form.time}:00Z` : `${new Date().toISOString().slice(0, 10)}T19:30:00Z`,
      location: form.location || "Достық даңғылы, 52",
      location_link: form.locationLink || "#",
      description: form.description || null,
      config: buildConfig(form, previewUrls),
      is_example: true
    }),
    [createdEvent?.slug, form, previewUrls]
  );
  const previewOrder = React.useMemo(
    () => ({
      status: "paid"
    }),
    []
  );
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
          <div className={`preview-scroll-hidden h-full overflow-x-hidden bg-[#fff9f5] ${isPreviewOpened ? "overflow-y-auto" : "overflow-y-hidden"}`}>
            <div
              className="template5-preview-shell"
              style={{
                width: `${PREVIEW_BASE_WIDTH}px`,
                transform: `scale(${siteScale})`,
                transformOrigin: "top left",
                height: `${previewViewportHeight}px`
              }}
            >
              <TheatreOfLovePage
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
                  <Template5AudioToggle
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

export default function TheatreOfLoveFormPage() {
  const [form, setForm] = React.useState(initialForm);
  const [galleryFiles, setGalleryFiles] = React.useState([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [createdEvent, setCreatedEvent] = React.useState(null);
  const [error, setError] = React.useState("");
  const galleryFilesRef = React.useRef([]);

  React.useEffect(() => {
    galleryFilesRef.current = galleryFiles;
  }, [galleryFiles]);

  React.useEffect(() => {
    return () => {
      galleryFilesRef.current.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  function handleGalleryChange(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) {
      return;
    }

    if (files.length < GALLERY_MIN || files.length > GALLERY_MAX) {
      setError("3-тен 4-ке дейін фото жүктеңіз.");
      return;
    }

    setError("");
    setGalleryFiles((current) => {
      current.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });

      return files.map((file) => ({
        file,
        name: file.name,
        previewUrl: URL.createObjectURL(file)
      }));
    });
  }

  async function handleCreate() {
    const validationError = validateForm(form, galleryFiles);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      setIsCreating(true);
      const created = await createTemplate5Event({
        config: buildConfig(form),
        type: form.type,
        galleryFiles
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
              <h1 className="text-[2.4rem] leading-none text-[#8b6a34]" style={{ fontFamily: "var(--font-display)" }}>
                Махаббат театры
              </h1>
            </div>

            <FormSection title="Негізгі ақпарат">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field
                    label="Жұптың есімдері"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Мысалы: Данияр, Аружан"
                  />
                </div>
                <CreateEventDateField label="Оқиға күні" selected={parseDateValue(form.date)} onChange={(value) => updateField("date", formatDateValue(value))} />
                <CreateEventTimeField label="Басталу уақыты" selected={parseTimeValue(form.time)} onChange={(value) => updateField("time", formatTimeValue(value))} />
                <div className="md:col-span-2">
                  <Field
                    label="Есімдердің астындағы мәтін"
                    value={form.description}
                    onChange={(event) => {
                      updateField("description", event.target.value);
                      updateField("introText", event.target.value);
                    }}
                    placeholder="Сізді қуана қарсы аламыз"
                  />
                </div>
              </div>
            </FormSection>

            <FormSection title="Hero">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Жоғарғы жазу" value={form.overline} onChange={(event) => updateField("overline", event.target.value)} />
                <Field label="Перде тақырыбы" value={form.heroTitle} onChange={(event) => updateField("heroTitle", event.target.value)} multiline />
                <Field label="Ашу батырмасы" value={form.heroOpenLabel} onChange={(event) => updateField("heroOpenLabel", event.target.value)} />
                <Field label="Батырманың aria-label-ы" value={form.heroOpenAriaLabel} onChange={(event) => updateField("heroOpenAriaLabel", event.target.value)} />
                <div className="md:col-span-2">
                  <Field label="Сырғыту ишарасы" value={form.heroScrollLabel} onChange={(event) => updateField("heroScrollLabel", event.target.value)} />
                </div>
              </div>
            </FormSection>

            <FormSection title="Өтетін орын және галерея">
              <div className="grid gap-4">
                <Field
                  label="Өтетін орын атауы"
                  value={form.venueTitle}
                  onChange={(event) => {
                    updateField("venueTitle", event.target.value);
                    updateField("venue_name", event.target.value);
                  }}
                  placeholder="Grand Ballroom"
                />
                <Field
                  label="Нақты мекенжай"
                  value={form.location}
                  onChange={(event) => updateField("location", event.target.value)}
                  placeholder="Достық даңғылы, 52"
                />
                <Field
                  label="Карта сілтемесі"
                  value={form.locationLink}
                  onChange={(event) => updateField("locationLink", event.target.value)}
                  placeholder="https://2gis.kz/..."
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <Field label="Күн атауы" value={form.detailsDateLabel} onChange={(event) => updateField("detailsDateLabel", event.target.value)} />
                  <Field label="Уақыт атауы" value={form.detailsTimeLabel} onChange={(event) => updateField("detailsTimeLabel", event.target.value)} />
                  <Field label="Орын атауы" value={form.detailsPlaceLabel} onChange={(event) => updateField("detailsPlaceLabel", event.target.value)} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Орын бөлімі тақырыбы" value={form.venueSectionLabel} onChange={(event) => updateField("venueSectionLabel", event.target.value)} />
                  <Field label="Карта батырмасы" value={form.mapLabel} onChange={(event) => updateField("mapLabel", event.target.value)} />
                </div>

                <Field
                  label="Орын блогының ішкі тақырыбы"
                  value={form.venueSubtitle}
                  onChange={(event) => updateField("venueSubtitle", event.target.value)}
                />

                <div className="pt-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <FieldLabel>Галерея</FieldLabel>
                      <p className="text-sm text-[#8a8073]">3 немесе 4 фото жүктеңіз. Олар бірден live-preview-ге түсіп, оқиға жасалғанда бірге жіберіледі.</p>
                    </div>
                    <label className="cursor-pointer rounded-full border border-[#d9c49a] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9d7f42]">
                      Қосу
                      <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {galleryFiles.length ? (
                      galleryFiles.map((item, index) => (
                        <div key={`${item.name}-${index}`} className="space-y-2">
                          <img src={item.previewUrl} alt={`Gallery ${index + 1}`} className="aspect-[4/5] w-full rounded-[18px] object-cover" />
                          <p className="truncate text-xs text-[#8f8375]">{item.name}</p>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full rounded-[18px] border border-dashed border-[#e7dfd2] bg-[#fbfaf7] px-5 py-7 text-sm text-[#a09383]">
                        Галерея блогына 3 немесе 4 фото қосыңыз.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FormSection>

            <FormSection title="Таймер және бағдарлама">
              <div className="space-y-4">
                <Field label="Таймер тақырыбы" value={form.countdownTitle} onChange={(event) => updateField("countdownTitle", event.target.value)} />
                <Field label="Бағдарлама бөлімі тақырыбы" value={form.timelineTitle} onChange={(event) => updateField("timelineTitle", event.target.value)} />
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

            <FormSection title="Ескертпе блогы">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Қолтаңба атауы" value={form.hostsLabel} onChange={(event) => updateField("hostsLabel", event.target.value)} />
                <Field label="Қолтаңба" value={form.hosts} onChange={(event) => updateField("hosts", event.target.value)} />
                <div className="md:col-span-2">
                  <Field label="Блок тақырыбы" value={form.noteTitle} onChange={(event) => updateField("noteTitle", event.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Блок мәтіні" value={form.noteText} onChange={(event) => updateField("noteText", event.target.value)} multiline rows={4} />
                </div>
              </div>
            </FormSection>

            <section className="space-y-6">
              <SectionTitle>RSVP</SectionTitle>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field label="Форма тақырыбы" value={form.rsvpTitle} onChange={(event) => updateField("rsvpTitle", event.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Форма сипаттамасы" value={form.rsvpDescription} onChange={(event) => updateField("rsvpDescription", event.target.value)} multiline rows={4} />
                </div>
                <Field
                  label="Аты-жөн плейсхолдері"
                  value={form.rsvpNamePlaceholder}
                  onChange={(event) => updateField("rsvpNamePlaceholder", event.target.value)}
                />
                <Field label="Жіберу батырмасы" value={form.rsvpSubmitLabel} onChange={(event) => updateField("rsvpSubmitLabel", event.target.value)} />
                <Field label="Жіберу кезіндегі мәтін" value={form.rsvpSubmittingLabel} onChange={(event) => updateField("rsvpSubmittingLabel", event.target.value)} />
                <Field label="'Иә' жауабы" value={form.rsvpYesLabel} onChange={(event) => updateField("rsvpYesLabel", event.target.value)} />
                <Field label="'Жоқ' жауабы" value={form.rsvpNoLabel} onChange={(event) => updateField("rsvpNoLabel", event.target.value)} />
              </div>
            </section>

            <section className="pt-2">
              {error ? <div className="mb-5 rounded-[14px] bg-[#fff1ee] px-4 py-3 text-sm text-[#a03f35]">{error}</div> : null}

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
              <PhonePreview form={form} galleryFiles={galleryFiles} createdEvent={createdEvent} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
