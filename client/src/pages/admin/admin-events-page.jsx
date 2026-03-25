import React from "react";
import DeleteEventModal from "../../components/admin/events/delete-event-modal.jsx";
import EventCard from "../../components/admin/events/event-card.jsx";
import EventsEmptyState from "../../components/admin/events/events-empty-state.jsx";
import AdminShell from "../../components/admin-shell.jsx";

export default function AdminEventsPage() {
  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [pendingDeleteEvent, setPendingDeleteEvent] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/v1/events");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Не удалось загрузить список event-ов");
        }

        if (isMounted) {
          setEvents(data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "Неизвестная ошибка");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleDeleteEvent() {
    if (!pendingDeleteEvent) {
      return;
    }

    try {
      setIsDeleting(true);
      setError("");

      const response = await fetch(`/api/v1/events/${pendingDeleteEvent.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        let detail = "Не удалось удалить event";

        try {
          const data = await response.json();
          detail = data.detail || detail;
        } catch {
          // Ignore non-JSON error payloads.
        }

        throw new Error(detail);
      }

      setEvents((current) => current.filter((item) => item.id !== pendingDeleteEvent.id));
      setPendingDeleteEvent(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Не удалось удалить event");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <AdminShell
        title="Список event-ов"
        description="Раздел для просмотра созданных событий. Здесь можно быстро проверить slug, дату, локацию и обложку перед дальнейшей работой с шаблонами."
      >
        {isLoading ? (
          <EventsEmptyState text="Загружаем события..." />
        ) : error ? (
          <EventsEmptyState text={error} tone="error" />
        ) : events.length === 0 ? (
          <EventsEmptyState text="Событий пока нет." />
        ) : (
          <div className="grid gap-5">
            {events.map((eventItem) => (
              <EventCard key={eventItem.id} event={eventItem} onRequestDelete={setPendingDeleteEvent} />
            ))}
          </div>
        )}
      </AdminShell>

      <DeleteEventModal
        event={pendingDeleteEvent}
        isDeleting={isDeleting}
        onConfirm={handleDeleteEvent}
        onClose={() => {
          if (!isDeleting) {
            setPendingDeleteEvent(null);
          }
        }}
      />
    </>
  );
}
