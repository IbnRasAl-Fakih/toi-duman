function Ornament({ flipped = false }) {
  return (
    <img
      src="/images/templates/template-3/divider.webp"
      alt=""
      className={`mx-auto h-auto w-[54px] ${flipped ? "rotate-180" : ""}`}
    />
  );
}

function ShapeEdge({ flip = false }) {
  return (
    <svg
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      className={`block h-[54px] w-full ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        opacity="0.33"
        fill="#ffffff"
        d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"
      />
      <path
        fill="#ffffff"
        d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"
      />
      <path
        opacity="0.66"
        fill="#ffffff"
        d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"
      />
    </svg>
  );
}

export default function InvitationMessageTemplate3({ template }) {
  return (
    <section className="relative overflow-visible bg-white py-[54px] text-[#111111]">
      <div className="absolute inset-x-0 top-0 z-40 -translate-y-[52px]">
        <ShapeEdge flip />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-40 translate-y-[52px]">
        <ShapeEdge />
      </div>

      <div className="relative z-20 w-full bg-white px-10 pb-[72px] pt-[72px]">
        <Ornament flipped />

        <div className="mx-auto mt-8 max-w-[20rem] space-y-8 text-center font-['Segoe_UI','Trebuchet_MS',sans-serif] text-[1rem] font-semibold leading-[1.08]">
          {template.message.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8">
          <Ornament />
        </div>
      </div>
    </section>
  );
}
