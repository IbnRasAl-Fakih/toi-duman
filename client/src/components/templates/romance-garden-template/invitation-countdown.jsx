import React from "react";
import SectionReveal from "../theatre-of-love-template/section-reveal.jsx";
import SectionShell from "./section-shell.jsx";

function Countdown({ items }) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-3 text-center">
      {items.map((item) => (
        <div key={item.label} className="px-3 py-4">
          <div
            className="text-[1.9rem] leading-none text-[#8b6a34]"
            style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
          >
            {item.value}
          </div>
          <div className="mt-1 text-[0.78rem] uppercase tracking-[0.22em] text-[#b38d57]">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function InvitationCountdownTemplate6({ template }) {
  return (
    <SectionReveal>
      <SectionShell paper className="bg-[radial-gradient(circle_at_top,#fffef9_0%,#f7f1e7_100%)] px-6 py-10">
        <img
          src="/images/templates/romance-garden/floral-vase-6x28LN74.png"
          alt=""
          className="mx-auto h-auto w-[98px] object-contain opacity-90"
        />
        <h2
          className="mt-5 text-center text-[3.1rem] italic leading-none text-[#8f713b]"
          style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
        >
          <span className="uppercase">Т</span>ой уақыты
        </h2>
        <p className="mt-3 text-center text-[0.8rem] uppercase tracking-[0.3em] text-[#b08d57]">
          {template.hero.dateLabel} күніне дейін
        </p>
        <Countdown items={template.countdown} />
      </SectionShell>
    </SectionReveal>
  );
}
