export default function EventInfoRow({ label, value }) {
  return (
    <div className="rounded-[18px] border border-black/8 bg-white/70 px-4 py-3">
      <dt className="text-xs uppercase tracking-[0.22em] text-black/40">{label}</dt>
      <dd className="mt-2 break-words text-sm text-black/70">{value || "—"}</dd>
    </div>
  );
}
