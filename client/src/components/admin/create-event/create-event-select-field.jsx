import React from "react";
import DropdownButton from "../../../assets/dropdown-button.jsx";

export default function CreateEventSelectField({ label, hint, options, value, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  const selectedOption = options.find((option) => option.value === value) || options[0] || null;

  React.useEffect(() => {
    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSelect(option) {
    if (option.disabled) {
      return;
    }

    onChange(option.value);
    setIsOpen(false);
  }

  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">{label}</span>

      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={`flex w-full items-center justify-between gap-4 rounded-[20px] border px-4 py-3 text-left text-sm transition ${
            isOpen
              ? "border-[#7f1118]/45 bg-white shadow-[0_18px_32px_rgba(127,17,24,0.08)]"
              : "border-black/10 bg-[#fcfaf7] hover:border-[#7f1118]/25 hover:bg-white"
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="min-w-0 truncate text-[#1f1a17]">{selectedOption?.label || "Мәнді таңдаңыз"}</span>
          <DropdownButton
            className={`h-5 w-5 shrink-0 text-[#7f1118] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen ? (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-[22px] border border-[#7f1118]/12 bg-white p-2 shadow-[0_24px_48px_rgba(31,26,23,0.16)]">
            <div className="max-h-64 overflow-y-auto">
              {options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    className={`flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-left text-sm transition ${
                      option.disabled
                        ? "cursor-not-allowed text-black/30"
                        : isSelected
                          ? "bg-[#7f1118] text-white"
                          : "text-[#1f1a17] hover:bg-[#f7f0ea]"
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="min-w-0 truncate">{option.label}</span>
                    {isSelected ? <span className="ml-3 shrink-0 text-xs uppercase tracking-[0.16em]">Таңдалды</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {hint ? <span className="mt-2 block text-xs text-black/45">{hint}</span> : null}
    </label>
  );
}
