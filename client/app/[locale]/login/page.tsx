import { notFound, redirect } from "next/navigation";
import LoginPageContent from "@/components/auth/LoginPageContent";
import { getCurrentUser } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(`/${locale}/invitations`);
  }

  return (
    <section className="px-0 py-12">
      <div className="mx-auto flex w-[min(calc(100%-32px),1180px)] justify-center">
        <div className="w-full max-w-[720px] rounded-[32px] border border-white/70 bg-white/80 p-10 shadow-[0_24px_80px_rgba(123,92,60,0.12)] backdrop-blur-[12px] max-sm:p-6">
          {dictionary.login.eyebrow ? (
            <p className="mb-3 text-[0.92rem] uppercase tracking-[0.14em] text-[#9a6f43]">
              {dictionary.login.eyebrow}
            </p>
          ) : null}
          {dictionary.login.title ? (
            <h1 className="m-0 whitespace-nowrap text-[clamp(1.55rem,3vw,2.15rem)] tracking-[-0.03em]">
              {dictionary.login.title}
            </h1>
          ) : null}
          <p className="m-0 text-center text-[1.05rem] leading-[1.8] text-[#72675d]">
            {dictionary.login.text}
          </p>

          <LoginPageContent dictionary={dictionary} locale={locale} />
        </div>
      </div>
    </section>
  );
}
