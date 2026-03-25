import React from "react";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import AdminShell from "../../components/admin-shell.jsx";

const initialForm = {
  type: "wedding",
  date: "",
  time: "",
  location: "",
  locationLink: "",
  description: "",
  coverImageUrl: "",
  configName: "",
  configExtra: '{\n  "theme": "rose-romance"\n}'
};

function buildConfigPayload(form) {
  const parsedExtra = form.configExtra.trim() ? JSON.parse(form.configExtra) : {};

  return {
    ...parsedExtra,
    name: form.configName
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  };
}

function safePreviewConfig(form) {
  try {
    return buildConfigPayload(form);
  } catch {
    return "Невалидный JSON";
  }
}

function parseDateValue(value) {
  if (!value) return null;
  const parsed = parse(value, "yyyy-MM-dd", new Date());
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function parseTimeValue(value) {
  if (!value) return null;
  const parsed = parse(value, "HH:mm", new Date());
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export default function AdminCreateEventPage() {
  const [form, setForm] = React.useState(initialForm);
  const [coverFile, setCoverFile] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isUploadingCover, setIsUploadingCover] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState("");
  const [coverPreview, setCoverPreview] = React.useState("");
  const [coverFileName, setCoverFileName] = React.useState("");
  const [isDraggingCover, setIsDraggingCover] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (coverPreview.startsWith("blob:")) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function setSelectedCoverFile(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      throw new Error("Нужен файл изображения");
    }

    if (coverPreview.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }

    const localPreviewUrl = URL.createObjectURL(file);
    setCoverPreview(localPreviewUrl);
    setCoverFileName(file.name);
    setCoverFile(file);
    updateField("coverImageUrl", "");
  }

  function handleCoverInputChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError("");
      setSelectedCoverFile(file);
    } catch (fileError) {
      setError(fileError instanceof Error ? fileError.message : "Не удалось выбрать изображение");
    } finally {
      event.target.value = "";
    }
  }

  function handleCoverDrop(event) {
    event.preventDefault();
    setIsDraggingCover(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    try {
      setError("");
      setSelectedCoverFile(file);
    } catch (fileError) {
      setError(fileError instanceof Error ? fileError.message : "Не удалось выбрать изображение");
    }
  }

  function clearCoverImage() {
    if (coverPreview.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverPreview("");
    setCoverFileName("");
    setCoverFile(null);
    updateField("coverImageUrl", "");
  }

  function resetForm() {
    if (coverPreview.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }

    setForm(initialForm);
    setCoverFile(null);
    setCoverPreview("");
    setCoverFileName("");
    setIsDraggingCover(false);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setResult(null);

    try {
      const configPayload = buildConfigPayload(form);
      const payload = new FormData();

      payload.append("type", form.type);
      payload.append("date", form.date);
      if (form.time) payload.append("time", form.time);
      payload.append("location", form.location);
      if (form.locationLink) payload.append("location_link", form.locationLink);
      if (form.description) payload.append("description", form.description);
      if (coverFile) {
        setIsUploadingCover(true);
        payload.append("file", coverFile);
      } else if (form.coverImageUrl) {
        payload.append("cover_image_url", form.coverImageUrl);
      }
      payload.append("config", JSON.stringify(configPayload));

      const response = await fetch("/api/v1/events", {
        method: "POST",
        body: payload
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Не удалось создать event");
      }

      setResult(data);
      resetForm();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Неизвестная ошибка");
    } finally {
      setIsUploadingCover(false);
      setIsSubmitting(false);
    }
  }

  return (
    <AdminShell
      title="Создание нового event"
      description="Рабочая панель для публикации новых событий. Здесь заполняются базовые параметры и собирается конфигурация шаблона."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_360px]">
        <section>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Тип события"
                value={form.type}
                onChange={(value) => updateField("type", value)}
                placeholder="wedding"
              />

              <DateField
                label="Дата"
                selected={parseDateValue(form.date)}
                onChange={(value) => updateField("date", value ? format(value, "yyyy-MM-dd") : "")}
              />

              <TimeField
                label="Время"
                selected={parseTimeValue(form.time)}
                onChange={(value) => updateField("time", value ? format(value, "HH:mm") : "")}
              />

              <Field
                label="Локация"
                value={form.location}
                onChange={(value) => updateField("location", value)}
                placeholder="Villa Borghese, Алматы"
              />
            </div>

            <Field
              label="Ссылка на локацию"
              value={form.locationLink}
              onChange={(value) => updateField("locationLink", value)}
              placeholder="https://2gis.kz/..."
            />

            <CoverUploadField
              preview={coverPreview}
              fileName={coverFileName}
              isDragging={isDraggingCover}
              isUploading={isUploadingCover}
              onDragStateChange={setIsDraggingCover}
              onDrop={handleCoverDrop}
              onChange={handleCoverInputChange}
              onClear={clearCoverImage}
            />

            <TextAreaField
              label="Описание"
              value={form.description}
              onChange={(value) => updateField("description", value)}
              placeholder="Короткое описание события"
              rows={4}
            />

            <Field
              label="Имена для config.name"
              value={form.configName}
              onChange={(value) => updateField("configName", value)}
              placeholder="Марат, Айгерим"
              hint="Введите через запятую."
            />

            <TextAreaField
              label="Дополнительный JSON config"
              value={form.configExtra}
              onChange={(value) => updateField("configExtra", value)}
              rows={8}
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isUploadingCover}
                className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition ${
                  isSubmitting || isUploadingCover
                    ? "cursor-default bg-[#7f1118]/50"
                    : "bg-[#7f1118] hover:bg-[#5d0b11]"
                }`}
              >
                {isUploadingCover ? "Загрузка изображения..." : isSubmitting ? "Создание..." : "Создать event"}
              </button>
              {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <StatusCard
            title="Что отправится"
            content={
              <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-black/70">
                {JSON.stringify(
                  {
                    type: form.type,
                    date: form.date,
                    time: form.time,
                    location: form.location,
                    location_link: form.locationLink,
                    description: form.description,
                    cover_image_url: form.coverImageUrl,
                    has_cover_file: Boolean(coverFile),
                    config: safePreviewConfig(form)
                  },
                  null,
                  2
                )}
              </pre>
            }
          />

          <StatusCard
            title="Последний результат"
            content={
              result ? (
                <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-black/70">
                  {JSON.stringify(result, null, 2)}
                </pre>
              ) : (
                <p className="text-sm leading-7 text-black/60">После успешного создания здесь появится ответ сервера.</p>
              )
            }
          />
        </aside>
      </div>
    </AdminShell>
  );
}

function Field({ label, hint, onChange, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">{label}</span>
      <input
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-[#7f1118]/40 focus:bg-white"
      />
      {hint ? <span className="mt-2 block text-xs text-black/45">{hint}</span> : null}
    </label>
  );
}

function DateField({ label, selected, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">{label}</span>
      <DatePicker
        selected={selected}
        onChange={onChange}
        locale={ru}
        dateFormat="dd.MM.yyyy"
        placeholderText="Выберите дату"
        className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-[#7f1118]/40 focus:bg-white"
        calendarClassName="!border-black/10 !rounded-[22px] !shadow-[0_24px_48px_rgba(31,26,23,0.12)]"
        wrapperClassName="block w-full"
      />
    </label>
  );
}

function TimeField({ label, selected, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">{label}</span>
      <DatePicker
        selected={selected}
        onChange={onChange}
        locale={ru}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Время"
        dateFormat="HH:mm"
        placeholderText="Выберите время"
        className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-[#7f1118]/40 focus:bg-white"
        calendarClassName="!border-black/10 !rounded-[22px] !shadow-[0_24px_48px_rgba(31,26,23,0.12)]"
        wrapperClassName="block w-full"
      />
    </label>
  );
}

function CoverUploadField({
  preview,
  fileName,
  isDragging,
  onDragStateChange,
  onDrop,
  onChange,
  onClear
}) {
  return (
    <div className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">Обложка</span>
      <label
        onDragEnter={(event) => {
          event.preventDefault();
          onDragStateChange(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          onDragStateChange(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          onDragStateChange(false);
        }}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed px-6 py-8 text-center transition ${
          isDragging
            ? "border-[#7f1118] bg-[#7f1118]/[0.06]"
            : "border-black/15 bg-[#fcfaf7] hover:border-[#7f1118]/45 hover:bg-white"
        }`}
      >
        <input type="file" accept="image/*" onChange={onChange} className="hidden" />

        {preview ? (
          <div className="w-full">
            <div className="flex min-h-[240px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-[#f6f1eb] p-3 shadow-[0_16px_36px_rgba(31,26,23,0.14)]">
              <img
                src={preview}
                alt="Предпросмотр обложки"
                className="max-h-[420px] max-w-full rounded-[14px] object-contain"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-left">
              <div>
                <p className="text-sm font-medium text-[#1f1a17]">{fileName || "Изображение выбрано"}</p>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  onClear();
                }}
                className="rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-black/60 transition hover:border-[#7f1118]/30 hover:text-[#7f1118]"
              >
                Удалить
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative h-14 w-14 rounded-full bg-[#7f1118]/10 text-[#7f1118]">
              <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
              <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
            </div>
            <p className="mt-4 text-sm font-medium text-[#1f1a17]">Перетащите изображение сюда</p>
            <p className="mt-2 text-sm text-black/55">или нажмите, чтобы выбрать файл с компьютера</p>
            <p className="mt-4 text-xs uppercase tracking-[0.24em] text-black/35">PNG, JPG, WEBP, GIF, SVG</p>
          </>
        )}
      </label>
    </div>
  );
}

function TextAreaField({ label, onChange, rows = 6, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">{label}</span>
      <textarea
        {...props}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[22px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-black/30 focus:border-[#7f1118]/40 focus:bg-white"
      />
    </label>
  );
}

function StatusCard({ title, content }) {
  return (
    <section className="rounded-[24px] border border-black/10 bg-[#fcfaf7] p-5">
      <h2 className="text-xs uppercase tracking-[0.3em] text-black/50">{title}</h2>
      <div className="mt-4">{content}</div>
    </section>
  );
}
