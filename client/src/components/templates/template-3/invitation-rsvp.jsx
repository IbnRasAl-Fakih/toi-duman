import Footer from "../../footer.jsx";

export default function InvitationRsvpTemplate3({
  template,
  guestName,
  selectedStatus,
  onGuestNameChange,
  onSelectStatus,
  onSubmit,
  isSubmitting,
  responseOptions,
}) {
  const isReadyToSubmit = Boolean(guestName.trim() && selectedStatus && !isSubmitting);

  return (
    <section className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${template.rsvp.backgroundImageUrl}')` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,20,18,0.42),rgba(74,74,74,0.46)_40%,rgba(130,130,130,0.58)_100%)]" />

      <div className="relative px-10 pb-0 pt-48">
        <h3 className="mx-auto text-center font-['Times_New_Roman','Cambria',serif] text-[2rem] italic font-bold leading-[1.08] drop-shadow-[0_3px_10px_rgba(0,0,0,0.26)]">
          {template.rsvp.title}
        </h3>

        <div className="mt-12 space-y-5 font-['Segoe_UI','Arial',sans-serif]">
          <label className="block">
            <span className="mb-2 block text-[0.95rem] font-medium">{template.rsvp.nameLabel}</span>
            <input
              type="text"
              value={guestName}
              onChange={(event) => onGuestNameChange(event.target.value)}
              placeholder={template.rsvp.namePlaceholder}
              className="h-12 w-full rounded-[4px] border border-white/35 bg-white px-4 text-[1rem] text-[#1e1e1e] outline-none placeholder:text-black/25 focus:border-white"
            />
          </label>

          <div>
            <p className="text-[0.95rem] font-medium">{template.rsvp.questionLabel}</p>
            <div className="mt-3 space-y-2.5">
              {responseOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2.5 text-[0.95rem] font-semibold">
                  <input
                    type="radio"
                    name="template-3-rsvp"
                    value={option.value}
                    checked={selectedStatus === option.value}
                    onChange={() => onSelectStatus(option.value)}
                    className="h-4 w-4 border-white/70 text-black accent-white"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-5 text-center">
            <button
              type="button"
              onClick={onSubmit}
              className={`min-w-[8.8rem] rounded-[4px] px-8 py-3 font-['Segoe_UI','Arial',sans-serif] text-[0.98rem] font-semibold text-[#181818] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition ${
                isReadyToSubmit ? "bg-white hover:bg-[#f0ece8]" : "bg-white/65"
              }`}
            >
              {isSubmitting ? "Жіберілуде..." : "Жіберу"}
            </button>
          </div>
        </div>

        <div className="mt-16 py-6 text-black">
          <Footer />
        </div>
      </div>
    </section>
  );
}
