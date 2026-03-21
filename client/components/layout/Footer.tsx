type FooterProps = {
  dictionary: {
    contactTitle: string;
    rights: string;
    instagram: string;
    whatsapp: string;
    tiktok: string;
    threads: string;
    madeBy: string;
  };
};

const whatsappLink =
  "https://wa.me/77770146919?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC!%20Toi%20Duman%20%D0%B1%D0%BE%D0%B9%D1%8B%D0%BD%D1%88%D0%B0%20%D0%BA%D0%B5%D2%A3%D0%B5%D1%81%20%D0%B0%D0%BB%D2%93%D1%8B%D0%BC%20%D0%BA%D0%B5%D0%BB%D0%B5%D0%B4%D1%96.";

export default function Footer({ dictionary }: FooterProps) {
  return (
    <>
      <footer
        className="relative mt-16 overflow-hidden bg-[linear-gradient(180deg,#fff8f2_0%,#fff2e8_100%)] pb-8 pt-10"
        role="contentinfo"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,219,173,0.62),transparent_22%),radial-gradient(circle_at_85%_15%,rgba(255,169,120,0.18),transparent_18%)]" />
        <div className="relative mx-auto w-[min(calc(100%-32px),1180px)]">
          <div className="grid gap-8 rounded-[32px] border border-white/60 bg-white/70 px-6 py-8 shadow-[0_24px_80px_rgba(123,92,60,0.12)] backdrop-blur md:grid-cols-[minmax(220px,1.2fr)_minmax(220px,max-content)_minmax(180px,max-content)] md:px-8">
            <section aria-label="Brand" className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ffb27d,#ffd6ad)] font-sans text-sm font-extrabold tracking-[0.08em] text-[#4a3a2d] shadow-[0_10px_22px_rgba(255,145,95,0.14)]">
                  TD
                </span>
                <div>
                  <p className="m-0 text-[clamp(1.35rem,2vw,1.7rem)] font-semibold tracking-[0.02em] text-[#2d2621]">
                    toi duman
                  </p>
                  <p className="m-0 max-w-xs text-[0.86rem] leading-[1.45] text-[rgba(74,58,45,0.58)]">
                    {dictionary.madeBy}
                  </p>
                </div>
              </div>
            </section>

            <address className="flex flex-col gap-2 not-italic">
              <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[rgba(74,58,45,0.48)]">
                {dictionary.contactTitle}
              </p>
              <a className="text-[clamp(1.1rem,1.5vw,1.3rem)] font-semibold leading-[1.2]" href="tel:+77770146919">
                +7 777 014 69 19
              </a>
              <a className="text-[0.94rem] text-[rgba(74,58,45,0.74)]" href="mailto:hello@toiduman.kz">
                hello@toiduman.kz
              </a>
            </address>

            <nav aria-label="Social media" className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    label: dictionary.instagram,
                    href: "https://instagram.com",
                    icon: (
                      <>
                        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                        <circle cx="12" cy="12" r="3.8" />
                        <circle cx="17.3" cy="6.7" r="1" />
                      </>
                    ),
                  },
                  {
                    label: dictionary.whatsapp,
                    href: whatsappLink,
                    icon: (
                      <>
                        <path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z" />
                        <path d="M9.2 8.7c.2-.4.5-.4.7-.4h.6c.2 0 .4 0 .6.5l.6 1.4c.1.3.1.5-.1.8l-.5.6c-.1.2-.2.3 0 .6.3.6 1.1 1.7 2.4 2.4.2.1.4.1.6 0l.7-.8c.2-.2.4-.3.7-.2l1.3.6c.4.2.5.3.5.6v.6c0 .2-.1.5-.4.7-.4.2-1 .4-1.6.2-.9-.2-2-.8-3.1-1.8-1.4-1.2-2.2-2.6-2.5-3.6-.2-.7 0-1.3.2-1.6Z" />
                      </>
                    ),
                  },
                  {
                    label: dictionary.tiktok,
                    href: "https://tiktok.com",
                    icon: (
                      <>
                        <path d="M14 4c.5 1.5 1.6 2.8 3 3.6 1 .6 2 .9 3 .9" />
                        <path d="M14 4v10.2a3.8 3.8 0 1 1-3.1-3.7" />
                      </>
                    ),
                  },
                  {
                    label: dictionary.threads,
                    href: "https://threads.net",
                    icon: (
                      <path d="M16.8 10.3c-.2-2.8-2.1-4.5-5.1-4.5-3.2 0-5.4 2.2-5.4 5.4 0 3.9 2.9 6.9 7 6.9 3.4 0 5.7-1.8 5.7-4.6 0-2.4-1.7-3.9-4.8-4.1-2.6-.2-3.7-.7-3.7-1.8 0-1 .9-1.7 2.2-1.7 1.4 0 2.3.6 2.6 1.8" />
                    ),
                  },
                ].map((item) => (
                  <a
                    aria-label={item.label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(214,167,121,0.22)] bg-[rgba(255,255,255,0.72)] transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(236,125,53,0.34)] hover:bg-[rgba(255,243,232,0.98)] hover:shadow-[0_8px_18px_rgba(236,125,53,0.1)]"
                    href={item.href}
                    key={item.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 fill-none stroke-[#4a3a2d] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.9]"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </nav>
          </div>

          <p className="mt-6 border-t border-[rgba(214,167,121,0.18)] pt-6 text-center text-[0.84rem] text-[rgba(74,58,45,0.6)]">
            В©2026 Toi Duman. {dictionary.rights}
          </p>
        </div>
      </footer>

      <a
        aria-label={dictionary.whatsapp}
        className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-[0_22px_50px_rgba(18,183,106,0.34)] transition hover:scale-[1.04]"
        href={whatsappLink}
        rel="noreferrer"
        target="_blank"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-[rgba(45,224,139,0.4)] animate-ping"
        />
        <svg
          aria-hidden="true"
          className="relative h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.9]"
          viewBox="0 0 24 24"
        >
          <path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z" />
          <path d="M9.2 8.7c.2-.4.5-.4.7-.4h.6c.2 0 .4 0 .6.5l.6 1.4c.1.3.1.5-.1.8l-.5.6c-.1.2-.2.3 0 .6.3.6 1.1 1.7 2.4 2.4.2.1.4.1.6 0l.7-.8c.2-.2.4-.3.7-.2l1.3.6c.4.2.5.3.5.6v.6c0 .2-.1.5-.4.7-.4.2-1 .4-1.6.2-.9-.2-2-.8-3.1-1.8-1.4-1.2-2.2-2.6-2.5-3.6-.2-.7 0-1.3.2-1.6Z" />
        </svg>
      </a>
    </>
  );
}
