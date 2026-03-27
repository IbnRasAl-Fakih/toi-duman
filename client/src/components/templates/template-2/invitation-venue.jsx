export default function InvitationVenueTemplate1({ template }) {
  return (
    <section className="rounded-[36px] bg-[#78aeca] px-6 py-8 text-center text-white shadow-[0_18px_36px_rgba(91,145,173,0.18)]">
      <div className="flex justify-center">
        <img src="/images/templates/template-1/ornament.svg" alt="" className="w-full max-w-[110px]" />
      </div>
      <div className="mt-4 text-[13px]">{template.hosts.title}</div>
      <div className="mt-3 text-[29px] font-semibold leading-tight">{template.hosts.family}</div>
      <div className="mt-6 flex justify-center">
        <img src="/images/templates/template-1/ornament.svg" alt="" className="w-full max-w-[110px] rotate-180" />
      </div>
    </section>
  );
}
