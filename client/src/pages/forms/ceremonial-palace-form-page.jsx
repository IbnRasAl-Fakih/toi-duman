import React from "react";
import CreateEventDateField from "../../components/create-event-date-field.jsx";
import CreateEventTimeField from "../../components/create-event-time-field.jsx";
import GlobalNotification from "../../components/global-notification.jsx";
import LandingHeader from "../../components/landing/landing-header.jsx";
import MusicPicker from "../../components/music-picker.jsx";
import CeremonialPalaceAudioToggle from "../../components/templates/ceremonial-palace-template/audio-toggle.jsx";
import { useAdminAuth } from "../../context/admin-auth-context.jsx";
import CeremonialPalacePage, {
  CEREMONIAL_PALACE_PATH,
  CEREMONIAL_PALACE_TYPE
} from "../templates/ceremonial-palace-page.jsx";

const PREVIEW_BASE_WIDTH = 430;
const GALLERY_MIN = 3;
const GALLERY_MAX = 6;
const DEFAULT_COVER_IMAGE = "/images/templates/ceremonial-palace/300592484d1f31590325.png.webp";
const DEFAULT_PREVIEW_IMAGES = [
  "/images/photo_example_1.jpg",
  "/images/photo_example_2.jpg",
  "/images/photo_example_3.jpg"
];
const KAZAKHSTAN_TIMEZONE_OFFSET = "+05:00";

const initialForm = {
  type: "wedding",
  date: "",
  time: "",
  location: "Petit Chemin de Saint-Gilles 13200 Arles, France",
  locationLink: "",
  musicId: "",
  musicUrl: "",
  musicTitle: "",
  musicStartTime: 0,
  showIntroSection: true,
  showCountdownSection: true,
  showTimelineSection: true,
  showLocationSection: true,
  showGallerySection: true,
  showDetailsSection: true,
  showRsvpSection: true,
  showHeroDayLabel: true,
  showHeroDateLabel: true,
  showHeroCoupleNames: true,
  showHeroFlowerStrip: true,
  showIntroTitle: true,
  showIntroParagraph1: true,
  showIntroParagraph2: true,
  showCountdownTitle: true,
  showCountdownItems: true,
  showTimelineTitle: true,
  showLocationTitle: true,
  showLocationVenue: true,
  showLocationAddress: true,
  showLocationMapButton: true,
  showLocationImage: true,
  showGalleryTitle: true,
  showGallerySlider: true,
  showDetailsWishTitle: true,
  showDetailsWishText: true,
  showDetailsTitle: true,
  showDetailsContacts: true,
  showDetailsGift: true,
  showDetailsFlowerBand: true,
  showRsvpTitle: true,
  showRsvpDescription: true,
  showRsvpNameInput: true,
  showRsvpOptions: true,
  showRsvpSubmitButton: true,
  showRsvpFarewell: true,
  showRsvpFarewellImage: true,
  name: "Виктор, Паула",
  dayLabel: "Үйлену тойы",
  heroVideoUrl: "/images/templates/ceremonial-palace/IMG_6230.MP4",
  heroOpenLabel: "Ашып көру",
  heroOpenAriaLabel: "Шақыруды ашу",
  introTitle: "Құрметті ағайын-туыс, достар!",
  introParagraph1: "Өміріміздегі ең маңызды күндердің бірін сіздермен бірге қарсы алғымыз келеді.",
  introParagraph2: "Қуанышымызға ортақ болып, ақ тілектеріңізді арнасаңыздар, біз үшін үлкен мәртебе.",
  countdownTitle: "Тойдың басталуына қалды",
  timelineTitle: "Той бағдарламасы",
  schedule: [
    { id: "schedule-1", time: "16:00", title: "Неке қию рәсімі" },
    { id: "schedule-2", time: "17:00", title: "Қонақтарды қарсы алу" },
    { id: "schedule-3", time: "19:00", title: "Кешкі ас" },
    { id: "schedule-4", time: "20:00", title: "Той кеші" }
  ],
  locationTitle: "Мекенжай",
  locationAddressPrefix: "Мекенжай",
  locationImageUrl: "/images/templates/ceremonial-palace/image-gen_1-Photoroo.png.webp",
  venue_name: "Chateau de Paon",
  mapLabel: "Картаны ашу",
  dressCodeTitle: "Галерея",
  dressCodeDescription: "Естелік сәттерімізден шағын галерея.",
  dressCodeNote: "Галереяға арналған суреттер.",
  detailsTitle: "Қосымша ақпарат",
  detailsWishTitle: "Шағын тілек",
  detailsWishText: "Бұл күннің әр сәтін сүйіспеншілікпен дайындап жатырмыз және қуанышымызды сіздермен бөлісуді асыға күтеміз.",
  detailsQuestionsTitle: "Сұрақтарыңыз болса",
  detailsDescription: "Қосымша сұрақтар бойынша той ұйымдастырушысына хабарласа аласыз.",
  organizerName: "Әмина",
  organizerPhone: "+7 777 777 77 77",
  detailsGiftTitle: "Сыйлық туралы",
  giftText: "Сіздердің келіп, қуанышымызға ортақ болғандарыңыз біз үшін ең үлкен сый. Егер сый жасауды қаласаңыздар, жас отбасымыздың болашағына қосқан үлестеріңізді ризашылықпен қабылдаймыз.",
  rsvpTitle: "Қатысуыңызды растаңыз",
  rsvpDescription: "Той дайындығын нақтылау үшін қатысатыныңызды белгілеуіңізді сұраймыз.",
  rsvpNamePlaceholder: "Аты-жөніңіз",
  rsvpSubmitLabel: "Жіберу",
  rsvpSubmittingLabel: "Жіберілуде...",
  rsvpYesLabel: "Иә, қуана қатысамын",
  rsvpNoLabel: "Өкінішке қарай, қатыса алмаймын",
  farewellTitle: "Сіздерді асыға күтеміз!",
  farewellSignature: "Виктор және Паула",
  farewellImageUrl: "/images/templates/ceremonial-palace/300592484d1f31590325.png.webp",
  farewellImageAlt: "Жас жұбайлардың суреті"
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

function buildKazakhstanDateTime(date, time) {
  return date && time ? `${date}T${time}:00${KAZAKHSTAN_TIMEZONE_OFFSET}` : date || "";
}

function buildConfig(form, galleryImageUrls = [], farewellImageUrl = form.farewellImageUrl) {
  return {
    template_path: CEREMONIAL_PALACE_PATH,
    template_type: CEREMONIAL_PALACE_TYPE,
    template_name: "Салтанат сарайы",
    date: buildKazakhstanDateTime(form.date, form.time),
    time: form.time,
    location: form.location,
    location_link: form.locationLink || null,
    music_id: form.musicId || null,
    music_url: form.musicUrl || null,
    music_title: form.musicTitle || null,
    music_start_time: Number(form.musicStartTime) || 0,
    sections: {
      intro: form.showIntroSection !== false,
      countdown: form.showCountdownSection !== false,
      timeline: form.showTimelineSection !== false,
      location: form.showLocationSection !== false,
      gallery: form.showGallerySection !== false,
      details: form.showDetailsSection !== false,
      rsvp: form.showRsvpSection !== false
    },
    elements: {
      "hero.dayLabel": form.showHeroDayLabel !== false,
      "hero.dateLabel": form.showHeroDateLabel !== false,
      "hero.coupleNames": form.showHeroCoupleNames !== false,
      "hero.flowerStrip": form.showHeroFlowerStrip !== false,
      "intro.title": form.showIntroTitle !== false,
      "intro.paragraph1": form.showIntroParagraph1 !== false,
      "intro.paragraph2": form.showIntroParagraph2 !== false,
      "countdown.title": form.showCountdownTitle !== false,
      "countdown.items": form.showCountdownItems !== false,
      "timeline.title": form.showTimelineTitle !== false,
      "location.title": form.showLocationTitle !== false,
      "location.venue": form.showLocationVenue !== false,
      "location.address": form.showLocationAddress !== false,
      "location.mapButton": form.showLocationMapButton !== false,
      "location.image": form.showLocationImage !== false,
      "gallery.title": form.showGalleryTitle !== false,
      "gallery.slider": form.showGallerySlider !== false,
      "details.title": form.showDetailsTitle !== false,
      "details.wishTitle": form.showDetailsWishTitle !== false,
      "details.wishText": form.showDetailsWishText !== false,
      "details.contacts": form.showDetailsContacts !== false,
      "details.gift": form.showDetailsGift !== false,
      "details.flowerBand": form.showDetailsFlowerBand !== false,
      "rsvp.title": form.showRsvpTitle !== false,
      "rsvp.description": form.showRsvpDescription !== false,
      "rsvp.nameInput": form.showRsvpNameInput !== false,
      "rsvp.options": form.showRsvpOptions !== false,
      "rsvp.submitButton": form.showRsvpSubmitButton !== false,
      "rsvp.farewell": form.showRsvpFarewell !== false,
      "rsvp.farewellImage": form.showRsvpFarewellImage !== false
    },
    cover_image_url: DEFAULT_COVER_IMAGE,
    name: form.name
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    dayLabel: form.dayLabel,
    heroVideoUrl: form.heroVideoUrl,
    heroOpenLabel: form.heroOpenLabel,
    heroOpenAriaLabel: form.heroOpenAriaLabel,
    introTitle: form.introTitle,
    introParagraph1: form.introParagraph1,
    introParagraph2: form.introParagraph2,
    countdownTitle: form.countdownTitle,
    timelineTitle: form.timelineTitle,
    schedule: form.schedule
      .filter((item) => item.time.trim() || item.title.trim())
      .map(({ time, title }) => ({ time, title })),
    locationTitle: form.locationTitle,
    locationAddressPrefix: form.locationAddressPrefix,
    locationImageUrl: form.locationImageUrl,
    venue_name: form.venue_name,
    mapLabel: form.mapLabel,
    dressCodeTitle: form.dressCodeTitle,
    dressCodeDescription: form.dressCodeDescription,
    dressCodeNote: form.dressCodeNote,
    gallery_image_urls: galleryImageUrls,
    detailsTitle: form.detailsTitle,
    detailsWishTitle: form.detailsWishTitle,
    detailsWishText: form.detailsWishText,
    detailsQuestionsTitle: form.detailsQuestionsTitle,
    detailsDescription: form.detailsDescription,
    organizerName: form.organizerName,
    organizerPhone: form.organizerPhone,
    detailsGiftTitle: form.detailsGiftTitle,
    giftText: form.giftText,
    rsvpTitle: form.rsvpTitle,
    rsvpDescription: form.rsvpDescription,
    rsvpNamePlaceholder: form.rsvpNamePlaceholder,
    rsvpSubmitLabel: form.rsvpSubmitLabel,
    rsvpSubmittingLabel: form.rsvpSubmittingLabel,
    rsvpYesLabel: form.rsvpYesLabel,
    rsvpNoLabel: form.rsvpNoLabel,
    farewellTitle: form.farewellTitle,
    farewellSignature: form.farewellSignature,
    farewellImageUrl,
    farewellImageAlt: form.farewellImageAlt
  };
}

function validateForm(form, galleryFiles) {
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
  if (form.showGallerySection !== false && (galleryFiles.length < GALLERY_MIN || galleryFiles.length > GALLERY_MAX)) {
    return "Галерея үшін 3-тен 6-ға дейін фото жүктеңіз.";
  }

  return "";
}

async function createTemplate7Event({ config, type, isExample, galleryFiles, farewellImageFile, uploadedMusic }) {
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
  if (farewellImageFile?.file) {
    payload.append("farewell_image_file", farewellImageFile.file);
  }

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

function ToggleField({ label, checked, onChange, compact = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 rounded-full border text-sm transition ${
        checked
          ? "border-[#d7c39e] bg-[#f7efe3] text-[#6f5429]"
          : "border-[#e6ddd0] bg-[#f7f4ef] text-[#9a8b78]"
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

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
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
        checked
          ? "border-[#decaa8] bg-[#fbf6ee] text-[#7a5b29] hover:border-[#c9aa74] hover:bg-[#f7efe3]"
          : "border-[#e4d7c6] bg-[#f7f2ea] text-[#9c7b54] hover:border-[#d2b894] hover:bg-[#f1e8dc]"
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

function EventRow({ time, title, onTimeChange, onTitleChange, onRemove }) {
  return (
    <div className="grid gap-3 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-end">
      <CreateEventTimeField label="Уақыты" selected={parseTimeValue(time)} onChange={(value) => onTimeChange(formatTimeValue(value))} />
      <Field label="Іс-шара" value={title} onChange={onTitleChange} placeholder="Неке қию рәсімі" />
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
    <section
      className={`space-y-6 border-b pb-10 transition last:border-b-0 ${
        isEnabled ? "border-[#ece5da]" : "rounded-[18px] border-[#eadfd2] bg-[#fcfaf7] px-4 py-5 opacity-80"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionTitle>{title}</SectionTitle>
        {isToggleable ? (
          <div className="flex items-center gap-3">
            {!isEnabled ? <span className="text-sm text-[#a09383]">Қосылмаған</span> : null}
            <ToggleField label={isEnabled ? "Қосылған" : "Қосу"} checked={isEnabled} onChange={onEnabledChange} compact />
          </div>
        ) : null}
      </div>
      <fieldset disabled={!isEnabled} className={`space-y-6 transition ${isEnabled ? "" : "pointer-events-none opacity-45 grayscale"}`}>
        {children}
      </fieldset>
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
                aria-label={`${item.name} суретін өшіру`}
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

function PhonePreview({ form, galleryFiles, farewellImageFile, createdEvent }) {
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
  const previewFarewellImageUrl = farewellImageFile?.previewUrl || form.farewellImageUrl;
  const previewEvent = React.useMemo(
    () => ({
      id: 0,
      slug: createdEvent?.slug || "preview-ceremonial-palace",
      type: form.type || "wedding",
      date: form.date && form.time ? buildKazakhstanDateTime(form.date, form.time) : `${new Date().toISOString().slice(0, 10)}T16:00:00${KAZAKHSTAN_TIMEZONE_OFFSET}`,
      location: form.location || "Petit Chemin de Saint-Gilles 13200 Arles, France",
      location_link: form.locationLink || "#",
      cover_image_url: DEFAULT_COVER_IMAGE,
      config: buildConfig(form, previewGalleryUrls, previewFarewellImageUrl),
      is_example: true
    }),
    [createdEvent?.slug, form, previewGalleryUrls, previewFarewellImageUrl]
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
  const [galleryFiles, setGalleryFiles] = React.useState([]);
  const [farewellImageFile, setFarewellImageFile] = React.useState(null);
  const [uploadedMusic, setUploadedMusic] = React.useState(null);
  const [isExample, setIsExample] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [createdEvent, setCreatedEvent] = React.useState(null);
  const [error, setError] = React.useState("");
  const galleryFilesRef = React.useRef([]);
  const farewellImageFileRef = React.useRef(null);
  const uploadedMusicRef = React.useRef(null);

  React.useEffect(() => {
    galleryFilesRef.current = galleryFiles;
    farewellImageFileRef.current = farewellImageFile;
    uploadedMusicRef.current = uploadedMusic;
  }, [farewellImageFile, galleryFiles, uploadedMusic]);

  React.useEffect(() => {
    return () => {
      galleryFilesRef.current.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });
      if (farewellImageFileRef.current?.previewUrl) {
        URL.revokeObjectURL(farewellImageFileRef.current.previewUrl);
      }
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
        setError("Галереяға ең көбі 6 фото жүктеуге болады.");
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

  function handleFarewellImageChange(event) {
    const file = event.target.files?.[0] || null;
    event.target.value = "";

    if (!file) {
      return;
    }

    setError("");
    setFarewellImageFile((current) => {
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

  function handleRemoveFarewellImage() {
    setFarewellImageFile((current) => {
      if (current?.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }

      return null;
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
      const created = await createTemplate7Event({
        config: buildConfig(form),
        type: form.type,
        isExample: isAdmin && isExample,
        galleryFiles,
        farewellImageFile,
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
                      <p className="text-sm text-[#8f7d63]">3-тен 6-ға дейін фото жүктеңіз. Олар алдын ала қарауда және шақыру галереясында қолданылады.</p>
                    </div>
                    <label className="cursor-pointer rounded-full border border-[#d8c5a1] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a34]">
                      Қосу
                      <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                    </label>
                  </div>
                  <div className="mt-4">
                    <UploadGrid items={galleryFiles} emptyText="Галерея үшін 3-6 фото қосыңыз." onRemove={handleRemoveGalleryItem} />
                  </div>
                </div>
                <div className="md:col-span-2 pt-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <FieldLabel>Қоштасу суреті</FieldLabel>
                      <p className="text-sm text-[#8f7d63]">Бір фото жүктеңіз. Ол алдын ала қарауда және шақырудың соңында қолданылады.</p>
                    </div>
                    <label className="cursor-pointer rounded-full border border-[#d8c5a1] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a34]">
                      Таңдау
                      <input type="file" accept="image/*" onChange={handleFarewellImageChange} className="hidden" />
                    </label>
                  </div>
                  <div className="mt-4">
                    <UploadGrid
                      items={farewellImageFile ? [farewellImageFile] : [{ name: "Әдепкі қоштасу суреті", previewUrl: form.farewellImageUrl }]}
                      emptyText="Қоштасу үшін бір фото қосыңыз."
                      onRemove={farewellImageFile ? handleRemoveFarewellImage : null}
                    />
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
            <FormSection title="Басты экран">
              <div className="space-y-4">
                <ElementBlock label="Жоғарғы жазуды көрсету" checked={form.showHeroDayLabel !== false} onChange={(value) => updateField("showHeroDayLabel", value)}>
                  <Field label="Жоғарғы жазу" value={form.dayLabel} onChange={(event) => updateField("dayLabel", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Күнді көрсету" checked={form.showHeroDateLabel !== false} onChange={(value) => updateField("showHeroDateLabel", value)}>
                  <p className="text-sm text-[#8f7d63]">Күн негізгі ақпараттағы “Күні” өрісінен алынады.</p>
                </ElementBlock>
                <ElementBlock label="Есімдерді көрсету" checked={form.showHeroCoupleNames !== false} onChange={(value) => updateField("showHeroCoupleNames", value)}>
                  <p className="text-sm text-[#8f7d63]">Есімдер негізгі ақпараттағы “Жұптың есімдері” өрісінен алынады.</p>
                </ElementBlock>
                <ElementBlock label="Гүл декорын көрсету" checked={form.showHeroFlowerStrip !== false} onChange={(value) => updateField("showHeroFlowerStrip", value)}>
                  <p className="text-sm text-[#8f7d63]">Басты экранның төменгі гүл декоры.</p>
                </ElementBlock>
                <Field label="Ашу батырмасы" value={form.heroOpenLabel} onChange={(event) => updateField("heroOpenLabel", event.target.value)} />
                <Field label="Ашу батырмасының қолжетімділік мәтіні" value={form.heroOpenAriaLabel} onChange={(event) => updateField("heroOpenAriaLabel", event.target.value)} />
              </div>
            </FormSection>

            <FormSection
              title="Кіріспе"
              enabled={form.showIntroSection !== false}
              onEnabledChange={(value) => updateField("showIntroSection", value)}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <ElementBlock label="Тақырыпты көрсету" checked={form.showIntroTitle !== false} onChange={(value) => updateField("showIntroTitle", value)} className="md:col-span-2">
                  <Field label="Кіріспе тақырыбы" value={form.introTitle} onChange={(event) => updateField("introTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="1-мәтінді көрсету" checked={form.showIntroParagraph1 !== false} onChange={(value) => updateField("showIntroParagraph1", value)} className="md:col-span-2">
                  <Field label="Кіріспе мәтіні 1" value={form.introParagraph1} onChange={(event) => updateField("introParagraph1", event.target.value)} multiline rows={4} />
                </ElementBlock>
                <ElementBlock label="2-мәтінді көрсету" checked={form.showIntroParagraph2 !== false} onChange={(value) => updateField("showIntroParagraph2", value)} className="md:col-span-2">
                  <Field label="Кіріспе мәтіні 2" value={form.introParagraph2} onChange={(event) => updateField("introParagraph2", event.target.value)} multiline rows={4} />
                </ElementBlock>
              </div>
            </FormSection>

            <FormSection
              title="Кері санақ"
              enabled={form.showCountdownSection !== false}
              onEnabledChange={(value) => updateField("showCountdownSection", value)}
            >
              <div className="space-y-4">
                <ElementBlock label="Тақырыпты көрсету" checked={form.showCountdownTitle !== false} onChange={(value) => updateField("showCountdownTitle", value)}>
                  <Field label="Кері санақ тақырыбы" value={form.countdownTitle} onChange={(event) => updateField("countdownTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Сандарды көрсету" checked={form.showCountdownItems !== false} onChange={(value) => updateField("showCountdownItems", value)}>
                  <p className="text-sm text-[#8f7d63]">Кері санақ сандары оқиға күні мен уақытынан есептеледі.</p>
                </ElementBlock>
              </div>
            </FormSection>

            <FormSection
              title="Бағдарлама"
              enabled={form.showTimelineSection !== false}
              onEnabledChange={(value) => updateField("showTimelineSection", value)}
            >
              <div className="space-y-4">
                <ElementBlock label="Тақырыпты көрсету" checked={form.showTimelineTitle !== false} onChange={(value) => updateField("showTimelineTitle", value)}>
                  <Field label="Бағдарлама тақырыбы" value={form.timelineTitle} onChange={(event) => updateField("timelineTitle", event.target.value)} />
                </ElementBlock>
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
              </div>
            </FormSection>

            <FormSection
              title="Мекенжай"
              enabled={form.showLocationSection !== false}
              onEnabledChange={(value) => updateField("showLocationSection", value)}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <ElementBlock label="Тақырыпты көрсету" checked={form.showLocationTitle !== false} onChange={(value) => updateField("showLocationTitle", value)}>
                  <Field label="Мекенжай тақырыбы" value={form.locationTitle} onChange={(event) => updateField("locationTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Орын атауын көрсету" checked={form.showLocationVenue !== false} onChange={(value) => updateField("showLocationVenue", value)}>
                  <Field label="Өтетін орын атауы" value={form.venue_name} onChange={(event) => updateField("venue_name", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Мекенжайды көрсету" checked={form.showLocationAddress !== false} onChange={(value) => updateField("showLocationAddress", value)} className="md:col-span-2">
                  <Field label="Мекенжай алдындағы мәтін" value={form.locationAddressPrefix} onChange={(event) => updateField("locationAddressPrefix", event.target.value)} />
                  <p className="mt-3 text-sm text-[#8f7d63]">Мекенжай мәтіні негізгі ақпараттағы “Мекенжай” өрісінен алынады.</p>
                </ElementBlock>
                <ElementBlock label="Карта батырмасын көрсету" checked={form.showLocationMapButton !== false} onChange={(value) => updateField("showLocationMapButton", value)} className="md:col-span-2">
                  <Field label="Карта батырмасы" value={form.mapLabel} onChange={(event) => updateField("mapLabel", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Суретті көрсету" checked={form.showLocationImage !== false} onChange={(value) => updateField("showLocationImage", value)} className="md:col-span-2">
                  <p className="text-sm text-[#8f7d63]">Мекенжай суреті шаблоннан алынады.</p>
                </ElementBlock>
              </div>
            </FormSection>

            <FormSection
              title="Галерея"
              enabled={form.showGallerySection !== false}
              onEnabledChange={(value) => updateField("showGallerySection", value)}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <ElementBlock label="Тақырыпты көрсету" checked={form.showGalleryTitle !== false} onChange={(value) => updateField("showGalleryTitle", value)} className="md:col-span-2">
                  <Field label="Галерея тақырыбы" value={form.dressCodeTitle} onChange={(event) => updateField("dressCodeTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Слайдерді көрсету" checked={form.showGallerySlider !== false} onChange={(value) => updateField("showGallerySlider", value)} className="md:col-span-2">
                  <p className="text-sm text-[#8f7d63]">Слайдер төмендегі жүктелген фотолардан құралады.</p>
                </ElementBlock>
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

            <FormSection
              title="Қосымша ақпарат"
              enabled={form.showDetailsSection !== false}
              onEnabledChange={(value) => updateField("showDetailsSection", value)}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <ElementBlock label="Қосымша ақпарат тақырыбын көрсету" checked={form.showDetailsTitle !== false} onChange={(value) => updateField("showDetailsTitle", value)} className="md:col-span-2">
                  <Field label="Қосымша ақпарат тақырыбы" value={form.detailsTitle} onChange={(event) => updateField("detailsTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Тілек тақырыбын көрсету" checked={form.showDetailsWishTitle !== false} onChange={(value) => updateField("showDetailsWishTitle", value)}>
                  <Field label="Тілек тақырыбы" value={form.detailsWishTitle} onChange={(event) => updateField("detailsWishTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Тілек мәтінін көрсету" checked={form.showDetailsWishText !== false} onChange={(value) => updateField("showDetailsWishText", value)} className="md:col-span-2">
                  <Field label="Тілек мәтіні" value={form.detailsWishText} onChange={(event) => updateField("detailsWishText", event.target.value)} multiline rows={4} />
                </ElementBlock>
                <ElementBlock label="Байланыстарды көрсету" checked={form.showDetailsContacts !== false} onChange={(value) => updateField("showDetailsContacts", value)} className="md:col-span-2">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Сұрақтар тақырыбы" value={form.detailsQuestionsTitle} onChange={(event) => updateField("detailsQuestionsTitle", event.target.value)} />
                    <Field label="Ұйымдастырушы аты" value={form.organizerName} onChange={(event) => updateField("organizerName", event.target.value)} />
                    <Field label="Ұйымдастырушы телефоны" value={form.organizerPhone} onChange={(event) => updateField("organizerPhone", event.target.value)} />
                    <div className="md:col-span-2">
                      <Field label="Қосымша ақпарат мәтіні" value={form.detailsDescription} onChange={(event) => updateField("detailsDescription", event.target.value)} multiline rows={4} />
                    </div>
                  </div>
                </ElementBlock>
                <ElementBlock label="Сыйлық блогын көрсету" checked={form.showDetailsGift !== false} onChange={(value) => updateField("showDetailsGift", value)} className="md:col-span-2">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Сыйлық тақырыбы" value={form.detailsGiftTitle} onChange={(event) => updateField("detailsGiftTitle", event.target.value)} />
                    <div className="md:col-span-2">
                      <Field label="Сыйлық туралы мәтін" value={form.giftText} onChange={(event) => updateField("giftText", event.target.value)} multiline rows={4} />
                    </div>
                  </div>
                </ElementBlock>
                <ElementBlock label="Гүл декорын көрсету" checked={form.showDetailsFlowerBand !== false} onChange={(value) => updateField("showDetailsFlowerBand", value)} className="md:col-span-2">
                  <p className="text-sm text-[#8f7d63]">Қосымша ақпарат соңындағы гүл декоры.</p>
                </ElementBlock>
              </div>
            </FormSection>

            <FormSection
              title="Қатысуды растау"
              enabled={form.showRsvpSection !== false}
              onEnabledChange={(value) => updateField("showRsvpSection", value)}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <ElementBlock label="Тақырыпты көрсету" checked={form.showRsvpTitle !== false} onChange={(value) => updateField("showRsvpTitle", value)} className="md:col-span-2">
                  <Field label="Қатысуды растау тақырыбы" value={form.rsvpTitle} onChange={(event) => updateField("rsvpTitle", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Сипаттаманы көрсету" checked={form.showRsvpDescription !== false} onChange={(value) => updateField("showRsvpDescription", value)} className="md:col-span-2">
                  <Field label="Қатысуды растау мәтіні" value={form.rsvpDescription} onChange={(event) => updateField("rsvpDescription", event.target.value)} multiline rows={4} />
                </ElementBlock>
                <ElementBlock label="Аты-жөні өрісін көрсету" checked={form.showRsvpNameInput !== false} onChange={(value) => updateField("showRsvpNameInput", value)}>
                  <Field label="Аты-жөні өрісінің көмекші мәтіні" value={form.rsvpNamePlaceholder} onChange={(event) => updateField("rsvpNamePlaceholder", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Жіберу батырмасын көрсету" checked={form.showRsvpSubmitButton !== false} onChange={(value) => updateField("showRsvpSubmitButton", value)}>
                  <Field label="Жіберу батырмасы" value={form.rsvpSubmitLabel} onChange={(event) => updateField("rsvpSubmitLabel", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Жіберіліп жатқан мәтінді көрсету" checked={form.showRsvpSubmitButton !== false} onChange={(value) => updateField("showRsvpSubmitButton", value)}>
                  <Field label="Жіберіліп жатқандағы мәтін" value={form.rsvpSubmittingLabel} onChange={(event) => updateField("rsvpSubmittingLabel", event.target.value)} />
                </ElementBlock>
                <ElementBlock label="Жауаптарды көрсету" checked={form.showRsvpOptions !== false} onChange={(value) => updateField("showRsvpOptions", value)} className="md:col-span-2">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Иә жауабы" value={form.rsvpYesLabel} onChange={(event) => updateField("rsvpYesLabel", event.target.value)} />
                    <Field label="Жоқ жауабы" value={form.rsvpNoLabel} onChange={(event) => updateField("rsvpNoLabel", event.target.value)} />
                  </div>
                </ElementBlock>
                <ElementBlock label="Қоштасуды көрсету" checked={form.showRsvpFarewell !== false} onChange={(value) => updateField("showRsvpFarewell", value)} className="md:col-span-2">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Қоштасу тақырыбы" value={form.farewellTitle} onChange={(event) => updateField("farewellTitle", event.target.value)} />
                    <Field label="Қоштасу қолтаңбасы" value={form.farewellSignature} onChange={(event) => updateField("farewellSignature", event.target.value)} />
                  </div>
                </ElementBlock>
                <ElementBlock label="Қоштасу суретін көрсету" checked={form.showRsvpFarewellImage !== false} onChange={(value) => updateField("showRsvpFarewellImage", value)} className="md:col-span-2">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Қоштасу суретінің сипаттамасы" value={form.farewellImageAlt} onChange={(event) => updateField("farewellImageAlt", event.target.value)} />
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
                  <span>Сынақ шақыруы үшін тапсырыс құрмау</span>
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
                    Сілтеме коды: <span className="font-mono">{createdEvent.slug}</span>
                  </div>
                  <div className="mt-1">
                    Сілтеме: <span className="font-mono">{window.location.origin}/{createdEvent.slug}</span>
                  </div>
                </div>
              ) : null}
            </section>
          </section>

          <aside className="mt-12 xl:mt-0 xl:min-w-[360px]">
            <div className="xl:fixed xl:bottom-0 xl:right-0 xl:top-[64px] xl:flex xl:w-[calc((100vw-min(100vw,1600px))/2+max(360px,calc((min(100vw,1600px)-992px-48px)*0.5)))] xl:items-center xl:justify-center">
              <div className="w-[286px]">
              <PhonePreview form={form} galleryFiles={galleryFiles} farewellImageFile={farewellImageFile} createdEvent={createdEvent} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
