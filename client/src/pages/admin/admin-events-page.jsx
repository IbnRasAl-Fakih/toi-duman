import React from "react";
import AdminShell from "../../components/admin-shell.jsx";

function formatDateTime(value) {
  return new Date(value).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function AdminEventsPage() {
  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

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

  return (
    <AdminShell
      title="Список event-ов"
      description="Раздел для просмотра созданных событий. Здесь можно быстро проверить slug, дату, локацию и обложку перед дальнейшей работой с шаблонами."
    >
      {isLoading ? (
        <EmptyState text="Загружаем события..." />
      ) : error ? (
        <EmptyState text={error} tone="error" />
      ) : events.length === 0 ? (
        <EmptyState text="Событий пока нет." />
      ) : (
        <div className="grid gap-5">
          {events.map((eventItem) => (
            <article
              key={eventItem.id}
              className="grid gap-5 rounded-[28px] border border-black/10 bg-[#fcfaf7] p-5 lg:grid-cols-[180px_minmax(0,1fr)]"
            >
              <div className="overflow-hidden rounded-[20px] bg-[#efe5db]">
                {eventItem.cover_image_url ? (
                  <img src={eventItem.cover_image_url} alt={eventItem.slug} className="h-full min-h-44 w-full object-cover" />
                ) : (
                  <div className="flex min-h-44 items-center justify-center text-xs uppercase tracking-[0.24em] text-black/35">
                    Нет обложки
                  </div>
                )}
              </div>

              <div className="grid gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-black/45">{eventItem.type}</p>
                    <h2 className="mt-2 font-['Georgia','Times_New_Roman',serif] text-3xl text-[#7f1118]">
                      {eventItem.slug}
                    </h2>
                  </div>
                  <span className="rounded-full bg-[#7f1118]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#7f1118]">
                    ID {eventItem.id}
                  </span>
                </div>

                <dl className="grid gap-3 text-sm text-black/65 md:grid-cols-2">
                  <InfoRow label="Дата" value={formatDateTime(eventItem.date)} />
                  <InfoRow label="Локация" value={eventItem.location} />
                  <InfoRow label="Slug" value={eventItem.slug} />
                  <InfoRow label="Создано" value={formatDateTime(eventItem.created_at)} />
                </dl>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-[18px] border border-black/8 bg-white/70 px-4 py-3">
      <dt className="text-xs uppercase tracking-[0.22em] text-black/40">{label}</dt>
      <dd className="mt-2 break-words text-sm text-black/70">{value || "—"}</dd>
    </div>
  );
}

function EmptyState({ text, tone = "default" }) {
  return (
    <div
      className={`rounded-[28px] border px-5 py-10 text-center text-sm ${
        tone === "error" ? "border-[#b42318]/15 bg-[#fff4f2] text-[#b42318]" : "border-black/10 bg-[#fcfaf7] text-black/55"
      }`}
    >
      {text}
    </div>
  );
}
