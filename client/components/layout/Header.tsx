import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  dictionary: {
    home: string;
    invitations: string;
    create: string;
    quickOrder: string;
    login: string;
    profile: string;
    register: string;
    russian: string;
    kazakh: string;
  };
  currentUser?: {
    id: string;
    role: string;
  } | null;
};

export default function Header({
  locale,
  dictionary,
  currentUser,
}: HeaderProps) {
  const navItems = [
    {
      label: dictionary.home,
      href: `/${locale}#top`,
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M6 10.5V20h12v-9.5" />
        </svg>
      ),
    },
    {
      label: dictionary.invitations,
      href: `/${locale}/invitations`,
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <rect x="4" y="5" width="16" height="14" rx="3" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      ),
    },
    {
      label: dictionary.create,
      href: `/${locale}/create`,
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M5 18.5h14" />
          <path d="M7 16.5V6.8a1.8 1.8 0 0 1 1.8-1.8h8.4a1.8 1.8 0 0 1 1.8 1.8v9.7" />
          <path d="M9.5 9h5M9.5 12h5" />
        </svg>
      ),
    },
  ];

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="brand" href={`/${locale}`}>
          <span className="brand__wordmark">
            <strong>TOI</strong>
            <strong>DUMAN</strong>
          </span>
          <span className="brand__gem" aria-hidden="true">
            <span className="brand__spark brand__spark--one" />
            <span className="brand__spark brand__spark--two" />
            <span className="brand__spark brand__spark--three" />
            <svg viewBox="0 0 64 64">
              <path d="M20 14h24l12 10-24 26L8 24l12-10Z" />
              <path d="M20 14l12 36 12-36" />
              <path d="M8 24h48" />
            </svg>
          </span>
        </Link>

        <nav className="nav">
          {navItems.map((item) => (
            <Link className="nav__link" href={item.href} key={item.label}>
              <span className="nav__icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <LanguageSwitcher
            currentLocale={locale}
            labels={{ ru: dictionary.russian, kk: dictionary.kazakh }}
          />

          {currentUser ? (
            <div className="header__account">
              <Link className="button button--small button--ghost" href={`/${locale}/profile`}>
                {dictionary.profile}
              </Link>
            </div>
          ) : (
            <Link className="button button--small" href={`/${locale}/login`}>
              {dictionary.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
