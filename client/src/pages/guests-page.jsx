import React from "react";
import { Link, useParams } from "react-router-dom";
import GuestsFilters from "../components/guests/guests-filters.jsx";
import GuestsState from "../components/guests/guests-state.jsx";
import GuestsTable from "../components/guests/guests-table.jsx";
import SummaryCard from "../components/guests/summary-card.jsx";
import NotFoundPage from "./not-found-page.jsx";

function normalizeEventTitle(eventData) {
  const names = eventData?.config?.name;

  if (Array.isArray(names) && names.length) {
    return names.join(" & ");
  }

  if (typeof names === "string" && names.trim()) {
    return names;
  }

  return eventData?.slug || "Оқиға";
}

function getStatusLabel(status) {
  if (status === "yes") return "Келеді";
  if (status === "no") return "Келмейді";
  return status || "Белгісіз";
}

function sortGuests(guests, sortKey) {
  const sorted = [...guests];

  if (sortKey === "name_asc") {
    sorted.sort((left, right) => left.name.localeCompare(right.name, "kk"));
    return sorted;
  }

  if (sortKey === "name_desc") {
    sorted.sort((left, right) => right.name.localeCompare(left.name, "kk"));
    return sorted;
  }

  if (sortKey === "status") {
    sorted.sort((left, right) => getStatusLabel(left.status).localeCompare(getStatusLabel(right.status), "kk"));
    return sorted;
  }

  sorted.sort((left, right) => right.id - left.id);
  return sorted;
}

export default function GuestsPage() {
  const { slug } = useParams();
  const [eventData, setEventData] = React.useState(null);
  const [guests, setGuests] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [sortKey, setSortKey] = React.useState("latest");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        setError("");

        const eventResponse = await fetch(`/api/v1/events/slug/${slug}`);
        const eventPayload = await eventResponse.json();

        if (!eventResponse.ok) {
          throw new Error(eventPayload.detail || "Оқиғаны жүктеу мүмкін болмады");
        }

        if (eventPayload.is_example) {
          if (!isMounted) return;
          setEventData(eventPayload);
          setGuests([]);
          return;
        }

        const guestsResponse = await fetch(`/api/v1/guests?event_id=${eventPayload.id}`);
        const guestsPayload = await guestsResponse.json();

        if (!guestsResponse.ok) {
          throw new Error(guestsPayload.detail || "Қонақтарды жүктеу мүмкін болмады");
        }

        if (!isMounted) return;

        setEventData(eventPayload);
        setGuests(Array.isArray(guestsPayload) ? guestsPayload : []);
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "Белгісіз қате");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (slug) {
      loadData();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const respondedCount = guests.length;
  const attendingCount = guests.filter((guest) => guest.status === "yes").length;
  const declinedCount = guests.filter((guest) => guest.status === "no").length;

  const filteredGuests = sortGuests(
    guests.filter((guest) => {
      const normalizedName = guest.name.toLowerCase();
      const matchesSearch = !searchValue.trim() || normalizedName.includes(searchValue.trim().toLowerCase());
      const matchesStatus = statusFilter === "all" || guest.status === statusFilter;
      return matchesSearch && matchesStatus;
    }),
    sortKey
  );

  if (isLoading) {
    return <GuestsState title="Қонақтар жүктелуде" description="Қонақ жауаптарын алып жатырмыз." />;
  }

  if (error || !eventData) {
    return <NotFoundPage />;
  }

  return (
    <main className="min-h-screen bg-[#f4efe8] px-4 py-6 text-[#1f1a17] md:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[36px] border border-black/10 bg-white/80 px-6 py-6 shadow-[0_20px_60px_rgba(31,26,23,0.08)] backdrop-blur md:px-8 lg:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-[#7f1118]/60">Қонақтар беті</p>
              <h1 className="mt-4 font-['Georgia','Times_New_Roman',serif] text-4xl leading-[0.95] text-[#7f1118] md:text-6xl">
                {normalizeEventTitle(eventData)}
              </h1>
              <p className="mt-4 text-sm leading-7 text-black/65 md:text-base">
                <span className="font-medium text-[#7f1118]">{eventData.slug}</span> шақыруына келген қонақ жауаптары.
              </p>
            </div>

            <Link
              to={`/${eventData.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-xs uppercase tracking-[0.18em] text-black/60 transition hover:border-[#7f1118]/25 hover:text-[#7f1118]"
            >
              Шақыруды ашу
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard label="Жауап бергендер" value={respondedCount} />
          <SummaryCard label="Келетіндер" value={attendingCount} tone="success" />
          <SummaryCard label="Келмейтіндер" value={declinedCount} />
        </section>

        <section className="rounded-[32px] border border-black/10 bg-white/80 px-6 py-6 shadow-[0_20px_60px_rgba(31,26,23,0.08)] backdrop-blur md:px-8">
          <GuestsFilters
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortKey={sortKey}
            onSortKeyChange={setSortKey}
          />
          <GuestsTable guests={filteredGuests} />
        </section>
      </div>
    </main>
  );
}
