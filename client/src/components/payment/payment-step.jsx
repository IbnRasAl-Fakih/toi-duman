export default function PaymentStep({ index, title, text }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
      <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">{index}</p>
      <h2 className="mt-3 text-2xl font-medium text-[#f8f2ec]">{title}</h2>
      <div className="mt-3 text-sm leading-7 text-white/70">{text}</div>
    </article>
  );
}
