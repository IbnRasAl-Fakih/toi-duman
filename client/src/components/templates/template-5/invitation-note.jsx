import React from "react";
import RevealItem from "./reveal-item.jsx";
import SectionReveal from "./section-reveal.jsx";

export default function InvitationNoteTemplate5({ template }) {
  return (
    <SectionReveal className="bg-white px-5 py-16 text-center">
      <RevealItem className="template5-divider pb-4">
        <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#b78b7b]">{template.hosts.label}</p>
      </RevealItem>

      <div className="mx-auto mt-1 max-w-[320px]">
        <RevealItem className="mt-4" delay={120}>
          <h3 className="text-[2rem] leading-none text-[#8c3b2f]" style={{ fontFamily: "var(--font-display)" }}>
            {template.note.title}
          </h3>
        </RevealItem>

        <RevealItem as="p" className="mx-auto mt-4 max-w-[300px] text-[1rem] leading-7 text-[#875246]" delay={220}>
          {template.note.text}
        </RevealItem>

        <RevealItem as="p" className="mt-5 text-[1rem] uppercase tracking-[0.28em] text-[#ba8b7b]" delay={320}>
          {template.hosts.value}
        </RevealItem>
      </div>
    </SectionReveal>
  );
}
