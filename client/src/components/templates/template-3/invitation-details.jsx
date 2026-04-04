function DetailBlock({ title, children }) {
  return (
    <div className="space-y-3 text-center text-[#111111]">
      <h3 className="font-['Times_New_Roman','Cambria',serif] text-[1.45rem] italic font-bold leading-none md:text-[1.6rem]">
        {title}
      </h3>
      <div className="font-['Segoe_UI','Arial',sans-serif] text-[0.98rem] font-semibold leading-[1.28]">{children}</div>
    </div>
  );
}

export default function InvitationDetailsTemplate3({ template }) {
  const hasMapUrl = Boolean(template.details.mapUrl && template.details.mapUrl !== "#");

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#f6f2ec]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${template.details.backgroundImageUrl}')`,
          backgroundPosition: "center center",
          transform: "scale(1.03)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,242,235,0.14),rgba(244,239,232,0.08)_26%,rgba(244,239,232,0.04)_100%)]" />

      <div className="relative flex min-h-[760px] items-center justify-center px-6 py-10">
        <div className="w-full max-w-[344px] border border-white/70 bg-[rgba(255,255,255,0.82)] px-6 py-7 text-[#111111] shadow-[0_18px_40px_rgba(83,68,53,0.12)]">
          <DetailBlock title={template.details.aboutTitle}>
            <p>{template.details.hostsLabel}</p>
            <p>{template.details.hosts}</p>
          </DetailBlock>

          <div className="mt-7">
            <DetailBlock title={template.details.timeTitle}>
              <p>
                {template.details.dateLabel} <span className="px-2 text-black/45">|</span> {template.details.timeLabel}
              </p>
            </DetailBlock>
          </div>

          <div className="mt-7">
            <DetailBlock title={template.details.placeTitle}>
              <p>{template.details.location}</p>
              {template.details.venue ? <p>{template.details.venue}</p> : null}
            </DetailBlock>
          </div>

          {hasMapUrl ? (
            <div className="mt-7 flex justify-center">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eff8fb] px-4 py-2 font-['Segoe_UI','Arial',sans-serif] text-[10px] font-semibold uppercase tracking-[0.05em] text-[#5d95b3] shadow-[0_8px_18px_rgba(93,149,179,0.14)]"
                href={template.details.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/2gis-icon-logo.svg" alt="" className="h-4 w-4" />
                Карта арқылы ашу
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
