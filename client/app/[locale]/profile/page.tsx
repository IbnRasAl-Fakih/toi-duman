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
    <section className="px-0 py-10">
      <div className="mx-auto w-[min(calc(100%-32px),1120px)]">
        <ProfileBankingPanel currentUser={currentUser} locale={locale} />
      </div>
    </section>
  );
}
