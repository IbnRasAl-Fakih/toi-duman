import React from "react";
import MapLinkButton from "../../map-link-button.jsx";

const CEREMONIAL_SCRIPT_FONT = '"Bickham Script Pro", "Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive';
const CEREMONIAL_SERIF_FONT = '"Times New Roman", Georgia, serif';

export default function InvitationLocationCeremonialPalace({ template }) {
  return (
    <section className="relative bg-[#fbf6f1] text-[#4a4546]">
      <div className="pt-9 text-center" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
        <div className="px-6">
          <h2 className="text-[2.25rem] font-normal leading-none" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
            {template.location.title}
          </h2>
          <p className="mt-6 text-[1.3rem] leading-none text-[#2f2b2c]">{template.location.venue}</p>
          <p className="mx-auto mt-3 max-w-[300px] text-[1.02rem] leading-[1.2] text-[#2f2b2c]">
            Мекенжай: {template.location.address}
          </p>
          <MapLinkButton
            href={template.location.mapUrl}
            label={template.location.mapLabel}
            className="mt-5 border border-[#d7c2b8] bg-[#fffaf6] px-4 py-2.5 text-[#7a0626] shadow-none hover:bg-white"
            iconClassName="h-4 w-4"
            textClassName="text-[0.68rem] font-semibold tracking-[0.16em]"
          />
        </div>

        <div className="mt-3 max-h-[270px] overflow-hidden">
          <img src="/images/templates/ceremonial-palace/image-gen_1-Photoroo.png.webp" alt="" className="block w-full -translate-y-10" />
        </div>
      </div>
    </section>
  );
}






