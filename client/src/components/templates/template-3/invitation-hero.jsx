export default function InvitationHeroTemplate3({ template }) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${template.heroImageUrl}')` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(62,53,44,0.34),rgba(62,53,44,0.44)_38%,rgba(62,53,44,0.28)_100%)]" />

      <div className="relative flex min-h-[100svh] flex-col items-center justify-between px-6 pb-12 pt-12 text-center text-white mb-24">
        <div className="pt-2">
          <p className="font-['Segoe_UI','Trebuchet_MS',sans-serif] text-[1.05rem] font-semibold leading-tight tracking-[0.01em] drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)]">
            {template.hero.kicker}
          </p>
        </div>

        <div className="pb-12">
          <h1 className="font-['Georgia','Times_New_Roman',serif] text-[4.3rem] italic leading-[0.86] tracking-[0.01em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.28)]">
            <span className="block">{template.couple.left}</span>
            <span className="block text-[3.8rem]">&amp;</span>
            <span className="block">{template.couple.right}</span>
          </h1>
        </div>

        <div>
          <p className="font-['Segoe_UI','Trebuchet_MS',sans-serif] text-[1.02rem] font-semibold tracking-[0.01em] drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)]">
            {template.hero.dateLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
