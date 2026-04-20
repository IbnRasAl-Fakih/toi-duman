import React from "react";

function formatDateTime(value) {
  return new Date(value).toLocaleString("kk-KZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function TemplatesTable({ templates, onRequestDelete }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-black/10 bg-[#fcfaf7]">
      <div className="grid grid-cols-1 gap-3 border-b border-black/10 px-5 py-4 text-xs uppercase tracking-[0.24em] text-black/45 md:grid-cols-[1.2fr_0.9fr_1.7fr_0.9fr_0.9fr]">
        <div>Атауы</div>
        <div>Түрі</div>
        <div>Жолы</div>
        <div>Құрылған күні</div>
        <div>Әрекет</div>
      </div>

      <div className="divide-y divide-black/10">
        {templates.map((template) => (
          <div
            key={template.id}
            className="grid grid-cols-1 items-center gap-3 px-5 py-4 text-sm text-black/70 md:grid-cols-[1.2fr_0.9fr_1.7fr_0.9fr_0.9fr]"
          >
            <div>
              <p className="font-medium text-[#1f1a17]">{template.name}</p>
            </div>
            <div>{template.type}</div>
            <div className="break-all text-black/55">{template.path}</div>
            <div>{formatDateTime(template.created_at)}</div>
            <div className="self-start md:self-center">
              <button
                type="button"
                onClick={() => onRequestDelete(template)}
                className="rounded-full border border-black/10 bg-white px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-black/60 transition hover:border-[#7f1118]/25 hover:text-[#7f1118]"
              >
                Өшіру
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
