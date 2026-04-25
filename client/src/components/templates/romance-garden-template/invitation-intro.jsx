import React from "react";
import SectionReveal from "../theatre-of-love-template/section-reveal.jsx";
import SectionShell from "./section-shell.jsx";

export default function InvitationIntroTemplate6({ template }) {
  return (
    <SectionReveal>
      <SectionShell paper className="mt-6 bg-[#fffdfa] px-7 py-12">
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: "url('/images/templates/romance-garden/phon6.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative z-10 text-center">
          <h2
            className="text-[2.35rem] italic leading-none text-[#8f713b]"
            style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
          >
            {template.intro.title}
          </h2>
          <p
            className="mx-auto mt-6 max-w-[300px] text-[1rem] leading-8 text-[#82673c]"
            style={{ fontFamily: '"Template Welcome Serif", "Cormorant Garamond", "Times New Roman", serif' }}
          >
            {template.intro.description}
          </p>
          <div className="mt-10 flex justify-center">
            <img src="/images/templates/romance-garden/swans-framed-ByH4RE7t.png" alt="" className="h-auto w-[170px] object-contain opacity-85" />
          </div>
        </div>
      </SectionShell>
    </SectionReveal>
  );
}
