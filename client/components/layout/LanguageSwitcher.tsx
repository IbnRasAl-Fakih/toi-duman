"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Locale, locales } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  labels: Record<Locale, string>;
};

export default function LanguageSwitcher({
  currentLocale,
  labels,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [rememberLocale, setRememberLocale] = useState<Locale | null>(null);

  useEffect(() => {
    if (!rememberLocale) {
      return;
    }

    document.cookie = `NEXT_LOCALE=${rememberLocale}; path=/; max-age=31536000; samesite=lax`;
  }, [rememberLocale]);

  const getLocalizedPath = (targetLocale: Locale) => {
    if (!pathname) {
      return `/${targetLocale}`;
    }

    const segments = pathname.split("/");

    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments[1] = targetLocale;
      return segments.join("/") || `/${targetLocale}`;
    }

    return `/${targetLocale}${pathname === "/" ? "" : pathname}`;
  };

  return (
    <div
      aria-label="Language switcher"
      className="inline-flex rounded-full border border-[rgba(116,93,72,0.1)] bg-[rgba(255,255,255,0.72)] px-3 py-2 text-[0.96rem] font-semibold text-[#2d2621] shadow-[0_8px_24px_rgba(95,72,50,0.06)] backdrop-blur"
      role="group"
    >
      <span className="flex items-center gap-2">
        {locales.map((locale, index) => {
          const isActive = locale === currentLocale;

          return (
            <span className="flex items-center gap-2" key={locale}>
              {index > 0 ? (
                <span aria-hidden="true" className="text-[rgba(114,103,93,0.55)]">
                  /
                </span>
              ) : null}
              <Link
                className={`inline-flex items-center gap-2 transition-colors hover:text-[#2d2621] ${
                  isActive ? "text-[#9a6f43]" : "text-[#72675d]"
                }`}
                href={getLocalizedPath(locale)}
                hrefLang={locale}
                locale={undefined}
                onClick={() => setRememberLocale(locale)}
              >
                <span
                  aria-hidden="true"
                  className={`h-3 w-3 rounded-full border border-[rgba(116,93,72,0.12)] ${
                    locale === "ru" ? "bg-[#ffffff]" : "bg-[#8ec5ff]"
                  }`}
                />
                {labels[locale]}
              </Link>
            </span>
          );
        })}
      </span>
    </div>
  );
}
