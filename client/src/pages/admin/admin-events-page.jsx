import React from "react";
import DeleteEventModal from "../../components/admin/events/delete-event-modal.jsx";
import EventCard from "../../components/admin/events/event-card.jsx";
import EventsEmptyState from "../../components/admin/events/events-empty-state.jsx";
import AdminShell from "../../components/admin-shell.jsx";
import { useNotification } from "../../context/notification-context.jsx";

export default function AdminEventsPage() {
  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [pendingDeleteEvent, setPendingDeleteEvent] = React.useState(null);
  const notification = useNotification();

  React.useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/v1/events");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Оқиғалар тізімін жүктеу мүмкін болмады");
        }

        if (isMounted) {
          setEvents(data);
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

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, [notification]);

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
        let detail = "Оқиғаны өшіру мүмкін болмады";

        try {
          const data = await response.json();
          detail = data.detail || detail;
        } catch {}

        throw new Error(detail);
      }

      setEvents((current) => current.filter((item) => item.id !== pendingDeleteEvent.id));
      setPendingDeleteEvent(null);
      notification.success("Оқиға өшірілді");
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : "Оқиғаны өшіру мүмкін болмады";
      setError(message);
      notification.error(message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <AdminShell
        title="Оқиғалар тізімі"
        description="Бұл бөлімде жасалған оқиғаларды қарап, slug, күнін, орнын және мұқабасын жылдам тексеруге болады."
      > 
        {isLoading ? (
          <EventsEmptyState text="Оқиғалар жүктелуде..." />
        ) : error ? (
          <EventsEmptyState text={error} tone="error" />
        ) : events.length === 0 ? (
          <EventsEmptyState text="Әзірге оқиғалар жоқ." />
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
