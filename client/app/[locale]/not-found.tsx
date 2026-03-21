import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  const dictionary = getDictionary(defaultLocale).notFound;

  return (
    <section className="px-0 py-12">
      <div className="mx-auto flex w-[min(calc(100%-32px),1180px)] justify-center">
        <div className="w-full max-w-[720px] rounded-[32px] border border-white/70 bg-white/80 p-10 text-center shadow-[0_24px_80px_rgba(123,92,60,0.12)] backdrop-blur-[12px] max-sm:p-6">
          <p className="mb-3 text-[0.92rem] uppercase tracking-[0.14em] text-[#9a6f43]">404</p>
          <h1 className="m-0 text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.98]">
            {dictionary.title}
          </h1>
          <p className="mt-4 text-[1.05rem] leading-[1.8] text-[#72675d]">
            {dictionary.text}
          </p>
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#b78654] px-6 text-center font-sans text-[0.95rem] font-semibold text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] transition duration-300 hover:scale-105 hover:brightness-105"
            href={`/${defaultLocale}`}
          >
            {dictionary.back}
          </Link>
        </div>
      </div>
    </section>
  );
}
