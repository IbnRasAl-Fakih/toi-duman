import React from "react";
import { ScrollDownIcon } from "../../../assets/theatre-of-love-template/scroll-down-icon.jsx";
import { TapIcon } from "../../../assets/theatre-of-love-template/tap-icon.jsx";

export default function InvitationHeroTemplate5({ template, isOpened, onOpen, instantOpen = false, viewportHeight = null }) {
  const videoRef = React.useRef(null);
  const [isFinished, setIsFinished] = React.useState(false);
  const [isHeroContentVisible, setIsHeroContentVisible] = React.useState(false);

  React.useEffect(() => {
    if (!isOpened) {
      setIsFinished(false);
      setIsHeroContentVisible(false);
      return undefined;
    }

    if (instantOpen) {
      setIsFinished(true);
      setIsHeroContentVisible(true);
      return undefined;
    }

    setIsHeroContentVisible(false);
    const contentTimerId = window.setTimeout(() => {
      setIsHeroContentVisible(true);
    }, 1500);

    const video = videoRef.current;
    if (!video) {
      return () => {
        window.clearTimeout(contentTimerId);
      };
    }

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }

    return () => {
      window.clearTimeout(contentTimerId);
    };
  }, [instantOpen, isOpened]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#fff9f5]" style={viewportHeight ? { minHeight: `${viewportHeight}px` } : undefined}>
      <div className="absolute inset-0 overflow-hidden bg-[#c07d6e]">
        {!isOpened ? (
          <img
            src="/images/templates/theatre-of-love/curtain-closed-Bpkadld4.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isOpened ? "opacity-100" : "pointer-events-none opacity-0"}`}
          src="/images/templates/theatre-of-love/curtain-video-BAKLj3Y5.mp4"
          muted
          playsInline
          preload="auto"
          poster="/images/templates/theatre-of-love/curtain-open-C9MqdT6G.jpg"
          onEnded={() => {
            setIsFinished(true);
          }}
        />

        {isFinished ? (
          <img
            src="/images/templates/theatre-of-love/curtain-open-C9MqdT6G.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            isOpened
              ? "bg-[linear-gradient(180deg,rgba(79,17,12,0.05),rgba(255,251,246,0)_46%,rgba(255,249,245,0.03)_100%)]"
              : "bg-[linear-gradient(180deg,rgba(54,10,8,0.48),rgba(54,10,8,0.38)_42%,rgba(54,10,8,0.52)_100%)]"
          }`}
        />

        {!isOpened ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
            <button
              type="button"
              onClick={onOpen}
              className="flex flex-col items-center text-center text-white"
              aria-label={template.hero.openAriaLabel}
            >
              <span className="template5-tap-button inline-flex h-24 w-24 items-center justify-center rounded-full border border-white/45 bg-white/12">
                <TapIcon className="h-9 w-9" />
              </span>
              <span className="mt-5 text-[0.74rem] uppercase tracking-[0.42em] text-white/90">{template.hero.openLabel}</span>
            </button>
          </div>
        ) : null}

        <div
          className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-[1200ms] ${
            isHeroContentVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex min-h-[100svh] flex-col items-center px-6 pb-8 pt-[30svh] text-center" style={viewportHeight ? { minHeight: `${viewportHeight}px` } : undefined}>
            <p
              className="whitespace-pre-line text-[0.62rem] uppercase leading-[1.5] text-[#8d4639]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {template.intro.overline}
            </p>

            <div className="mt-16 text-[#6f271f]" style={{ fontFamily: "var(--font-script)" }}>
              <div className="text-[4.45rem] leading-[0.9]">{template.couple.left}</div>
              <div className="my-1 text-[2.9rem] leading-none">&amp;</div>
              <div className="text-[4.45rem] leading-[0.9]">{template.couple.right}</div>
            </div>

            <div className="mt-auto w-full max-w-[320px] pb-2">
              <p
                className="text-[0.86rem] uppercase leading-[1.5] text-[#852a20]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {template.intro.message}
              </p>

              <div className="template5-scroll-bounce mt-16 flex flex-col items-center justify-center text-[#8d4639]">
                <span className="text-[0.66rem] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>
                  {template.hero.scrollLabel}
                </span>
                <span className="mt-3 inline-flex items-center justify-center">
                  <ScrollDownIcon className="h-7 w-7" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
