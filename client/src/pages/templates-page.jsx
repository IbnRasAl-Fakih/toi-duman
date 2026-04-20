import React from "react";
import { Link } from "react-router-dom";
import LandingFooter from "../components/landing/landing-footer.jsx";
import LandingHeader from "../components/landing/landing-header.jsx";

const CATEGORIES = [
  { id: "wedding", label: "Той", eyebrow: "Тойға арналған", title: "Үйлену тойына арналған үлгілер" },
  { id: "kudalyk", label: "Құдалық", eyebrow: "Құдалық", title: "Отбасылық және ұлттық мерекелерге арналған үлгілер" },
  { id: "birthday", label: "Туған күн", eyebrow: "Туған күн", title: "Жеке мерекелерге арналған үлгілер" },
  { id: "corporate", label: "Корпоратив", eyebrow: "Корпоратив", title: "Командалық және бренд іс-шараларға арналған үлгілер" },
  { id: "other", label: "Басқа", eyebrow: "Басқа", title: "Шақырудың өзге форматтары" }
];

const TEMPLATE_ITEMS = [
  {
    id: "template-5",
    category: "wedding",
    title: "Махаббат театры",
    description: "Сахналық атмосферасы, терең реңктері және кештің әсерін айқындайтын айрықша акценттері бар әсерлі той үлгісі.",
    previewLabel: "Қарау",
    chooseLabel: "Таңдау",
    image: "/images/image_2026-04-14_23-16-22.png",
    previewHref: "/images/image_2026-04-14_23-16-22.png",
    chooseHref: "/template-5/form"
  },
  {
    id: "template-6",
    category: "wedding",
    title: "Ғашықтар бағы",
    description: "Таза типографикасы, нәзік композициясы және жұмсақ детальдары бар заманауи той үлгісі.",
    previewLabel: "Қарау",
    chooseLabel: "Таңдау",
    image: "/images/image_2026-04-14_23-14-17.png",
    previewHref: "/images/image_2026-04-14_23-14-17.png",
    chooseHref: "/template-6/form"
  }
];

function TemplateCard({ item }) {
  return (
    <article className="rounded-[26px] border border-[#eee7dd] bg-white p-3 shadow-[0_18px_40px_rgba(45,35,21,0.04)]">
      <div className="overflow-hidden rounded-[20px] bg-[#f4efe7]">
        <img
          src={item.image}
          alt={item.title}
          className="block aspect-[0.78] w-full object-cover"
        />
      </div>

      <div className="px-1 pb-1 pt-4">
        <h3 className="font-['Georgia','Times_New_Roman',serif] text-[1.1rem] font-semibold tracking-[-0.03em] text-[#2f2923]">
          {item.title}
        </h3>
        <p className="mt-2 text-[0.84rem] leading-6 text-[#8a8277]">{item.description}</p>

        <div className="mt-5 flex items-center gap-2">
          <a
            href={item.previewHref}
            className="inline-flex items-center justify-center rounded-full border border-[#e7dccb] bg-white px-4 py-2 text-[0.78rem] font-medium text-[#7d7366] transition hover:border-[#d7c7ae] hover:text-[#2a241e]"
          >
            {item.previewLabel}
          </a>

          <Link
            to={item.chooseHref}
            className="inline-flex items-center justify-center rounded-full bg-[#9a741d] px-4 py-2 text-[0.78rem] font-semibold text-white transition hover:bg-[#856219]"
          >
            {item.chooseLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

function EmptyCategoryState() {
  return (
    <div className="rounded-[28px] border border-dashed border-[#e5dccf] bg-[#f7f2eb] px-6 py-14 text-center md:px-10">
      <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#b28a57]">
        Жақында
      </p>
      <p className="mt-4 text-[0.95rem] leading-7 text-[#8a8277]">
        Бұл санатқа жаңа үлгілер жақын арада қосылады
      </p>
    </div>
  );
}

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = React.useState("wedding");

  const activeCategoryMeta = CATEGORIES.find((category) => category.id === activeCategory);
  const visibleTemplates = TEMPLATE_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white text-[#2b241f]">
      <LandingHeader />

      <section id="intro" className="border-b border-[#ece5da] px-6 pb-12 pt-28 text-center md:px-[12vw] md:pb-16 md:pt-36 xl:px-[18vw]">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#b08b43]">
          Дизайн мен эстетика
        </p>
        <h1 className="mt-5 font-['Georgia','Times_New_Roman',serif] text-[2.8rem] leading-[0.92] tracking-[-0.05em] text-[#221d18] md:text-[4.6rem]">
          Өзіңізге лайық үлгіні таңдаңыз
        </h1>
        <p className="mt-6 text-[1rem] leading-8 text-[#7b7369] md:text-[1.08rem]">
          Полиграфия эстетикасынан және заманауи веб-технологиялардан шабыт алған премиум цифрлық шақырулар топтамасын ашыңыз.
          Әр шақыру сіздің мерекеңізге арналған толыққанды сайт болып жасалады.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={
                  isActive
                    ? "rounded-full bg-[#9a741d] px-6 py-3 text-[0.9rem] font-semibold text-white shadow-[0_10px_24px_rgba(154,116,29,0.18)]"
                    : "rounded-full border border-[#eee8df] bg-[#f5f1ea] px-6 py-3 text-[0.9rem] font-medium text-[#877d71] transition hover:border-[#dfd3c2] hover:text-[#2a241e]"
                }
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      <section id="catalog" className="flex-1 px-6 py-12 md:px-10 md:py-14 xl:px-14">
        <div className="flex flex-col gap-3 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#b28a57]">
              {activeCategoryMeta.eyebrow}
            </p>
            <h2 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-[1.9rem] leading-none tracking-[-0.04em] text-[#26211c] md:text-[2.5rem]">
              {activeCategoryMeta.title}
            </h2>
          </div>

          <p className="text-[0.84rem] uppercase tracking-[0.14em] text-[#9c9387]">
            {visibleTemplates.length} үлгі
          </p>
        </div>

        {visibleTemplates.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleTemplates.map((item) => (
              <TemplateCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyCategoryState />
        )}
      </section>

      <LandingFooter />
    </main>
  );
}
