import React from "react";

export default function CreateEventField({ label, hint, onChange, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">{label}</span>
      <input
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-[#7f1118]/40 focus:bg-white"
      />
      {hint ? <span className="mt-2 block text-xs text-black/45">{hint}</span> : null}
    </label>
  );
}
