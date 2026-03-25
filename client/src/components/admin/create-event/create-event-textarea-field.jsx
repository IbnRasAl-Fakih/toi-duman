import React from "react";

export default function CreateEventTextAreaField({ label, onChange, rows = 6, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">{label}</span>
      <textarea
        {...props}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[22px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-black/30 focus:border-[#7f1118]/40 focus:bg-white"
      />
    </label>
  );
}
