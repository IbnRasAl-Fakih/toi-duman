import React from "react";

export default function TemplatesEmptyState({ text, tone = "default" }) {
  return (
    <div
      className={`rounded-[24px] border px-6 py-10 text-center text-sm ${
        tone === "error" ? "border-[#b42318]/20 bg-[#fff5f4] text-[#b42318]" : "border-black/10 bg-[#fcfaf7] text-black/55"
      }`}
    >
      {text}
    </div>
  );
}
