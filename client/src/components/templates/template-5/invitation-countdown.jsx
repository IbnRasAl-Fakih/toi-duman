import React from "react";
import MapLinkButton from "../../map-link-button.jsx";
import RevealItem from "./reveal-item.jsx";
import SectionReveal from "./section-reveal.jsx";

function CountdownCard({ item }) {
  return (
    <div className="template5-countdown-card rounded-[12px] border border-[#bf8f81] bg-white px-2 py-4 text-center shadow-[0_10px_24px_rgba(121,53,42,0.04)]">
      <div className="text-[2rem] leading-none text-[#8e3d30]">{item.value}</div>
      <div className="mt-2 text-[0.62rem] uppercase tracking-[0.28em] text-[#8e3d30]">{item.label}</div>
    </div>
  );
}

export default function InvitationCountdownTemplate5({ template, viewportHeight = null }) {
  return (
    <SectionReveal className="flex min-h-[100svh] items-center bg-white px-5 py-10 text-center" style={viewportHeight ? { minHeight: `${viewportHeight}px` } : undefined}>
      <div className="w-full px-2">
        <RevealItem as="p" className="text-[1rem] leading-7 text-[#875246]">
          {template.countdown.title}
        </RevealItem>

        <div className="mt-7 grid grid-cols-4 gap-3">
          {template.countdown.items.map((item, index) => (
            <RevealItem key={item.label} delay={100 + index * 90}>
              <CountdownCard item={item} />
            </RevealItem>
          ))}
        </div>

        <RevealItem className="template5-divider mt-16 pb-4" delay={220}>
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#b78b7b]">{template.venue.sectionLabel}</p>
        </RevealItem>

        <RevealItem as="p" className="mt-4 text-[1rem] leading-7 text-[#875246]" delay={280}>
          {template.venue.subtitle}
        </RevealItem>

        <RevealItem delay={340}>
          <img
            src="/images/templates/template-5/venue-illustration-DebdGS8I.png"
            alt={template.venue.title}
            className="mx-auto mt-6 w-full max-w-[340px] object-contain"
          />
        </RevealItem>

        <RevealItem className="mt-5" delay={400}>
          <h2 className="text-[2.35rem] leading-none text-[#8c3b2f]" style={{ fontFamily: "var(--font-display)" }}>
            {template.venue.title}
          </h2>
        </RevealItem>

        <RevealItem as="p" className="mt-5 text-[1rem] leading-7 text-[#875246]" delay={460}>
          {template.venue.location}
        </RevealItem>

        <RevealItem as="p" className="mt-1 text-[0.92rem] uppercase tracking-[0.22em] text-[#b78b7b]" delay={520}>
          {template.venue.dateLabel}
        </RevealItem>

        <RevealItem className="mt-8 flex justify-center" delay={580}>
          <MapLinkButton
            href={template.venue.mapUrl}
            label={template.venue.mapLabel}
            className="border border-[#ead7d0]"
          />
        </RevealItem>
      </div>
    </SectionReveal>
  );
}
