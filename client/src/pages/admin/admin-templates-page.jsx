import React from "react";
import AdminShell from "../../components/admin-shell.jsx";
import DeleteTemplateModal from "../../components/admin/templates/delete-template-modal.jsx";
import TemplatesEmptyState from "../../components/admin/templates/templates-empty-state.jsx";
import TemplatesTable from "../../components/admin/templates/templates-table.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [pendingDeleteTemplate, setPendingDeleteTemplate] = React.useState(null);
  const notification = useNotification();

  React.useEffect(() => {
    let isMounted = true;

    async function loadTemplates() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/v1/templates");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Үлгілер тізімін жүктеу мүмкін болмады");
        }

        if (isMounted) {
          setTemplates(data);
        }
      } catch (requestError) {
        if (isMounted) {
          const message = requestError instanceof Error ? requestError.message : "Белгісіз қате";
          setError(message);
          notification.error(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTemplates();

    return () => {
      isMounted = false;
    };
  }, [notification]);

  async function handleDeleteTemplate() {
    if (!pendingDeleteTemplate) {
      return;
    }

    try {
      setIsDeleting(true);
      setError("");

      const response = await fetch(`/api/v1/templates/${pendingDeleteTemplate.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        let detail = "Үлгіні өшіру мүмкін болмады";

        try {
          const data = await response.json();
          detail = data.detail || detail;
        } catch {}

        throw new Error(detail);
      }

      setTemplates((current) => current.filter((item) => item.id !== pendingDeleteTemplate.id));
      setPendingDeleteTemplate(null);
      notification.success("Үлгі өшірілді");
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : "Үлгіні өшіру мүмкін болмады";
      setError(message);
      notification.error(message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <AdminShell
        title="Үлгілер тізімі"
        description="Бұл бөлімде тіркелген үлгілерді қарап, оқиғаға байланыстырмас бұрын түрін, жолын және құрылған күнін тексеруге болады."
      >
        {isLoading ? (
          <TemplatesEmptyState text="Үлгілер жүктелуде..." />
        ) : error ? (
          <TemplatesEmptyState text={error} tone="error" />
        ) : templates.length === 0 ? (
          <TemplatesEmptyState text="Әзірге үлгілер жоқ." />
        ) : (
          <TemplatesTable templates={templates} onRequestDelete={setPendingDeleteTemplate} />
        )}
      </AdminShell>

      <DeleteTemplateModal
        template={pendingDeleteTemplate}
        isDeleting={isDeleting}
        onConfirm={handleDeleteTemplate}
        onClose={() => {
          if (!isDeleting) {
            setPendingDeleteTemplate(null);
          }
        }}
      />
    </>
  );
}
