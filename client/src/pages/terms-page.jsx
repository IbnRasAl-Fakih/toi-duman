import React from "react";
import { Link } from "react-router-dom";
import LandingFooter from "../components/landing/landing-footer.jsx";
import LandingHeader from "../components/landing/landing-header.jsx";

const TERMS_SECTIONS = [
  {
    title: "1. Общие положения",
    body:
      "Данный сайт предоставляет информацию о цифровых приглашениях и связанных услугах. Используя сайт, пользователь подтверждает, что ознакомился с настоящими условиями пользования и принимает их.",
  },
  {
    title: "2. Использование материалов",
    body:
      "Все тексты, изображения, элементы интерфейса и иные материалы сайта используются исключительно в информационных целях и не могут копироваться, распространяться или использоваться в коммерческих целях без предварительного согласия владельца сайта.",
  },
  {
    title: "3. Оформление заказа",
    body:
      "При оформлении заявки или заказа пользователь обязуется предоставлять корректные и актуальные данные. Сроки выполнения, состав услуг и итоговые условия согласовываются отдельно в процессе коммуникации.",
  },
  {
    title: "4. Ответственность сторон",
    body:
      "Администрация сайта прилагает разумные усилия для обеспечения стабильной работы сайта, но не гарантирует полное отсутствие технических сбоев, временной недоступности или ошибок, вызванных внешними факторами.",
  },
  {
    title: "5. Изменение условий",
    body:
      "Условия пользования могут обновляться без предварительного уведомления. Актуальная версия публикуется на этой странице и вступает в силу с момента размещения.",
  },
];

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-[#2b2b31]">
      <LandingHeader />

      <section className="flex-1 px-4 py-8 md:px-6 md:py-10 md:pt-32">
        <div className="mx-auto max-w-[980px]">
          <section className="mt-6 rounded-[32px] border border-[#efe7da] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(24,28,37,0.05)] md:px-10 md:py-10">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#b28a2d]">Документ</p>
            <h1 className="mt-5 font-['Georgia','Times_New_Roman',serif] text-[2.6rem] leading-[0.95] tracking-[-0.04em] text-[#2a2a2f] md:text-[3.5rem]">
              Условия пользования
            </h1>
            <p className="mt-5 max-w-[42rem] text-[1rem] leading-8 text-[#7e7f84]">
              Настоящие условия регулируют порядок использования сайта и взаимодействия с сервисом цифровых приглашений.
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
