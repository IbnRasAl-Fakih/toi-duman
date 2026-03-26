import EventInfoRow from "./event-info-row.jsx";

function formatDateTime(value) {
  return new Date(value).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function buildInvitationUrl(slug) {
  if (typeof window === "undefined") {
    return `/${slug}`;
  }

  return `${window.location.origin}/${slug}`;
}

export default function EventCard({ event, onRequestDelete }) {
  const invitationUrl = buildInvitationUrl(event.slug);
  const templateName = event.template?.name || event.template_id;

  return (
    <article className="grid items-center gap-5 rounded-[28px] border border-black/10 bg-[#fcfaf7] p-5 lg:grid-cols-[180px_minmax(0,1fr)]">
      <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-[#efe5db]">
        {event.cover_image_url ? (
          <img src={event.cover_image_url} alt={event.slug} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.24em] text-black/35">
            Нет обложки
          </div>
        )}
      </div>

      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-black/45">{event.type}</p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="rounded-full bg-[#7f1118]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#7f1118]">
              ID {event.id}
            </span>
            <button
              type="button"
              onClick={() => onRequestDelete(event)}
              className="rounded-full bg-[#b42318] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-[#8f1d15]"
            >
              Удалить
            </button>
          </div>
        </div>

        <dl className="grid gap-3 text-sm text-black/65 md:grid-cols-2">
          <EventInfoRow label="Дата" value={formatDateTime(event.date)} />
          <EventInfoRow label="Локация" value={event.location} />
          <EventInfoRow label="Шаблон" value={templateName} />
          <EventInfoRow
            label="Ссылка"
            value={
              <a
                href={invitationUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#7f1118] underline decoration-[#7f1118]/35 underline-offset-4 transition hover:decoration-[#7f1118]"
              >
                {invitationUrl}
              </a>
            }
          />
          <EventInfoRow label="Slug" value={event.slug} />
          <EventInfoRow label="Создано" value={formatDateTime(event.created_at)} />
        </dl>
      </div>
    </article>
  );
}
