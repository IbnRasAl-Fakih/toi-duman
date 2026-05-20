import React from "react";
import CreateEventDateField from "../../components/create-event-date-field.jsx";
import CreateEventTimeField from "../../components/create-event-time-field.jsx";
import GlobalNotification from "../../components/global-notification.jsx";
import LandingHeader from "../../components/landing/landing-header.jsx";
import MusicPicker from "../../components/music-picker.jsx";
import Template5AudioToggle from "../../components/templates/theatre-of-love-template/audio-toggle.jsx";
import { useAdminAuth } from "../../context/admin-auth-context.jsx";
import TheatreOfLovePage, { THEATRE_OF_LOVE_PATH, THEATRE_OF_LOVE_TYPE } from "../templates/theatre-of-love-page.jsx";

const initialForm = {
  type: "wedding",
  date: "",
  time: "",
  location: "",
  locationLink: "",
  musicId: "",
  musicUrl: "",
  musicTitle: "",
  musicStartTime: 0,
  showHeroSection: true,
  showDetailsSection: true,
  showCountdownSection: true,
  showTimelineSection: true,
  showNoteSection: true,
  showRsvpSection: true,
  showHeroOverline: true,
  showHeroTitle: true,
  showHeroOpenButton: true,
  showHeroScrollLabel: true,
  showDetailsGallery: true,
  showDetailsDate: true,
  showDetailsTime: true,
  showDetailsPlace: true,
  showCountdownTitle: true,
  showCountdownItems: true,
  showTimelineTitle: true,
  showTimelineItems: true,
  showVenueSectionLabel: true,
  showVenueSubtitle: true,
  showVenueImage: true,
  showVenueTitle: true,
  showVenueLocation: true,
  showVenueDateLabel: true,
  showVenueMapButton: true,
  showNoteTitle: true,
  showNoteText: true,
  showNoteHostsLabel: true,
  showNoteHosts: true,
  showRsvpTitle: true,
  showRsvpDescription: true,
  showRsvpNameInput: true,
  showRsvpOptions: true,
  showRsvpSubmitButton: true,
  showRsvpSubmittingLabel: true,
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
  schedule: [
    { id: "schedule-1", time: "18:30", title: "Қонақтарды қарсы алу" },
    { id: "schedule-2", time: "19:30", title: "Тойдың басталуы" }
  ],
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
const DEFAULT_PREVIEW_IMAGES = [
  "/images/photo_example_1.jpg",
  "/images/photo_example_2.jpg",
  "/images/photo_example_3.jpg"
];
const KAZAKHSTAN_TIMEZONE_OFFSET = "+05:00";

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

function buildKazakhstanDateTime(date, time) {
  return date && time ? `${date}T${time}:00${KAZAKHSTAN_TIMEZONE_OFFSET}` : date || "";
}

function buildConfig(form, galleryImageUrls = []) {
  return {
    template_path: THEATRE_OF_LOVE_PATH,
    template_type: THEATRE_OF_LOVE_TYPE,
    template_name: "Махаббат театры",
    date: buildKazakhstanDateTime(form.date, form.time),
    time: form.time,
    location: form.location,
    location_link: form.locationLink || null,
    music_id: form.musicId || null,
    music_url: form.musicUrl || null,
    music_title: form.musicTitle || null,
    music_start_time: Number(form.musicStartTime) || 0,
    sections: {
      hero: form.showHeroSection !== false,
      details: form.showDetailsSection !== false,
      countdown: form.showCountdownSection !== false,
      timeline: form.showTimelineSection !== false,
      note: form.showNoteSection !== false,
      rsvp: form.showRsvpSection !== false
    },
    elements: {
      "hero.overline": form.showHeroOverline !== false,
      "hero.title": form.showHeroTitle !== false,
      "hero.openButton": form.showHeroOpenButton !== false,
      "hero.scrollLabel": form.showHeroScrollLabel !== false,
      "details.gallery": form.showDetailsGallery !== false,
      "details.date": form.showDetailsDate !== false,
      "details.time": form.showDetailsTime !== false,
      "details.place": form.showDetailsPlace !== false,
      "countdown.title": form.showCountdownTitle !== false,
      "countdown.items": form.showCountdownItems !== false,
      "timeline.title": form.showTimelineTitle !== false,
      "timeline.items": form.showTimelineItems !== false,
      "venue.sectionLabel": form.showVenueSectionLabel !== false,
      "venue.subtitle": form.showVenueSubtitle !== false,
      "venue.image": form.showVenueImage !== false,
      "venue.title": form.showVenueTitle !== false,
      "venue.location": form.showVenueLocation !== false,
      "venue.dateLabel": form.showVenueDateLabel !== false,
      "venue.mapButton": form.showVenueMapButton !== false,
      "note.title": form.showNoteTitle !== false,
      "note.text": form.showNoteText !== false,
      "note.hostsLabel": form.showNoteHostsLabel !== false,
      "note.hosts": form.showNoteHosts !== false,
      "rsvp.title": form.showRsvpTitle !== false,
      "rsvp.description": form.showRsvpDescription !== false,
      "rsvp.nameInput": form.showRsvpNameInput !== false,
      "rsvp.options": form.showRsvpOptions !== false,
      "rsvp.submitButton": form.showRsvpSubmitButton !== false,
      "rsvp.submittingLabel": form.showRsvpSubmittingLabel !== false
    },
    description: form.description || null,
    name: form.name
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    overline: form.overline,
    heroTitle: form.name
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .join("\n"),
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
    schedule: form.schedule
      .filter((item) => item.time.trim() || item.title.trim())
      .map(({ time, title }) => ({ time, title })),
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

async function createTemplate5Event({ config, type, isExample, galleryFiles, uploadedMusic }) {
  const payload = new FormData();
  payload.append("type", type);
  payload.append("is_example", String(isExample));
  payload.append("config", JSON.stringify(config));
  if (uploadedMusic?.file) {
    payload.append("music_file", uploadedMusic.file);
    payload.append("music_title", uploadedMusic.title || uploadedMusic.file.name);
  }
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

function EventRow({ time, title, onTimeChange, onTitleChange, onRemove }) {
  return (
    <div className="grid gap-3 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-end">
      <CreateEventTimeField label="Уақыт" selected={parseTimeValue(time)} onChange={(value) => onTimeChange(formatTimeValue(value))} />
      <Field label="Оқиға" value={title} onChange={onTitleChange} placeholder="Тойдың басталуы" />
      <button
        type="button"
        onClick={onRemove}
        className="h-[46px] rounded-full border border-[#ead9c2] px-4 text-sm font-semibold text-[#9c5a4d] transition hover:border-[#d2a697] hover:bg-[#fff4f0]"
      >
        Өшіру
      </button>
    </div>
  );
}

function FormSection({ title, enabled = true, onEnabledChange = null, children }) {
  const isToggleable = typeof onEnabledChange === "function";
  const isEnabled = !isToggleable || enabled;

  return (
    <section className={`space-y-6 border-b pb-10 transition ${isEnabled ? "border-[#ece5da]" : "rounded-[18px] border-[#eadfd2] bg-[#fcfaf7] px-4 py-5 opacity-80"}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionTitle>{title}</SectionTitle>
        {isToggleable ? <ToggleField label={isEnabled ? "Қосылған" : "Қосу"} checked={isEnabled} onChange={onEnabledChange} compact /> : null}
      </div>
      <fieldset disabled={!isEnabled} className={`space-y-6 transition ${isEnabled ? "" : "pointer-events-none opacity-45 grayscale"}`}>
        {children}
      </fieldset>
    </section>
  );
}

function ToggleField({ label, checked, onChange, compact = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 rounded-full border text-sm transition ${
        checked ? "border-[#d7c39e] bg-[#f7efe3] text-[#6f5429]" : "border-[#e6ddd0] bg-[#f7f4ef] text-[#9a8b78]"
      } ${compact ? "px-3 py-1.5" : "px-4 py-2"}`}
    >
      <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${checked ? "bg-[#b89255]" : "bg-[#d8d0c4]"}`}>
        <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition ${checked ? "translate-x-4" : "translate-x-1"}`} />
      </span>
      <span>{label}</span>
    </button>
  );
}

function EyeIcon({ hidden = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
      {hidden ? <path d="M4 4l16 16" /> : null}
    </svg>
  );
}

function ElementToggle({ label, checked, onChange }) {
  const statusLabel = checked ? "Көрсетілген" : "Жасырылған";

  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-label={`${label}: ${statusLabel}`}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        checked ? "border-[#decaa8] bg-[#fbf6ee] text-[#7a5b29]" : "border-[#e4d7c6] bg-[#f7f2ea] text-[#9c7b54]"
      }`}
    >
      <EyeIcon hidden={!checked} />
      <span>{statusLabel}</span>
    </button>
  );
}

function ElementBlock({ label, checked, onChange, children, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-end">
        <ElementToggle label={label} checked={checked} onChange={onChange} />
      </div>
      <fieldset disabled={!checked} className={`transition ${checked ? "" : "pointer-events-none opacity-45 grayscale"}`}>
        {children}
      </fieldset>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
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
  const previewUrls = React.useMemo(
    () => (galleryFiles.length ? galleryFiles.map((item) => item.previewUrl) : DEFAULT_PREVIEW_IMAGES),
    [galleryFiles]
  );
  const previewEvent = React.useMemo(
    () => ({
      id: 0,
      slug: createdEvent?.slug || "preview-template-5",
      type: form.type || "wedding",
      date: form.date && form.time ? buildKazakhstanDateTime(form.date, form.time) : `${new Date().toISOString().slice(0, 10)}T19:30:00${KAZAKHSTAN_TIMEZONE_OFFSET}`,
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
  const { isAuthenticated: isAdmin } = useAdminAuth();
  const [form, setForm] = React.useState(initialForm);
  const [galleryFiles, setGalleryFiles] = React.useState([]);
  const [uploadedMusic, setUploadedMusic] = React.useState(null);
  const [isExample, setIsExample] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [createdEvent, setCreatedEvent] = React.useState(null);
  const [error, setError] = React.useState("");
  const galleryFilesRef = React.useRef([]);
  const uploadedMusicRef = React.useRef(null);

  React.useEffect(() => {
    galleryFilesRef.current = galleryFiles;
    uploadedMusicRef.current = uploadedMusic;
  }, [galleryFiles, uploadedMusic]);

  React.useEffect(() => {
    return () => {
      galleryFilesRef.current.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });
      if (uploadedMusicRef.current?.previewUrl) {
        URL.revokeObjectURL(uploadedMusicRef.current.previewUrl);
      }
    };
  }, []);

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  function addScheduleItem() {
    setForm((current) => ({
      ...current,
      schedule: [
        ...current.schedule,
        {
          id: `schedule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          time: "",
          title: ""
        }
      ]
    }));
  }

  function updateScheduleItem(id, field, value) {
    setForm((current) => ({
      ...current,
      schedule: current.schedule.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    }));
  }

  function removeScheduleItem(id) {
    setForm((current) => ({
      ...current,
      schedule: current.schedule.filter((item) => item.id !== id)
    }));
  }

  function updateMusic(nextMusic) {
    setForm((current) => ({
      ...current,
      musicId: nextMusic.musicId,
      musicUrl: nextMusic.musicUrl,
      musicTitle: nextMusic.musicTitle,
      musicStartTime: nextMusic.startTime
    }));
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
        setError("3-?????? 4-???? ?????????? ???????? ????????????????.");
        return current;
      }

      return nextFiles;
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
      const created = await createTemplate5Event({
        config: buildConfig(form),
        type: form.type,
        isExample: isAdmin && isExample,
        galleryFiles,
        uploadedMusic
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

      <div className="flex-1 px-6 pb-10 pt-28 lg:px-10 xl:px-20">
        <div className="mx-auto w-full max-w-[1600px] xl:grid xl:grid-cols-[minmax(0,992px)_minmax(360px,1fr)] xl:gap-12">
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
                <div className="md:col-span-2">
                  <Field
                    label="Өтетін орын атауы"
                    value={form.venueTitle}
                    onChange={(event) => {
                      updateField("venueTitle", event.target.value);
                      updateField("venue_name", event.target.value);
                    }}
                    placeholder="Grand Ballroom"
                  />
                </div>
                <div className="md:col-span-2">
                  <Field label="Мекенжай" value={form.location} onChange={(event) => updateField("location", event.target.value)} placeholder="Достық даңғылы, 52" />
                </div>
                <div className="md:col-span-2">
                  <Field label="Карта сілтемесі" value={form.locationLink} onChange={(event) => updateField("locationLink", event.target.value)} placeholder="https://2gis.kz/..." />
                </div>
                <div className="md:col-span-2">
                  <MusicPicker
                    musicId={form.musicId}
                    musicUrl={form.musicUrl}
                    musicTitle={form.musicTitle}
                    startTime={form.musicStartTime}
                    uploadedMusic={uploadedMusic}
                    onChange={updateMusic}
                    onUploadChange={setUploadedMusic}
                  />
                </div>
                <div className="md:col-span-2 pt-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <FieldLabel>Галерея фотолары</FieldLabel>
                      <p className="text-sm text-[#8a8073]">3 немесе 4 фото жүктеңіз. Олар алдын ала қарауда және шақыру галереясында қолданылады.</p>
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
                          <div className="relative">
                            <img src={item.previewUrl} alt={`Gallery ${index + 1}`} className="aspect-[4/5] w-full rounded-[18px] object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryItem(index)}
                              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(60,48,33,0.78)] text-lg leading-none text-white transition hover:bg-[rgba(60,48,33,0.92)]"
                              aria-label={`Delete ${item.name}`}
                            >
                              x
                            </button>
                          </div>
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

            <details className="group rounded-[22px] border border-[#eadfd2] bg-[#fcfaf7] px-5 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-[1.7rem] leading-none text-[#8b6a34]" style={{ fontFamily: "var(--font-display)" }}>
                  Кеңейтілген баптаулар
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d8c5a1] text-[#8b6a34] transition group-open:rotate-180">
                  <ChevronDownIcon />
                </span>
              </summary>

              <div className="mt-8 space-y-12">
            <FormSection title="Hero" enabled={form.showHeroSection !== false} onEnabledChange={(value) => updateField("showHeroSection", value)}>
              <div className="space-y-4">
                <ElementBlock label="Жоғарғы жазуды көрсету" checked={form.showHeroOverline !== false} onChange={(value) => updateField("showHeroOverline", value)}>
                  <Field label="Жоғарғы жазу" value={form.overline} onChange={(event) => updateField("overline", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Тақырыпты көрсету" checked={form.showHeroTitle !== false} onChange={(value) => updateField("showHeroTitle", value)}>
                  <p className="text-sm text-[#8f7d63]">Перде тақырыбы негізгі ақпараттағы жұптың есімдерінен алынады.</p>
                </ElementBlock>
                <ElementBlock label="Ашу батырмасын көрсету" checked={form.showHeroOpenButton !== false} onChange={(value) => updateField("showHeroOpenButton", value)}>
                  <Field label="Ашу батырмасы" value={form.heroOpenLabel} onChange={(event) => updateField("heroOpenLabel", event.target.value)} />
                </ElementBlock>
                <Field label="Батырманың aria-label-ы" value={form.heroOpenAriaLabel} onChange={(event) => updateField("heroOpenAriaLabel", event.target.value)} />
                <ElementBlock label="Сырғыту ишарасын көрсету" checked={form.showHeroScrollLabel !== false} onChange={(value) => updateField("showHeroScrollLabel", value)} className="md:col-span-2">
                  <Field label="Сырғыту ишарасы" value={form.heroScrollLabel} onChange={(event) => updateField("heroScrollLabel", event.target.value)} />
                </ElementBlock>
              </div>
            </FormSection>

            <FormSection title="Өтетін орын және галерея" enabled={form.showDetailsSection !== false} onEnabledChange={(value) => updateField("showDetailsSection", value)}>
              <div className="grid gap-4">
                <p className="text-sm text-[#8f7d63]">Өтетін орын, мекенжай, карта сілтемесі, музыка және галерея негізгі ақпарат бөлімінде өңделеді.</p>

                <div className="grid gap-4 md:grid-cols-3">
                  <ElementBlock label="Күнді көрсету" checked={form.showDetailsDate !== false} onChange={(value) => updateField("showDetailsDate", value)}>
                    <Field label="Күн атауы" value={form.detailsDateLabel} onChange={(event) => updateField("detailsDateLabel", event.target.value)} />
                  </ElementBlock>
                  <ElementBlock label="Уақытты көрсету" checked={form.showDetailsTime !== false} onChange={(value) => updateField("showDetailsTime", value)}>
                    <Field label="Уақыт атауы" value={form.detailsTimeLabel} onChange={(event) => updateField("detailsTimeLabel", event.target.value)} />
                  </ElementBlock>
                  <ElementBlock label="Орынды көрсету" checked={form.showDetailsPlace !== false} onChange={(value) => updateField("showDetailsPlace", value)}>
                    <Field label="Орын атауы" value={form.detailsPlaceLabel} onChange={(event) => updateField("detailsPlaceLabel", event.target.value)} />
                  </ElementBlock>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <ElementBlock label="Орын бөлімі тақырыбын көрсету" checked={form.showVenueSectionLabel !== false} onChange={(value) => updateField("showVenueSectionLabel", value)}>
                    <Field label="Орын бөлімі тақырыбы" value={form.venueSectionLabel} onChange={(event) => updateField("venueSectionLabel", event.target.value)} />
                  </ElementBlock>
                  <ElementBlock label="Карта батырмасын көрсету" checked={form.showVenueMapButton !== false} onChange={(value) => updateField("showVenueMapButton", value)}>
                    <Field label="Карта батырмасы" value={form.mapLabel} onChange={(event) => updateField("mapLabel", event.target.value)} />
                  </ElementBlock>
                </div>

                <ElementBlock label="Орын ішкі тақырыбын көрсету" checked={form.showVenueSubtitle !== false} onChange={(value) => updateField("showVenueSubtitle", value)}>
                  <Field
                    label="Орын блогының ішкі тақырыбы"
                    value={form.venueSubtitle}
                    onChange={(event) => updateField("venueSubtitle", event.target.value)}
                  />
                </ElementBlock>

                <div className="grid gap-4 md:grid-cols-2">
                  <ElementBlock label="Орын суретін көрсету" checked={form.showVenueImage !== false} onChange={(value) => updateField("showVenueImage", value)}>
                    <p className="text-sm text-[#8f7d63]">Орын суреті шаблоннан алынады.</p>
                  </ElementBlock>
                  <ElementBlock label="Орын атауын көрсету" checked={form.showVenueTitle !== false} onChange={(value) => updateField("showVenueTitle", value)}>
                    <p className="text-sm text-[#8f7d63]">Орын атауы негізгі ақпараттан алынады.</p>
                  </ElementBlock>
                  <ElementBlock label="Мекенжайды көрсету" checked={form.showVenueLocation !== false} onChange={(value) => updateField("showVenueLocation", value)}>
                    <p className="text-sm text-[#8f7d63]">Мекенжай негізгі ақпараттан алынады.</p>
                  </ElementBlock>
                  <ElementBlock label="Күн белгісін көрсету" checked={form.showVenueDateLabel !== false} onChange={(value) => updateField("showVenueDateLabel", value)}>
                    <p className="text-sm text-[#8f7d63]">Күн белгісі негізгі ақпараттағы күннен алынады.</p>
                  </ElementBlock>
                </div>

                <ElementBlock label="Галереяны көрсету" checked={form.showDetailsGallery !== false} onChange={(value) => updateField("showDetailsGallery", value)} className="pt-2">
                  <p className="text-sm text-[#8f7d63]">Галерея фотолары негізгі ақпарат бөлімінде жүктеледі.</p>
                </ElementBlock>
              </div>
            </FormSection>

            <FormSection title="Таймер және бағдарлама" enabled={form.showCountdownSection !== false || form.showTimelineSection !== false} onEnabledChange={(value) => {
              updateField("showCountdownSection", value);
              updateField("showTimelineSection", value);
            }}>
              <div className="space-y-4">
                <ElementBlock label="Таймер тақырыбын көрсету" checked={form.showCountdownTitle !== false} onChange={(value) => updateField("showCountdownTitle", value)}>
                  <Field label="Таймер тақырыбы" value={form.countdownTitle} onChange={(event) => updateField("countdownTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Таймер сандарын көрсету" checked={form.showCountdownItems !== false} onChange={(value) => updateField("showCountdownItems", value)}>
                  <p className="text-sm text-[#8f7d63]">Таймер сандары оқиға күні мен уақытынан есептеледі.</p>
                </ElementBlock>
                <ElementBlock label="Бағдарлама тақырыбын көрсету" checked={form.showTimelineTitle !== false} onChange={(value) => updateField("showTimelineTitle", value)}>
                  <Field label="Бағдарлама бөлімі тақырыбы" value={form.timelineTitle} onChange={(event) => updateField("timelineTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Бағдарлама элементтерін көрсету" checked={form.showTimelineItems !== false} onChange={(value) => updateField("showTimelineItems", value)}>
                <div className="space-y-4">
                  {form.schedule.map((item) => (
                    <EventRow
                      key={item.id}
                      time={item.time}
                      title={item.title}
                      onTimeChange={(value) => updateScheduleItem(item.id, "time", value)}
                      onTitleChange={(event) => updateScheduleItem(item.id, "title", event.target.value)}
                      onRemove={() => removeScheduleItem(item.id)}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addScheduleItem}
                    className="rounded-full border border-[#d8c5a1] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a34] transition hover:bg-[#fbf6ee]"
                  >
                    Бағдарлама қосу
                  </button>
                </div>
                </ElementBlock>
              </div>
            </FormSection>

            <FormSection title="Ескертпе блогы" enabled={form.showNoteSection !== false} onEnabledChange={(value) => updateField("showNoteSection", value)}>
              <div className="grid gap-4 md:grid-cols-2">
                <ElementBlock label="Қолтаңба атауын көрсету" checked={form.showNoteHostsLabel !== false} onChange={(value) => updateField("showNoteHostsLabel", value)}>
                  <Field label="Қолтаңба атауы" value={form.hostsLabel} onChange={(event) => updateField("hostsLabel", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Қолтаңбаны көрсету" checked={form.showNoteHosts !== false} onChange={(value) => updateField("showNoteHosts", value)}>
                  <Field label="Қолтаңба" value={form.hosts} onChange={(event) => updateField("hosts", event.target.value)} />
                </ElementBlock>
                <div className="md:col-span-2">
                  <ElementBlock label="Блок тақырыбын көрсету" checked={form.showNoteTitle !== false} onChange={(value) => updateField("showNoteTitle", value)}>
                    <Field label="Блок тақырыбы" value={form.noteTitle} onChange={(event) => updateField("noteTitle", event.target.value)} />
                  </ElementBlock>
                </div>
                <div className="md:col-span-2">
                  <ElementBlock label="Блок мәтінін көрсету" checked={form.showNoteText !== false} onChange={(value) => updateField("showNoteText", value)}>
                    <Field label="Блок мәтіні" value={form.noteText} onChange={(event) => updateField("noteText", event.target.value)} multiline rows={4} />
                  </ElementBlock>
                </div>
              </div>
            </FormSection>

            <FormSection title="RSVP" enabled={form.showRsvpSection !== false} onEnabledChange={(value) => updateField("showRsvpSection", value)}>
              <div className="grid gap-4 md:grid-cols-2">
                <ElementBlock label="Форма тақырыбын көрсету" checked={form.showRsvpTitle !== false} onChange={(value) => updateField("showRsvpTitle", value)} className="md:col-span-2">
                  <Field label="Форма тақырыбы" value={form.rsvpTitle} onChange={(event) => updateField("rsvpTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Форма сипаттамасын көрсету" checked={form.showRsvpDescription !== false} onChange={(value) => updateField("showRsvpDescription", value)} className="md:col-span-2">
                  <Field label="Форма сипаттамасы" value={form.rsvpDescription} onChange={(event) => updateField("rsvpDescription", event.target.value)} multiline rows={4} />
                </ElementBlock>
                <ElementBlock label="Аты-жөні өрісін көрсету" checked={form.showRsvpNameInput !== false} onChange={(value) => updateField("showRsvpNameInput", value)}>
                  <Field
                    label="Аты-жөн плейсхолдері"
                    value={form.rsvpNamePlaceholder}
                    onChange={(event) => updateField("rsvpNamePlaceholder", event.target.value)}
                  />
                </ElementBlock>
                <ElementBlock label="Жіберу батырмасын көрсету" checked={form.showRsvpSubmitButton !== false} onChange={(value) => updateField("showRsvpSubmitButton", value)}>
                  <Field label="Жіберу батырмасы" value={form.rsvpSubmitLabel} onChange={(event) => updateField("rsvpSubmitLabel", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Жіберу кезіндегі мәтінді көрсету" checked={form.showRsvpSubmittingLabel !== false} onChange={(value) => updateField("showRsvpSubmittingLabel", value)}>
                  <Field label="Жіберу кезіндегі мәтін" value={form.rsvpSubmittingLabel} onChange={(event) => updateField("rsvpSubmittingLabel", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Жауаптарды көрсету" checked={form.showRsvpOptions !== false} onChange={(value) => updateField("showRsvpOptions", value)} className="md:col-span-2">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="'Иә' жауабы" value={form.rsvpYesLabel} onChange={(event) => updateField("rsvpYesLabel", event.target.value)} />
                    <Field label="'Жоқ' жауабы" value={form.rsvpNoLabel} onChange={(event) => updateField("rsvpNoLabel", event.target.value)} />
                  </div>
                </ElementBlock>
              </div>
            </FormSection>

              </div>
            </details>

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

          <aside className="mt-12 xl:mt-0 xl:min-w-[360px]">
            <div className="xl:fixed xl:bottom-0 xl:right-0 xl:top-[64px] xl:flex xl:w-[calc((100vw-min(100vw,1600px))/2+max(360px,calc((min(100vw,1600px)-992px-48px)*0.5)))] xl:items-center xl:justify-center">
              <div className="w-[286px]">
                <PhonePreview form={form} galleryFiles={galleryFiles} createdEvent={createdEvent} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
