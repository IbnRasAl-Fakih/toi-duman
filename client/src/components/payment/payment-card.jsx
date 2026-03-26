import React from "react";
import CopyIcon from "../../assets/copy.jsx";

export default function PaymentCard({ eyebrow, value, hint, copyValue, ownerName }) {
  const [copyState, setCopyState] = React.useState("idle");

  React.useEffect(() => {
    if (copyState === "idle") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopyState("idle");
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [copyState]);

  async function handleCopy() {
    const textToCopy = copyValue || value;
    if (!textToCopy) {
      return;
    }

    try {
      await navigator.clipboard.writeText(String(textToCopy));
      setCopyState("success");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="relative rounded-[28px] border border-white/10 bg-[rgba(248,242,236,0.06)] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">{eyebrow}</p>
          <p className="mt-3 text-sm leading-6 text-white/58">{hint}</p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
            copyState === "success"
              ? "border-[#1f8f51]/40 bg-[#1f8f51]/14 text-[#63d18f]"
              : copyState === "error"
                ? "border-[#b42318]/40 bg-[#b42318]/14 text-[#f38f89]"
                : "border-white/10 bg-white/6 text-white/72 hover:bg-white/10"
          }`}
          aria-label="Скопировать значение"
          title="Скопировать"
        >
          <CopyIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 pr-20">
        <p className="break-words font-['SFMono-Regular','Menlo','Monaco','Consolas','Liberation_Mono','monospace'] text-[1.6rem] font-medium leading-none tracking-[-0.01em] text-white [font-variant-numeric:tabular-nums]">
          {value}
        </p>
        {ownerName ? (
          <p className="mt-2 text-sm tracking-[0.05em] text-white/46">
            <span className="text-white/72">{ownerName}</span>
          </p>
        ) : null}
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 z-10">
        <span
          className={`rounded-full px-2 py-1 text-[11px] uppercase tracking-[0.18em] backdrop-blur-sm ${
            copyState === "success"
              ? "bg-[#1f8f51]/14 text-[#63d18f]"
              : copyState === "error"
                ? "bg-[#b42318]/14 text-[#f38f89]"
                : "bg-transparent text-transparent"
          }`}
        >
          {copyState === "success" ? "Скопировано" : copyState === "error" ? "Ошибка" : ""}
        </span>
      </div>
    </div>
  );
}
