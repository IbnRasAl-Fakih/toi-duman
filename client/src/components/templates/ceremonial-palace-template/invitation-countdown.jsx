import React from "react";

const CEREMONIAL_SCRIPT_FONT = '"Bickham Script Pro", "Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive';
const CEREMONIAL_SERIF_FONT = '"Times New Roman", Georgia, serif';

export default function InvitationCountdownCeremonialPalace({ template }) {
  const countdownItems = template.countdown.items.filter((item) => item.label !== "Секунд" && item.label !== "Seconds");

  return (
    <section className="relative bg-[#fbf6f1] text-[#4a4546]">
      <div className="px-5 pb-12 pt-24 text-center">
        <h2 className="text-[2.3rem] font-normal leading-none" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
          {template.countdown.title}
        </h2>

        <div className="mx-auto mt-8 grid max-w-[310px] grid-cols-3 gap-6" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
          {countdownItems.map((item) => (
            <div key={item.label}>
              <div className="text-[2.55rem] leading-none text-[#221f20]">{item.value}</div>
              <div className="mt-3 text-[1rem] leading-none text-[#221f20]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





