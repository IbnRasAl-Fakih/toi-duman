import React from "react";
import { Link } from "react-router-dom";
import LandingFooter from "../components/landing/landing-footer.jsx";
import LandingHeader from "../components/landing/landing-header.jsx";

const PRIVACY_SECTIONS = [
  {
    title: "1. Какие данные собираются",
    body:
      "При использовании сайта могут собираться данные, которые пользователь добровольно предоставляет через формы связи, заявки или переписку. Это может включать имя, номер телефона, ссылки, тексты приглашений и иные сведения, необходимые для оказания услуги.",
  },
  {
    title: "2. Цель обработки данных",
    body:
      "Персональные и технические данные используются исключительно для связи с пользователем, обработки заявок, подготовки цифровых приглашений, сопровождения заказа и улучшения качества сервиса.",
  },
  {
    title: "3. Передача третьим лицам",
    body:
      "Данные не передаются третьим лицам без согласия пользователя, за исключением случаев, когда это необходимо для выполнения услуги, предусмотрено законодательством или требуется для работы подключенных технических сервисов.",
  },
  {
    title: "4. Хранение и защита информации",
    body:
      "Администрация сайта принимает разумные организационные и технические меры для защиты информации от утраты, несанкционированного доступа, изменения или распространения.",
  },
  {
    title: "5. Обновление политики",
    body:
      "Политика конфиденциальности может быть обновлена без предварительного уведомления. Актуальная редакция всегда размещается на этой странице.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-[#2b2b31]">
      <LandingHeader />

      <section className="flex-1 px-4 py-8 md:px-6 md:py-10 md:pt-32">
        <div className="mx-auto max-w-[980px]">
          <section className="mt-6 rounded-[32px] border border-[#efe7da] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(24,28,37,0.05)] md:px-10 md:py-10">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#b28a2d]">Документ</p>
            <h1 className="mt-5 font-['Georgia','Times_New_Roman',serif] text-[2.6rem] leading-[0.95] tracking-[-0.04em] text-[#2a2a2f] md:text-[3.5rem]">
              Политика конфиденциальности
            </h1>
            <p className="mt-5 max-w-[42rem] text-[1rem] leading-8 text-[#7e7f84]">
              Настоящая политика описывает, какие данные могут обрабатываться при использовании сайта и в каком порядке они используются.
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
