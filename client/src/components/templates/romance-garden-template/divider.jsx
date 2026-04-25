import React from "react";
import RevealItem from "../theatre-of-love-template/reveal-item.jsx";

export default function RomanceGardenDivider({ iconSrc, className = "", imageClassName = "" }) {
  return (
    <RevealItem>
      <div className={`flex items-center justify-center gap-5 ${className}`}>
        <img src={iconSrc} alt="" className={`h-16 w-16 object-contain opacity-80 ${imageClassName}`} />
      </div>
    </RevealItem>
  );
}
