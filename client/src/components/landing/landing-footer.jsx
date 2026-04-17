import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "../../assets/instagram.jsx";
import ThreadsIcon from "../../assets/threads.jsx";
import TiktokIcon from "../../assets/tiktok.jsx";

const INSTAGRAM_URL = process.env.REACT_APP_INSTAGRAM_URL || "";
const TIKTOK_URL = process.env.REACT_APP_TIKTOK_URL || "";
const THREADS_URL = process.env.REACT_APP_THREADS_URL || "";

function FooterIconLink({ href, label, children }) {
  return (
    <a
      href={href || "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#c9b07a]/20 bg-white text-[#9a741d] transition duration-300 hover:-translate-y-0.5 hover:border-[#9a741d]/35 hover:text-[#7f5e14]"
    >
      {children}
    </a>
  );
}

export default function LandingFooter() {
  return (
    <footer id="contacts" className="mt-auto border-t border-[#ece7de]">
      <div className="mx-auto max-w-[1240px] px-4 py-9 text-[#87888f] md:px-5 md:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <a
              href="/"
              className="font-['Georgia','Times_New_Roman',serif] text-[1rem] font-semibold tracking-[-0.03em] text-[#9a741d] md:text-[1.12rem]"
            >
              priglasitelnoe.com
            </a>
            <p className="mt-2 text-[0.84rem] font-medium text-[#8c8d94] md:text-sm">
              © 2026 priglasitelnoe.com. Заманауи цифрлық шақырулар.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.88rem] font-medium text-[#92939a] md:text-sm">
              <Link to="/terms" className="transition hover:text-[#202127]">
                Қолдану шарттары
              </Link>
              <Link to="/privacy" className="transition hover:text-[#202127]">
                Құпиялылық саясаты
              </Link>
              <a href="#contacts" className="transition hover:text-[#202127]">
                Байланыс
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <FooterIconLink href={INSTAGRAM_URL} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </FooterIconLink>
              <FooterIconLink href={TIKTOK_URL} label="TikTok">
                <TiktokIcon className="h-4 w-4" />
              </FooterIconLink>
              <FooterIconLink href={THREADS_URL} label="Threads">
                <ThreadsIcon className="h-4 w-4" />
              </FooterIconLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
