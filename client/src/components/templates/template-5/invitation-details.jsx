import React from "react";
import RevealItem from "./reveal-item.jsx";
import SectionReveal from "./section-reveal.jsx";

const galleryItems = [
  {
    src: "/images/templates/template-5/curtain-open-C9MqdT6G.jpg",
    alt: "Wedding curtain decor",
    className: "mt-6 rotate-[-4deg]"
  },
  {
    src: "/images/templates/template-5/venue-illustration-DebdGS8I.png",
    alt: "Wedding venue illustration",
    className: "mt-2"
  },
  {
    src: "/images/templates/template-5/menu-frame-BFE5kCs7.png",
    alt: "Wedding menu frame",
    className: "mt-8 rotate-[4deg]"
  }
];

function DetailItem({ label, value, delay = 0 }) {
  return (
    <RevealItem className="py-3 text-center" delay={delay}>
      <div className="text-[0.58rem] uppercase tracking-[0.28em] text-[#b18b7c]">{label}</div>
      <div className="mt-2 text-[1rem] text-[#7a4035]">{value}</div>
    </RevealItem>
  );
}

export default function InvitationDetailsTemplate5({ template, viewportHeight = null }) {
  const configuredGalleryItems = Array.isArray(template.details.galleryImages) && template.details.galleryImages.length
    ? template.details.galleryImages.map((src, index) => ({
        src,
        alt: `Gallery image ${index + 1}`,
        className: galleryItems[index % galleryItems.length]?.className || ""
      }))
    : galleryItems;
  const marqueeItems = [...configuredGalleryItems, ...configuredGalleryItems];

  return (
    <SectionReveal className="flex min-h-[100svh] items-center bg-[#fff9f5] py-8" style={viewportHeight ? { minHeight: `${viewportHeight}px` } : undefined}>
      <div className="flex w-full flex-col justify-center gap-10">
        <RevealItem className="relative grid grid-cols-3 gap-3 overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,rgba(255,250,247,0.88),rgba(255,246,241,0.72))] px-4 py-4">
          <div className="absolute bottom-0 left-1/3 top-0 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,#ebd6cb,transparent)]" />
          <div className="absolute bottom-0 left-2/3 top-0 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,#ebd6cb,transparent)]" />
          <DetailItem label={template.details.labels.date} value={template.details.day} delay={60} />
          <DetailItem label={template.details.labels.time} value={template.details.timeLabel} delay={140} />
          <DetailItem label={template.details.labels.place} value={template.details.placeLabel} delay={220} />
        </RevealItem>

        <RevealItem className="relative overflow-hidden py-8" delay={200}>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#fff9f5] via-[rgba(255,249,245,0.72)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#fff9f5] via-[rgba(255,249,245,0.72)] to-transparent" />

          <div className="template5-gallery-track flex w-max gap-9 px-2">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className={`template5-gallery-card ${item.className} h-[468px] w-[342px] flex-none overflow-hidden rounded-[40px] border border-[#f1ddd4] bg-[linear-gradient(180deg,rgba(255,252,249,0.96),rgba(255,245,239,0.92))] p-4`}
              >
                <img src={item.src} alt={item.alt} className="h-full w-full rounded-[34px] object-cover" />
              </div>
            ))}
          </div>
        </RevealItem>
      </div>
    </SectionReveal>
  );
}
