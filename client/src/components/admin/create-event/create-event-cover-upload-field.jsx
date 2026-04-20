import React from "react";

export default function CreateEventCoverUploadField({
  preview,
  fileName,
  isDragging,
  onDragStateChange,
  onDrop,
  onChange,
  onClear
}) {
  return (
    <div className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-black/55">Мұқаба</span>
      <label
        onDragEnter={(event) => {
          event.preventDefault();
          onDragStateChange(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          onDragStateChange(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          onDragStateChange(false);
        }}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed px-6 py-8 text-center transition ${
          isDragging
            ? "border-[#7f1118] bg-[#7f1118]/[0.06]"
            : "border-black/15 bg-[#fcfaf7] hover:border-[#7f1118]/45 hover:bg-white"
        }`}
      >
        <input type="file" accept="image/*" onChange={onChange} className="hidden" />

        {preview ? (
          <div className="w-full">
            <div className="flex min-h-[240px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-[#f6f1eb] p-3 shadow-[0_16px_36px_rgba(31,26,23,0.14)]">
              <img
                src={preview}
                alt="Мұқабаның алдын ала көрінісі"
                className="max-h-[420px] max-w-full rounded-[14px] object-contain"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-left">
              <div>
                <p className="text-sm font-medium text-[#1f1a17]">{fileName || "Сурет таңдалды"}</p>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  onClear();
                }}
                className="rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-black/60 transition hover:border-[#7f1118]/30 hover:text-[#7f1118]"
              >
                Өшіру
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative h-14 w-14 rounded-full bg-[#7f1118]/10 text-[#7f1118]">
              <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
              <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
            </div>
            <p className="mt-4 text-sm font-medium text-[#1f1a17]">Суретті осы жерге сүйреп әкеліңіз</p>
            <p className="mt-2 text-sm text-black/55">немесе компьютерден файл таңдау үшін басыңыз</p>
            <p className="mt-4 text-xs uppercase tracking-[0.24em] text-black/35">PNG, JPG, WEBP, GIF, SVG</p>
          </>
        )}
      </label>
    </div>
  );
}
