import { notFound, redirect } from "next/navigation";
import ProfileBankingPanel from "@/components/auth/ProfileBankingPanel";
import { getCurrentUser } from "@/lib/auth";
import { isLocale } from "@/lib/i18n";

type ProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(`/${locale}/login`);
  }

  return (
    <section className="profile-page">
      <div className="container profile-page__wrap">
        <ProfileBankingPanel currentUser={currentUser} locale={locale} />
      </div>
    </section>
  );
}
