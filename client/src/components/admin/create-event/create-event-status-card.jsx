import React from "react";

export default function CreateEventStatusCard({ title, content }) {
  return (
    <section className="rounded-[24px] border border-black/10 bg-[#fcfaf7] p-5">
      <h2 className="text-xs uppercase tracking-[0.3em] text-black/50">{title}</h2>
      <div className="mt-4">{content}</div>
    </section>
  );
}
