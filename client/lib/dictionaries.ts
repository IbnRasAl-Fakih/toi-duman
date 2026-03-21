import { Locale } from "./i18n";

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    invitations: string;
    create: string;
    quickOrder: string;
    login: string;
    profile: string;
    register: string;
    russian: string;
    kazakh: string;
  };
  home: {
    eyebrow: string;
    title: string;
    text: string;
    choosePlan: string;
    viewFeatures: string;
    features: string[];
    sampleBadge: string;
    sampleDate: string;
    sampleStatus: string;
    sampleMap: string;
    whyEyebrow: string;
    whyTitle: string;
    whyCards: { title: string; text: string }[];
    includeEyebrow: string;
    includeTitle: string;
    includeText: string;
    includeItems: string[];
    pricingEyebrow: string;
    pricingTitle: string;
    packages: { title: string; price: string; text: string; featured?: boolean }[];
    chooseButton: string;
    stats: { value: string; label: string }[];
  };
  login: {
    eyebrow: string;
    title: string;
    text: string;
    userId: string;
    password: string;
    userIdPlaceholder: string;
    passwordPlaceholder: string;
    button: string;
    loading: string;
    error: string;
    registerLink: string;
  };
  register: {
    eyebrow: string;
    title: string;
    text: string;
    roleLabel: string;
    roleValue: string;
    button: string;
    loading: string;
    error: string;
    successTitle: string;
    successText: string;
    createdId: string;
    createdPassword: string;
    loginLink: string;
  };
  invitationsPage: {
    back: string;
    eyebrow: string;
    title: string;
    text: string;
    paidSection: string;
    unpaidSection: string;
    statusPaid: string;
    statusUnpaid: string;
    paidAt: string;
    createdAt: string;
    visibleFor: string;
    emptyPaid: string;
    emptyUnpaid: string;
  };
  profilePage: {
    back: string;
    eyebrow: string;
    title: string;
    text: string;
    userId: string;
    role: string;
    email: string;
    emailVerified: string;
    createdAt: string;
    updatedAt: string;
    emptyEmail: string;
    verified: string;
    notVerified: string;
    logout: string;
  };
  create: {
    back: string;
    eyebrow: string;
    title: string;
    text: string;
    choose: string;
    categories: {
      slug: string;
      emoji: string;
      title: string;
      count: string;
      description: string;
      tone: "rose" | "violet" | "emerald" | "gold";
    }[];
    categoryPages: Record<
      string,
      {
        back: string;
        title: string;
        text: string;
        sections: {
          title: string;
          items: {
            slug: string;
            emoji: string;
            title: string;
            count: string;
            description: string;
          }[];
        }[];
        helpTitle: string;
        helpText: string;
        helpButton: string;
      }
    >;
  };
  notFound: {
    title: string;
    text: string;
    back: string;
  };
  footer: {
    contactTitle: string;
    rights: string;
    instagram: string;
    whatsapp: string;
    tiktok: string;
    threads: string;
    madeBy: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ru: {
    metadata: {
      title: "Toi Duman",
      description: "Онлайн-приглашения на свадьбу и мероприятия",
    },
    nav: {
      home: "Главная",
      invitations: "Мои пригласительные",
      create: "Создать",
      quickOrder: "Заказать в один клик",
      login: "Войти",
      profile: "Профиль",
      register: "Регистрация в один клик",
      russian: "RU",
      kazakh: "KZ",
    },
    home: {
      eyebrow: "Премиальные онлайн-приглашения",
      title: "Создавайте красивые сайты-приглашения для свадьбы и торжеств",
      text: "Toi Duman помогает собрать дату, адрес, программу вечера и ответ гостей в одном стильном приглашении.",
      choosePlan: "Выбрать тариф",
      viewFeatures: "Посмотреть возможности",
      features: [
        "Элегантные свадебные шаблоны",
        "Музыка, карта и таймлайн в одном сайте",
        "RSVP и список гостей в удобном формате",
      ],
      sampleBadge: "Свадебный сайт",
      sampleDate: "25 июля 2026 • Almaty",
      sampleStatus: "RSVP открыт",
      sampleMap: "Карта + таймлайн",
      whyEyebrow: "Почему Toi Duman",
      whyTitle: "Вся информация о мероприятии в одном красивом экране",
      whyCards: [
        {
          title: "Премиальный дизайн",
          text: "Светлая эстетика, мягкие тени, свадебная подача и акцент на фотографии пары.",
        },
        {
          title: "Удобно для гостей",
          text: "Гости видят дату, адрес, карту, программу вечера и могут сразу подтвердить присутствие.",
        },
        {
          title: "Быстрый запуск",
          text: "Шаблон наполняется за несколько минут, а ссылку можно сразу отправлять в WhatsApp.",
        },
      ],
      includeEyebrow: "Что можно разместить",
      includeTitle: "Дата, локация, программа и ответ гостей",
      includeText:
        "Такой формат удобнее обычной открытки: ничего не теряется, ссылка открывается на телефоне, а изменения можно обновить в одном месте.",
      includeItems: [
        "Баннер с именами пары",
        "Программа вечера и dress code",
        "Форма подтверждения участия",
      ],
      pricingEyebrow: "Тарифы",
      pricingTitle: "Выбери формат приглашения под свой праздник",
      packages: [
        {
          title: "Lite",
          price: "4 900 ₸",
          text: "Аккуратный сайт-приглашение с основной информацией о торжестве.",
        },
        {
          title: "Premium",
          price: "7 900 ₸",
          text: "Музыка, таймер, карта, программа вечера и форма подтверждения.",
          featured: true,
        },
        {
          title: "Signature",
          price: "12 900 ₸",
          text: "Индивидуальный стиль, фотоистория пары и расширенный RSVP.",
        },
      ],
      chooseButton: "Выбрать",
      stats: [
        { value: "120+", label: "готовых шаблонов" },
        { value: "5 мин", label: "на создание приглашения" },
        { value: "24/7", label: "доступ с любого устройства" },
      ],
    },
    login: {
      eyebrow: "",
      title: "",
      text: "Войди чтобы управлять заказами и приглашениями",
      userId: "User ID или Email",
      password: "Пароль",
      userIdPlaceholder: "cli-100001",
      passwordPlaceholder: "Введите пароль",
      button: "Войти",
      loading: "Входим...",
      error: "Не удалось выполнить вход. Проверьте User ID, email или пароль.",
      registerLink: "Нет аккаунта? Зарегистрироваться",
    },
    register: {
      eyebrow: "Регистрация",
      title: "Создайте аккаунт Toi Duman",
      text: "Мы создадим для вас клиентский аккаунт и сразу покажем user ID и временный пароль для входа.",
      roleLabel: "Тип аккаунта",
      roleValue: "Клиент",
      button: "Создать аккаунт",
      loading: "Создаем аккаунт...",
      error: "Не удалось создать аккаунт. Попробуйте еще раз.",
      successTitle: "Аккаунт создан",
      successText: "Сохраните эти данные. Они понадобятся для входа в личный кабинет.",
      createdId: "Ваш user ID",
      createdPassword: "Ваш пароль",
      loginLink: "Перейти ко входу",
    },
    invitationsPage: {
      back: "Назад",
      eyebrow: "Мои пригласительные",
      title: "Ваши заказы и статусы оплаты",
      text: "Здесь отображаются оплаченные приглашения и неоплаченные заказы, которые еще активны в течение 7 дней.",
      paidSection: "Оплаченные",
      unpaidSection: "Не оплачено",
      statusPaid: "Оплачено",
      statusUnpaid: "Ожидает оплату",
      paidAt: "Оплачено",
      createdAt: "Создано",
      visibleFor: "Будет отображаться еще",
      emptyPaid: "Пока нет оплаченных приглашений.",
      emptyUnpaid: "Нет неоплаченных заказов за последние 7 дней.",
    },
    profilePage: {
      back: "Назад",
      eyebrow: "Профиль клиента",
      title: "Ваш профиль",
      text: "Здесь собраны основные данные вашего аккаунта Toi Duman.",
      userId: "User ID",
      role: "Роль",
      email: "Email",
      emailVerified: "Подтверждение email",
      createdAt: "Аккаунт создан",
      updatedAt: "Последнее обновление",
      emptyEmail: "Не указан",
      verified: "Подтвержден",
      notVerified: "Не подтвержден",
      logout: "Выйти",
    },
    create: {
      back: "Назад",
      eyebrow: "Создание приглашения",
      title: "Выберите формат мероприятия для будущего сайта-приглашения",
      text: "Подберите категорию, чтобы перейти к подходящим шаблонам и стилю оформления.",
      choose: "Выбрать",
      categories: [
        {
          slug: "celebration",
          emoji: "💍",
          title: "Торжество",
          count: "9 шаблонов",
          description: "Свадьба, nikah, love story и торжественные семейные события.",
          tone: "rose",
        },
        {
          slug: "uzatu",
          emoji: "👰",
          title: "Ұзату",
          count: "4 шаблона",
          description: "Нежные и семейные приглашения на кыз узату и прощальный вечер.",
          tone: "gold",
        },
        {
          slug: "family",
          emoji: "👶",
          title: "Семейный той",
          count: "6 шаблонов",
          description: "Бесік той, тұсаукесер, сүндет той и теплые семейные события.",
          tone: "emerald",
        },
        {
          slug: "holiday",
          emoji: "🎉",
          title: "Праздник",
          count: "7 шаблонов",
          description: "Юбилей, день рождения, корпоратив и тематические вечеринки.",
          tone: "violet",
        },
      ],
      categoryPages: {
        celebration: {
          back: "Назад",
          title: "Тип мероприятия",
          text: "Выберите подходящее торжество, чтобы открыть релевантные шаблоны приглашений.",
          sections: [
            {
              title: "Торжество",
              items: [
                {
                  slug: "wedding",
                  emoji: "💍",
                  title: "Свадьба",
                  count: "9 шаблонов",
                  description: "Классические и современные свадебные приглашения.",
                },
                {
                  slug: "nikah",
                  emoji: "🕊️",
                  title: "Nikah",
                  count: "4 шаблона",
                  description: "Сдержанные и благородные варианты для никаха.",
                },
                {
                  slug: "love-story",
                  emoji: "💌",
                  title: "Love Story",
                  count: "3 шаблона",
                  description: "История пары, pre-wedding и романтичные форматы.",
                },
              ],
            },
            {
              title: "Праздники",
              items: [
                {
                  slug: "anniversary",
                  emoji: "🎂",
                  title: "Юбилей",
                  count: "5 шаблонов",
                  description: "Элегантные макеты для семейных и статусных юбилеев.",
                },
                {
                  slug: "birthday",
                  emoji: "🎁",
                  title: "День рождения",
                  count: "6 шаблонов",
                  description: "Современные приглашения для взрослых и детей.",
                },
              ],
            },
          ],
          helpTitle: "Не нашли нужный формат?",
          helpText: "Менеджер поможет подобрать подходящий шаблон и стиль приглашения под ваше событие.",
          helpButton: "Написать менеджеру",
        },
        uzatu: {
          back: "Назад",
          title: "Тип мероприятия",
          text: "Выберите формат семейного торжества для приглашения.",
          sections: [
            {
              title: "Ұзату",
              items: [
                {
                  slug: "uzatu",
                  emoji: "👰",
                  title: "Қыз ұзату",
                  count: "4 шаблона",
                  description: "Нежные семейные приглашения для вечера ұзату.",
                },
              ],
            },
          ],
          helpTitle: "Нужен особый формат?",
          helpText: "Напишите менеджеру, и мы подберем шаблон вручную.",
          helpButton: "Написать менеджеру",
        },
        family: {
          back: "Назад",
          title: "Тип мероприятия",
          text: "Выберите семейное событие для будущего сайта-приглашения.",
          sections: [
            {
              title: "Семейный той",
              items: [
                {
                  slug: "besik-toi",
                  emoji: "🍼",
                  title: "Бесік той",
                  count: "3 шаблона",
                  description: "Теплые и светлые приглашения для семейного праздника.",
                },
                {
                  slug: "tusaukeser",
                  emoji: "👟",
                  title: "Тұсаукесер",
                  count: "4 шаблона",
                  description: "Современные макеты для торжества тұсаукесер.",
                },
                {
                  slug: "sundet-toi",
                  emoji: "👦",
                  title: "Сүндет той",
                  count: "3 шаблона",
                  description: "Яркие и праздничные шаблоны с семейным характером.",
                },
              ],
            },
          ],
          helpTitle: "Нужен другой семейный формат?",
          helpText: "Менеджер поможет подобрать вариант именно под ваш праздник.",
          helpButton: "Написать менеджеру",
        },
        holiday: {
          back: "Назад",
          title: "Тип мероприятия",
          text: "Подберите формат для юбилея, дня рождения или праздничного вечера.",
          sections: [
            {
              title: "Праздники",
              items: [
                {
                  slug: "anniversary",
                  emoji: "🎂",
                  title: "Юбилей",
                  count: "5 шаблонов",
                  description: "Сдержанные и статусные приглашения на юбилей.",
                },
                {
                  slug: "birthday",
                  emoji: "🎁",
                  title: "День рождения",
                  count: "6 шаблонов",
                  description: "Легкие и современные приглашения на birthday event.",
                },
                {
                  slug: "corporate",
                  emoji: "🏢",
                  title: "Корпоратив",
                  count: "3 шаблона",
                  description: "Минималистичные шаблоны для деловых и командных событий.",
                },
              ],
            },
          ],
          helpTitle: "Не нашли категорию?",
          helpText: "Наш менеджер поможет подобрать подходящий шаблон для праздника.",
          helpButton: "Написать менеджеру",
        },
      },
    },
    notFound: {
      title: "Страница не найдена",
      text: "Возможно, ссылка устарела или страница была перемещена. Вернемся на главную.",
      back: "На главную",
    },
    footer: {
      contactTitle: "Контакты",
      rights: "Все права защищены.",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      tiktok: "TikTok",
      threads: "Threads",
      madeBy: "",
    },
  },
  kk: {
    metadata: {
      title: "Toi Duman",
      description: "Той мен үйлену тойына арналған онлайн шақыру сайттары",
    },
    nav: {
      home: "Басты бет",
      invitations: "Менің шақыруларым",
      create: "Жасау",
      quickOrder: "Бір шерту арқылы тапсырыс",
      login: "Кіру",
      profile: "Профиль",
      register: "Бір шерту арқылы тіркелу",
      russian: "RU",
      kazakh: "KZ",
    },
    home: {
      eyebrow: "Премиум онлайн-шақырулар",
      title: "Үйлену тойы мен мерекелерге арналған әдемі шақыру сайттарын жасаңыз",
      text: "Toi Duman күнін, мекенжайын, кеш бағдарламасын және қонақтардың жауабын бір стильді шақыруға жинауға көмектеседі.",
      choosePlan: "Тарифті таңдау",
      viewFeatures: "Мүмкіндіктерді көру",
      features: [
        "Талғампаз үйлену тойы үлгілері",
        "Музыка, карта және таймлайн бір сайтта",
        "RSVP және қонақтар тізімі ыңғайлы форматта",
      ],
      sampleBadge: "Үйлену тойы сайты",
      sampleDate: "25 шілде 2026 • Almaty",
      sampleStatus: "RSVP ашық",
      sampleMap: "Карта + таймлайн",
      whyEyebrow: "Неге Toi Duman",
      whyTitle: "Іс-шара туралы барлық ақпарат бір әдемі экранда",
      whyCards: [
        {
          title: "Премиум дизайн",
          text: "Жарық эстетика, жұмсақ көлеңкелер, үйлену тойына сай стиль және жұптың фотосына акцент.",
        },
        {
          title: "Қонақтарға ыңғайлы",
          text: "Қонақтар күнін, мекенжайын, картаны, кеш бағдарламасын көреді және бірден қатысуын растай алады.",
        },
        {
          title: "Жылдам іске қосу",
          text: "Үлгіні бірнеше минутта толтырып, сілтемені бірден WhatsApp арқылы жіберуге болады.",
        },
      ],
      includeEyebrow: "Не орналастыруға болады",
      includeTitle: "Күні, мекенжайы, бағдарлама және қонақтардың жауабы",
      includeText:
        "Мұндай формат қарапайым ашықхаттан ыңғайлырақ: ештеңе жоғалмайды, сілтеме телефонда ашылады, ал өзгерістерді бір жерден жаңартуға болады.",
      includeItems: [
        "Жұптың есімдері бар баннер",
        "Кеш бағдарламасы мен dress code",
        "Қатысуды растау формасы",
      ],
      pricingEyebrow: "Тарифтер",
      pricingTitle: "Мерекеңізге сай шақыру форматын таңдаңыз",
      packages: [
        {
          title: "Lite",
          price: "4 900 ₸",
          text: "Той туралы негізгі ақпараты бар ықшам шақыру сайты.",
        },
        {
          title: "Premium",
          price: "7 900 ₸",
          text: "Музыка, таймер, карта, кеш бағдарламасы және қатысуды растау формасы.",
          featured: true,
        },
        {
          title: "Signature",
          price: "12 900 ₸",
          text: "Жеке стиль, жұптың фотооқиғасы және кеңейтілген RSVP.",
        },
      ],
      chooseButton: "Таңдау",
      stats: [
        { value: "120+", label: "дайын үлгі" },
        { value: "5 мин", label: "шақыру жасауға" },
        { value: "24/7", label: "кез келген құрылғыдан қолжетімді" },
      ],
    },
    login: {
      eyebrow: "",
      title: "",
      text: "Тапсырыстар мен шақыруларды басқару үшін кіріңіз",
      userId: "User ID немесе Email",
      password: "Құпиясөз",
      userIdPlaceholder: "cli-100001",
      passwordPlaceholder: "Құпиясөзді енгізіңіз",
      button: "Кіру",
      loading: "Кіріп жатыр...",
      error: "Кіру мүмкін болмады. User ID, email немесе құпиясөзді тексеріңіз.",
      registerLink: "Аккаунтыңыз жоқ па? Тіркелу",
    },
    register: {
      eyebrow: "Тіркелу",
      title: "Toi Duman аккаунтын жасаңыз",
      text: "Біз сізге клиенттік аккаунт жасап, бірден кіруге арналған user ID мен уақытша құпиясөзді көрсетеміз.",
      roleLabel: "Аккаунт түрі",
      roleValue: "Клиент",
      button: "Аккаунт жасау",
      loading: "Аккаунт жасалып жатыр...",
      error: "Аккаунт жасау мүмкін болмады. Қайталап көріңіз.",
      successTitle: "Аккаунт жасалды",
      successText: "Осы деректерді сақтап қойыңыз. Олар жеке кабинетке кіруге керек болады.",
      createdId: "Сіздің user ID",
      createdPassword: "Сіздің құпиясөзіңіз",
      loginLink: "Кіру бетіне өту",
    },
    invitationsPage: {
      back: "Артқа",
      eyebrow: "Менің шақыруларым",
      title: "Тапсырыстарыңыз бен төлем мәртебесі",
      text: "Мұнда төленген шақырулар және соңғы 7 күн ішінде белсенді тұрған төленбеген тапсырыстар көрсетіледі.",
      paidSection: "Төленген",
      unpaidSection: "Төленбеген",
      statusPaid: "Төленді",
      statusUnpaid: "Төлем күтілуде",
      paidAt: "Төленген күні",
      createdAt: "Құрылған күні",
      visibleFor: "Тағы көрсетіледі",
      emptyPaid: "Әзірге төленген шақырулар жоқ.",
      emptyUnpaid: "Соңғы 7 күнде төленбеген тапсырыс жоқ.",
    },
    profilePage: {
      back: "Артқа",
      eyebrow: "Клиент профилі",
      title: "Сіздің профиліңіз",
      text: "Мұнда Toi Duman аккаунтыңыздың негізгі деректері көрсетіледі.",
      userId: "User ID",
      role: "Рөлі",
      email: "Email",
      emailVerified: "Email растауы",
      createdAt: "Аккаунт құрылған күні",
      updatedAt: "Соңғы жаңарту",
      emptyEmail: "Көрсетілмеген",
      verified: "Расталған",
      notVerified: "Расталмаған",
      logout: "Шығу",
    },
    create: {
      back: "Артқа",
      eyebrow: "Шақыру жасау",
      title: "Болашақ шақыру сайты үшін іс-шара форматын таңдаңыз",
      text: "Сәйкес шаблондар мен безендіру стиліне өту үшін санатты таңдаңыз.",
      choose: "Таңдау",
      categories: [
        {
          slug: "celebration",
          emoji: "💍",
          title: "Той салтанаты",
          count: "9 үлгі",
          description: "Үйлену тойы, nikah, love story және салтанатты отбасылық кештер.",
          tone: "rose",
        },
        {
          slug: "uzatu",
          emoji: "👰",
          title: "Ұзату",
          count: "4 үлгі",
          description: "Қыз ұзату мен отбасылық кешке арналған нәзік шақырулар.",
          tone: "gold",
        },
        {
          slug: "family",
          emoji: "👶",
          title: "Отбасылық той",
          count: "6 үлгі",
          description: "Бесік той, тұсаукесер, сүндет той және жылы отбасылық сәттер.",
          tone: "emerald",
        },
        {
          slug: "holiday",
          emoji: "🎉",
          title: "Мерекелік кеш",
          count: "7 үлгі",
          description: "Мерейтой, туған күн, корпоратив және тақырыптық кештер.",
          tone: "violet",
        },
      ],
      categoryPages: {
        celebration: {
          back: "Артқа",
          title: "Іс-шара түрі",
          text: "Шақыру үлгілерін көру үшін өзіңізге сәйкес той түрін таңдаңыз.",
          sections: [
            {
              title: "Той салтанаты",
              items: [
                {
                  slug: "wedding",
                  emoji: "💍",
                  title: "Үйлену тойы",
                  count: "9 үлгі",
                  description: "Классикалық және заманауи үйлену тойына арналған үлгілер.",
                },
                {
                  slug: "nikah",
                  emoji: "🕊️",
                  title: "Nikah",
                  count: "4 үлгі",
                  description: "Никахқа арналған ұстамды және әсем форматтар.",
                },
                {
                  slug: "love-story",
                  emoji: "💌",
                  title: "Love Story",
                  count: "3 үлгі",
                  description: "Жұп тарихына арналған романтикалық шақыру нұсқалары.",
                },
              ],
            },
            {
              title: "Мерекелер",
              items: [
                {
                  slug: "anniversary",
                  emoji: "🎂",
                  title: "Мерейтой",
                  count: "5 үлгі",
                  description: "Отбасылық және мәртебелі мерейтойларға арналған үлгілер.",
                },
                {
                  slug: "birthday",
                  emoji: "🎁",
                  title: "Туған күн",
                  count: "6 үлгі",
                  description: "Ересектер мен балаларға арналған заманауи шақырулар.",
                },
              ],
            },
          ],
          helpTitle: "Қажетті формат табылмады ма?",
          helpText: "Менеджер сіздің іс-шараңызға сай үлгі мен стильді таңдауға көмектеседі.",
          helpButton: "Менеджерге жазу",
        },
        uzatu: {
          back: "Артқа",
          title: "Іс-шара түрі",
          text: "Шақыруға сәйкес отбасылық мереке форматын таңдаңыз.",
          sections: [
            {
              title: "Ұзату",
              items: [
                {
                  slug: "uzatu",
                  emoji: "👰",
                  title: "Қыз ұзату",
                  count: "4 үлгі",
                  description: "Қыз ұзатуға арналған нәзік және отбасылық шақырулар.",
                },
              ],
            },
          ],
          helpTitle: "Ерекше формат керек пе?",
          helpText: "Менеджерге жазыңыз, біз шаблонды қолмен таңдап береміз.",
          helpButton: "Менеджерге жазу",
        },
        family: {
          back: "Артқа",
          title: "Іс-шара түрі",
          text: "Болашақ шақыру сайты үшін отбасылық мерекені таңдаңыз.",
          sections: [
            {
              title: "Отбасылық той",
              items: [
                {
                  slug: "besik-toi",
                  emoji: "🍼",
                  title: "Бесік той",
                  count: "3 үлгі",
                  description: "Жылы әрі жарық отбасылық шақыру форматтары.",
                },
                {
                  slug: "tusaukeser",
                  emoji: "👟",
                  title: "Тұсаукесер",
                  count: "4 үлгі",
                  description: "Тұсаукесерге арналған заманауи шақыру макеттері.",
                },
                {
                  slug: "sundet-toi",
                  emoji: "👦",
                  title: "Сүндет той",
                  count: "3 үлгі",
                  description: "Отбасылық көңіл-күйі бар жарқын мерекелік үлгілер.",
                },
              ],
            },
          ],
          helpTitle: "Басқа формат керек пе?",
          helpText: "Менеджер сіздің мерекеңізге лайық нұсқаны таңдауға көмектеседі.",
          helpButton: "Менеджерге жазу",
        },
        holiday: {
          back: "Артқа",
          title: "Іс-шара түрі",
          text: "Мерейтой, туған күн немесе ерекше кеш форматын таңдаңыз.",
          sections: [
            {
              title: "Мерекелік кеш",
              items: [
                {
                  slug: "anniversary",
                  emoji: "🎂",
                  title: "Мерейтой",
                  count: "5 үлгі",
                  description: "Салмақты әрі әсем мерейтой шақырулары.",
                },
                {
                  slug: "birthday",
                  emoji: "🎁",
                  title: "Туған күн",
                  count: "6 үлгі",
                  description: "Заманауи және көңілді шақыру үлгілері.",
                },
                {
                  slug: "corporate",
                  emoji: "🏢",
                  title: "Корпоратив",
                  count: "3 үлгі",
                  description: "Командалық және ресми іс-шараларға арналған минимал үлгілер.",
                },
              ],
            },
          ],
          helpTitle: "Қажетті санат жоқ па?",
          helpText: "Менеджер мерекеңізге лайық үлгіні ұсынады.",
          helpButton: "Менеджерге жазу",
        },
      },
    },
    notFound: {
      title: "Бет табылмады",
      text: "Сілтеме ескірген болуы мүмкін немесе бет жылжытылған. Басты бетке оралайық.",
      back: "Басты бетке",
    },
    footer: {
      contactTitle: "Байланыс",
      rights: "Барлық құқықтар қорғалған.",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      tiktok: "TikTok",
      threads: "Threads",
      madeBy: "Әдемі отбасылық мерекелерге арналып жасалды",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
