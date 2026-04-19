import React from "react";
import SectionReveal from "./section-reveal.jsx";
import RevealItem from "./reveal-item.jsx";
import { SendIcon } from "../../../assets/template-5/send-icon.jsx";

export default function InvitationRsvpTemplate5({
  template,
  guestName,
  selectedStatus,
  onGuestNameChange,
  onSelectStatus,
  onSubmit,
  isSubmitting,
  isPaid
}) {
  const isReadyToSubmit = Boolean(isPaid && guestName.trim() && selectedStatus && !isSubmitting);
  const isDisabled = !isPaid || isSubmitting;

  return (
    <SectionReveal className="px-5 pb-10 pt-9 text-center">
      <RevealItem className="mx-auto max-w-[300px]">
        <h3 className="text-[2rem] leading-none text-[#8c3b2f]" style={{ fontFamily: "var(--font-display)" }}>
          {template.rsvp.title}
        </h3>
      </RevealItem>

      <RevealItem as="p" className="mx-auto mt-4 max-w-[290px] text-[0.98rem] leading-7 text-[#875246]">
        {template.rsvp.description}
      </RevealItem>

      <div className="mt-6 space-y-3 text-left">
        <RevealItem delay={100}>
          <input
            type="text"
            value={guestName}
            onChange={(event) => onGuestNameChange(event.target.value)}
            disabled={isDisabled}
            placeholder={template.rsvp.namePlaceholder}
            className="w-full rounded-[18px] border border-[#ead5ca] bg-white/95 px-4 py-3 text-[15px] text-[#4f2d28] outline-none transition placeholder:text-[#bc9b8d] focus:border-[#aa6456] disabled:cursor-not-allowed disabled:bg-[#f6efeb]"
          />
        </RevealItem>

        <div className="grid gap-3">
          {template.rsvp.options.map((option, index) => {
            const isActive = selectedStatus === option.value;

            return (
              <RevealItem key={option.value} delay={180 + index * 90}>
                <button
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onSelectStatus(option.value)}
                  className={`w-full rounded-[18px] border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-[#a24b3f] bg-[#a24b3f] text-white shadow-[0_14px_26px_rgba(125,51,39,0.14)]"
                      : "border-[#ead5ca] bg-white/95 text-[#6f4339] hover:border-[#d8a18f] hover:bg-[#fff7f3]"
                  } ${isDisabled ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  {option.label}
                </button>
              </RevealItem>
            );
          })}
        </div>
      </div>

      <RevealItem delay={360}>
        <button
          type="button"
          disabled={!isReadyToSubmit}
          onClick={onSubmit}
          className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[18px] px-5 py-4 text-[0.74rem] uppercase tracking-[0.24em] text-white transition ${
            isReadyToSubmit ? "bg-[#8f4034] shadow-[0_16px_30px_rgba(121,53,42,0.16)] hover:bg-[#7f372d]" : "bg-[#d7b8ac]"
          }`}
        >
          <SendIcon className="h-4 w-4" />
          <span>{isSubmitting ? template.rsvp.submittingLabel : template.rsvp.submitLabel}</span>
        </button>
      </RevealItem>
    </SectionReveal>
  );
}
