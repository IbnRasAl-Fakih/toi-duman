export default function SummaryCard({ label, value, tone = "default" }) {
  const toneClass = tone === "success" ? "bg-[#eef8f1] text-[#1f8f51]" : "bg-[#fcfaf7] text-[#7f1118]";

  return (
    <article className="rounded-[28px] border border-black/10 bg-white/85 p-5 shadow-[0_18px_50px_rgba(31,26,23,0.06)]">
      <p className="text-xs uppercase tracking-[0.28em] text-black/40">{label}</p>
      <div className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm uppercase tracking-[0.18em] ${toneClass}`}>{value}</div>
    </article>
  );
}
