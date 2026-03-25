export default function OrdersEmptyState({ text, tone = "default" }) {
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
