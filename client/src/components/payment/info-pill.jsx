export default function InfoPill({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-full bg-white px-4 py-3 text-sm text-black/70 shadow-[0_10px_24px_rgba(31,24,21,0.06)]">
      <span className="text-[11px] uppercase tracking-[0.24em] text-black/40">{label}</span>
      <span className="max-w-[55%] truncate text-right font-medium text-[#7f1118]">{value}</span>
    </div>
  );
}
