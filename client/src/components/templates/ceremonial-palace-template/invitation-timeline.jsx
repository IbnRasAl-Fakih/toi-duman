import React from "react";

const CEREMONIAL_TORN_EDGE_SRC = "/images/templates/ceremonial-palace/Mask_group_2_1_Trace.svg";
const CEREMONIAL_SCRIPT_FONT = '"Bickham Script Pro", "Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive';
const CEREMONIAL_SERIF_FONT = '"Times New Roman", Georgia, serif';

export default function InvitationTimelineCeremonialPalace({ template }) {
  const timelineRef = React.useRef(null);
  const [flowerProgress, setFlowerProgress] = React.useState(0);

  React.useEffect(() => {
    let frameId = null;

    function updateFlowerProgress() {
      frameId = null;
      const timeline = timelineRef.current;
      if (!timeline) {
        return;
      }

      const rect = timeline.getBoundingClientRect();
      const viewportGuide = window.innerHeight * 0.58;
      const nextProgress = (viewportGuide - rect.top) / Math.max(rect.height, 1);
      setFlowerProgress(Math.min(1, Math.max(0, nextProgress)));
    }

    function handleScroll() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateFlowerProgress);
      }
    }

    updateFlowerProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <section className="relative my-[24px] bg-[#66021F] text-white">
      <div className="pointer-events-none absolute inset-x-0 -top-[24px] z-20 h-[48px] overflow-hidden">
        <img
          src={CEREMONIAL_TORN_EDGE_SRC}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-0 block h-[120px] max-w-none -translate-x-1/2 rotate-180 object-contain"
        />
      </div>

      <div className="px-5 pb-24 pt-[5.25rem]">
        <h2 className="text-center text-[2.45rem] font-normal leading-none" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
          {template.timeline.title}
        </h2>

        <div ref={timelineRef} className="relative mx-auto mt-[4.5rem] max-w-[386px]" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
          <div className="absolute bottom-[1.15rem] left-1/2 top-[1.15rem] w-px -translate-x-1/2 bg-white/35" />
          <img
            src="/images/templates/ceremonial-palace/9.png.webp"
            alt=""
            className="absolute left-1/2 z-20 w-[58px] -translate-x-1/2 -translate-y-1/2 transition-[top] duration-500 ease-out"
            style={{ top: `${flowerProgress * 100}%` }}
          />

          <div className="space-y-14">
            {template.timeline.items.map((item, index) => (
              <div key={`${item.time}-${item.title}-${index}`} className="grid grid-cols-[1fr_44px_1fr] items-center">
                <div className="pr-8 text-right text-[2rem] leading-none">{item.time}</div>
                <div className="relative flex justify-center">
                  <span className="h-2 w-2 rotate-45 border border-white bg-white" />
                </div>
                <div className="pl-8 text-[1.28rem] leading-[1.08] text-white/95">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-[24px] z-20 h-[48px] overflow-hidden">
        <img
          src={CEREMONIAL_TORN_EDGE_SRC}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 block h-[120px] max-w-none -translate-x-1/2 object-contain"
        />
      </div>
    </section>
  );
}





