import { notFound, redirect } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import { getCurrentUser } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type RegisterPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale).register;
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(`/${locale}/invitations`);
  }

  return (
    <section className="px-0 py-12">
      <div className="mx-auto flex w-[min(calc(100%-32px),1180px)] justify-center">
        <div className="w-full max-w-[720px] rounded-[32px] border border-white/70 bg-white/80 p-10 shadow-[0_24px_80px_rgba(123,92,60,0.12)] backdrop-blur-[12px] max-sm:p-6">
          <p className="mb-3 text-[0.92rem] uppercase tracking-[0.14em] text-[#9a6f43]">
            {dictionary.eyebrow}
          </p>
          <h1 className="m-0 text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.98]">
            {dictionary.title}
          </h1>
          <p className="mt-4 text-[1.05rem] leading-[1.8] text-[#72675d]">
            {dictionary.text}
          </p>

          <RegisterForm dictionary={dictionary} locale={locale} />
        </div>
      </div>
    </section>
  );
}
