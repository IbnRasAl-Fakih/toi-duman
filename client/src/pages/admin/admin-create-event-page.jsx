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
import { useNotification } from "../../context/notification-context.jsx";
import { TEMPLATE_1_PATH } from "../templates/invitation-page_template_1.jsx";
import { TEMPLATE_2_PATH } from "../templates/invitation-page_template_2.jsx";
import { TEMPLATE_3_PATH } from "../templates/invitation-page_template_3.jsx";
import { TEMPLATE_4_PATH } from "../templates/invitation-page_template_4.jsx";
import { TEMPLATE_6_PATH } from "../templates/invitation-page_template_6.jsx";

const templateOptions = [
  { value: TEMPLATE_1_PATH, label: "Template 1" },
  { value: TEMPLATE_2_PATH, label: "Template 2" },
  { value: TEMPLATE_3_PATH, label: "Template 3" },
  { value: TEMPLATE_4_PATH, label: "Template 4" },
  { value: TEMPLATE_6_PATH, label: "Template 6" }
];

const initialForm = {
  type: "wedding",
  templatePath: templateOptions[0].value,
  date: "",
  time: "",
  location: "",
  locationLink: "",
  description: "",
  coverImageUrl: "",
  isExample: false,
  configName: "",
  configExtra: '{\n  "key": "value"\n}'
};

function buildConfigPayload(form) {
  const parsedExtra = form.configExtra.trim() ? JSON.parse(form.configExtra) : {};
  const selectedTemplate = templateOptions.find((option) => option.value === form.templatePath);

  return {
    ...parsedExtra,
    template_path: form.templatePath,
    template_name: selectedTemplate?.label || form.templatePath,
    date: form.date && form.time ? `${form.date}T${form.time}:00Z` : form.date || "",
    location: form.location,
    location_link: form.locationLink || null,
    description: form.description || null,
    cover_image_url: form.coverImageUrl || null,
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
    return "Invalid JSON";
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

function getTomorrowDateString() {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return format(tomorrow, "yyyy-MM-dd");
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
  const notification = useNotification();
  const isFormValid = Boolean(form.date.trim() && form.time.trim() && form.location.trim() && form.configName.trim());
  const minimumEventDate = getTomorrowDateString();

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
      throw new Error("Image file is required");
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
      const message = fileError instanceof Error ? fileError.message : "Failed to select image";
      setError(message);
      notification.error(message);
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
      const message = fileError instanceof Error ? fileError.message : "Failed to select image";
      setError(message);
      notification.error(message);
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
      if (!form.templatePath) {
        throw new Error("Select a template");
      }

      if (!isFormValid) {
        throw new Error("Fill date, time, location and names");
      }

      if (form.date < minimumEventDate) {
        throw new Error("Event date must be at least tomorrow");
      }

      const configPayload = buildConfigPayload(form);
      const payload = new FormData();

      payload.append("type", form.type);
      payload.append("is_example", String(form.isExample));
      if (coverFile) {
        setIsUploadingCover(true);
        payload.append("file", coverFile);
      }
      payload.append("config", JSON.stringify(configPayload));

      const response = await fetch("/api/v1/events", {
        method: "POST",
        body: payload
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Failed to create event");
      }

      setResult(data);
      resetForm();
      notification.success(`Event created: ${data.slug}`);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Unknown error";
      setError(message);
      notification.error(message);
    } finally {
      setIsUploadingCover(false);
      setIsSubmitting(false);
    }
  }

  return (
    <AdminShell
      title="Create Event"
      description="Create a new invitation event. Template metadata and all public event details are stored inside config."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_360px]">
        <section>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <CreateEventSelectField
                label="Template"
                value={form.templatePath}
                onChange={(value) => updateField("templatePath", value)}
                options={templateOptions}
              />

              <CreateEventDateField
                label="Date"
                selected={parseDateValue(form.date)}
                onChange={(value) => updateField("date", value ? format(value, "yyyy-MM-dd") : "")}
              />

              <CreateEventTimeField
                label="Time"
                selected={parseTimeValue(form.time)}
                onChange={(value) => updateField("time", value ? format(value, "HH:mm") : "")}
              />

              <CreateEventField
                label="Location"
                value={form.location}
                onChange={(value) => updateField("location", value)}
                placeholder="Villa Borghese, Almaty"
              />
            </div>

            <CreateEventField
              label="Location Link"
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
              label="Description"
              value={form.description}
              onChange={(value) => updateField("description", value)}
              placeholder="Short event description"
              rows={4}
            />

            <CreateEventField
              label="Names for config.name"
              value={form.configName}
              onChange={(value) => updateField("configName", value)}
              placeholder="Marat, Aigerim"
              hint="Separate values with commas."
              required
            />

            <CreateEventTextAreaField
              label="Extra JSON config"
              value={form.configExtra}
              onChange={(value) => updateField("configExtra", value)}
              rows={8}
            />

            <label className="flex items-center gap-3 rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm text-black/75">
              <input
                type="checkbox"
                checked={form.isExample}
                onChange={(event) => updateField("isExample", event.target.checked)}
                className="h-4 w-4 accent-[#7f1118]"
              />
              <span>Demo event: no order and no guest RSVP collection</span>
            </label>

            <div className="flex flex-wrap items-center justify-end gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isUploadingCover || !isFormValid}
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm uppercase tracking-[0.14em] text-white transition ${
                  isSubmitting || isUploadingCover || !isFormValid
                    ? "cursor-default bg-[#7f1118]/50"
                    : "bg-[#7f1118] hover:bg-[#5d0b11]"
                }`}
              >
                {isUploadingCover ? "Uploading image..." : isSubmitting ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <CreateEventStatusCard
            title="Request Preview"
            content={
              <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-black/70">
                {JSON.stringify(
                  {
                    type: form.type,
                    is_example: form.isExample,
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
            title="Last Result"
            content={
              result ? (
                <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-black/70">
                  {JSON.stringify(result, null, 2)}
                </pre>
              ) : (
                <p className="text-sm leading-7 text-black/60">Server response will appear here after successful creation.</p>
              )
            }
          />
        </aside>
      </div>
    </AdminShell>
  );
}
