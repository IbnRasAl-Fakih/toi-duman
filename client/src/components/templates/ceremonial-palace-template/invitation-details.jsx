import React from "react";

const CEREMONIAL_SCRIPT_FONT = '"Bickham Script Pro", "Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive';
const CEREMONIAL_SERIF_FONT = '"Times New Roman", Georgia, serif';

function FlowerBand() {
  return (
    <div className="pointer-events-none relative mx-[-1.75rem] mt-12 h-[200px] overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[56px] border-t border-white/12 bg-[#66021F]" />

      <img src="/images/templates/ceremonial-palace/12.png.webp" alt="" className="absolute bottom-[10px] left-[-100px] w-[200px]" />
      <img src="/images/templates/ceremonial-palace/4.png.webp" alt="" className="absolute bottom-[80px] left-[25px] w-[80px]" />
      <img src="/images/templates/ceremonial-palace/7uruby.png.webp" alt="" className="absolute bottom-[60px] left-[105px] w-[90px]" />
      <img src="/images/templates/ceremonial-palace/12.png.webp" alt="" className="absolute bottom-[10px] left-[35px] w-[120px]" />
      <img src="/images/templates/ceremonial-palace/5.png.webp" alt="" className="absolute bottom-[105px] left-[250px] w-[50px]" />
      <img src="/images/templates/ceremonial-palace/7.png.webp" alt="" className="absolute bottom-[-8px] left-[250px] w-[50px]" />
      <img src="/images/templates/ceremonial-palace/5.png.webp" alt="" className="absolute bottom-[110px] left-[340px] w-[60px]" />
      <img src="/images/templates/ceremonial-palace/9.png.webp" alt="" className="absolute bottom-[0px] left-[245px] w-[170px]" />
      <img src="/images/templates/ceremonial-palace/12.png.webp" alt="" className="absolute bottom-[15px] left-[160px] w-[150px]" />
      <img src="/images/templates/ceremonial-palace/9.png.webp" alt="" className="absolute bottom-[-5px] left-[120px] w-[120px]" />
      <img src="/images/templates/ceremonial-palace/2ruby.png.webp" alt="" className="absolute bottom-[-5px] left-[315px] w-[130px]" />
      <img src="/images/templates/ceremonial-palace/12.png.webp" alt="" className="absolute bottom-[20px] left-[340px] w-[180px]" />
    </div>
  );
}

export default function InvitationDetailsCeremonialPalace({ template }) {
  return (
    <section className="relative bg-[#fbf6f1] text-[#4a4546]">
      <div className="px-7 pb-0 pt-12 text-center" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
        <h2 className="text-[2.75rem] font-normal leading-none" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
          Шағын тілек
        </h2>
        <p className="mx-auto mt-8 max-w-[320px] text-[1.2rem] leading-[1.35]">
          Бұл күннің әр сәтін сүйіспеншілікпен дайындап жатырмыз және қуанышымызды сіздермен бөлісуді асыға күтеміз.
        </p>

        <div className="mx-auto mt-10 max-w-[310px] border-y border-[#66021F]/16 py-7">
          <p className="text-[2.25rem] font-normal leading-none text-[#66021F]" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
            Сұрақтарыңыз болса
          </p>
          <p className="mx-auto mt-5 max-w-[270px] text-[1.12rem] leading-[1.3]">{template.details.description}</p>
          <p className="mt-6 text-[1.65rem] leading-none">{template.details.organizerName}</p>
          <p className="mt-3 text-[1.75rem] leading-none">{template.details.organizerPhone}</p>
        </div>

        <div className="mx-auto mt-9 max-w-[320px]">
          <p className="text-[2.25rem] font-normal leading-none text-[#66021F]" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
            Сыйлық туралы
          </p>
          <p className="mt-5 text-[1.16rem] leading-[1.35]">{template.details.giftText}</p>
        </div>
        <FlowerBand />
      </div>
    </section>
  );
}