function getStatusLabel(status) {
  if (status === "yes") {
    return "Келеді";
  }

  if (status === "no") {
    return "Келмейді";
  }

  return status || "Белгісіз";
}

function getStatusBadgeClass(status) {
  if (status === "yes") {
    return "bg-[#e9f8ef] text-[#1f8f51]";
  }

  if (status === "no") {
    return "bg-[#fff2f1] text-[#b42318]";
  }

  return "bg-black/6 text-black/55";
}

export default function GuestsTable({ guests }) {
  return (
    <div className="mt-6 overflow-hidden rounded-[28px] border border-black/10 bg-[#fcfaf7]">
      <div className="grid grid-cols-[72px_minmax(0,1fr)_180px] gap-4 border-b border-black/10 px-5 py-4 text-xs uppercase tracking-[0.24em] text-black/40">
        <span>ID</span>
        <span>Аты</span>
        <span>Күйі</span>
      </div>

      {guests.length ? (
        <div className="divide-y divide-black/8">
          {guests.map((guest, index) => (
            <div key={guest.id} className="grid grid-cols-[72px_minmax(0,1fr)_180px] gap-4 px-5 py-4 text-sm text-black/70">
              <span className="text-black/45">{index + 1}</span>
              <span className="break-words font-medium text-[#1f1a17]">{guest.name}</span>
              <span>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em] ${getStatusBadgeClass(guest.status)}`}>
                  {getStatusLabel(guest.status)}
                </span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-12 text-center text-sm text-black/55">Ағымдағы сүзгілер бойынша қонақтар табылмады.</div>
      )}
    </div>
  );
}
