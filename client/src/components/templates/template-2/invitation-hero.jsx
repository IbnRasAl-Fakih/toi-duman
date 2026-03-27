export default function InvitationHeroTemplate1({ template }) {
  const coverImageUrl = template.coverImageUrl || "/images/templates/template-1/couple-photo.svg";

  return (
    <section className="pt-4 text-center">
      <div className="overflow-hidden rounded-b-[56px] rounded-t-[28px] bg-gradient-to-b from-[#6fa7c6] to-[#86b9d2] p-3 shadow-[0_18px_40px_rgba(91,145,173,0.22)]">
        <div className="overflow-hidden rounded-b-[52px] rounded-t-[24px]">
          <img src={coverImageUrl} alt="Жас жұбайлар" className="h-[560px] w-full object-cover object-center" />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-4 px-2 pb-1 pt-5">
        <div className="flex flex-1 justify-center">
          <img src="/images/templates/template-1/header-divider.svg" alt="" className="w-full " />
        </div>
      </div>
    </section>
  );
}
