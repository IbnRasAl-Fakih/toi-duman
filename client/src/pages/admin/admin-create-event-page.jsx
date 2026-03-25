import React from "react";
import { format, parse } from "date-fns";
import AdminShell from "../../components/admin-shell.jsx";
import CreateEventField from "../../components/admin/create-event/create-event-field.jsx";
import CreateEventDateField from "../../components/admin/create-event/create-event-date-field.jsx";
import CreateEventTimeField from "../../components/admin/create-event/create-event-time-field.jsx";
import CreateEventSelectField from "../../components/admin/create-event/create-event-select-field.jsx";
import CreateEventCoverUploadField from "../../components/admin/create-event/create-event-cover-upload-field.jsx";
import CreateEventTextAreaField from "../../components/admin/create-event/create-event-textarea-field.jsx";
import CreateEventStatusCard from "../../components/admin/create-event/create-event-status-card.jsx";

const initialForm = {
  type: "wedding",
  templateId: "",
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
  const [templates, setTemplates] = React.useState([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = React.useState(true);
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

  React.useEffect(() => {
    let isMounted = true;

    async function loadTemplates() {
      try {
        setIsLoadingTemplates(true);
        const response = await fetch("/api/v1/templates");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Не удалось загрузить шаблоны");
        }

        if (!isMounted) return;

        setTemplates(data);
        setForm((current) => ({
          ...current,
          templateId: current.templateId || data[0]?.id || ""
        }));
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "Неизвестная ошибка");
        }
      } finally {
        if (isMounted) {
          setIsLoadingTemplates(false);
        }
      }
    }

    loadTemplates();

    return () => {
      isMounted = false;
    };
  }, []);

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

    setForm({
      ...initialForm,
      templateId: templates[0]?.id || ""
    });
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
      if (!form.templateId) {
        throw new Error("Выберите шаблон");
      }

      const configPayload = buildConfigPayload(form);
      const payload = new FormData();

      payload.append("type", form.type);
      payload.append("template_id", form.templateId);
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

  const templateOptions = templates.length
    ? templates.map((template) => ({
        value: template.id,
        label: `${template.name} · ${template.type}`
      }))
    : [{ value: "", label: isLoadingTemplates ? "Загрузка шаблонов..." : "Сначала создайте шаблон", disabled: true }];

  return (
    <AdminShell
      title="Создание нового event"
      description="Рабочая панель для публикации новых событий. Здесь заполняются базовые параметры, выбирается шаблон и собирается конфигурация приглашения."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_360px]">
        <section>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <CreateEventField
                label="Тип события"
                value={form.type}
                onChange={(value) => updateField("type", value)}
                placeholder="wedding"
              />

              <CreateEventSelectField
                label="Шаблон"
                value={form.templateId}
                onChange={(value) => updateField("templateId", value)}
                options={templateOptions}
                hint="Событие будет открываться по slug через выбранный шаблон."
              />

              <CreateEventDateField
                label="Дата"
                selected={parseDateValue(form.date)}
                onChange={(value) => updateField("date", value ? format(value, "yyyy-MM-dd") : "")}
              />

              <CreateEventTimeField
                label="Время"
                selected={parseTimeValue(form.time)}
                onChange={(value) => updateField("time", value ? format(value, "HH:mm") : "")}
              />

              <CreateEventField
                label="Локация"
                value={form.location}
                onChange={(value) => updateField("location", value)}
                placeholder="Villa Borghese, Алматы"
              />
            </div>

            <CreateEventField
              label="Ссылка на локацию"
              value={form.locationLink}
              onChange={(value) => updateField("locationLink", value)}
              placeholder="https://2gis.kz/..."
            />

            <CreateEventCoverUploadField
              preview={coverPreview}
              fileName={coverFileName}
              isDragging={isDraggingCover}
              onDragStateChange={setIsDraggingCover}
              onDrop={handleCoverDrop}
              onChange={handleCoverInputChange}
              onClear={clearCoverImage}
            />

            <CreateEventTextAreaField
              label="Описание"
              value={form.description}
              onChange={(value) => updateField("description", value)}
              placeholder="Короткое описание события"
              rows={4}
            />

            <CreateEventField
              label="Имена для config.name"
              value={form.configName}
              onChange={(value) => updateField("configName", value)}
              placeholder="Марат, Айгерим"
              hint="Введите через запятую."
            />

            <CreateEventTextAreaField
              label="Дополнительный JSON config"
              value={form.configExtra}
              onChange={(value) => updateField("configExtra", value)}
              rows={8}
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isUploadingCover || isLoadingTemplates || !templates.length}
                className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition ${
                  isSubmitting || isUploadingCover || isLoadingTemplates || !templates.length
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
          <CreateEventStatusCard
            title="Что отправится"
            content={
              <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-black/70">
                {JSON.stringify(
                  {
                    type: form.type,
                    template_id: form.templateId,
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

          <CreateEventStatusCard
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
