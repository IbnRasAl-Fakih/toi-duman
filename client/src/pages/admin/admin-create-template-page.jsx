import React from "react";
import CreateTemplateField from "../../components/admin/create-template/create-template-field.jsx";
import CreateTemplateStatusCard from "../../components/admin/create-template/create-template-status-card.jsx";
import AdminShell from "../../components/admin-shell.jsx";
import { useNotification } from "../../context/notification-context.jsx";

const initialForm = {
  name: "",
  type: "",
  path: ""
};

export default function AdminCreateTemplatePage() {
  const [form, setForm] = React.useState(initialForm);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState(null);
  const notification = useNotification();

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/v1/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          type: form.type.trim(),
          path: form.path.trim()
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Не удалось создать шаблон");
      }

      setResult(data);
      setForm(initialForm);
      notification.success("Шаблон успешно создан");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Неизвестная ошибка";
      setError(message);
      notification.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AdminShell
      title="Создать шаблон"
      description="Добавьте новый шаблон в базу. В поле path храните относительный путь."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_360px]">
        <section>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <CreateTemplateField
              label="Название шаблона"
              value={form.name}
              onChange={(value) => updateField("name", value)}
              placeholder="Template 1"
            />

            <CreateTemplateField
              label="Тип шаблона"
              value={form.type}
              onChange={(value) => updateField("type", value)}
              placeholder="invitation_v1"
            />

            <CreateTemplateField
              label="Путь к шаблону"
              value={form.path}
              onChange={(value) => updateField("path", value)}
              placeholder="templates/invitation-page_template_1.jsx"
              hint="Храните относительный путь."
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition ${
                  isSubmitting ? "cursor-default bg-[#7f1118]/50" : "bg-[#7f1118] hover:bg-[#5d0b11]"
                }`}
              >
                {isSubmitting ? "Создание..." : "Создать шаблон"}
              </button>
              {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <CreateTemplateStatusCard
            title="Что отправится"
            content={
              <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-black/70">
                {JSON.stringify(
                  {
                    name: form.name,
                    type: form.type,
                    path: form.path
                  },
                  null,
                  2
                )}
              </pre>
            }
          />

          <CreateTemplateStatusCard
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
