import React from "react";

export default function MapLinkButton({
  href,
  label = "Картаны ашу",
  className = "",
  iconClassName = "",
  textClassName = ""
}) {
  const isDisabled = !href || href === "#";

  return (
    <a
      href={isDisabled ? undefined : href}
      target={isDisabled ? undefined : "_blank"}
      rel={isDisabled ? undefined : "noreferrer"}
      aria-disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-5 py-3 text-[#8e3d30] shadow-[0_14px_30px_rgba(125,51,39,0.1)] transition ${
        isDisabled ? "cursor-default opacity-60" : "hover:bg-[#fff8f4]"
      } ${className}`}
    >
      <img src="/images/2gis-icon-logo.svg" alt="" className={`h-5 w-5 shrink-0 object-contain ${iconClassName}`} />
      <span className={`whitespace-nowrap text-[0.72rem] uppercase tracking-[0.22em] ${textClassName}`}>{label}</span>
    </a>
  );
}
