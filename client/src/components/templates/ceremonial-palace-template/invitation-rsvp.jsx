import React from "react";

const CEREMONIAL_SCRIPT_FONT = '"Bickham Script Pro", "Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive';
const CEREMONIAL_SERIF_FONT = '"Times New Roman", Georgia, serif';

function ResponseButton({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={`rounded-full border px-4 py-3 text-left text-sm transition ${
        isSelected
          ? "border-white bg-white text-[#7a0626]"
          : "border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10"
      }`}
    >
      {option.label}
    </button>
  );
}

export default function InvitationRsvpCeremonialPalace({
  template,
  guestName,
  selectedStatus,
  onGuestNameChange,
  onSelectStatus,
  onSubmit,
  isSubmitting,
  isPaid
}) {
  return (
    <section className="relative bg-[#66021F] text-white">
      <div className="px-7 pb-0 pt-11 text-center">
        <h2 className="text-[2.25rem] font-normal leading-none" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
          {template.rsvp.title}
        </h2>
        <p className="mx-auto mt-8 max-w-[320px] text-[1.25rem] leading-[1.2] text-white/95" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
          {template.rsvp.description}
        </p>

        <div className="mx-auto mt-9 grid max-w-[320px] gap-3 text-left">
          <input
            value={guestName}
            onChange={(event) => onGuestNameChange(event.target.value)}
            placeholder={template.rsvp.namePlaceholder}
            className="w-full rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/60 focus:bg-white/14"
          />

          <div className="grid gap-3">
            {template.rsvp.options.map((option) => (
              <ResponseButton key={option.value} option={option} isSelected={selectedStatus === option.value} onSelect={onSelectStatus} />
            ))}
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || !isPaid}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-[#f7f1eb] px-10 py-3 text-[0.9rem] font-medium text-[#9a5165] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? template.rsvp.submittingLabel : template.rsvp.submitLabel}
          </button>
        </div>

        <div className="mt-14">
          <p className="text-[2.35rem] font-normal leading-none text-white" style={{ fontFamily: CEREMONIAL_SCRIPT_FONT }}>
            {template.farewell.title}
          </p>
          <p className="mt-5 text-[1.85rem] leading-none" style={{ fontFamily: CEREMONIAL_SERIF_FONT }}>
            {template.farewell.signature}
          </p>
        </div>
      </div>

      <div className="relative mt-10">
        <img src="/images/templates/ceremonial-palace/300592484d1f31590325.png.webp" alt={template.farewell.imageAlt} className="block w-full" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[34%] bg-[linear-gradient(180deg,rgba(102,2,31,0.88)_0%,rgba(102,2,31,0.46)_46%,rgba(102,2,31,0)_100%)]" />
      </div>
    </section>
  );
}





