import React from "react";

const CEREMONIAL_TORN_EDGE_SRC = "/images/templates/ceremonial-palace/Mask_group_2_1_Trace.svg";
const CEREMONIAL_SCRIPT_FONT = '"Bickham Script Pro", "Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive';
const CEREMONIAL_SERIF_FONT = '"Times New Roman", Georgia, serif';

export default function InvitationIntroCeremonialPalace({ template }) {
  return (
    <section className="relative z-30 -mb-[24px] bg-[#66021F] text-white">
      <div className="relative border-t border-white/15 px-7 pb-16 pt-10 text-center">
        <div className="relative z-10">
          <h2 className="text-[2.25rem] font-normal leading-none" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
            {template.intro.title}
          </h2>
          <p className="mx-auto mt-8 max-w-[310px] text-[1.25rem] leading-[1.2] text-white/95" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
            {template.intro.paragraphs[0]}
          </p>
          <p className="mx-auto mt-8 max-w-[310px] text-[1.25rem] leading-[1.2] text-white/95" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
            {template.intro.paragraphs[1]}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-[24px] z-20 h-[48px] overflow-hidden">
        <img
          src={CEREMONIAL_TORN_EDGE_SRC}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 block h-[130px] max-w-none -translate-x-1/2 object-contain"
        />
      </div>
    </section>
  );
}





