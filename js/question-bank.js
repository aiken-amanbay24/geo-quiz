export const QUESTIONS_PER_GAME = 10;
export const QUESTION_TIME_SECONDS = 15;

export const GAME_MODES = [
  { id: "mixed", labelKey: "mixed" },
  { id: "world-geography", labelKey: "world-geography" },
  { id: "flags", labelKey: "flags" },
  { id: "capitals", labelKey: "capitals" },
  { id: "countries-on-map", labelKey: "countries-on-map" },
  { id: "rivers-mountains", labelKey: "rivers-mountains" },
  { id: "landmarks", labelKey: "landmarks" },
  { id: "kazakhstan", labelKey: "kazakhstan" }
];

export const DIFFICULTIES = [
  { id: "mixed", labelKey: "mixed" },
  { id: "easy", labelKey: "easy" },
  { id: "medium", labelKey: "medium" },
  { id: "hard", labelKey: "hard" }
];

export const AVATARS = ["🌍", "🧭", "🌋", "🏔️", "🌊", "🗺️", "🏛️", "🛰️"];
export const PLAYER_COLORS = ["#7c6cfa", "#f59e0b", "#22c55e", "#ef4444"];

function makeQuestion({
  id,
  country,
  flag,
  category,
  difficulty,
  topics,
  questionRu,
  questionEn,
  hintRu,
  hintEn,
  factRu,
  factEn,
  options,
  answerId
}) {
  return {
    id,
    country,
    flag,
    category,
    difficulty,
    topics,
    question: { ru: questionRu, en: questionEn },
    hint: { ru: hintRu, en: hintEn },
    fact: { ru: factRu, en: factEn },
    options,
    answerId
  };
}

const COUNTRY_BLOCKS = [
  {
    country: "Kazakhstan",
    questions: [
      makeQuestion({
        id: "kz-1",
        country: "Kazakhstan",
        flag: "🇰🇿",
        category: "flags",
        difficulty: "easy",
        topics: ["world-geography", "flags", "kazakhstan", "countries-on-map"],
        questionRu: "Чей это флаг?",
        questionEn: "Whose flag is this?",
        hintRu: "Голубой флаг с солнцем и орлом",
        hintEn: "A sky-blue flag with a sun and an eagle",
        factRu: "Орнамент у древка называется кошкар-муйиз.",
        factEn: "The ornament near the hoist is called koshkar-muiz.",
        options: {
          a: { ru: "Казахстан", en: "Kazakhstan" },
          b: { ru: "Узбекистан", en: "Uzbekistan" },
          c: { ru: "Кыргызстан", en: "Kyrgyzstan" },
          d: { ru: "Монголия", en: "Mongolia" }
        },
        answerId: "a"
      }),
      makeQuestion({
        id: "kz-2",
        country: "Kazakhstan",
        flag: "🇰🇿",
        category: "capitals",
        difficulty: "easy",
        topics: ["world-geography", "capitals", "kazakhstan", "countries-on-map"],
        questionRu: "Какова столица Казахстана?",
        questionEn: "What is the capital of Kazakhstan?",
        hintRu: "Город на реке Ишим",
        hintEn: "A city on the Ishim River",
        factRu: "Столица Казахстана несколько раз меняла название.",
        factEn: "Kazakhstan’s capital has changed its name several times.",
        options: {
          a: { ru: "Алматы", en: "Almaty" },
          b: { ru: "Астана", en: "Astana" },
          c: { ru: "Шымкент", en: "Shymkent" },
          d: { ru: "Караганда", en: "Karaganda" }
        },
        answerId: "b"
      }),
      makeQuestion({
        id: "kz-3",
        country: "Kazakhstan",
        flag: "🌐",
        category: "world_geography",
        difficulty: "medium",
        topics: ["world-geography", "kazakhstan", "countries-on-map"],
        questionRu: "На каком материке находится большая часть Казахстана?",
        questionEn: "On which continent is most of Kazakhstan located?",
        hintRu: "Страна лишь частично лежит западнее Урала",
        hintEn: "The country is only partly west of the Ural River",
        factRu: "Казахстан расположен и в Европе, и в Азии, но основная часть в Азии.",
        factEn: "Kazakhstan lies in both Europe and Asia, but most of it is in Asia.",
        options: {
          a: { ru: "Европа", en: "Europe" },
          b: { ru: "Азия", en: "Asia" },
          c: { ru: "Африка", en: "Africa" },
          d: { ru: "Южная Америка", en: "South America" }
        },
        answerId: "b"
      }),
      makeQuestion({
        id: "kz-4",
        country: "Kazakhstan",
        flag: "🏔️",
        category: "rivers_mountains",
        difficulty: "medium",
        topics: ["world-geography", "rivers-mountains", "kazakhstan"],
        questionRu: "Какие горы находятся на юго-востоке Казахстана?",
        questionEn: "Which mountains are located in southeastern Kazakhstan?",
        hintRu: "Здесь расположен Заилийский Алатау",
        hintEn: "This is where the Zailiyskiy Alatau range is found",
        factRu: "Алматы находится у подножия гор Тянь-Шаня.",
        factEn: "Almaty lies at the foot of the Tian Shan mountains.",
        options: {
          a: { ru: "Анды", en: "Andes" },
          b: { ru: "Тянь-Шань", en: "Tian Shan" },
          c: { ru: "Альпы", en: "Alps" },
          d: { ru: "Карпаты", en: "Carpathians" }
        },
        answerId: "b"
      }),
      makeQuestion({
        id: "kz-5",
        country: "Kazakhstan",
        flag: "🏛️",
        category: "landmarks",
        difficulty: "medium",
        topics: ["world-geography", "landmarks", "kazakhstan"],
        questionRu: "Как называется знаменитый монумент в центре Астаны?",
        questionEn: "What is the name of the famous monument in central Astana?",
        hintRu: "Высокая белая башня с золотым шаром",
        hintEn: "A tall white tower with a golden sphere",
        factRu: "Байтерек считается одним из символов современной столицы.",
        factEn: "Bayterek is one of the symbols of the modern capital.",
        options: {
          a: { ru: "Хан Шатыр", en: "Khan Shatyr" },
          b: { ru: "Байтерек", en: "Bayterek" },
          c: { ru: "Дворец мира", en: "Palace of Peace" },
          d: { ru: "Медеу", en: "Medeu" }
        },
        answerId: "b"
      }),
      makeQuestion({
        id: "kz-6",
        country: "Kazakhstan",
        flag: "🌊",
        category: "rivers_mountains",
        difficulty: "medium",
        topics: ["world-geography", "rivers-mountains", "kazakhstan"],
        questionRu: "Какое крупное внутреннее море омывает запад Казахстана?",
        questionEn: "Which large inland sea borders western Kazakhstan?",
        hintRu: "Это крупнейший замкнутый водоём мира",
        hintEn: "It is the world’s largest enclosed body of water",
        factRu: "Каспийское море богато нефтью и газом.",
        factEn: "The Caspian Sea is rich in oil and gas resources.",
        options: {
          a: { ru: "Аральское море", en: "Aral Sea" },
          b: { ru: "Каспийское море", en: "Caspian Sea" },
          c: { ru: "Чёрное море", en: "Black Sea" },
          d: { ru: "Балхаш", en: "Balkhash" }
        },
        answerId: "b"
      }),
      makeQuestion({
        id: "kz-7",
        country: "Kazakhstan",
        flag: "🗺️",
        category: "countries_on_map",
        difficulty: "easy",
        topics: ["world-geography", "countries-on-map", "kazakhstan"],
        questionRu: "С какой из этих стран Казахстан НЕ граничит?",
        questionEn: "Which of these countries does Kazakhstan NOT border?",
        hintRu: "Подумай о южных и восточных соседях страны",
        hintEn: "Think about the country’s southern and eastern neighbors",
        factRu: "Казахстан граничит с Россией, Китаем, Кыргызстаном, Узбекистаном и Туркменистаном.",
        factEn: "Kazakhstan borders Russia, China, Kyrgyzstan, Uzbekistan, and Turkmenistan.",
        options: {
          a: { ru: "Китай", en: "China" },
          b: { ru: "Монголия", en: "Mongolia" },
          c: { ru: "Узбекистан", en: "Uzbekistan" },
          d: { ru: "Россия", en: "Russia" }
        },
        answerId: "b"
      }),
      makeQuestion({
        id: "kz-8",
        country: "Kazakhstan",
        flag: "🚀",
        category: "facts",
        difficulty: "hard",
        topics: ["world-geography", "kazakhstan"],
        questionRu: "Какой космодром расположен в Казахстане?",
        questionEn: "Which spaceport is located in Kazakhstan?",
        hintRu: "Отсюда стартовал Юрий Гагарин",
        hintEn: "Yuri Gagarin launched from here",
        factRu: "Байконур — один из самых известных космодромов мира.",
        factEn: "Baikonur is one of the most famous spaceports in the world.",
        options: {
          a: { ru: "Плесецк", en: "Plesetsk" },
          b: { ru: "Куру", en: "Kourou" },
          c: { ru: "Байконур", en: "Baikonur" },
          d: { ru: "Восточный", en: "Vostochny" }
        },
        answerId: "c"
      })
    ]
  },
  {
    country: "Japan",
    questions: [
      makeQuestion({ id: "jp-1", country: "Japan", flag: "🇯🇵", category: "flags", difficulty: "easy", topics: ["world-geography", "flags", "countries-on-map"], questionRu: "Чей это флаг?", questionEn: "Whose flag is this?", hintRu: "Белый флаг с красным кругом", hintEn: "A white flag with a red circle", factRu: "Флаг Японии символизирует солнце.", factEn: "Japan’s flag symbolizes the sun.", options: { a: { ru: "Япония", en: "Japan" }, b: { ru: "Южная Корея", en: "South Korea" }, c: { ru: "Китай", en: "China" }, d: { ru: "Сингапур", en: "Singapore" } }, answerId: "a" }),
      makeQuestion({ id: "jp-2", country: "Japan", flag: "🇯🇵", category: "capitals", difficulty: "easy", topics: ["world-geography", "capitals", "countries-on-map"], questionRu: "Какова столица Японии?", questionEn: "What is the capital of Japan?", hintRu: "Один из крупнейших мегаполисов мира", hintEn: "One of the world’s largest metropolitan areas", factRu: "Токио считается одним из крупнейших городских регионов мира.", factEn: "Tokyo is one of the largest urban regions in the world.", options: { a: { ru: "Осака", en: "Osaka" }, b: { ru: "Токио", en: "Tokyo" }, c: { ru: "Киото", en: "Kyoto" }, d: { ru: "Нагоя", en: "Nagoya" } }, answerId: "b" }),
      makeQuestion({ id: "jp-3", country: "Japan", flag: "🌋", category: "landmarks", difficulty: "medium", topics: ["world-geography", "landmarks", "rivers-mountains", "countries-on-map"], questionRu: "Какая знаменитая гора считается символом Японии?", questionEn: "Which famous mountain is considered a symbol of Japan?", hintRu: "Это спящий вулкан", hintEn: "It is a dormant volcano", factRu: "Фудзи вдохновляла художников и поэтов веками.", factEn: "Mount Fuji has inspired artists and poets for centuries.", options: { a: { ru: "Фудзи", en: "Fuji" }, b: { ru: "К2", en: "K2" }, c: { ru: "Килиманджаро", en: "Kilimanjaro" }, d: { ru: "Этна", en: "Etna" } }, answerId: "a" }),
      makeQuestion({ id: "jp-4", country: "Japan", flag: "🏛️", category: "landmarks", difficulty: "medium", topics: ["world-geography", "landmarks"], questionRu: "В каком японском городе находится знаменитый храм Фусими Инари?", questionEn: "In which Japanese city is the famous Fushimi Inari shrine located?", hintRu: "Город был столицей Японии более тысячи лет", hintEn: "This city served as Japan’s capital for more than a thousand years", factRu: "Фусими Инари известен тысячами красных ворот тории.", factEn: "Fushimi Inari is famous for its thousands of red torii gates.", options: { a: { ru: "Токио", en: "Tokyo" }, b: { ru: "Хиросима", en: "Hiroshima" }, c: { ru: "Киото", en: "Kyoto" }, d: { ru: "Саппоро", en: "Sapporo" } }, answerId: "c" }),
      makeQuestion({ id: "jp-5", country: "Japan", flag: "🗺️", category: "world_geography", difficulty: "easy", topics: ["world-geography", "countries-on-map"], questionRu: "Где находится Япония?", questionEn: "Where is Japan located?", hintRu: "Это островное государство в Тихом океане", hintEn: "It is an island nation in the Pacific Ocean", factRu: "Япония состоит из тысяч островов.", factEn: "Japan consists of thousands of islands.", options: { a: { ru: "В Южной Америке", en: "In South America" }, b: { ru: "В Восточной Азии", en: "In East Asia" }, c: { ru: "В Северной Африке", en: "In North Africa" }, d: { ru: "В Центральной Европе", en: "In Central Europe" } }, answerId: "b" }),
      makeQuestion({ id: "jp-6", country: "Japan", flag: "🚄", category: "facts", difficulty: "medium", topics: ["world-geography"], questionRu: "Как называются японские сверхскоростные поезда?", questionEn: "What are Japan’s high-speed trains called?", hintRu: "Они известны своей точностью", hintEn: "They are famous for their punctuality", factRu: "Синкансэн впервые был запущен в 1964 году.", factEn: "The Shinkansen first launched in 1964.", options: { a: { ru: "ТGV", en: "TGV" }, b: { ru: "ICE", en: "ICE" }, c: { ru: "Синкансэн", en: "Shinkansen" }, d: { ru: "Евростар", en: "Eurostar" } }, answerId: "c" }),
      makeQuestion({ id: "jp-7", country: "Japan", flag: "🌊", category: "rivers_mountains", difficulty: "medium", topics: ["world-geography", "rivers-mountains"], questionRu: "Какой океан омывает Японию?", questionEn: "Which ocean borders Japan?", hintRu: "Самый большой океан мира", hintEn: "The largest ocean in the world", factRu: "Япония расположена на западной окраине Тихого океана.", factEn: "Japan lies on the western edge of the Pacific Ocean.", options: { a: { ru: "Индийский", en: "Indian" }, b: { ru: "Атлантический", en: "Atlantic" }, c: { ru: "Тихий", en: "Pacific" }, d: { ru: "Северный Ледовитый", en: "Arctic" } }, answerId: "c" }),
      makeQuestion({ id: "jp-8", country: "Japan", flag: "🗼", category: "landmarks", difficulty: "hard", topics: ["world-geography", "landmarks"], questionRu: "Как называется токийская телебашня, вдохновлённая Эйфелевой башней?", questionEn: "What is the name of the Tokyo tower inspired by the Eiffel Tower?", hintRu: "Оранжево-белая башня", hintEn: "An orange-and-white tower", factRu: "Tokyo Tower открылась в 1958 году.", factEn: "Tokyo Tower opened in 1958.", options: { a: { ru: "Tokyo Dome", en: "Tokyo Dome" }, b: { ru: "Tokyo Tower", en: "Tokyo Tower" }, c: { ru: "Tokyo Skytree", en: "Tokyo Skytree" }, d: { ru: "Rainbow Bridge", en: "Rainbow Bridge" } }, answerId: "b" })
    ]
  },
  {
    country: "Brazil",
    questions: [
      makeQuestion({ id: "br-1", country: "Brazil", flag: "🇧🇷", category: "flags", difficulty: "easy", topics: ["world-geography", "flags", "countries-on-map"], questionRu: "Чей это флаг?", questionEn: "Whose flag is this?", hintRu: "Зелёный флаг с жёлтым ромбом", hintEn: "A green flag with a yellow diamond", factRu: "На флаге Бразилии есть звёздное небо и девиз страны.", factEn: "Brazil’s flag features a starry sky and the national motto.", options: { a: { ru: "Бразилия", en: "Brazil" }, b: { ru: "Аргентина", en: "Argentina" }, c: { ru: "Колумбия", en: "Colombia" }, d: { ru: "Перу", en: "Peru" } }, answerId: "a" }),
      makeQuestion({ id: "br-2", country: "Brazil", flag: "🇧🇷", category: "capitals", difficulty: "easy", topics: ["world-geography", "capitals", "countries-on-map"], questionRu: "Какова столица Бразилии?", questionEn: "What is the capital of Brazil?", hintRu: "Она была специально построена в центре страны", hintEn: "It was purpose-built in the middle of the country", factRu: "Бразилиа стала столицей в 1960 году.", factEn: "Brasilia became the capital in 1960.", options: { a: { ru: "Рио-де-Жанейро", en: "Rio de Janeiro" }, b: { ru: "Сан-Паулу", en: "Sao Paulo" }, c: { ru: "Бразилиа", en: "Brasilia" }, d: { ru: "Салвадор", en: "Salvador" } }, answerId: "c" }),
      makeQuestion({ id: "br-3", country: "Brazil", flag: "🌎", category: "world_geography", difficulty: "easy", topics: ["world-geography", "countries-on-map"], questionRu: "На каком континенте находится Бразилия?", questionEn: "On which continent is Brazil located?", hintRu: "Это самый большой континент южного полушария", hintEn: "It is the largest continent in the Southern Hemisphere", factRu: "Бразилия — крупнейшая страна Южной Америки.", factEn: "Brazil is the largest country in South America.", options: { a: { ru: "Африка", en: "Africa" }, b: { ru: "Южная Америка", en: "South America" }, c: { ru: "Азия", en: "Asia" }, d: { ru: "Европа", en: "Europe" } }, answerId: "b" }),
      makeQuestion({ id: "br-4", country: "Brazil", flag: "🌊", category: "rivers_mountains", difficulty: "medium", topics: ["world-geography", "rivers-mountains"], questionRu: "Какая знаменитая река протекает через Бразилию?", questionEn: "Which famous river flows through Brazil?", hintRu: "Это одна из самых полноводных рек мира", hintEn: "It is one of the most voluminous rivers in the world", factRu: "Амазонка имеет крупнейший бассейн на планете.", factEn: "The Amazon has the largest drainage basin on Earth.", options: { a: { ru: "Нил", en: "Nile" }, b: { ru: "Миссисипи", en: "Mississippi" }, c: { ru: "Амазонка", en: "Amazon" }, d: { ru: "Дунай", en: "Danube" } }, answerId: "c" }),
      makeQuestion({ id: "br-5", country: "Brazil", flag: "🏛️", category: "landmarks", difficulty: "easy", topics: ["world-geography", "landmarks"], questionRu: "Как называется огромная статуя Иисуса в Рио-де-Жанейро?", questionEn: "What is the name of the giant statue of Jesus in Rio de Janeiro?", hintRu: "Она стоит на горе Корковадо", hintEn: "It stands on Mount Corcovado", factRu: "Статуя Христа-Искупителя — один из символов Бразилии.", factEn: "Christ the Redeemer is one of Brazil’s symbols.", options: { a: { ru: "Христос-Искупитель", en: "Christ the Redeemer" }, b: { ru: "Сахарная голова", en: "Sugarloaf" }, c: { ru: "Маракана", en: "Maracana" }, d: { ru: "Байтерек", en: "Bayterek" } }, answerId: "a" }),
      makeQuestion({ id: "br-6", country: "Brazil", flag: "⚽", category: "facts", difficulty: "medium", topics: ["world-geography"], questionRu: "Какой вид спорта особенно ассоциируется с Бразилией?", questionEn: "Which sport is especially associated with Brazil?", hintRu: "Пеле и Неймар сделали его ещё популярнее", hintEn: "Pele and Neymar made it even more popular", factRu: "Бразилия выигрывала чемпионат мира по футболу больше всех.", factEn: "Brazil has won the FIFA World Cup more times than any other country.", options: { a: { ru: "Хоккей", en: "Hockey" }, b: { ru: "Футбол", en: "Football" }, c: { ru: "Регби", en: "Rugby" }, d: { ru: "Бейсбол", en: "Baseball" } }, answerId: "b" }),
      makeQuestion({ id: "br-7", country: "Brazil", flag: "🗣️", category: "facts", difficulty: "medium", topics: ["world-geography"], questionRu: "На каком языке говорят в Бразилии?", questionEn: "What language is spoken in Brazil?", hintRu: "Это не испанский", hintEn: "It is not Spanish", factRu: "Бразилия — крупнейшая португалоязычная страна мира.", factEn: "Brazil is the largest Portuguese-speaking country in the world.", options: { a: { ru: "Испанский", en: "Spanish" }, b: { ru: "Французский", en: "French" }, c: { ru: "Португальский", en: "Portuguese" }, d: { ru: "Итальянский", en: "Italian" } }, answerId: "c" }),
      makeQuestion({ id: "br-8", country: "Brazil", flag: "🗺️", category: "countries_on_map", difficulty: "medium", topics: ["world-geography", "countries-on-map"], questionRu: "С какой из этих стран Бразилия НЕ граничит?", questionEn: "Which of these countries does Brazil NOT border?", hintRu: "Подумай о странах на западном побережье Южной Америки", hintEn: "Think about the countries on South America’s west coast", factRu: "Бразилия граничит почти со всеми странами Южной Америки, кроме Чили и Эквадора.", factEn: "Brazil borders almost every South American country except Chile and Ecuador.", options: { a: { ru: "Аргентина", en: "Argentina" }, b: { ru: "Перу", en: "Peru" }, c: { ru: "Чили", en: "Chile" }, d: { ru: "Колумбия", en: "Colombia" } }, answerId: "c" })
    ]
  },
  {
    country: "France",
    questions: [
      makeQuestion({ id: "fr-1", country: "France", flag: "🇫🇷", category: "flags", difficulty: "easy", topics: ["world-geography", "flags", "countries-on-map"], questionRu: "Чей это флаг?", questionEn: "Whose flag is this?", hintRu: "Три вертикальные полосы: синий, белый, красный", hintEn: "Three vertical stripes: blue, white, red", factRu: "Триколор стал одним из символов Французской революции.", factEn: "The tricolor became one of the symbols of the French Revolution.", options: { a: { ru: "Франция", en: "France" }, b: { ru: "Нидерланды", en: "Netherlands" }, c: { ru: "Россия", en: "Russia" }, d: { ru: "Италия", en: "Italy" } }, answerId: "a" }),
      makeQuestion({ id: "fr-2", country: "France", flag: "🇫🇷", category: "capitals", difficulty: "easy", topics: ["world-geography", "capitals", "countries-on-map"], questionRu: "Какова столица Франции?", questionEn: "What is the capital of France?", hintRu: "Город Эйфелевой башни", hintEn: "The city of the Eiffel Tower", factRu: "Париж часто называют городом света.", factEn: "Paris is often called the City of Light.", options: { a: { ru: "Лион", en: "Lyon" }, b: { ru: "Марсель", en: "Marseille" }, c: { ru: "Париж", en: "Paris" }, d: { ru: "Ницца", en: "Nice" } }, answerId: "c" }),
      makeQuestion({ id: "fr-3", country: "France", flag: "🗼", category: "landmarks", difficulty: "easy", topics: ["world-geography", "landmarks"], questionRu: "Как называется знаменитая башня в Париже?", questionEn: "What is the name of the famous tower in Paris?", hintRu: "Она названа в честь инженера", hintEn: "It is named after an engineer", factRu: "Эйфелева башня была построена к Всемирной выставке 1889 года.", factEn: "The Eiffel Tower was built for the 1889 World’s Fair.", options: { a: { ru: "Башня Монпарнас", en: "Montparnasse Tower" }, b: { ru: "Эйфелева башня", en: "Eiffel Tower" }, c: { ru: "Токийская башня", en: "Tokyo Tower" }, d: { ru: "Биг-Бен", en: "Big Ben" } }, answerId: "b" }),
      makeQuestion({ id: "fr-4", country: "France", flag: "🏔️", category: "rivers_mountains", difficulty: "medium", topics: ["world-geography", "rivers-mountains"], questionRu: "В какой горной системе находится Монблан?", questionEn: "In which mountain range is Mont Blanc located?", hintRu: "На границе Франции и Италии", hintEn: "On the border of France and Italy", factRu: "Монблан — одна из самых известных гор Европы.", factEn: "Mont Blanc is one of Europe’s most famous mountains.", options: { a: { ru: "Пиренеи", en: "Pyrenees" }, b: { ru: "Альпы", en: "Alps" }, c: { ru: "Карпаты", en: "Carpathians" }, d: { ru: "Аппалачи", en: "Appalachians" } }, answerId: "b" }),
      makeQuestion({ id: "fr-5", country: "France", flag: "🌊", category: "world_geography", difficulty: "medium", topics: ["world-geography", "countries-on-map"], questionRu: "Какое море омывает юг Франции?", questionEn: "Which sea borders southern France?", hintRu: "На нём расположен Лазурный берег", hintEn: "The French Riviera lies on it", factRu: "Средиземноморское побережье Франции популярно у туристов со всего мира.", factEn: "France’s Mediterranean coast is popular with tourists from around the world.", options: { a: { ru: "Балтийское море", en: "Baltic Sea" }, b: { ru: "Чёрное море", en: "Black Sea" }, c: { ru: "Средиземное море", en: "Mediterranean Sea" }, d: { ru: "Красное море", en: "Red Sea" } }, answerId: "c" }),
      makeQuestion({ id: "fr-6", country: "France", flag: "🏛️", category: "landmarks", difficulty: "medium", topics: ["world-geography", "landmarks"], questionRu: "Какой знаменитый музей находится в Париже?", questionEn: "Which famous museum is located in Paris?", hintRu: "Там хранится «Мона Лиза»", hintEn: "It houses the Mona Lisa", factRu: "Лувр — один из крупнейших музеев мира.", factEn: "The Louvre is one of the largest museums in the world.", options: { a: { ru: "Лувр", en: "Louvre" }, b: { ru: "Прадо", en: "Prado" }, c: { ru: "Эрмитаж", en: "Hermitage" }, d: { ru: "Метрополитен", en: "Metropolitan Museum" } }, answerId: "a" }),
      makeQuestion({ id: "fr-7", country: "France", flag: "🗺️", category: "countries_on_map", difficulty: "medium", topics: ["world-geography", "countries-on-map"], questionRu: "С какой из этих стран Франция граничит?", questionEn: "Which of these countries borders France?", hintRu: "Подумай о странах Западной Европы", hintEn: "Think about Western Europe", factRu: "Франция граничит с Бельгией, Германией, Испанией, Италией и не только.", factEn: "France borders Belgium, Germany, Spain, Italy, and more.", options: { a: { ru: "Польша", en: "Poland" }, b: { ru: "Испания", en: "Spain" }, c: { ru: "Швеция", en: "Sweden" }, d: { ru: "Украина", en: "Ukraine" } }, answerId: "b" }),
      makeQuestion({ id: "fr-8", country: "France", flag: "⚽", category: "facts", difficulty: "hard", topics: ["world-geography"], questionRu: "Какой международный спортивный турнир по велоспорту ежегодно проходит во Франции?", questionEn: "Which international cycling event is held in France every year?", hintRu: "Это многодневная гонка мирового уровня", hintEn: "It is a world-famous multi-stage race", factRu: "Тур де Франс является одной из самых престижных велогонок в мире.", factEn: "The Tour de France is one of the most prestigious cycling races in the world.", options: { a: { ru: "Джиро д'Италия", en: "Giro d'Italia" }, b: { ru: "Вуэльта", en: "Vuelta" }, c: { ru: "Тур де Франс", en: "Tour de France" }, d: { ru: "Париж-Дакар", en: "Paris-Dakar" } }, answerId: "c" })
    ]
  },
  {
    country: "Canada",
    questions: [
      makeQuestion({ id: "ca-1", country: "Canada", flag: "🇨🇦", category: "flags", difficulty: "easy", topics: ["world-geography", "flags", "countries-on-map"], questionRu: "Чей это флаг?", questionEn: "Whose flag is this?", hintRu: "На нём изображён кленовый лист", hintEn: "It features a maple leaf", factRu: "Кленовый лист стал одним из главных символов Канады.", factEn: "The maple leaf became one of Canada’s main symbols.", options: { a: { ru: "Канада", en: "Canada" }, b: { ru: "США", en: "United States" }, c: { ru: "Австралия", en: "Australia" }, d: { ru: "Швейцария", en: "Switzerland" } }, answerId: "a" }),
      makeQuestion({ id: "ca-2", country: "Canada", flag: "🇨🇦", category: "capitals", difficulty: "easy", topics: ["world-geography", "capitals", "countries-on-map"], questionRu: "Какова столица Канады?", questionEn: "What is the capital of Canada?", hintRu: "Она расположена в провинции Онтарио", hintEn: "It is located in the province of Ontario", factRu: "Оттава стоит на границе Онтарио и Квебека.", factEn: "Ottawa sits on the border of Ontario and Quebec.", options: { a: { ru: "Торонто", en: "Toronto" }, b: { ru: "Ванкувер", en: "Vancouver" }, c: { ru: "Оттава", en: "Ottawa" }, d: { ru: "Монреаль", en: "Montreal" } }, answerId: "c" }),
      makeQuestion({ id: "ca-3", country: "Canada", flag: "🌎", category: "world_geography", difficulty: "easy", topics: ["world-geography", "countries-on-map"], questionRu: "На каком континенте находится Канада?", questionEn: "On which continent is Canada located?", hintRu: "К северу от США", hintEn: "North of the United States", factRu: "Канада занимает большую часть северной части континента.", factEn: "Canada covers much of the northern part of the continent.", options: { a: { ru: "Европа", en: "Europe" }, b: { ru: "Северная Америка", en: "North America" }, c: { ru: "Южная Америка", en: "South America" }, d: { ru: "Азия", en: "Asia" } }, answerId: "b" }),
      makeQuestion({ id: "ca-4", country: "Canada", flag: "🗺️", category: "countries_on_map", difficulty: "easy", topics: ["world-geography", "countries-on-map"], questionRu: "С какой страной у Канады самая длинная сухопутная граница?", questionEn: "With which country does Canada share its longest land border?", hintRu: "Это южный сосед", hintEn: "It is Canada’s southern neighbor", factRu: "Граница Канады и США — одна из самых длинных в мире.", factEn: "The Canada–US border is one of the longest in the world.", options: { a: { ru: "Мексика", en: "Mexico" }, b: { ru: "Россия", en: "Russia" }, c: { ru: "США", en: "United States" }, d: { ru: "Гренландия", en: "Greenland" } }, answerId: "c" }),
      makeQuestion({ id: "ca-5", country: "Canada", flag: "💧", category: "landmarks", difficulty: "medium", topics: ["world-geography", "landmarks", "rivers-mountains"], questionRu: "Какой знаменитый водопад находится на границе Канады и США?", questionEn: "Which famous waterfall lies on the border of Canada and the United States?", hintRu: "Очень популярен у туристов", hintEn: "It is extremely popular with tourists", factRu: "Ниагарский водопад состоит из трёх отдельных водопадов.", factEn: "Niagara Falls consists of three separate waterfalls.", options: { a: { ru: "Виктория", en: "Victoria" }, b: { ru: "Игуасу", en: "Iguazu" }, c: { ru: "Ниагара", en: "Niagara" }, d: { ru: "Анхель", en: "Angel" } }, answerId: "c" }),
      makeQuestion({ id: "ca-6", country: "Canada", flag: "🗣️", category: "facts", difficulty: "medium", topics: ["world-geography"], questionRu: "Какой из этих языков является официальным в Канаде?", questionEn: "Which of these languages is official in Canada?", hintRu: "У страны два официальных языка", hintEn: "The country has two official languages", factRu: "Федерально официальными языками Канады являются английский и французский.", factEn: "Canada’s federal official languages are English and French.", options: { a: { ru: "Только английский", en: "English only" }, b: { ru: "Английский и французский", en: "English and French" }, c: { ru: "Английский и испанский", en: "English and Spanish" }, d: { ru: "Только французский", en: "French only" } }, answerId: "b" }),
      makeQuestion({ id: "ca-7", country: "Canada", flag: "🧊", category: "facts", difficulty: "medium", topics: ["world-geography"], questionRu: "Какое природное явление часто наблюдают на севере Канады?", questionEn: "Which natural phenomenon is often seen in northern Canada?", hintRu: "Разноцветные огни в небе", hintEn: "Colorful lights in the sky", factRu: "Северное сияние особенно ярко видно в высоких широтах.", factEn: "The northern lights are especially vivid at high latitudes.", options: { a: { ru: "Миражи", en: "Mirages" }, b: { ru: "Северное сияние", en: "Northern lights" }, c: { ru: "Песчаные бури", en: "Sandstorms" }, d: { ru: "Цунами", en: "Tsunamis" } }, answerId: "b" }),
      makeQuestion({ id: "ca-8", country: "Canada", flag: "🏔️", category: "rivers_mountains", difficulty: "hard", topics: ["world-geography", "rivers-mountains"], questionRu: "Какая горная система проходит по западу Канады?", questionEn: "Which mountain system runs through western Canada?", hintRu: "Она тянется и по территории США", hintEn: "It also stretches through the United States", factRu: "Канадские Скалистые горы входят в систему Кордильер.", factEn: "The Canadian Rockies are part of the Cordillera system.", options: { a: { ru: "Урал", en: "Ural" }, b: { ru: "Аппалачи", en: "Appalachians" }, c: { ru: "Скалистые горы", en: "Rocky Mountains" }, d: { ru: "Альпы", en: "Alps" } }, answerId: "c" })
    ]
  },
  {
    country: "Australia",
    questions: [
      makeQuestion({ id: "au-1", country: "Australia", flag: "🇦🇺", category: "flags", difficulty: "easy", topics: ["world-geography", "flags", "countries-on-map"], questionRu: "Чей это флаг?", questionEn: "Whose flag is this?", hintRu: "На нём есть Юнион Джек и звёзды", hintEn: "It features the Union Jack and stars", factRu: "На флаге Австралии изображено созвездие Южный Крест.", factEn: "Australia’s flag includes the Southern Cross constellation.", options: { a: { ru: "Австралия", en: "Australia" }, b: { ru: "Новая Зеландия", en: "New Zealand" }, c: { ru: "Фиджи", en: "Fiji" }, d: { ru: "Великобритания", en: "United Kingdom" } }, answerId: "a" }),
      makeQuestion({ id: "au-2", country: "Australia", flag: "🇦🇺", category: "capitals", difficulty: "easy", topics: ["world-geography", "capitals", "countries-on-map"], questionRu: "Какова столица Австралии?", questionEn: "What is the capital of Australia?", hintRu: "Это не Сидней и не Мельбурн", hintEn: "It is neither Sydney nor Melbourne", factRu: "Канберу выбрали как компромисс между Сиднеем и Мельбурном.", factEn: "Canberra was chosen as a compromise between Sydney and Melbourne.", options: { a: { ru: "Сидней", en: "Sydney" }, b: { ru: "Мельбурн", en: "Melbourne" }, c: { ru: "Канберра", en: "Canberra" }, d: { ru: "Перт", en: "Perth" } }, answerId: "c" }),
      makeQuestion({ id: "au-3", country: "Australia", flag: "🦘", category: "facts", difficulty: "easy", topics: ["world-geography"], questionRu: "Какое животное особенно ассоциируется с Австралией?", questionEn: "Which animal is especially associated with Australia?", hintRu: "Оно прыгает и носит детёнышей в сумке", hintEn: "It hops and carries its young in a pouch", factRu: "Кенгуру являются одним из самых узнаваемых символов Австралии.", factEn: "Kangaroos are one of Australia’s most recognizable symbols.", options: { a: { ru: "Лев", en: "Lion" }, b: { ru: "Кенгуру", en: "Kangaroo" }, c: { ru: "Тигр", en: "Tiger" }, d: { ru: "Лама", en: "Llama" } }, answerId: "b" }),
      makeQuestion({ id: "au-4", country: "Australia", flag: "🌍", category: "world_geography", difficulty: "easy", topics: ["world-geography", "countries-on-map"], questionRu: "Австралия — это...", questionEn: "Australia is...", hintRu: "Подумай о её географической особенности", hintEn: "Think about its geographic uniqueness", factRu: "Австралия — единственная страна, занимающая целый континент.", factEn: "Australia is the only country that occupies an entire continent.", options: { a: { ru: "Только остров", en: "Only an island" }, b: { ru: "Страна-континент", en: "A country-continent" }, c: { ru: "Архипелаг в Атлантике", en: "An Atlantic archipelago" }, d: { ru: "Полуостров в Европе", en: "A peninsula in Europe" } }, answerId: "b" }),
      makeQuestion({ id: "au-5", country: "Australia", flag: "🌊", category: "landmarks", difficulty: "medium", topics: ["world-geography", "landmarks"], questionRu: "Как называется крупнейший коралловый риф у берегов Австралии?", questionEn: "What is the name of the largest coral reef off the coast of Australia?", hintRu: "Его видно даже из космоса", hintEn: "It can be seen from space", factRu: "Большой Барьерный риф — одна из крупнейших экосистем Земли.", factEn: "The Great Barrier Reef is one of Earth’s largest ecosystems.", options: { a: { ru: "Коралловый пояс", en: "Coral Belt" }, b: { ru: "Большой Барьерный риф", en: "Great Barrier Reef" }, c: { ru: "Голубая лагуна", en: "Blue Lagoon" }, d: { ru: "Тасманов риф", en: "Tasman Reef" } }, answerId: "b" }),
      makeQuestion({ id: "au-6", country: "Australia", flag: "🏜️", category: "world_geography", difficulty: "medium", topics: ["world-geography"], questionRu: "Как называется огромный малонаселённый внутренний регион Австралии?", questionEn: "What is the name of Australia’s vast sparsely populated interior region?", hintRu: "Часто изображается красным на фото", hintEn: "It is often shown as red in photos", factRu: "Австралийский аутбэк занимает большую часть внутренних районов страны.", factEn: "The Australian Outback covers much of the country’s interior.", options: { a: { ru: "Саванна", en: "Savanna" }, b: { ru: "Аутбэк", en: "Outback" }, c: { ru: "Пампа", en: "Pampa" }, d: { ru: "Тундра", en: "Tundra" } }, answerId: "b" }),
      makeQuestion({ id: "au-7", country: "Australia", flag: "🗺️", category: "countries_on_map", difficulty: "medium", topics: ["world-geography", "countries-on-map"], questionRu: "Какой океан омывает восточное побережье Австралии?", questionEn: "Which ocean borders Australia’s east coast?", hintRu: "Это самый большой океан мира", hintEn: "It is the largest ocean in the world", factRu: "На востоке Австралия выходит к Тихому океану.", factEn: "Australia faces the Pacific Ocean to the east.", options: { a: { ru: "Атлантический", en: "Atlantic" }, b: { ru: "Тихий", en: "Pacific" }, c: { ru: "Северный Ледовитый", en: "Arctic" }, d: { ru: "Средиземное море", en: "Mediterranean Sea" } }, answerId: "b" }),
      makeQuestion({ id: "au-8", country: "Australia", flag: "🏛️", category: "landmarks", difficulty: "hard", topics: ["world-geography", "landmarks"], questionRu: "Как называется знаменитое здание с парусообразной крышей в Сиднее?", questionEn: "What is the famous sail-shaped building in Sydney called?", hintRu: "Оно находится в гавани", hintEn: "It stands on the harbor", factRu: "Сиднейский оперный театр входит в список Всемирного наследия ЮНЕСКО.", factEn: "The Sydney Opera House is a UNESCO World Heritage Site.", options: { a: { ru: "Сиднейский парламент", en: "Sydney Parliament" }, b: { ru: "Сиднейская башня", en: "Sydney Tower" }, c: { ru: "Сиднейский оперный театр", en: "Sydney Opera House" }, d: { ru: "Харбор-Бридж", en: "Harbour Bridge" } }, answerId: "c" })
    ]
  },
  {
    country: "Egypt",
    questions: [
      makeQuestion({ id: "eg-1", country: "Egypt", flag: "🇪🇬", category: "flags", difficulty: "easy", topics: ["world-geography", "flags", "countries-on-map"], questionRu: "Чей это флаг?", questionEn: "Whose flag is this?", hintRu: "Красно-бело-чёрный флаг с золотым орлом", hintEn: "A red, white, and black flag with a golden eagle", factRu: "На гербе Египта изображён орёл Саладина.", factEn: "Egypt’s coat of arms features the Eagle of Saladin.", options: { a: { ru: "Египет", en: "Egypt" }, b: { ru: "Ирак", en: "Iraq" }, c: { ru: "Йемен", en: "Yemen" }, d: { ru: "Сирия", en: "Syria" } }, answerId: "a" }),
      makeQuestion({ id: "eg-2", country: "Egypt", flag: "🇪🇬", category: "capitals", difficulty: "easy", topics: ["world-geography", "capitals", "countries-on-map"], questionRu: "Какова столица Египта?", questionEn: "What is the capital of Egypt?", hintRu: "Один из крупнейших городов Африки", hintEn: "One of Africa’s largest cities", factRu: "Каир расположен недалеко от пирамид Гизы.", factEn: "Cairo lies not far from the Pyramids of Giza.", options: { a: { ru: "Александрия", en: "Alexandria" }, b: { ru: "Каир", en: "Cairo" }, c: { ru: "Луксор", en: "Luxor" }, d: { ru: "Гиза", en: "Giza" } }, answerId: "b" }),
      makeQuestion({ id: "eg-3", country: "Egypt", flag: "🏛️", category: "landmarks", difficulty: "easy", topics: ["world-geography", "landmarks"], questionRu: "В какой стране находятся пирамиды Гизы?", questionEn: "In which country are the Pyramids of Giza located?", hintRu: "Страна на берегах Нила", hintEn: "A country on the Nile", factRu: "Пирамида Хеопса — единственное сохранившееся чудо света древнего мира.", factEn: "The Great Pyramid is the only surviving wonder of the ancient world.", options: { a: { ru: "Марокко", en: "Morocco" }, b: { ru: "Египет", en: "Egypt" }, c: { ru: "Судан", en: "Sudan" }, d: { ru: "Иордания", en: "Jordan" } }, answerId: "b" }),
      makeQuestion({ id: "eg-4", country: "Egypt", flag: "🌊", category: "rivers_mountains", difficulty: "easy", topics: ["world-geography", "rivers-mountains"], questionRu: "Какая река протекает через Египет?", questionEn: "Which river flows through Egypt?", hintRu: "Одна из самых знаменитых рек мира", hintEn: "One of the world’s most famous rivers", factRu: "Древнеегипетская цивилизация развивалась вдоль Нила.", factEn: "Ancient Egyptian civilization developed along the Nile.", options: { a: { ru: "Амазонка", en: "Amazon" }, b: { ru: "Нил", en: "Nile" }, c: { ru: "Конго", en: "Congo" }, d: { ru: "Тигр", en: "Tigris" } }, answerId: "b" }),
      makeQuestion({ id: "eg-5", country: "Egypt", flag: "🌍", category: "world_geography", difficulty: "medium", topics: ["world-geography", "countries-on-map"], questionRu: "На каком континенте находится Египет в основном?", questionEn: "On which continent is Egypt mainly located?", hintRu: "Подумай о северо-востоке материка", hintEn: "Think about the northeast of the continent", factRu: "Небольшая часть Египта, Синай, географически относится к Азии.", factEn: "A small part of Egypt, Sinai, is geographically in Asia.", options: { a: { ru: "Азия", en: "Asia" }, b: { ru: "Африка", en: "Africa" }, c: { ru: "Европа", en: "Europe" }, d: { ru: "Южная Америка", en: "South America" } }, answerId: "b" }),
      makeQuestion({ id: "eg-6", country: "Egypt", flag: "🚢", category: "landmarks", difficulty: "hard", topics: ["world-geography", "landmarks"], questionRu: "Как называется искусственный водный путь, соединяющий Средиземное и Красное моря?", questionEn: "What is the artificial waterway connecting the Mediterranean and Red Seas called?", hintRu: "Он имеет огромное значение для мировой торговли", hintEn: "It is hugely important for world trade", factRu: "Суэцкий канал сокращает путь между Европой и Азией.", factEn: "The Suez Canal shortens the route between Europe and Asia.", options: { a: { ru: "Панамский канал", en: "Panama Canal" }, b: { ru: "Суэцкий канал", en: "Suez Canal" }, c: { ru: "Кильский канал", en: "Kiel Canal" }, d: { ru: "Коринфский канал", en: "Corinth Canal" } }, answerId: "b" }),
      makeQuestion({ id: "eg-7", country: "Egypt", flag: "🏜️", category: "world_geography", difficulty: "medium", topics: ["world-geography"], questionRu: "Какая крупная пустыня занимает большую часть территории Египта?", questionEn: "Which major desert covers much of Egypt?", hintRu: "Самая большая жаркая пустыня мира", hintEn: "The largest hot desert in the world", factRu: "Египет находится на северо-востоке Сахары.", factEn: "Egypt lies in the northeastern part of the Sahara.", options: { a: { ru: "Гоби", en: "Gobi" }, b: { ru: "Калахари", en: "Kalahari" }, c: { ru: "Сахара", en: "Sahara" }, d: { ru: "Атакама", en: "Atacama" } }, answerId: "c" }),
      makeQuestion({ id: "eg-8", country: "Egypt", flag: "🗺️", category: "countries_on_map", difficulty: "hard", topics: ["world-geography", "countries-on-map"], questionRu: "Какой полуостров относится к Египту и находится в Азии?", questionEn: "Which peninsula belongs to Egypt and is located in Asia?", hintRu: "Он расположен между двумя морями", hintEn: "It lies between two seas", factRu: "Синайский полуостров соединяет Африку и Азию.", factEn: "The Sinai Peninsula links Africa and Asia.", options: { a: { ru: "Аравийский", en: "Arabian" }, b: { ru: "Синайский", en: "Sinai" }, c: { ru: "Кольский", en: "Kola" }, d: { ru: "Юкатан", en: "Yucatan" } }, answerId: "b" })
    ]
  },
  {
    country: "United States",
    questions: [
      makeQuestion({ id: "us-1", country: "United States", flag: "🇺🇸", category: "flags", difficulty: "easy", topics: ["world-geography", "flags", "countries-on-map"], questionRu: "Чей это флаг?", questionEn: "Whose flag is this?", hintRu: "Звёзды и полосы", hintEn: "Stars and stripes", factRu: "На флаге США 50 звёзд по числу штатов.", factEn: "The US flag has 50 stars for the 50 states.", options: { a: { ru: "США", en: "United States" }, b: { ru: "Канада", en: "Canada" }, c: { ru: "Австралия", en: "Australia" }, d: { ru: "Либерия", en: "Liberia" } }, answerId: "a" }),
      makeQuestion({ id: "us-2", country: "United States", flag: "🇺🇸", category: "capitals", difficulty: "easy", topics: ["world-geography", "capitals", "countries-on-map"], questionRu: "Какова столица США?", questionEn: "What is the capital of the United States?", hintRu: "Это не Нью-Йорк", hintEn: "It is not New York City", factRu: "Вашингтон расположен в федеральном округе Колумбия.", factEn: "Washington is located in the federal District of Columbia.", options: { a: { ru: "Нью-Йорк", en: "New York City" }, b: { ru: "Вашингтон", en: "Washington, D.C." }, c: { ru: "Лос-Анджелес", en: "Los Angeles" }, d: { ru: "Чикаго", en: "Chicago" } }, answerId: "b" }),
      makeQuestion({ id: "us-3", country: "United States", flag: "🗽", category: "landmarks", difficulty: "easy", topics: ["world-geography", "landmarks"], questionRu: "Как называется знаменитая статуя в Нью-Йорке?", questionEn: "What is the name of the famous statue in New York?", hintRu: "Она держит факел", hintEn: "It holds a torch", factRu: "Статуя Свободы была подарком Франции Соединённым Штатам.", factEn: "The Statue of Liberty was a gift from France to the United States.", options: { a: { ru: "Статуя Свободы", en: "Statue of Liberty" }, b: { ru: "Мать-Родина", en: "Motherland Calls" }, c: { ru: "Христос-Искупитель", en: "Christ the Redeemer" }, d: { ru: "Русалочка", en: "Little Mermaid" } }, answerId: "a" }),
      makeQuestion({ id: "us-4", country: "United States", flag: "🗺️", category: "countries_on_map", difficulty: "easy", topics: ["world-geography", "countries-on-map"], questionRu: "С какими двумя странами США имеют сухопутную границу?", questionEn: "Which two countries share land borders with the United States?", hintRu: "Одна страна на севере, другая на юге", hintEn: "One country is to the north, the other to the south", factRu: "США граничат с Канадой и Мексикой.", factEn: "The United States borders Canada and Mexico.", options: { a: { ru: "Канада и Мексика", en: "Canada and Mexico" }, b: { ru: "Канада и Россия", en: "Canada and Russia" }, c: { ru: "Мексика и Бразилия", en: "Mexico and Brazil" }, d: { ru: "Куба и Канада", en: "Cuba and Canada" } }, answerId: "a" }),
      makeQuestion({ id: "us-5", country: "United States", flag: "🏞️", category: "rivers_mountains", difficulty: "medium", topics: ["world-geography", "rivers-mountains"], questionRu: "Какая горная цепь проходит по западу США?", questionEn: "Which mountain chain runs through the western United States?", hintRu: "Она продолжается и в Канаде", hintEn: "It also extends into Canada", factRu: "Скалистые горы являются частью Кордильер.", factEn: "The Rocky Mountains are part of the Cordillera system.", options: { a: { ru: "Альпы", en: "Alps" }, b: { ru: "Скалистые горы", en: "Rocky Mountains" }, c: { ru: "Карпаты", en: "Carpathians" }, d: { ru: "Гималаи", en: "Himalayas" } }, answerId: "b" }),
      makeQuestion({ id: "us-6", country: "United States", flag: "🎬", category: "facts", difficulty: "medium", topics: ["world-geography"], questionRu: "Какой район Лос-Анджелеса связан с киноиндустрией?", questionEn: "Which district of Los Angeles is associated with the film industry?", hintRu: "Там стоят большие белые буквы на холме", hintEn: "It is known for the giant white letters on a hill", factRu: "Hollywood стал символом мировой киноиндустрии.", factEn: "Hollywood became a symbol of the global film industry.", options: { a: { ru: "Бродвей", en: "Broadway" }, b: { ru: "Голливуд", en: "Hollywood" }, c: { ru: "Манхэттен", en: "Manhattan" }, d: { ru: "Беверли-Хиллз", en: "Beverly Hills" } }, answerId: "b" }),
      makeQuestion({ id: "us-7", country: "United States", flag: "🌊", category: "world_geography", difficulty: "medium", topics: ["world-geography"], questionRu: "Какие два океана омывают материковую часть США?", questionEn: "Which two oceans border the contiguous United States?", hintRu: "Один на востоке, другой на западе", hintEn: "One is to the east, the other to the west", factRu: "Материковая часть США выходит к Атлантическому и Тихому океанам.", factEn: "The contiguous US borders the Atlantic and Pacific Oceans.", options: { a: { ru: "Индийский и Атлантический", en: "Indian and Atlantic" }, b: { ru: "Тихий и Атлантический", en: "Pacific and Atlantic" }, c: { ru: "Тихий и Южный", en: "Pacific and Southern" }, d: { ru: "Северный Ледовитый и Тихий", en: "Arctic and Pacific" } }, answerId: "b" }),
      makeQuestion({ id: "us-8", country: "United States", flag: "🗽", category: "landmarks", difficulty: "hard", topics: ["world-geography", "landmarks"], questionRu: "Как называется знаменитый национальный парк с глубоким каньоном в Аризоне?", questionEn: "What is the famous national park with a deep canyon in Arizona called?", hintRu: "Его прорезала река Колорадо", hintEn: "It was carved by the Colorado River", factRu: "Гранд-Каньон — одно из самых известных природных чудес США.", factEn: "The Grand Canyon is one of the most famous natural wonders in the US.", options: { a: { ru: "Йеллоустоун", en: "Yellowstone" }, b: { ru: "Йосемити", en: "Yosemite" }, c: { ru: "Гранд-Каньон", en: "Grand Canyon" }, d: { ru: "Секвойя", en: "Sequoia" } }, answerId: "c" })
    ]
  }
];

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const QUESTION_BANK = COUNTRY_BLOCKS.flatMap((block) => block.questions);

export function getQuestionBankStats() {
  return {
    countries: COUNTRY_BLOCKS.length,
    questions: QUESTION_BANK.length
  };
}

function matchesMode(question, modeId) {
  if (modeId === "mixed") return true;
  return question.topics.includes(modeId);
}

function matchesDifficulty(question, difficultyId) {
  if (difficultyId === "mixed") return true;
  return question.difficulty === difficultyId;
}

function prepareQuestion(question) {
  const optionIds = shuffleArray(Object.keys(question.options));
  return {
    ...question,
    optionOrder: optionIds
  };
}

export function buildGameQuestions(settings = {}) {
  const modeId = settings.mode || "mixed";
  const difficultyId = settings.difficulty || "mixed";

  const strictPool = QUESTION_BANK.filter((question) => matchesMode(question, modeId) && matchesDifficulty(question, difficultyId));
  const modePool = QUESTION_BANK.filter((question) => matchesMode(question, modeId));
  const difficultyPool = QUESTION_BANK.filter((question) => matchesDifficulty(question, difficultyId));

  const selected = [];
  const seen = new Set();

  function takeFrom(pool) {
    shuffleArray(pool).forEach((question) => {
      if (selected.length >= QUESTIONS_PER_GAME) return;
      if (seen.has(question.id)) return;
      selected.push(question);
      seen.add(question.id);
    });
  }

  takeFrom(strictPool);
  takeFrom(modePool);
  takeFrom(difficultyPool);
  takeFrom(QUESTION_BANK);

  return selected.slice(0, QUESTIONS_PER_GAME).map(prepareQuestion);
}
