import React from "react";
import LandingFooter from "../components/landing/landing-footer.jsx";
import LandingHeader from "../components/landing/landing-header.jsx";

const PRIVACY_SECTIONS = [
  {
    title: "1. Қандай деректер жиналады",
    body:
      "Сайтты пайдалану кезінде пайдаланушы байланыс формалары, өтінімдер немесе хат алмасу арқылы өз еркімен ұсынатын деректер жиналуы мүмкін. Бұған аты-жөні, телефон нөмірі, сілтемелер, шақыру мәтіндері және қызмет көрсетуге қажет өзге мәліметтер кіруі мүмкін."
  },
  {
    title: "2. Деректерді өңдеу мақсаты",
    body:
      "Жеке және техникалық деректер тек пайдаланушымен байланысу, өтінімдерді өңдеу, цифрлық шақыруларды дайындау, тапсырысты сүйемелдеу және сервисті жақсарту үшін пайдаланылады."
  },
  {
    title: "3. Үшінші тұлғаларға беру",
    body:
      "Деректер пайдаланушының келісімінсіз үшінші тұлғаларға берілмейді, тек қызмет көрсету үшін қажет болғанда, заңнама талап еткенде немесе қосылған техникалық сервистердің жұмысын қамтамасыз ету үшін ғана қолданылуы мүмкін."
  },
  {
    title: "4. Ақпаратты сақтау және қорғау",
    body:
      "Сайт әкімшілігі ақпараттың жоғалуынан, рұқсатсыз қолжетімділіктен, өзгертілуінен немесе таратылуынан қорғау үшін ақылға қонымды ұйымдастырушылық және техникалық шаралар қабылдайды."
  },
  {
    title: "5. Саясатты жаңарту",
    body:
      "Құпиялылық саясаты алдын ала ескертусіз жаңартылуы мүмкін. Өзекті редакция әрдайым осы бетте жарияланады."
  }
];

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-[#2b2b31]">
      <LandingHeader />

      <section className="flex-1 px-4 py-8 md:px-6 md:py-10 md:pt-32">
        <div className="mx-auto max-w-[980px]">
          <section className="mt-6 rounded-[32px] border border-[#efe7da] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(24,28,37,0.05)] md:px-10 md:py-10">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#b28a2d]">Құжат</p>
            <h1 className="mt-5 font-['Georgia','Times_New_Roman',serif] text-[2.6rem] leading-[0.95] tracking-[-0.04em] text-[#2a2a2f] md:text-[3.5rem]">
              Құпиялылық саясаты
            </h1>
            <p className="mt-5 max-w-[42rem] text-[1rem] leading-8 text-[#7e7f84]">
              Бұл саясат сайтты пайдалану кезінде қандай деректер өңделуі мүмкін екенін және олардың қалай қолданылатынын түсіндіреді.
            </p>

            <div className="mt-10 space-y-8">
              {PRIVACY_SECTIONS.map((section) => (
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
