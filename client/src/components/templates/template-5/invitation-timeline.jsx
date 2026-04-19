import React from "react";
import RevealItem from "./reveal-item.jsx";
import SectionReveal from "./section-reveal.jsx";

export default function InvitationTimelineTemplate5({ template, viewportHeight = null }) {
  return (
    <SectionReveal className="px-5">
      <div
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden rounded-[36px] px-7 pb-8 text-center text-[#8c3b2f]"
        style={viewportHeight ? { minHeight: `${viewportHeight}px` } : undefined}
      >
        <img
          src="/images/templates/template-5/menu-frame-BFE5kCs7.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-fill"
        />

        <RevealItem as="p" className="relative z-10 text-[0.68rem] uppercase tracking-[0.34em] text-[#bb8d7e]">
          {template.timeline.title}
        </RevealItem>

        <div className="relative z-10 mt-10 mb-16 space-y-9">
          {template.timeline.items.map((item, index) => (
            <RevealItem key={`${item.time}-${item.title}`} delay={120 + index * 120}>
              <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c38c7a]">{item.time}</div>
              <div className="mt-2 text-[1.4rem] leading-none" style={{ fontFamily: "var(--font-display)" }}>
                {item.title}
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
