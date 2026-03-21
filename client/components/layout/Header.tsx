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

const containerClass = "mx-auto w-[min(calc(100%-32px),1180px)]";
const pillButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-center font-sans text-[0.95rem] font-semibold transition duration-300";
const solidButtonClass = `${pillButtonClass} bg-[#b78654] text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] hover:scale-105 hover:brightness-105`;
const ghostButtonClass = `${pillButtonClass} border border-[rgba(116,93,72,0.12)] bg-[rgba(255,255,255,0.72)] text-[#2d2621] shadow-[0_8px_24px_rgba(95,72,50,0.06)] hover:-translate-y-0.5`;

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
    <header className="sticky top-0 z-10 border-b border-[rgba(116,93,72,0.08)] bg-[rgba(255,251,246,0.9)] shadow-[0_10px_30px_rgba(95,72,50,0.05)] backdrop-blur-[18px]">
      <div className={`${containerClass} flex flex-wrap items-center justify-between gap-6 py-[18px]`}>
        <Link className="flex shrink-0 items-center gap-4" href={`/${locale}`}>
          <span className="flex items-baseline gap-1.5 font-sans font-extrabold tracking-[0.02em]">
            <strong className="text-[#e85a66]">TOI</strong>
            <strong className="text-[#2f3442]">DUMAN</strong>
          </span>
          <span
            aria-hidden="true"
            className="relative grid h-[54px] w-[54px] place-items-center"
          >
            <span className="absolute right-1 top-[3px] h-2.5 w-2.5 rotate-45 rounded-[2px] bg-[linear-gradient(135deg,#e85a66,#f0b14b)]" />
            <span className="absolute left-0.5 top-2.5 h-2 w-2 rotate-45 rounded-[2px] bg-[linear-gradient(135deg,#e85a66,#f0b14b)]" />
            <span className="absolute right-3.5 top-[-2px] h-[7px] w-[7px] rotate-45 rounded-[2px] bg-[linear-gradient(135deg,#e85a66,#f0b14b)]" />
            <svg
              className="h-[54px] w-[54px] fill-none stroke-[#494c59] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"
              viewBox="0 0 64 64"
            >
              <path d="M20 14h24l12 10-24 26L8 24l12-10Z" />
              <path d="M20 14l12 36 12-36" />
              <path d="M8 24h48" />
            </svg>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 rounded-full border border-[rgba(116,93,72,0.08)] bg-[rgba(255,255,255,0.72)] p-1.5 shadow-[0_8px_24px_rgba(95,72,50,0.06)]">
          {navItems.map((item) => (
            <Link
              className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full px-4 font-sans text-[0.98rem] font-semibold text-[#72675d] transition duration-200 hover:-translate-y-0.5 hover:bg-[rgba(183,134,84,0.08)] hover:text-[#2d2621]"
              href={item.href}
              key={item.label}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:1.9]">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <LanguageSwitcher
            currentLocale={locale}
            labels={{ ru: dictionary.russian, kk: dictionary.kazakh }}
          />

          {currentUser ? (
            <div>
              <Link className={ghostButtonClass} href={`/${locale}/profile`}>
                {dictionary.profile}
              </Link>
            </div>
          ) : (
            <Link className={solidButtonClass} href={`/${locale}/login`}>
              {dictionary.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
