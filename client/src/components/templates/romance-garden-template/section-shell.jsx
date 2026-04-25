import React from "react";

export default function SectionShell({ children, className = "", paper = false, style = undefined }) {
  return (
    <section className={`relative overflow-hidden ${paper ? "bg-[#fbf8f1]" : ""} ${className}`} style={style}>
      {children}
    </section>
  );
}
