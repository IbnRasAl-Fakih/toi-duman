import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCurrentUser } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const currentUser = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        currentUser={currentUser}
        dictionary={dictionary.nav}
        locale={locale}
      />
      <main className="flex-1">{children}</main>
      <Footer dictionary={dictionary.footer} />
    </div>
  );
}
