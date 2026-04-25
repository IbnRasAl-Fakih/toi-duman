import React from "react";
import RevealItem from "../theatre-of-love-template/reveal-item.jsx";
import SectionReveal from "../theatre-of-love-template/section-reveal.jsx";

function CalendarCard({ template }) {
  return (
    <RevealItem className="px-2 py-2">
      <img
        src="/images/templates/romance-garden/cupid-illustration-BO3_EWaD.png"
        alt=""
        className="mx-auto h-auto w-[98px] object-contain"
      />
      <p
        className="mt-5 text-[1.9rem] leading-none text-[#8f713b]"
        style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
      >
        Күні мен уақыты
      </p>
      <p
        className="mt-3 text-center text-[2.8rem] leading-none text-[#b08d57]"
        style={{ fontFamily: '"Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive' }}
      >
        {template.details.calendar.yearLabel}
      </p>
      <div className="mx-auto mt-5 max-w-[290px] rounded-[28px] bg-[linear-gradient(180deg,#fffdf8_0%,#f8f1e4_100%)] px-4 py-5 shadow-[0_16px_34px_rgba(160,131,78,0.08)] ring-1 ring-[#eadcc3]">
        <div className="text-center text-[1rem] uppercase tracking-[0.22em] text-[#b4945d]">
          {template.details.calendar.monthLabel}
        </div>
        <div className="mt-4 grid grid-cols-7 text-center text-[0.72rem] tracking-[0.08em] text-[#b79a68]">
          {template.details.calendar.weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-7 gap-y-2 text-[1rem] text-[#8b6a34]">
          {template.details.calendar.cells.map((cell, index) => {
            const isSelected = cell === template.details.calendar.day;

            return (
              <div key={`${cell || "empty"}-${index}`} className="flex justify-center">
                {cell ? (
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      isSelected
                        ? "bg-[linear-gradient(180deg,#ecd5a7_0%,#d8b679_100%)] text-[#7a5724] shadow-[0_10px_20px_rgba(188,151,87,0.24)] ring-1 ring-[#e2c894]"
                        : "text-[#9f8050]"
                    }`}
                  >
                    {cell}
                  </span>
                ) : (
                  <span className="h-9 w-9" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <p
        className="mt-2 text-[3rem] leading-none text-[#8f713b]"
        style={{ fontFamily: '"Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive' }}
      >
        {template.details.timeLabel}
      </p>
    </RevealItem>
  );
}

function VenueCard({ template }) {
  return (
    <RevealItem className="px-2 py-2" delay={120}>
      <img
        src={template.details.venueImageUrl}
        alt={template.details.venueLabel}
        className="mx-auto h-auto w-full max-w-[260px] object-contain"
      />
      <p
        className="mt-5 text-[1.9rem] leading-none text-[#8f713b]"
        style={{ fontFamily: '"Template Alistair", "Cormorant Garamond", "Times New Roman", serif' }}
      >
        Өтетін орны
      </p>
      <p className="mt-2 text-[1rem] text-[#8f713b]">{template.details.locationLabel}</p>
      <a
        href={template.details.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#dbc39f] bg-white px-4 py-2 text-[0.82rem] font-semibold text-[#8f713b] transition duration-200 hover:bg-[#fcf7ef]"
      >
        <img src="/images/2gis-icon-logo.svg" alt="2GIS" className="h-4 w-4 shrink-0 object-contain" />
        {template.details.mapLabel}
      </a>
    </RevealItem>
  );
}

function HostsCard({ template }) {
  return (
    <RevealItem className="px-2 py-2" delay={220}>
      <img
        src="/images/templates/romance-garden/champagne-tower-Or6MBjHQ.png"
        alt=""
        className="mx-auto mb-4 h-auto w-[98px] object-contain"
      />
      <p
        className="mt-10 text-[2.4rem] leading-none text-[#8f713b]"
        style={{ fontFamily: '"Bickham Script Display", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive' }}
      >
        Той иелері
      </p>
      <p
        className="mt-8 text-[1.35rem] leading-tight text-[#7a6035]"
        style={{ fontFamily: '"Template Welcome Serif", "Times New Roman", serif' }}
      >
        {template.details.hostsLabel}
      </p>
    </RevealItem>
  );
}

export default function InvitationDetailsTemplate6({ template }) {
  return (
    <SectionReveal className="mt-10 px-6 py-4">
      <div className="space-y-14 text-center">
        <CalendarCard template={template} />
        <VenueCard template={template} />
        <HostsCard template={template} />
      </div>
    </SectionReveal>
  );
}
