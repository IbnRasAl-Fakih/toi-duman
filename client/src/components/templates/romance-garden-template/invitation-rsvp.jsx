import React from "react";
import RevealItem from "../theatre-of-love-template/reveal-item.jsx";
import SectionReveal from "../theatre-of-love-template/section-reveal.jsx";

function GuestCountIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.55rem] w-[1.55rem]" aria-hidden="true">
      <path
        d="M16 19a4 4 0 0 0-8 0M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 19a4 4 0 0 0-3-3.87M17 11a3 3 0 1 0 0-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

export default function InvitationRsvpTemplate6({
  template,
  guestName,
  selectedStatus,
  guestCount,
  onGuestNameChange,
  onSelectStatus,
  onGuestCountChange,
  onSubmit,
  isSubmitting,
  isPaid
}) {
  const isReadyToSubmit = Boolean(isPaid && guestName.trim() && selectedStatus && !isSubmitting);
  const isDisabled = !isPaid || isSubmitting;

  return (
    <SectionReveal className="mt-6 px-6 py-10">
      <RevealItem>
        <h2
          className="text-center text-[2.75rem] leading-none text-[#8f713b]"
          style={{ fontFamily: '"Template Welcome Serif", "Times New Roman", serif' }}
        >
          {template.rsvp.title}
        </h2>
      </RevealItem>

      <RevealItem as="p" className="mx-auto mt-4 max-w-[290px] text-center text-[1rem] leading-7 text-[#82673c]" delay={80}>
        {template.rsvp.description}
      </RevealItem>

      <RevealItem className="mt-7 space-y-3" delay={120}>
        <input
          type="text"
          value={guestName}
          onChange={(event) => onGuestNameChange(event.target.value)}
          disabled={isDisabled}
          placeholder={template.rsvp.namePlaceholder}
          className="w-full rounded-[18px] border border-[#e8dcc7] bg-[#fffcf8] px-4 py-3.5 text-[15px] text-[#3f3325] outline-none placeholder:text-[#ae9a78] focus:border-[#c8a969] disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="px-2 py-3 text-center">
          <div className="flex items-center justify-center gap-3 text-[#b08d57]">
            <GuestCountIcon />
            <p
              className="text-[1.7rem] leading-none text-[#8f713b]"
              style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
            >
              {template.rsvp.guestCountLabel}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              type="button"
              disabled={isDisabled || guestCount <= 1}
              onClick={() => onGuestCountChange(Math.max(1, guestCount - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#eadfcd] bg-[#fffdfa] text-[1.5rem] text-[#a9824c] transition hover:bg-[#fcf6ed] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Қонақ санын азайту"
            >
              -
            </button>

            <span
              className="min-w-[2ch] text-center text-[1.6rem] text-[#7a6035]"
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
            >
              {guestCount}
            </span>

            <button
              type="button"
              disabled={isDisabled || guestCount >= 10}
              onClick={() => onGuestCountChange(Math.min(10, guestCount + 1))}
              className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#eadfcd] bg-[#fffdfa] text-[1.5rem] text-[#a9824c] transition hover:bg-[#fcf6ed] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Қонақ санын көбейту"
            >
              +
            </button>
          </div>
        </div>

        {template.rsvp.options.map((option) => {
          const isSelected = selectedStatus === option.value;

          return (
            <button
              key={option.value}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectStatus(option.value)}
              className={`flex w-full items-center gap-4 px-1 py-2 text-left transition duration-300 ${
                isDisabled ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                <span
                  className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition duration-300 ${
                    isSelected
                      ? "border-[#b57a24] bg-[#fffaf1] shadow-[0_4px_12px_rgba(175,118,33,0.18)]"
                      : "border-[#c9ab70]"
                  }`}
                >
                  {isSelected ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="relative h-[0.72rem] w-[0.72rem] text-[#b7771c]">
                      <circle cx="12" cy="12" r="10" fill="currentColor" />
                    </svg>
                  ) : null}
                </span>
              </span>
              <span
                className={`text-[1rem] leading-6 ${isSelected ? "text-[#7a6035]" : "text-[#4a3a28]"}`}
                style={{
                  fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
                  textShadow: isSelected ? "0 2px 8px rgba(183,144,86,0.12)" : "none"
                }}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </RevealItem>

      <RevealItem delay={220}>
        <button
          type="button"
          disabled={!isReadyToSubmit}
          onClick={onSubmit}
          className={`mt-6 flex w-full items-center justify-center gap-2 px-4 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.18em] text-white transition ${
            isReadyToSubmit ? "bg-[#8f713b] opacity-100 hover:bg-[#7a6032]" : "bg-[#c8b288] opacity-60"
          }`}
        >
          <SendIcon />
          <span className="text-[1.35rem] tracking-[0.08em]" style={{ fontFamily: '"Template Igrunok", "Times New Roman", serif' }}>
            {isSubmitting ? template.rsvp.submittingLabel : template.rsvp.submitLabel}
          </span>
        </button>
      </RevealItem>
    </SectionReveal>
  );
}
