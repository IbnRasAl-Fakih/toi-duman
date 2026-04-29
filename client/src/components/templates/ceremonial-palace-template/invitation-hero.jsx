import React from "react";

const CEREMONIAL_SCRIPT_FONT = '"Bickham Script Pro", "Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive';
const CEREMONIAL_SERIF_FONT = '"Cormorant Garamond", "Times New Roman", Georgia, serif';

function FlowerStrip() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[250px] overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[70px] border-t border-white/12 bg-[#66021F]" />

      <img
        src="/images/templates/ceremonial-palace/12.png.webp"
        alt=""
        className="absolute bottom-[25px] left-[-60px] w-[150px]"
      />

      <img
        src="/images/templates/ceremonial-palace/7uruby.png.webp"
        alt=""
        className="absolute bottom-[80px] left-[75px] w-[100px] drop-shadow-[0_12px_20px_rgba(73,8,25,0.24)]"
      />

      <img
        src="/images/templates/ceremonial-palace/9.png.webp"
        alt=""
        className="absolute bottom-[1px] left-[32px] w-[150px] drop-shadow-[0_12px_20px_rgba(73,8,25,0.24)]"
      />

      <img
        src="/images/templates/ceremonial-palace/4.png.webp"
        alt=""
        className="absolute bottom-[10px] left-[160px] w-[200px] drop-shadow-[0_12px_20px_rgba(73,8,25,0.22)]"
      />

      <img
        src="/images/templates/ceremonial-palace/12.png.webp"
        alt=""
        className="absolute bottom-[5px] left-[110px] w-[150px] drop-shadow-[0_10px_18px_rgba(73,8,25,0.16)]"
      />

      <img
        src="/images/templates/ceremonial-palace/2ruby.png.webp"
        alt=""
        className="absolute bottom-[5px] left-[250px] w-[170px] drop-shadow-[0_10px_18px_rgba(73,8,25,0.16)]"
      />

      <img
        src="/images/templates/ceremonial-palace/1ruby.png.webp"
        alt=""
        className="absolute bottom-[30px] left-[270px] w-[240px] drop-shadow-[0_14px_24px_rgba(73,8,25,0.24)]"
      />
    </div>
  );
}

function EnvelopeOverlay({ isOpened, onOpen }) {
  return (
    <div className={`absolute inset-0 z-30 ${isOpened ? "pointer-events-none" : ""}`}>
      <div className={`absolute -left-[16%] -right-[16%] bottom-0 z-20 h-[58%] overflow-hidden transition-transform duration-[1700ms] ${isOpened ? "translate-y-[110%]" : "translate-y-0"}`}>
        <img
          src="/images/templates/ceremonial-palace/Polygon_2_1.png.webp"
          alt=""
          className="block h-full w-full max-w-none object-cover object-bottom"
        />
      </div>
      <div className={`absolute -left-[16%] -right-[16%] top-0 z-20 h-[58%] overflow-hidden transition-transform duration-[1900ms] ${isOpened ? "-translate-y-[110%]" : "translate-y-0"}`}>
        <img
          src="/images/templates/ceremonial-palace/Polygon_1_3.png.webp"
          alt=""
          className="block h-full w-full max-w-none object-cover object-top"
        />
      </div>
      <div className={`absolute -left-px top-0 z-10 h-full w-[50%] transition-transform duration-[1800ms] ${isOpened ? "-translate-x-[110%]" : "translate-x-0"}`}>
        <img src="/images/templates/ceremonial-palace/Polygon_4.png.webp" alt="" className="h-full w-full object-fill object-left" />
      </div>
      <div className={`absolute -right-px top-0 z-10 h-full w-[50%] transition-transform duration-[1800ms] ${isOpened ? "translate-x-[110%]" : "translate-x-0"}`}>
        <img src="/images/templates/ceremonial-palace/Polygon_3.png.webp" alt="" className="h-full w-full object-fill object-right" />
      </div>

      <div
        className={`absolute inset-x-0 top-1/2 z-30 flex flex-col items-center px-8 text-center transition-all duration-700 ${isOpened ? "opacity-0" : "opacity-100"}`}
        style={{ transform: `translateY(${isOpened ? "calc(-50% + 16px)" : "-50%"})` }}
      >
        <button
          type="button"
          onClick={onOpen}
          className="flex flex-col items-center text-[#8b1633] transition hover:scale-[1.02]"
          aria-label="Шақыруды ашу"
        >
          <img
            src="/images/templates/ceremonial-palace/ChatGPT_Image_Aug_3_.png.webp"
            alt=""
            className="h-[180px] w-[180px] drop-shadow-[0_8px_16px_rgba(110,78,40,0.28)]"
          />
          <span
            className="mt-3 text-[1.16rem] font-semibold leading-none text-[#9b2845]"
            style={{ fontFamily: CEREMONIAL_SERIF_FONT }}
          >
            Ашып көру
          </span>
        </button>
      </div>
    </div>
  );
}

export default function InvitationHeroCeremonialPalace({ template, isOpened, onOpen, viewportHeight = null }) {
  const heightStyle = viewportHeight ? { minHeight: `${viewportHeight}px` } : { minHeight: "100svh" };

  return (
    <section className="relative overflow-hidden bg-[#f7f1ea]" style={heightStyle}>
      {!isOpened ? <div className="absolute inset-0 bg-[#f7f1ea]" /> : null}
      {isOpened ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src={template.hero.videoUrl}
            className="absolute inset-0 h-full w-full scale-[1.2] bg-[#253d4c] object-contain object-[50%_43%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,28,47,0.42)_0%,rgba(39,43,48,0.3)_46%,rgba(35,38,42,0.28)_70%,rgba(21,28,33,0.22)_100%)]" />
        </>
      ) : null}

      <div className={`relative z-10 flex min-h-[100svh] flex-col items-center px-5 pb-32 pt-[5.8rem] text-center text-white transition duration-[1400ms] ${isOpened ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[2.25rem] font-normal leading-none text-white/95 sm:text-[2.45rem]" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
          {template.hero.dayLabel}
        </p>
        <p className="mt-2 text-[1.85rem] font-medium leading-none tracking-[0.02em] text-white/95" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
          {template.hero.dateLabel}
        </p>

        <div className="mt-[5.25rem]">
          <div className="text-[4.15rem] font-normal leading-[0.82] text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.28)] sm:text-[4.45rem]" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
            {template.couple.left}
          </div>
          <div className="my-1 text-[3.1rem] font-normal leading-none text-white/95" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
            &
          </div>
          <div className="text-[4.15rem] font-normal leading-[0.82] text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.28)] sm:text-[4.45rem]" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
            {template.couple.right}
          </div>
        </div>
      </div>

      {isOpened ? <FlowerStrip /> : null}
      <EnvelopeOverlay isOpened={isOpened} onOpen={onOpen} />
    </section>
  );
}



