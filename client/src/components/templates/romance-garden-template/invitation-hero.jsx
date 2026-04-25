import React from "react";
import SectionShell from "./section-shell.jsx";

export default function InvitationHeroTemplate6({
  template,
  introVideoRef,
  isEnvelopeOpen,
  onOpenInvitation,
  isHeroReady,
  onIntroEnded,
  onHeroReady,
  viewportHeight = null
}) {
  const heroStyle = viewportHeight ? { minHeight: `${viewportHeight}px` } : undefined;
  const overlayStyle = viewportHeight ? { height: `${viewportHeight}px` } : undefined;
  const overlayClassName = viewportHeight ? "h-full" : "h-[100svh]";
  const heroShellClassName = viewportHeight ? "relative bg-[#e9dfcf]" : "relative min-h-[100svh] bg-[#e9dfcf]";
  const heroContentClassName = viewportHeight
    ? "relative z-10 px-6 pb-10 pt-6 text-center text-white"
    : "relative z-10 min-h-[100svh] px-6 pb-10 pt-6 text-center text-white";
  const titleClassName = viewportHeight
    ? "text-[3rem] leading-[0.82] drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
    : "text-[3.7rem] leading-[0.82] drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]";
  const nameClassName = viewportHeight
    ? "block text-[3.45rem] font-normal leading-[0.88] text-white drop-shadow-lg"
    : "block text-6xl font-normal leading-[0.9] text-white drop-shadow-lg md:text-8xl lg:text-9xl";
  const ampersandClassName = viewportHeight
    ? "relative my-3 block -translate-y-[30%] text-[1.7rem] leading-[0.7]"
    : "relative my-4 block -translate-y-[40%] text-[2.05rem] leading-[0.7] md:my-5 md:text-[3rem] lg:text-[3.6rem]";

  return (
    <>
      <div
        className={`absolute inset-x-0 top-0 z-40 ${overlayClassName} overflow-hidden bg-[#f8f4ed] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isEnvelopeOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={overlayStyle}
        aria-hidden={isEnvelopeOpen}
        onClick={onOpenInvitation}
      >
        <video
          ref={introVideoRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          playsInline
          muted
          preload="auto"
          poster={template.hero.envelopeUrl}
          onEnded={onIntroEnded}
        >
          <source src={template.hero.introVideoUrl} type="video/mp4" />
        </video>
        <button type="button" onClick={onOpenInvitation} className="sr-only" aria-label="Шақыруды ашу" />
      </div>

      <SectionShell className={heroShellClassName} style={heroStyle}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,8,0.42)_0%,rgba(16,12,8,0.5)_52%,rgba(16,12,8,0.6)_100%)]" />
        <img
          src={template.hero.posterUrl}
          alt={template.couple.combined}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isHeroReady ? "opacity-0" : "opacity-100"}`}
        />
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isHeroReady ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          poster={template.hero.posterUrl}
          onCanPlay={onHeroReady}
        >
          <source src={template.hero.videoUrl} type="video/mp4" />
        </video>

        <div className={heroContentClassName} style={heroStyle}>
          <div className="absolute inset-x-0 top-[7%] px-6 sm:top-[6%]">
            <h1 className={titleClassName} style={{ fontFamily: '"Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive' }}>
              <span className={nameClassName}>
                {template.couple.left}
              </span>
              <span className={ampersandClassName}>
                &amp;
              </span>
              <span className={nameClassName}>
                {template.couple.right}
              </span>
            </h1>
          </div>

          <div className="absolute inset-x-0 bottom-10 w-full px-8 py-3">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-white/70 md:w-24" />
              <span className="text-xl text-white drop-shadow-lg">✦</span>
              <span className="h-px w-12 bg-white/70 md:w-24" />
            </div>
            <p className="text-[1rem] uppercase tracking-[0.34em] text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
              {template.hero.dateLabel}
            </p>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
