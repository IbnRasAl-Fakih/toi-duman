import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "../assets/instagram.jsx";
import ThreadsIcon from "../assets/threads.jsx";
import TiktokIcon from "../assets/tiktok.jsx";

const WHATSAPP_PHONE = process.env.REACT_APP_WHATSAPP_PHONE || "";

function buildWhatsappHref() {
  if (!WHATSAPP_PHONE) {
    return "";
  }

  const message = encodeURIComponent("Здравствуйте! Хочу узнать подробнее о цифровых приглашениях Toi Duman.");
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href || "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/12 text-[#f7efe6] backdrop-blur-md transition hover:border-[#d7bea8]/60 hover:bg-white/10"
    >
      {children}
    </a>
  );
}

export default function LandingPage() {
  const whatsappHref = buildWhatsappHref();

  return (
    <main className="min-h-screen bg-[#0d1b22] text-[#f6eee6]">
      <section className="relative min-h-screen overflow-hidden bg-[#10232c] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,24,0.18),rgba(7,18,24,0.9))]" />
          <div
            className="absolute inset-[-24px] bg-cover bg-center opacity-[0.88] blur-[8px] scale-[1.03]"
            style={{ backgroundImage: "url('/images/background.jpg')" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(11,23,29,0),rgba(11,23,29,0.97))]" />
          <div className="absolute left-[4%] top-[14%] hidden h-40 w-40 rounded-full border border-white/8 bg-white/5 blur-3xl lg:block" />
          <div className="absolute right-[8%] top-[24%] hidden h-28 w-28 rounded-full border border-[#d7bea8]/10 bg-[#d7bea8]/10 blur-2xl lg:block" />
        </div>

        <div className="relative flex min-h-screen flex-col px-4 py-4 md:px-6 md:py-6">
          <header className="flex items-center justify-between border-b border-white/10 px-2 py-2 text-[10px] uppercase tracking-[0.3em] text-white/56 md:px-4">
            <div>Menu</div>
            <Link to="/admin/login" className="transition hover:text-white">
              Admin
            </Link>
          </header>

          <div className="relative flex flex-1 items-start px-2 pt-12 md:px-4 md:pt-16 lg:pt-20">
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start">
              <div className="max-w-5xl">
                <div className="flex items-start gap-4">
                  <div className="hidden pt-3 text-[10px] uppercase tracking-[0.42em] text-white/34 lg:block [writing-mode:vertical-rl]">
                    Digital Invitation
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.38em] text-[#d7bea8]/72">Toi Duman</p>
                    <h1 className="mt-5 font-['Georgia','Times_New_Roman',serif] text-5xl leading-[0.88] text-[#f7efe6] md:text-7xl lg:text-[6.2rem]">
                      Приглашение
                      <br />
                      на праздник
                      <br />
                      за{" "}
                      <span className="font-['Baskerville','Times_New_Roman',serif] text-8xl">
                        3
                      </span>{" "}
                      минуты
                    </h1>
                    <p className="mt-6 max-w-2xl text-sm leading-8 text-white/72 md:text-base">
                      Красивые приглашения для свадеб, юбилеев и семейных мероприятий: одна ссылка,
                      быстрый запуск и аккуратный сценарий ответа для гостей.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                      <a
                        href={whatsappHref || "#contacts"}
                        target={whatsappHref ? "_blank" : undefined}
                        rel={whatsappHref ? "noreferrer" : undefined}
                        className="group inline-flex items-stretch overflow-hidden rounded-full border border-[#dcc8b4]/40 bg-[rgba(15,19,21,0.26)] text-[#f7efe6] backdrop-blur-md transition hover:border-[#dcc8b4]/70 hover:bg-[rgba(15,19,21,0.38)]"
                      >
                        <span className="flex items-center px-6 py-3 text-[11px] uppercase tracking-[0.26em]">
                          Написать в WhatsApp
                        </span>
                        <span className="flex w-12 items-center justify-center border-l border-[#dcc8b4]/25 bg-[#d6c4b3] text-[#0d1b22] transition group-hover:bg-[#efe2d5]">
                          →
                        </span>
                      </a>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <SocialLink href="https://www.instagram.com/rassul_yeletay/" label="Instagram">
                        <InstagramIcon className="h-4 w-4" />
                      </SocialLink>
                      <SocialLink href="https://www.tiktok.com/" label="TikTok">
                        <TiktokIcon className="h-4 w-4" />
                      </SocialLink>
                      <SocialLink href="https://www.threads.net/" label="Threads">
                        <ThreadsIcon className="h-4 w-4" />
                      </SocialLink>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden justify-self-end lg:block lg:w-full lg:max-w-[430px]">
                <div className="relative mt-16 min-h-[620px]">
                  <div className="absolute right-0 top-0 z-20 w-[58%] overflow-hidden rounded-[28px] border border-white/12 bg-[#18313a] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                    <img src="/images/1-section.jpg" alt="" className="h-[180px] w-full object-cover" />
                  </div>

                  <div className="absolute left-0 top-[190px] z-10 w-[72%] overflow-hidden rounded-[34px] border border-white/12 bg-[#18313a] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                    <img src="/images/2-section.jpg" alt="" className="h-[240px] w-full object-cover" />
                  </div>

                  <div className="absolute bottom-[48px] right-0 z-20 w-[54%] overflow-hidden rounded-[26px] border border-white/12 bg-[#18313a] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                    <img src="/images/3-section.jpg" alt="" className="h-[170px] w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
