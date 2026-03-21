import { Locale } from "./i18n";

export type TemplateTone = "pearl" | "rose" | "sage" | "nocturne";

export type TemplateCard = {
  id: string;
  name: string;
  style: string;
  price: string;
  badge: string;
  tone: TemplateTone;
};

export type EventTemplates = {
  back: string;
  eyebrow: string;
  title: string;
  text: string;
  choose: string;
  templates: TemplateCard[];
};

export const templateCatalog: Record<
  Locale,
  Record<string, Record<string, EventTemplates>>
> = {
  ru: {
    celebration: {
      wedding: {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для свадьбы",
        text: "Подберите стиль, который лучше всего передаст атмосферу вашего свадебного дня.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "w-01", name: "Pearl Ceremony", style: "Minimal classic", price: "7 900 ₸", badge: "Popular", tone: "pearl" },
          { id: "w-02", name: "Rose Promise", style: "Romantic editorial", price: "8 900 ₸", badge: "New", tone: "rose" },
          { id: "w-03", name: "Ivory Evening", style: "Premium luxury", price: "9 900 ₸", badge: "Premium", tone: "nocturne" },
        ],
      },
      nikah: {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для Nikah",
        text: "Спокойные, благородные и деликатные варианты для никаха.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "n-01", name: "Safa", style: "Calm elegance", price: "6 900 ₸", badge: "Classic", tone: "pearl" },
          { id: "n-02", name: "Noor", style: "Refined traditional", price: "7 500 ₸", badge: "Recommended", tone: "sage" },
        ],
      },
      "love-story": {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для Love Story",
        text: "Легкие романтичные форматы для pre-wedding, love story и камерных встреч.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "ls-01", name: "Soft Bloom", style: "Photo-driven", price: "6 500 ₸", badge: "Light", tone: "rose" },
          { id: "ls-02", name: "Letters", style: "Modern story", price: "7 200 ₸", badge: "Modern", tone: "pearl" },
        ],
      },
      anniversary: {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для юбилея",
        text: "Статусные и праздничные макеты для семейного юбилея и большого вечера.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "an-01", name: "Golden Toast", style: "Elegant festive", price: "7 900 ₸", badge: "Popular", tone: "sage" },
          { id: "an-02", name: "Velvet Night", style: "Formal premium", price: "8 400 ₸", badge: "Premium", tone: "nocturne" },
        ],
      },
      birthday: {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для дня рождения",
        text: "Современные, яркие и дружелюбные шаблоны для взрослых и детей.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "bd-01", name: "Confetti", style: "Bright festive", price: "5 900 ₸", badge: "Fun", tone: "rose" },
          { id: "bd-02", name: "Saturday Mood", style: "Clean modern", price: "6 700 ₸", badge: "Modern", tone: "pearl" },
        ],
      },
    },
    uzatu: {
      uzatu: {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для Қыз ұзату",
        text: "Нежные и семейные приглашения с деликатной праздничной подачей.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "u-01", name: "Aru Ana", style: "Soft family", price: "6 900 ₸", badge: "Popular", tone: "rose" },
          { id: "u-02", name: "Golden Step", style: "Traditional modern", price: "7 400 ₸", badge: "Elegant", tone: "gold" as never },
        ],
      },
    },
    family: {
      "besik-toi": {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для Бесік той",
        text: "Теплые семейные шаблоны для уютного праздника и родных гостей.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "b-01", name: "Tender Nest", style: "Warm minimal", price: "5 900 ₸", badge: "Family", tone: "sage" },
          { id: "b-02", name: "Little Star", style: "Soft pastel", price: "6 300 ₸", badge: "New", tone: "pearl" },
        ],
      },
      tusaukeser: {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для Тұсаукесер",
        text: "Аккуратные праздничные макеты для особенного семейного события.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "t-01", name: "First Steps", style: "Festive family", price: "6 100 ₸", badge: "Popular", tone: "rose" },
          { id: "t-02", name: "Silver Ribbon", style: "Modern celebration", price: "6 700 ₸", badge: "Modern", tone: "pearl" },
        ],
      },
      "sundet-toi": {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для Сүндет той",
        text: "Яркие, собранные и дружелюбные шаблоны с семейным настроением.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "s-01", name: "Family Honor", style: "Traditional festive", price: "6 500 ₸", badge: "Recommended", tone: "sage" },
          { id: "s-02", name: "Bright Day", style: "Cheerful classic", price: "6 900 ₸", badge: "Bright", tone: "rose" },
        ],
      },
    },
    holiday: {
      anniversary: {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для юбилея",
        text: "Подборка премиальных приглашений для юбилейного вечера.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "ha-01", name: "Golden Chapter", style: "Elegant classic", price: "7 400 ₸", badge: "Premium", tone: "sage" },
          { id: "ha-02", name: "Milestone", style: "Editorial clean", price: "7 900 ₸", badge: "Popular", tone: "nocturne" },
        ],
      },
      birthday: {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для дня рождения",
        text: "Современные и свежие форматы для birthday party и камерного вечера.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "hb-01", name: "Glow Party", style: "Playful modern", price: "5 700 ₸", badge: "Fun", tone: "rose" },
          { id: "hb-02", name: "Soft Weekend", style: "Minimal light", price: "6 200 ₸", badge: "Clean", tone: "pearl" },
        ],
      },
      corporate: {
        back: "Назад",
        eyebrow: "Шаблоны приглашений",
        title: "Шаблоны для корпоратива",
        text: "Сдержанные и современные шаблоны для делового или командного события.",
        choose: "Выбрать шаблон",
        templates: [
          { id: "hc-01", name: "Black Tie", style: "Corporate premium", price: "7 500 ₸", badge: "Formal", tone: "nocturne" },
          { id: "hc-02", name: "Studio Meet", style: "Minimal clean", price: "6 800 ₸", badge: "Modern", tone: "pearl" },
        ],
      },
    },
  },
  kk: {
    celebration: {
      wedding: {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Үйлену тойына арналған үлгілер",
        text: "Той күніңіздің атмосферасына сай келетін стильді таңдаңыз.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "w-01", name: "Pearl Ceremony", style: "Minimal classic", price: "7 900 ₸", badge: "Popular", tone: "pearl" },
          { id: "w-02", name: "Rose Promise", style: "Romantic editorial", price: "8 900 ₸", badge: "New", tone: "rose" },
          { id: "w-03", name: "Ivory Evening", style: "Premium luxury", price: "9 900 ₸", badge: "Premium", tone: "nocturne" },
        ],
      },
      nikah: {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Nikah үшін үлгілер",
        text: "Никахқа арналған ұстамды, әсем және нәзік нұсқалар.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "n-01", name: "Safa", style: "Calm elegance", price: "6 900 ₸", badge: "Classic", tone: "pearl" },
          { id: "n-02", name: "Noor", style: "Refined traditional", price: "7 500 ₸", badge: "Recommended", tone: "sage" },
        ],
      },
      "love-story": {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Love Story үшін үлгілер",
        text: "Романтикалық кеш пен pre-wedding форматына арналған жеңіл үлгілер.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "ls-01", name: "Soft Bloom", style: "Photo-driven", price: "6 500 ₸", badge: "Light", tone: "rose" },
          { id: "ls-02", name: "Letters", style: "Modern story", price: "7 200 ₸", badge: "Modern", tone: "pearl" },
        ],
      },
      anniversary: {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Мерейтойға арналған үлгілер",
        text: "Отбасылық мерейтой мен үлкен кешке арналған салмақты шақырулар.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "an-01", name: "Golden Toast", style: "Elegant festive", price: "7 900 ₸", badge: "Popular", tone: "sage" },
          { id: "an-02", name: "Velvet Night", style: "Formal premium", price: "8 400 ₸", badge: "Premium", tone: "nocturne" },
        ],
      },
      birthday: {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Туған күнге арналған үлгілер",
        text: "Ересектер мен балаларға арналған заманауи, жарқын форматтар.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "bd-01", name: "Confetti", style: "Bright festive", price: "5 900 ₸", badge: "Fun", tone: "rose" },
          { id: "bd-02", name: "Saturday Mood", style: "Clean modern", price: "6 700 ₸", badge: "Modern", tone: "pearl" },
        ],
      },
    },
    uzatu: {
      uzatu: {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Қыз ұзатуға арналған үлгілер",
        text: "Нәзік, отбасылық және әдемі ұзату шақырулары.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "u-01", name: "Aru Ana", style: "Soft family", price: "6 900 ₸", badge: "Popular", tone: "rose" },
          { id: "u-02", name: "Golden Step", style: "Traditional modern", price: "7 400 ₸", badge: "Elegant", tone: "sage" },
        ],
      },
    },
    family: {
      "besik-toi": {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Бесік тойға арналған үлгілер",
        text: "Жылы және отбасылық көңіл-күй сыйлайтын шақырулар.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "b-01", name: "Tender Nest", style: "Warm minimal", price: "5 900 ₸", badge: "Family", tone: "sage" },
          { id: "b-02", name: "Little Star", style: "Soft pastel", price: "6 300 ₸", badge: "New", tone: "pearl" },
        ],
      },
      tusaukeser: {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Тұсаукесерге арналған үлгілер",
        text: "Ерекше отбасылық сәтке арналған заманауи форматтар.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "t-01", name: "First Steps", style: "Festive family", price: "6 100 ₸", badge: "Popular", tone: "rose" },
          { id: "t-02", name: "Silver Ribbon", style: "Modern celebration", price: "6 700 ₸", badge: "Modern", tone: "pearl" },
        ],
      },
      "sundet-toi": {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Сүндет тойға арналған үлгілер",
        text: "Жарқын әрі жинақы отбасылық мерекеге арналған үлгілер.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "s-01", name: "Family Honor", style: "Traditional festive", price: "6 500 ₸", badge: "Recommended", tone: "sage" },
          { id: "s-02", name: "Bright Day", style: "Cheerful classic", price: "6 900 ₸", badge: "Bright", tone: "rose" },
        ],
      },
    },
    holiday: {
      anniversary: {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Мерейтойға арналған үлгілер",
        text: "Мерейтой кешіне арналған premium форматтар.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "ha-01", name: "Golden Chapter", style: "Elegant classic", price: "7 400 ₸", badge: "Premium", tone: "sage" },
          { id: "ha-02", name: "Milestone", style: "Editorial clean", price: "7 900 ₸", badge: "Popular", tone: "nocturne" },
        ],
      },
      birthday: {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Туған күнге арналған үлгілер",
        text: "Заманауи және көңілді шақыру форматтары.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "hb-01", name: "Glow Party", style: "Playful modern", price: "5 700 ₸", badge: "Fun", tone: "rose" },
          { id: "hb-02", name: "Soft Weekend", style: "Minimal light", price: "6 200 ₸", badge: "Clean", tone: "pearl" },
        ],
      },
      corporate: {
        back: "Артқа",
        eyebrow: "Шақыру үлгілері",
        title: "Корпоративке арналған үлгілер",
        text: "Командалық және ресми іс-шараларға арналған жинақы шаблондар.",
        choose: "Үлгіні таңдау",
        templates: [
          { id: "hc-01", name: "Black Tie", style: "Corporate premium", price: "7 500 ₸", badge: "Formal", tone: "nocturne" },
          { id: "hc-02", name: "Studio Meet", style: "Minimal clean", price: "6 800 ₸", badge: "Modern", tone: "pearl" },
        ],
      },
    },
  },
};

export function getEventTemplates(
  locale: Locale,
  category: string,
  event: string,
) {
  return templateCatalog[locale]?.[category]?.[event] ?? null;
}

export function getTemplateById(
  locale: Locale,
  category: string,
  event: string,
  templateId: string,
) {
  const eventTemplates = getEventTemplates(locale, category, event);

  if (!eventTemplates) {
    return null;
  }

  const template = eventTemplates.templates.find((item) => item.id === templateId);

  if (!template) {
    return null;
  }

  return {
    eventTemplates,
    template,
  };
}
