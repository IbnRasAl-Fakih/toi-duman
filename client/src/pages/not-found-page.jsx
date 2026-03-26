import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#240f11] to-[#111112] px-6 text-center text-[#f5e7dc]">
      <div className="w-full">
        <p className="text-3xl uppercase tracking-[0.3em] text-white/45 md:text-5xl">404</p>
        <h1 className="mt-6 text-5xl leading-none md:text-7xl xl:text-[4rem]">Страница не найдена</h1>
        <p className="mx-auto mt-6 max-w-4xl text-base leading-7 text-white/70 md:text-lg">
          Такой страницы не существует. Проверьте адрес или вернитесь назад.
        </p>
        <button
          type="button"
          onClick={handleBack}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#7f1118] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white shadow-[0_18px_35px_rgba(127,17,24,0.3)]"
        >
          Вернуться назад
        </button>
      </div>
    </main>
  );
}
