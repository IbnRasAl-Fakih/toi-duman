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
    <section className="auth-page">
      <div className="container auth-page__wrap">
        <div className="auth-card">
          <p className="eyebrow">{dictionary.login.eyebrow}</p>
          <h1 className="auth-card__title auth-card__title--login">
            {dictionary.login.title}
          </h1>
          <p className="auth-card__text">{dictionary.login.text}</p>

          <LoginPageContent dictionary={dictionary} locale={locale} />
        </div>
      </div>
    </section>
  );
}
