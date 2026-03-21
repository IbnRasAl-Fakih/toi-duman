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
    <section className="auth-page">
      <div className="container auth-page__wrap">
        <div className="auth-card">
          <p className="eyebrow">{dictionary.eyebrow}</p>
          <h1>{dictionary.title}</h1>
          <p className="auth-card__text">{dictionary.text}</p>

          <RegisterForm dictionary={dictionary} locale={locale} />
        </div>
      </div>
    </section>
  );
}
