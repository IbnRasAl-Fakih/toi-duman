export default function GuestsState({ title, description }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4efe8] px-6 text-center text-[#1f1a17]">
      <div className="w-full max-w-3xl rounded-[36px] border border-black/10 bg-white/80 px-8 py-10 shadow-[0_24px_80px_rgba(31,24,21,0.08)] backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.38em] text-[#7f1118]/55">Guests Page</p>
        <h1 className="mt-6 font-['Georgia','Times_New_Roman',serif] text-5xl leading-none text-[#7f1118] md:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/65 md:text-lg">{description}</p>
      </div>
    </main>
  );
}
