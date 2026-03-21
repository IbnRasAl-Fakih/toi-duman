"use client";

import Link from "next/link";
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

  const handleRememberLocale = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className="lang-switch" role="group" aria-label="Language switcher">
      <span className="lang-switch__options">
        {locales.map((locale, index) => (
          <span className="lang-switch__item" key={locale}>
            {index > 0 ? (
              <span className="lang-switch__divider" aria-hidden="true">
                /
              </span>
            ) : null}
            <Link
              className={
                locale === currentLocale
                  ? "lang-switch__option lang-switch__option--active"
                  : "lang-switch__option"
              }
              href={getLocalizedPath(locale)}
              hrefLang={locale}
              locale={undefined}
              onClick={() => handleRememberLocale(locale)}
            >
              <span
                className={
                  locale === "ru"
                    ? "lang-switch__flag lang-switch__flag--ru"
                    : "lang-switch__flag lang-switch__flag--kk"
                }
                aria-hidden="true"
              />
              {labels[locale]}
            </Link>
          </span>
        ))}
      </span>
    </div>
  );
}
