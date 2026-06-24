export type HiraganaChartItem = {
  kana: string;
  reading: string;
  audioText: string;
};

export type HiraganaChartCell = HiraganaChartItem | null;

export type HiraganaChartRow = {
  id: string;
  title: string;
  subtitle: string;
  lessonId?: string;
  cells: HiraganaChartCell[];
};

export const hiraganaChartColumns = ["a", "i", "u", "e", "o"];

export const hiraganaChartRows: HiraganaChartRow[] = [
  {
    id: "a-row",
    title: "あ行",
    subtitle: "Baris vokal",
    lessonId: "hiragana-a-row",
    cells: [
      { kana: "あ", reading: "a", audioText: "あ" },
      { kana: "い", reading: "i", audioText: "い" },
      { kana: "う", reading: "u", audioText: "う" },
      { kana: "え", reading: "e", audioText: "え" },
      { kana: "お", reading: "o", audioText: "お" },
    ],
  },
  {
    id: "ka-row",
    title: "か行",
    subtitle: "Baris K",
    lessonId: "hiragana-ka-row",
    cells: [
      { kana: "か", reading: "ka", audioText: "か" },
      { kana: "き", reading: "ki", audioText: "き" },
      { kana: "く", reading: "ku", audioText: "く" },
      { kana: "け", reading: "ke", audioText: "け" },
      { kana: "こ", reading: "ko", audioText: "こ" },
    ],
  },
  {
    id: "sa-row",
    title: "さ行",
    subtitle: "Baris S",
    lessonId: "hiragana-sa-row",
    cells: [
      { kana: "さ", reading: "sa", audioText: "さ" },
      { kana: "し", reading: "shi", audioText: "し" },
      { kana: "す", reading: "su", audioText: "す" },
      { kana: "せ", reading: "se", audioText: "せ" },
      { kana: "そ", reading: "so", audioText: "そ" },
    ],
  },
  {
    id: "ta-row",
    title: "た行",
    subtitle: "Baris T",
    lessonId: "hiragana-ta-row",
    cells: [
      { kana: "た", reading: "ta", audioText: "た" },
      { kana: "ち", reading: "chi", audioText: "ち" },
      { kana: "つ", reading: "tsu", audioText: "つ" },
      { kana: "て", reading: "te", audioText: "て" },
      { kana: "と", reading: "to", audioText: "と" },
    ],
  },
  {
    id: "na-row",
    title: "な行",
    subtitle: "Baris N",
    lessonId: "hiragana-na-row",
    cells: [
      { kana: "な", reading: "na", audioText: "な" },
      { kana: "に", reading: "ni", audioText: "に" },
      { kana: "ぬ", reading: "nu", audioText: "ぬ" },
      { kana: "ね", reading: "ne", audioText: "ね" },
      { kana: "の", reading: "no", audioText: "の" },
    ],
  },
  {
    id: "ha-row",
    title: "は行",
    subtitle: "Baris H",
    lessonId: "hiragana-ha-row",
    cells: [
      { kana: "は", reading: "ha", audioText: "は" },
      { kana: "ひ", reading: "hi", audioText: "ひ" },
      { kana: "ふ", reading: "fu", audioText: "ふ" },
      { kana: "へ", reading: "he", audioText: "へ" },
      { kana: "ほ", reading: "ho", audioText: "ほ" },
    ],
  },
  {
    id: "ma-row",
    title: "ま行",
    subtitle: "Baris M",
    lessonId: "hiragana-ma-row",
    cells: [
      { kana: "ま", reading: "ma", audioText: "ま" },
      { kana: "み", reading: "mi", audioText: "み" },
      { kana: "む", reading: "mu", audioText: "む" },
      { kana: "め", reading: "me", audioText: "め" },
      { kana: "も", reading: "mo", audioText: "も" },
    ],
  },
  {
    id: "ya-row",
    title: "や行",
    subtitle: "Baris Y",
    lessonId: "hiragana-ya-row",
    cells: [
      { kana: "や", reading: "ya", audioText: "や" },
      null,
      { kana: "ゆ", reading: "yu", audioText: "ゆ" },
      null,
      { kana: "よ", reading: "yo", audioText: "よ" },
    ],
  },
  {
    id: "ra-row",
    title: "ら行",
    subtitle: "Baris R",
    lessonId: "hiragana-ra-row",
    cells: [
      { kana: "ら", reading: "ra", audioText: "ら" },
      { kana: "り", reading: "ri", audioText: "り" },
      { kana: "る", reading: "ru", audioText: "る" },
      { kana: "れ", reading: "re", audioText: "れ" },
      { kana: "ろ", reading: "ro", audioText: "ろ" },
    ],
  },
  {
    id: "wa-row",
    title: "わ行",
    subtitle: "Baris W",
    lessonId: "hiragana-wa-n-row",
    cells: [
      { kana: "わ", reading: "wa", audioText: "わ" },
      null,
      null,
      null,
      { kana: "を", reading: "wo / o", audioText: "を" },
    ],
  },
  {
    id: "n-row",
    title: "ん",
    subtitle: "Konsonan akhir",
    lessonId: "hiragana-wa-n-row",
    cells: [
      null,
      null,
      { kana: "ん", reading: "n", audioText: "ん" },
      null,
      null,
    ],
  },
];