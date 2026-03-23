export default function InvitationIntroTemplate1({ template }) {
  return (
    <section className="px-5 py-8 text-center md:px-7 md:py-10 lg:px-[9vw] lg:py-[88px]">
      <div
        className="mx-auto h-16 w-full max-w-[360px] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/icons/templates/template-1/line-heart.svg')" }}
      />
      <h2 className="mt-4 font-['Palatino_Linotype','Book_Antiqua','Palatino',serif] text-[1.75rem] italic md:text-[2.125rem] lg:text-[3.25rem]">
        {template.intro.title}
      </h2>
      <div className="mx-auto mt-7 grid max-w-[310px] gap-6 text-[1.05rem] leading-[1.7] md:max-w-[560px] md:gap-7 md:text-[1.2rem] lg:max-w-[980px] lg:gap-8 lg:text-[1.625rem]">
        {template.intro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <img
        src="/images/templates/template-1/roses-divider.svg"
        alt=""
        className="mx-auto mt-10 w-full max-w-[200px]"
      />
    </section>
  );
}
