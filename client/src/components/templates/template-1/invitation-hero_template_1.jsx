export default function InvitationHeroTemplate1({ template }) {
  const coverImageUrl = template.coverImageUrl || "/images/templates/template-1/couple-photo.svg";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#7d0408] via-[#a00608] to-[#9a0306] px-4 pb-10 pt-5 text-center md:px-6 md:pb-12 lg:min-h-[54vh] lg:px-12 lg:pb-16 lg:pt-16">
      <div className="absolute inset-x-0 top-0 h-14 bg-black/20 md:h-16" />
      <img
        src="/images/templates/template-1/roses-top.svg"
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 w-full"
      />
      <div className="relative flex items-center justify-center gap-3 pt-24 font-['Palatino_Linotype','Book_Antiqua','Palatino',serif] text-[2.2rem] italic text-[#fff2ef] md:gap-6 md:text-[3.25rem] lg:text-[4.5rem]">
        <span>{template.couple.left}</span>
        <span className="text-[1.8rem] md:text-[2.1rem] lg:text-[2.8rem]">🕊</span>
        <span>{template.couple.right}</span>
      </div>
      <div className="relative mx-auto mt-8 w-[78%] max-w-[290px] overflow-hidden rounded-[28px] shadow-[0_26px_50px_rgba(253,214,206,0.28)] md:mt-10 md:rounded-[32px] lg:mt-12 lg:w-[min(36vw,420px)] lg:max-w-none">
        <img src={coverImageUrl} alt="Фото пары" className="w-full object-cover" />
      </div>
    </section>
  );
}