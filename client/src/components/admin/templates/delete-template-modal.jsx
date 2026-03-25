import React from "react";

export default function DeleteTemplateModal({ template, isDeleting, onConfirm, onClose }) {
  if (!template) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(31,26,23,0.2)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[#7f1118]/55">Подтверждение</p>
        <h2 className="mt-4 font-['Georgia','Times_New_Roman',serif] text-3xl leading-none text-[#7f1118]">
          Удалить шаблон?
        </h2>
        <p className="mt-4 text-sm leading-7 text-black/65">
          Будет удален шаблон <span className="font-medium text-[#1f1a17]">{template.name}</span>.
        </p>

        <div className="mt-6 rounded-[20px] border border-black/10 bg-[#fcfaf7] px-4 py-4 text-sm text-black/70">
          <p>
            <span className="text-black/45">Тип:</span> {template.type}
          </p>
          <p className="mt-2 break-all">
            <span className="text-black/45">Путь:</span> {template.path}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-full border border-black/10 px-5 py-3 text-xs uppercase tracking-[0.18em] text-black/55 transition hover:border-black/20 hover:text-black/75"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className={`rounded-full px-5 py-3 text-xs uppercase tracking-[0.18em] text-white transition ${
              isDeleting ? "cursor-default bg-[#7f1118]/50" : "bg-[#7f1118] hover:bg-[#5d0b11]"
            }`}
          >
            {isDeleting ? "Удаление..." : "Удалить шаблон"}
          </button>
        </div>
      </div>
    </div>
  );
}
