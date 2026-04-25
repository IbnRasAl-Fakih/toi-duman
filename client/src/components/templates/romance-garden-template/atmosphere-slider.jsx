import React from "react";
import SectionReveal from "../theatre-of-love-template/section-reveal.jsx";

function wrapSlideIndex(index, length) {
  return ((index % length) + length) % length;
}

function getSlideOffset(index, activeIndex, length) {
  const direct = index - activeIndex;
  const wrappedLeft = direct - length;
  const wrappedRight = direct + length;
  return [direct, wrappedLeft, wrappedRight].reduce((closest, current) =>
    Math.abs(current) < Math.abs(closest) ? current : closest
  );
}

export default function AtmosphereSlider({ items }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!items.length) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setActiveIndex((current) => wrapSlideIndex(current + 1, items.length));
    }, 4200);

    return () => {
      window.clearInterval(timerId);
    };
  }, [items.length]);

  return (
    <SectionReveal>
      <section className="relative px-0 py-8">
        <div className="relative h-[27rem] overflow-hidden">
          {items.map((item, index) => {
            const offset = getSlideOffset(index, activeIndex, items.length);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            let translateX = "0%";
            let scale = 0.74;
            let opacity = 0;
            let widthClass = "w-[42%]";
            let zIndex = 0;

            if (offset === 0) {
              translateX = "0%";
              scale = 1;
              opacity = 1;
              widthClass = "w-[68%]";
              zIndex = 30;
            } else if (offset === -1) {
              translateX = "-73%";
              scale = 0.84;
              opacity = 0.72;
              widthClass = "w-[45%]";
              zIndex = 20;
            } else if (offset === 1) {
              translateX = "73%";
              scale = 0.84;
              opacity = 0.72;
              widthClass = "w-[45%]";
              zIndex = 20;
            } else if (offset < -1) {
              translateX = "-120%";
            } else if (offset > 1) {
              translateX = "120%";
            }

            return (
              <div
                key={`${item.src}-${index}`}
                className={`absolute left-1/2 top-0 aspect-[0.72] overflow-hidden rounded-[34px] bg-[#f6efe4] shadow-[0_28px_54px_rgba(138,113,73,0.18)] transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${widthClass}`}
                style={{
                  transform: `translateX(calc(-50% + ${translateX})) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: isCenter ? "auto" : "none"
                }}
                aria-hidden={!isVisible}
              >
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(74,49,17,0.18)_100%)]" />
              </div>
            );
          })}
        </div>
      </section>
    </SectionReveal>
  );
}
