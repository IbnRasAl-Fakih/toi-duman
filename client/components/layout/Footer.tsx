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
      <footer className="footer" role="contentinfo">
        <div className="container footer__shell">
          <div className="footer__grid">
            <section className="footer__brand-block" aria-label="Brand">
              <div className="footer__logo">
                <span className="footer__logo-mark">TD</span>
                <div>
                  <p className="footer__brand">toi duman</p>
                  <p className="footer__tag">{dictionary.madeBy}</p>
                </div>
              </div>
            </section>

            <address className="footer__contact">
              <p className="footer__title">{dictionary.contactTitle}</p>
              <a className="footer__phone" href="tel:+77770146919">
                +7 777 014 69 19
              </a>
              <a className="footer__mail" href="mailto:hello@toiduman.kz">
                hello@toiduman.kz
              </a>
            </address>

            <nav className="footer__socials-block" aria-label="Social media">
              <div className="footer__socials">
                <a
                  aria-label={dictionary.instagram}
                  className="footer__social"
                  href="https://instagram.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="3.8" />
                    <circle cx="17.3" cy="6.7" r="1" />
                  </svg>
                </a>
                <a
                  aria-label={dictionary.whatsapp}
                  className="footer__social"
                  href={whatsappLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z" />
                    <path d="M9.2 8.7c.2-.4.5-.4.7-.4h.6c.2 0 .4 0 .6.5l.6 1.4c.1.3.1.5-.1.8l-.5.6c-.1.2-.2.3 0 .6.3.6 1.1 1.7 2.4 2.4.2.1.4.1.6 0l.7-.8c.2-.2.4-.3.7-.2l1.3.6c.4.2.5.3.5.6v.6c0 .2-.1.5-.4.7-.4.2-1 .4-1.6.2-.9-.2-2-.8-3.1-1.8-1.4-1.2-2.2-2.6-2.5-3.6-.2-.7 0-1.3.2-1.6Z" />
                  </svg>
                </a>
                <a
                  aria-label={dictionary.tiktok}
                  className="footer__social"
                  href="https://tiktok.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M14 4c.5 1.5 1.6 2.8 3 3.6 1 .6 2 .9 3 .9" />
                    <path d="M14 4v10.2a3.8 3.8 0 1 1-3.1-3.7" />
                  </svg>
                </a>
                <a
                  aria-label={dictionary.threads}
                  className="footer__social"
                  href="https://threads.net"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M16.8 10.3c-.2-2.8-2.1-4.5-5.1-4.5-3.2 0-5.4 2.2-5.4 5.4 0 3.9 2.9 6.9 7 6.9 3.4 0 5.7-1.8 5.7-4.6 0-2.4-1.7-3.9-4.8-4.1-2.6-.2-3.7-.7-3.7-1.8 0-1 .9-1.7 2.2-1.7 1.4 0 2.3.6 2.6 1.8" />
                  </svg>
                </a>
              </div>
            </nav>
          </div>

          <p className="footer__copyright">
            ©2026 Toi Duman. {dictionary.rights}
          </p>
        </div>
      </footer>

      <a
        aria-label={dictionary.whatsapp}
        className="whatsapp-float"
        href={whatsappLink}
        rel="noreferrer"
        target="_blank"
      >
        <span className="whatsapp-float__pulse" aria-hidden="true" />
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z" />
          <path d="M9.2 8.7c.2-.4.5-.4.7-.4h.6c.2 0 .4 0 .6.5l.6 1.4c.1.3.1.5-.1.8l-.5.6c-.1.2-.2.3 0 .6.3.6 1.1 1.7 2.4 2.4.2.1.4.1.6 0l.7-.8c.2-.2.4-.3.7-.2l1.3.6c.4.2.5.3.5.6v.6c0 .2-.1.5-.4.7-.4.2-1 .4-1.6.2-.9-.2-2-.8-3.1-1.8-1.4-1.2-2.2-2.6-2.5-3.6-.2-.7 0-1.3.2-1.6Z" />
        </svg>
      </a>
    </>
  );
}
