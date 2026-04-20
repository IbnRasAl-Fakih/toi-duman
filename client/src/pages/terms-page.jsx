import React from "react";
import LandingFooter from "../components/landing/landing-footer.jsx";
import LandingHeader from "../components/landing/landing-header.jsx";

const TERMS_SECTIONS = [
  {
    title: "1. Жалпы ережелер",
    body:
      "Бұл сайт цифрлық шақырулар мен соған байланысты қызметтер туралы ақпарат ұсынады. Сайтты пайдалану арқылы пайдаланушы осы қолдану шарттарымен танысқанын және оларды қабылдайтынын растайды."
  },
  {
    title: "2. Материалдарды пайдалану",
    body:
      "Сайттағы барлық мәтіндер, суреттер, интерфейс элементтері және өзге материалдар тек ақпараттық мақсатта қолданылады және сайт иесінің алдын ала келісімінсіз көшірілмейді, таратылмайды немесе коммерциялық мақсатта пайдаланылмайды."
  },
  {
    title: "3. Тапсырыс рәсімдеу",
    body:
      "Өтінім немесе тапсырыс рәсімдеу кезінде пайдаланушы нақты әрі өзекті деректер ұсынуға міндеттенеді. Орындау мерзімі, қызмет құрамы және түпкілікті шарттар байланыс барысында жеке келісіледі."
  },
  {
    title: "4. Тараптардың жауапкершілігі",
    body:
      "Сайт әкімшілігі тұрақты жұмысты қамтамасыз ету үшін барынша күш салады, бірақ сыртқы факторлардан туындаған техникалық ақаулардың, уақытша қолжетімсіздіктің немесе қателердің мүлде болмауына кепілдік бермейді."
  },
  {
    title: "5. Шарттарды өзгерту",
    body:
      "Қолдану шарттары алдын ала ескертусіз жаңартылуы мүмкін. Өзекті нұсқа осы бетте жарияланады және жарияланған сәттен бастап күшіне енеді."
  }
];

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-[#2b2b31]">
      <LandingHeader />

      <section className="flex-1 px-4 py-8 md:px-6 md:py-10 md:pt-32">
        <div className="mx-auto max-w-[980px]">
          <section className="mt-6 rounded-[32px] border border-[#efe7da] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(24,28,37,0.05)] md:px-10 md:py-10">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#b28a2d]">Құжат</p>
            <h1 className="mt-5 font-['Georgia','Times_New_Roman',serif] text-[2.6rem] leading-[0.95] tracking-[-0.04em] text-[#2a2a2f] md:text-[3.5rem]">
              Қолдану шарттары
            </h1>
            <p className="mt-5 max-w-[42rem] text-[1rem] leading-8 text-[#7e7f84]">
              Бұл шарттар сайтты пайдалану тәртібін және цифрлық шақыру сервисімен өзара әрекеттесу қағидаларын реттейді.
            </p>

            <div className="mt-10 space-y-8">
              {TERMS_SECTIONS.map((section) => (
                <section key={section.title}>
                  <h2 className="font-['Georgia','Times_New_Roman',serif] text-[1.6rem] leading-none tracking-[-0.03em] text-[#2c2d31]">
                    {section.title}
                  </h2>
                  <p className="mt-4 max-w-[46rem] text-[1rem] leading-8 text-[#6f7077]">{section.body}</p>
                </section>
              ))}
            </div>
          </section>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
