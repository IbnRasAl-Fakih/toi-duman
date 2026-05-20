import React from "react";
import { isTemplateElementEnabled } from "../../../utils/template-sections.js";

import { CeremonialRevealItem, CeremonialRevealSection } from "./scroll-reveal.jsx";

const CEREMONIAL_SCRIPT_FONT = '"Bickham Script Pro", "Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive';
const CEREMONIAL_SERIF_FONT = '"Times New Roman", Georgia, serif';

export default function InvitationCountdownCeremonialPalace({ template }) {
  const countdownItems = template.countdown.items.filter((item) => item.label !== "Секунд" && item.label !== "Seconds");

  return (
    <CeremonialRevealSection className="relative bg-[#fbf6f1] text-[#4a4546]">
      <div className="px-5 pb-12 pt-24 text-center">
        {isTemplateElementEnabled(template, "countdown.title") ? (
        <CeremonialRevealItem as="h2" className="text-[2.3rem] font-normal leading-none" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
          {template.countdown.title}
        </CeremonialRevealItem>
        ) : null}

        {isTemplateElementEnabled(template, "countdown.items") ? (
        <div className="mx-auto mt-8 grid max-w-[310px] grid-cols-3 gap-6" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
          {countdownItems.map((item, index) => (
            <CeremonialRevealItem key={item.label} delay={120 + index * 90}>
              <div className="text-[2.55rem] leading-none text-[#221f20]">{item.value}</div>
              <div className="mt-3 text-[1rem] leading-none text-[#221f20]">{item.label}</div>
            </CeremonialRevealItem>
          ))}
        </div>
        ) : null}
      </div>
    </CeremonialRevealSection>
  );
}





