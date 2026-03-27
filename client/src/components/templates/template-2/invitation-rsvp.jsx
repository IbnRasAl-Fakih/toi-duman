export default function InvitationRsvpTemplate1({
  template,
  guestName,
  selectedStatus,
  onGuestNameChange,
  onSelectStatus,
  onSubmit,
  isSubmitting,
  responseOptions
}) {
  const isReadyToSubmit = Boolean(guestName.trim() && selectedStatus && !isSubmitting);

  return (
    <section className="px-4 pb-12 pt-3 text-[#1f2b35]">
      <div className="px-5 pb-4 pt-12">
        <h3 className="text-center font-['Brush_Script_MT','Segoe_Script','cursive'] text-[42px] leading-none text-black">
          {template.rsvp.title}
        </h3>

        <div className="mt-8 space-y-3">
          <label className="block">
            <input
              type="text"
              value={guestName}
              onChange={(event) => onGuestNameChange(event.target.value)}
              placeholder="Аты-жөніңізді енгізіңіз"
              className="w-full rounded-[4px] border border-[#d6dce0] bg-white px-3 py-3 text-[15px] outline-none placeholder:text-[#9ba3ad] focus:border-[#78aeca]"
            />
          </label>

          <div className="space-y-3">
            {responseOptions.map((option) => {
              const isSelected = selectedStatus === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSelectStatus(option.value)}
                  className="flex w-full items-center gap-4 rounded-[4px] border border-[#d6dce0] bg-white px-4 py-4 text-left"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1f2b35]">
                    {isSelected ? <span className="h-4 w-4 rounded-full bg-[#1f2b35]" /> : null}
                  </span>
                  <span className="text-[15px]">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className={`mt-6 w-full rounded-[8px] py-3 text-[14px] font-semibold uppercase tracking-[0.14em] text-white ${
            isReadyToSubmit ? "bg-[#6fa7c6]" : "bg-[#6fa7c6]/50"
          }`}
          onClick={onSubmit}
        >
          {isSubmitting ? "Жіберілуде..." : "Жіберу"}
        </button>

        <p className="mx-auto mt-8 text-center font-['Georgia','Times_New_Roman',serif] text-[22px] leading-[1.35] text-[#50616d]">
          {template.rsvp.description}
        </p>
      </div>
    </section>
  );
}
