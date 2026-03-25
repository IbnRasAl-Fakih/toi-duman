import React from "react";

export default function CreateEventSelectField({ label, hint, options, onChange, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">{label}</span>
      <select
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[18px] border border-black/10 bg-[#fcfaf7] px-4 py-3 text-sm outline-none transition focus:border-[#7f1118]/40 focus:bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <span className="mt-2 block text-xs text-black/45">{hint}</span> : null}
    </label>
  );
}
