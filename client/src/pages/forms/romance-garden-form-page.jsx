import React from "react";
import CreateEventDateField from "../../components/create-event-date-field.jsx";
import CreateEventTimeField from "../../components/create-event-time-field.jsx";
import GlobalNotification from "../../components/global-notification.jsx";
import LandingHeader from "../../components/landing/landing-header.jsx";
import RomanceGardenAudioToggle from "../../components/templates/romance-garden-template/audio-toggle.jsx";
import { useAdminAuth } from "../../context/admin-auth-context.jsx";
import RomanceGardenPage, { ROMANCE_GARDEN_PATH, ROMANCE_GARDEN_TYPE } from "../templates/romance-garden-page.jsx";

const GALLERY_MIN = 3;
const GALLERY_MAX = 6;
const PREVIEW_BASE_WIDTH = 430;
const DEFAULT_PREVIEW_IMAGES = [
  "/images/photo_example_1.jpg",
  "/images/photo_example_2.jpg",
  "/images/photo_example_3.jpg"
];

const initialForm = {
  type: "wedding",
  date: "",
  time: "",
  location: "",
  locationLink: "",
  name: "Аружан, Нұрлан",
  heroTitle: "Үйлену тойына шақыру",
  heroSubtitle: "Сізді қуаныш пен махаббатқа толы ерекше күнімізде бірге болуға шақырамыз.",
  introTitle: "Қош келдіңіз!",
  introText: "Сіздерді махаббат пен мейірімге толы үйлену тойымыздың қадірлі қонағы болуға шын жүректен шақырамыз.",
  hosts: "Ата-аналар ақ батасын береді",
  venue_name: "Grand Ballroom",
  mapLabel: "Карта арқылы ашу",
  rsvpTitle: "Қатысуды растау",
  rsvpText: "Қатысуыңызды алдын ала растауыңызды сұраймыз.",
  submitLabel: "Жіберу"
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

function buildConfig(form, galleryImageUrls = [], coverImageUrl = "") {
  return {
    template_path: ROMANCE_GARDEN_PATH,
    template_type: ROMANCE_GARDEN_TYPE,
    template_name: "Ғашықтар бағы",
    date: form.date && form.time ? `${form.date}T${form.time}:00Z` : form.date || "",
    time: form.time,
    location: form.location,
    location_link: form.locationLink || null,
    name: form.name
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    heroTitle: form.heroTitle,
    heroSubtitle: form.heroSubtitle,
    introTitle: form.introTitle,
    introText: form.introText,
    hosts: form.hosts,
    venue_name: form.venue_name,
    mapLabel: form.mapLabel,
    rsvpTitle: form.rsvpTitle,
    rsvpText: form.rsvpText,
    submitLabel: form.submitLabel,
    gallery_image_urls: galleryImageUrls,
    cover_image_url: coverImageUrl || null
  };
}

function validateForm(form, galleryFiles) {
  if (!form.name.trim()) {
    return "Жұптың есімдерін енгізіңіз.";
  }
  if (!form.date || !form.time) {
    return "Оқиғаның күні мен уақытын толтырыңыз.";
  }
  if (!form.location.trim()) {
    return "Іс-шара мекенжайын енгізіңіз.";
  }
  if (!form.locationLink.trim()) {
    return "Карта сілтемесін қосыңыз.";
  }
  if (!form.heroTitle.trim()) {
    return "Шақыру тақырыбын толтырыңыз.";
  }
  if (galleryFiles.length < GALLERY_MIN || galleryFiles.length > GALLERY_MAX) {
    return "Галерея үшін 3-тен 6-ға дейін фото жүктеңіз.";
  }
  return "";
}

async function createTemplate6Event({ config, type, isExample, coverFile, galleryFiles }) {
  const payload = new FormData();
  payload.append("type", type);
  payload.append("is_example", String(isExample));
  payload.append("config", JSON.stringify(config));
  if (coverFile) {
    payload.append("cover_file", coverFile.file);
  }
  galleryFiles.forEach((item) => {
    payload.append("gallery_files", item.file);
  });

  const response = await fetch("/api/v1/events/public-template-6", {
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
  return <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#917a56]">{children}</span>;
}

function Field({ label, value, onChange, placeholder = "", multiline = false, rows = 3 }) {
  const className =
    "w-full rounded-[16px] border border-[#eadfce] bg-[#fffdf9] px-4 py-3 text-[15px] text-[#4d3d27] outline-none transition placeholder:text-[#b6a48a] focus:border-[#c9a86e] focus:bg-white";

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

function FormSection({ title, children }) {
  return (
    <section className="space-y-6 border-b border-[#ece2d2] pb-10 last:border-b-0">
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  );
}

function UploadGrid({ items, emptyText, onRemove }) {
  if (!items.length) {
    return <div className="rounded-[18px] border border-dashed border-[#e8dcc9] bg-[#fcfaf6] px-5 py-7 text-sm text-[#9a886d]">{emptyText}</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <div key={`${item.name}-${index}`} className="space-y-2">
          <div className="relative">
            <img src={item.previewUrl} alt={item.name} className="aspect-[4/5] w-full rounded-[18px] object-cover" />
            {typeof onRemove === "function" ? (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(60,48,33,0.78)] text-lg leading-none text-white transition hover:bg-[rgba(60,48,33,0.92)]"
                aria-label={`Удалить ${item.name}`}
              >
                ×
              </button>
            ) : null}
          </div>
          <p className="truncate text-xs text-[#8f7d63]">{item.name}</p>
        </div>
      ))}
    </div>
  );
}

function PhonePreview({ form, coverFile, galleryFiles, createdEvent }) {
  const [isPreviewOpened, setIsPreviewOpened] = React.useState(false);
  const [previewAudioOverlay, setPreviewAudioOverlay] = React.useState({
    isOpened: false,
    isPlaying: false,
    onToggleAudio: null
  });
  const [previewNotifications, setPreviewNotifications] = React.useState([]);
  const previewGalleryUrls = React.useMemo(
    () => (galleryFiles.length ? galleryFiles.map((item) => item.previewUrl) : DEFAULT_PREVIEW_IMAGES),
    [galleryFiles]
  );
  const previewCoverUrl = coverFile?.previewUrl || DEFAULT_PREVIEW_IMAGES[0];
  const previewEvent = React.useMemo(
    () => ({
      id: 0,
      slug: createdEvent?.slug || "preview-template-6",
      type: form.type || "wedding",
      date: form.date && form.time ? `${form.date}T${form.time}:00Z` : `${new Date().toISOString().slice(0, 10)}T19:30:00Z`,
      location: form.location || "Достық даңғылы, 52",
      location_link: form.locationLink || "#",
      description: form.introText || null,
      cover_image_url: previewCoverUrl,
      config: buildConfig(form, previewGalleryUrls, previewCoverUrl),
      is_example: true
    }),
    [createdEvent?.slug, form, previewCoverUrl, previewGalleryUrls]
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
          className="absolute overflow-hidden bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
          style={{
            left: `${viewportLeft}px`,
            top: `${viewportTop}px`,
            width: `${viewportWidth}px`,
            height: `${viewportHeight}px`
          }}
        >
          <div className={`preview-scroll-hidden h-full overflow-x-hidden bg-[#f7f1e7] ${isPreviewOpened ? "overflow-y-auto" : "overflow-y-hidden"}`}>
            <div
              style={{
                width: `${PREVIEW_BASE_WIDTH}px`,
                transform: `scale(${siteScale})`,
                transformOrigin: "top left",
                height: `${previewViewportHeight}px`
              }}
            >
              <RomanceGardenPage
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
                  <RomanceGardenAudioToggle
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

export default function RomanceGardenFormPage() {
  const { isAuthenticated: isAdmin } = useAdminAuth();
  const [form, setForm] = React.useState(initialForm);
  const [coverFile, setCoverFile] = React.useState(null);
  const [galleryFiles, setGalleryFiles] = React.useState([]);
  const [isExample, setIsExample] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [createdEvent, setCreatedEvent] = React.useState(null);
  const [error, setError] = React.useState("");
  const coverFileRef = React.useRef(null);
  const galleryFilesRef = React.useRef([]);

  React.useEffect(() => {
    coverFileRef.current = coverFile;
    galleryFilesRef.current = galleryFiles;
  }, [coverFile, galleryFiles]);

  React.useEffect(() => {
    return () => {
      if (coverFileRef.current?.previewUrl) {
        URL.revokeObjectURL(coverFileRef.current.previewUrl);
      }
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

  function handleCoverChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setError("");
    setCoverFile((current) => {
      if (current?.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }

      return {
        file,
        name: file.name,
        previewUrl: URL.createObjectURL(file)
      };
    });
  }

  function handleGalleryChange(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) {
      return;
    }

    setError("");
    setGalleryFiles((current) => {
      const addedItems = files.map((file) => ({
        file,
        name: file.name,
        previewUrl: URL.createObjectURL(file)
      }));
      const nextFiles = [...current, ...addedItems];

      if (nextFiles.length > GALLERY_MAX) {
        addedItems.forEach((item) => {
          URL.revokeObjectURL(item.previewUrl);
        });
        setError("?????????????? ???????? 3-?????? 6-???? ?????????? ???????? ????????????????.");
        return current;
      }

      return nextFiles;
    });
  }

  function handleRemoveCover() {
    setCoverFile((current) => {
      if (current?.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }

      return null;
    });
  }

  function handleRemoveGalleryItem(indexToRemove) {
    setGalleryFiles((current) => {
      const target = current[indexToRemove];
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }

      return current.filter((_, index) => index !== indexToRemove);
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
      const created = await createTemplate6Event({
        config: buildConfig(form),
        type: form.type,
        isExample: isAdmin && isExample,
        coverFile,
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
                Ғашықтар бағы
              </h1>
            </div>

            <FormSection title="Негізгі ақпарат">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field label="Жұптың есімдері" value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Мысалы: Аружан, Нұрлан" />
                </div>
                <CreateEventDateField label="Оқиға күні" selected={parseDateValue(form.date)} onChange={(value) => updateField("date", formatDateValue(value))} />
                <CreateEventTimeField label="Басталу уақыты" selected={parseTimeValue(form.time)} onChange={(value) => updateField("time", formatTimeValue(value))} />
                <div className="md:col-span-2">
                  <Field label="Мекенжай" value={form.location} onChange={(event) => updateField("location", event.target.value)} placeholder="Достық даңғылы, 52" />
                </div>
                <div className="md:col-span-2">
                  <Field label="Карта сілтемесі" value={form.locationLink} onChange={(event) => updateField("locationLink", event.target.value)} placeholder="https://2gis.kz/..." />
                </div>
              </div>
            </FormSection>

            <FormSection title="Hero">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field label="Тақырып" value={form.heroTitle} onChange={(event) => updateField("heroTitle", event.target.value)} placeholder="Үйлену тойына шақыру" />
                </div>
                <div className="md:col-span-2">
                  <Field label="Ішкі тақырып" value={form.heroSubtitle} onChange={(event) => updateField("heroSubtitle", event.target.value)} multiline rows={4} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Кіріспе блоктың тақырыбы" value={form.introTitle} onChange={(event) => updateField("introTitle", event.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Кіріспе блоктың мәтіні" value={form.introText} onChange={(event) => updateField("introText", event.target.value)} multiline rows={4} />
                </div>
              </div>
            </FormSection>

            <FormSection title="Өтетін орын және медиа">
              <div className="grid gap-4">
                <Field label="Өтетін орын атауы" value={form.venue_name} onChange={(event) => updateField("venue_name", event.target.value)} placeholder="Grand Ballroom" />
                <Field label="Ата-ана / жүргізуші мәтіні" value={form.hosts} onChange={(event) => updateField("hosts", event.target.value)} multiline rows={3} />
                <Field label="Карта батырмасының мәтіні" value={form.mapLabel} onChange={(event) => updateField("mapLabel", event.target.value)} />

                <div className="pt-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <FieldLabel>Мұқаба</FieldLabel>
                      <p className="text-sm text-[#8f7d63]">Міндетті емес. Жүктесеңіз, фото бірінші экранның постеріне айналады.</p>
                    </div>
                    <label className="cursor-pointer rounded-full border border-[#d8c5a1] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a34]">
                      Жүктеу
                      <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                    </label>
                  </div>
                  <div className="mt-4">
                    <UploadGrid items={coverFile ? [coverFile] : []} emptyText="Hero блогына мұқаба жүктеңіз немесе әдепкі нұсқаны қалдырыңыз."  onRemove={handleRemoveCover} />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <FieldLabel>Галерея</FieldLabel>
                      <p className="text-sm text-[#8f7d63]">3-тен 6-ға дейін фото жүктеңіз. Олар бірден live-preview-ге түсіп, үлгінің слайдерінде қолданылады.</p>
                    </div>
                    <label className="cursor-pointer rounded-full border border-[#d8c5a1] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a34]">
                      Қосу
                      <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                    </label>
                  </div>
                  <div className="mt-4">
                    <UploadGrid items={galleryFiles} emptyText="Галерея үшін 3-6 фото қосыңыз."  onRemove={handleRemoveGalleryItem} />
                  </div>
                </div>
              </div>
            </FormSection>

            <FormSection title="RSVP">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field label="Форма тақырыбы" value={form.rsvpTitle} onChange={(event) => updateField("rsvpTitle", event.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Форма сипаттамасы" value={form.rsvpText} onChange={(event) => updateField("rsvpText", event.target.value)} multiline rows={4} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Жіберу батырмасының мәтіні" value={form.submitLabel} onChange={(event) => updateField("submitLabel", event.target.value)} />
                </div>
              </div>
            </FormSection>

            <section className="pt-2">
              {error ? <div className="mb-5 rounded-[14px] bg-[#fff3ef] px-4 py-3 text-sm text-[#a14d35]">{error}</div> : null}

              {isAdmin ? (
                <label className="mb-5 flex items-center gap-3 rounded-[16px] border border-[#eadfce] bg-[#fffdf9] px-4 py-3 text-sm text-[#6f5a36]">
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
                  <span>Егер бұл үлгі болса, тапсырыс жасамау</span>
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
              <PhonePreview form={form} coverFile={coverFile} galleryFiles={galleryFiles} createdEvent={createdEvent} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
