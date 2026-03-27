export default function InvitationVenueTemplate1({ template }) {
  return (
    <section className="px-3 pb-10 md:px-4 md:pb-12 lg:px-[7vw] lg:py-[72px]">
      <div className="w-full rounded-b-[28px] rounded-t-[34px] border-[6px] border-[#d79c9a] bg-gradient-to-b from-[#8e0408] to-[#ad090d] px-5 py-9 text-center text-[#fff1ec] md:px-7 md:py-10 lg:px-10 lg:py-12">
        <div className="font-['Palatino_Linotype','Book_Antiqua','Palatino',serif] text-[1.75rem] italic md:text-[2.125rem]">
          {template.venue.title}
        </div>
        <div className="mx-auto mt-5 w-full max-w-[310px] overflow-hidden rounded-[8px] border border-white/15 lg:max-w-[520px]">
          <img src="/images/templates/template-1/venue-photo.svg" alt="Локация" />
        </div>
        <div className="mt-5 text-base leading-[1.6] md:text-lg lg:text-[1.375rem]">
          <div>{template.venue.city}</div>
          <div>{template.venue.place}</div>
          <div>{template.venue.type}</div>
        </div>
        <a
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ff4f58] px-8 py-3 text-base font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_30px_rgba(0,0,0,0.22)] md:px-10 md:py-4 md:text-lg"
          href={template.venue.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          На карте
        </a>
      </div>
    </section>
  );
}