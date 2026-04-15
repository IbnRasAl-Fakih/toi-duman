import React from "react";
import BrideIcon from "../../assets/bride.jsx";
import CakeIcon from "../../assets/cake.jsx";
import WeddingRingsIcon from "../../assets/wedding-rings.jsx";
import WorkIcon from "../../assets/work.jsx";

const SERVICE_ITEMS = [
  {
    title: "Той",
    description: "Қазақы мерекелерге арналған заманауи цифрлық шақырулар, дәстүр мен отбасы стилін құрметтей отырып жасалады.",
    icon: "rings",
  },
  {
    title: "Қыз ұзату",
    description: "Қыз ұзатуға арналған нәзік әрі әсерлі шақырулар ұлттық эстетикамен үйлестіріліп дайындалады.",
    icon: "bride",
  },
  {
    title: "Туған күн",
    description: "Мерейтойларға, отбасылық мерекелерге және шағын кештерге арналған жылы әрі айқын шешімдер.",
    icon: "cake",
  },
  {
    title: "Корпоратив",
    description: "Іскерлік шараларға, жабық кешкі асқа және командалық кездесулерге арналған жинақы формат.",
    icon: "work",
  },
];

function ServiceIcon({ type }) {
  if (type === "bride") {
    return <BrideIcon className="h-8 w-8" />;
  }

  if (type === "rings") {
    return <WeddingRingsIcon className="h-8 w-8" />;
  }

  if (type === "cake") {
    return <CakeIcon className="h-8 w-8" />;
  }

  return <WorkIcon className="h-8 w-8" />;
}

function ServiceCard({ title, description, icon }) {
  return (
    <article className="min-h-[255px] rounded-[28px] bg-white px-7 py-7 shadow-[0_18px_50px_rgba(24,28,37,0.06)] ring-1 ring-[#f4efe7]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8f5ef] text-[#9a741d]">
        <ServiceIcon type={icon} />
      </div>

      <h3 className="mt-7 font-['Georgia','Times_New_Roman',serif] text-[1.7rem] leading-none tracking-[-0.03em] text-[#2c2d31]">
        {title}
      </h3>

      <p className="mt-4 max-w-[15rem] text-[0.98rem] leading-7 text-[#7b7d83]">{description}</p>
    </article>
  );
}

export default function LandingServices() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-8 md:px-5 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-[820px] text-center">
        <h2 className="font-['Georgia','Times_New_Roman',serif] text-[2.5rem] leading-tight tracking-[-0.04em] text-[#25262b] md:text-[3.4rem]">
          Ең маңызды сәттерге арналған
        </h2>
        <p className="mx-auto mt-4 max-w-[39rem] text-[1rem] leading-8 text-[#8b8c92]">
          Біз маңызды оқиғаларға арналған цифрлық шақырулар жасап, мәдени реңк пен заманауи стильді бір
          визуалды тілде біріктіреміз.
        </p>
        <div className="mx-auto mt-7 h-1 w-80 rounded-full bg-[#e7d6ac]" />
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {SERVICE_ITEMS.map((item) => (
          <ServiceCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
