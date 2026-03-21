import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, Locale } from "@/lib/i18n";
import { getTemplateById } from "@/lib/templateCatalog";

type TemplatePreviewPageProps = {
  params: Promise<{
    locale: string;
    category: string;
    event: string;
    templateId: string;
  }>;
};

function getPreviewContent(locale: Locale, event: string) {
  const contentByEvent = {
    wedding: {
      ru: {
        names: "Aruzhan & Dias",
        occasion: "С радостью приглашаем вас на наше торжество",
        date: "25 июля 2026",
        time: "17:00",
        location: "Royal Tulip, Алматы",
      },
      kk: {
        names: "Aruzhan & Dias",
        occasion: "Сіздерді біздің салтанатты кешімізге шақырамыз",
        date: "25 шілде 2026",
        time: "17:00",
        location: "Royal Tulip, Алматы",
      },
    },
    nikah: {
      ru: {
        names: "Amina & Nurzhan",
        occasion: "Приглашаем разделить с нами день никаха",
        date: "14 августа 2026",
        time: "15:00",
        location: "Grand Hall, Астана",
      },
      kk: {
        names: "Amina & Nurzhan",
        occasion: "Никах күніне ортақтасуға шақырамыз",
        date: "14 тамыз 2026",
        time: "15:00",
        location: "Grand Hall, Астана",
      },
    },
    "love-story": {
      ru: {
        names: "Madina & Arsen",
        occasion: "Love Story evening",
        date: "9 июня 2026",
        time: "19:00",
        location: "Sky Lounge, Алматы",
      },
      kk: {
        names: "Madina & Arsen",
        occasion: "Love Story кеші",
        date: "9 маусым 2026",
        time: "19:00",
        location: "Sky Lounge, Алматы",
      },
    },
    anniversary: {
      ru: {
        names: "Семья Абдрахмановых",
        occasion: "Приглашаем на юбилейный вечер",
        date: "12 сентября 2026",
        time: "18:30",
        location: "Imperial Hall, Шымкент",
      },
      kk: {
        names: "Әбдірахмановтар отбасы",
        occasion: "Мерейтой кешіне шақырамыз",
        date: "12 қыркүйек 2026",
        time: "18:30",
        location: "Imperial Hall, Шымкент",
      },
    },
    birthday: {
      ru: {
        names: "Aisha's Birthday",
        occasion: "Праздничный ужин и торт с близкими",
        date: "3 мая 2026",
        time: "16:00",
        location: "Villa Verde, Алматы",
      },
      kk: {
        names: "Aisha's Birthday",
        occasion: "Жақындармен бірге мерекелік кеш",
        date: "3 мамыр 2026",
        time: "16:00",
        location: "Villa Verde, Алматы",
      },
    },
    uzatu: {
      ru: {
        names: "Akerke Uzatu",
        occasion: "С любовью приглашаем на кыз узату",
        date: "6 августа 2026",
        time: "18:00",
        location: "Qonaq Sarai, Тараз",
      },
      kk: {
        names: "Akerke Uzatu",
        occasion: "Қыз ұзату кешіне шақырамыз",
        date: "6 тамыз 2026",
        time: "18:00",
        location: "Qonaq Sarai, Тараз",
      },
    },
    "besik-toi": {
      ru: {
        names: "Бесік той Айлин",
        occasion: "Теплый семейный праздник в кругу близких",
        date: "20 апреля 2026",
        time: "13:00",
        location: "Family House, Алматы",
      },
      kk: {
        names: "Айлиннің бесік тойы",
        occasion: "Жылы отбасылық мерекеге шақырамыз",
        date: "20 сәуір 2026",
        time: "13:00",
        location: "Family House, Алматы",
      },
    },
    tusaukeser: {
      ru: {
        names: "Tұсаукесер Алима",
        occasion: "Разделите с нами первый важный шаг малыша",
        date: "11 июля 2026",
        time: "14:00",
        location: "Dostar Hall, Алматы",
      },
      kk: {
        names: "Әлимнің тұсаукесері",
        occasion: "Балапанның алғашқы қадамына куә болыңыздар",
        date: "11 шілде 2026",
        time: "14:00",
        location: "Dostar Hall, Алматы",
      },
    },
    "sundet-toi": {
      ru: {
        names: "Сүндет той Амир",
        occasion: "Приглашаем на важное семейное торжество",
        date: "18 октября 2026",
        time: "15:00",
        location: "Tulpar Hall, Қарағанды",
      },
      kk: {
        names: "Амирдің сүндет тойы",
        occasion: "Маңызды отбасылық тойымызға шақырамыз",
        date: "18 қазан 2026",
        time: "15:00",
        location: "Tulpar Hall, Қарағанды",
      },
    },
    corporate: {
      ru: {
        names: "Annual Team Evening",
        occasion: "Закрытый вечер для команды и партнеров",
        date: "16 декабря 2026",
        time: "19:30",
        location: "The Veil, Алматы",
      },
      kk: {
        names: "Annual Team Evening",
        occasion: "Команда мен серіктестерге арналған жабық кеш",
        date: "16 желтоқсан 2026",
        time: "19:30",
        location: "The Veil, Алматы",
      },
    },
  } as const;

  return contentByEvent[event as keyof typeof contentByEvent]?.[locale] ?? {
    names: "Toi Duman Event",
    occasion: locale === "ru" ? "Ваше приглашение" : "Сіздің шақыруыңыз",
    date: locale === "ru" ? "Дата будет здесь" : "Күні осында болады",
    time: "18:00",
    location: locale === "ru" ? "Локация мероприятия" : "Іс-шара локациясы",
  };
}

function getUiText(locale: Locale) {
  if (locale === "kk") {
    return {
      back: "Үлгілерге оралу",
      eyebrow: "Шақыруды алдын ала қарау",
      title: "Таңдалған үлгінің толық көрінісі",
      text: "Клиент дәл осы экранда болашақ шақыруының стилін, мәтіннің орналасуын және жалпы атмосферасын көре алады.",
      summary: "Үлгі туралы",
      style: "Стиль",
      price: "Бағасы",
      badge: "Белгі",
      choose: "Осы үлгіні таңдау",
      date: "Күні",
      time: "Уақыты",
      location: "Өтетін орны",
    };
  }

  return {
    back: "Назад к шаблонам",
    eyebrow: "Предпросмотр приглашения",
    title: "Полный вид выбранного шаблона",
    text: "На этом экране клиент уже видит, как будет выглядеть само приглашение: композицию, настроение, иерархию текста и общий стиль.",
    summary: "О шаблоне",
    style: "Стиль",
    price: "Цена",
    badge: "Бейдж",
    choose: "Выбрать этот шаблон",
    date: "Дата",
    time: "Время",
    location: "Локация",
  };
}

export default async function TemplatePreviewPage({
  params,
}: TemplatePreviewPageProps) {
  const { locale, category, event, templateId } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const templateResult = getTemplateById(locale, category, event, templateId);

  if (!templateResult) {
    notFound();
  }

  const { eventTemplates, template } = templateResult;
  const preview = getPreviewContent(locale, event);
  const ui = getUiText(locale);

  return (
    <section className="template-preview-page">
      <div className="container">
        <Link
          className="template-preview-page__back"
          href={`/${locale}/create/${category}/${event}`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m15 6-6 6 6 6" />
          </svg>
          {ui.back}
        </Link>

        <div className="template-preview-page__hero">
          <div>
            <p className="eyebrow">{ui.eyebrow}</p>
            <h1>{template.name}</h1>
            <p>{ui.text}</p>
          </div>
          <Link
            className="template-preview-page__choose"
            href={`/${locale}/login`}
          >
            {ui.choose}
          </Link>
        </div>

        <div className="template-preview-layout">
          <article className={`invitation-preview invitation-preview--${template.tone}`}>
            <span className="invitation-preview__badge">{eventTemplates.eyebrow}</span>
            <div className="invitation-preview__frame">
              <div className="invitation-preview__halo" />
              <p className="invitation-preview__occasion">{preview.occasion}</p>
              <h2>{preview.names}</h2>
              <div className="invitation-preview__divider" />
              <dl className="invitation-preview__details">
                <div>
                  <dt>{ui.date}</dt>
                  <dd>{preview.date}</dd>
                </div>
                <div>
                  <dt>{ui.time}</dt>
                  <dd>{preview.time}</dd>
                </div>
                <div>
                  <dt>{ui.location}</dt>
                  <dd>{preview.location}</dd>
                </div>
              </dl>
            </div>
          </article>

          <aside className="template-summary">
            <p className="template-summary__eyebrow">{ui.summary}</p>
            <h2>{eventTemplates.title}</h2>
            <p>{eventTemplates.text}</p>

            <div className="template-summary__meta">
              <div>
                <span>{ui.style}</span>
                <strong>{template.style}</strong>
              </div>
              <div>
                <span>{ui.price}</span>
                <strong>{template.price}</strong>
              </div>
              <div>
                <span>{ui.badge}</span>
                <strong>{template.badge}</strong>
              </div>
            </div>

            <Link className="template-summary__button" href={`/${locale}/login`}>
              {ui.choose}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
