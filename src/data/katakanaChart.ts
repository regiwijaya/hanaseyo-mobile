export type KatakanaChartItem = {
  kana: string;
  reading: string;
  audioText: string;
};

export type KatakanaChartCell = KatakanaChartItem | null;

export type KatakanaChartRow = {
  id: string;
  title: string;
  subtitle: string;
  lessonId?: string;
  cells: KatakanaChartCell[];
};

export const katakanaChartColumns = ["a", "i", "u", "e", "o"];

export const katakanaChartRows: KatakanaChartRow[] = [
  {
    id: "katakana-a-row",
    title: "ア行",
    subtitle: "Baris vokal",
    lessonId: "katakana-a-row",
    cells: [
      { kana: "ア", reading: "a", audioText: "ア" },
      { kana: "イ", reading: "i", audioText: "イ" },
      { kana: "ウ", reading: "u", audioText: "ウ" },
      { kana: "エ", reading: "e", audioText: "エ" },
      { kana: "オ", reading: "o", audioText: "オ" },
    ],
  },
  {
    id: "katakana-ka-row",
    title: "カ行",
    subtitle: "Baris K",
    lessonId: "katakana-ka-row",
    cells: [
      { kana: "カ", reading: "ka", audioText: "カ" },
      { kana: "キ", reading: "ki", audioText: "キ" },
      { kana: "ク", reading: "ku", audioText: "ク" },
      { kana: "ケ", reading: "ke", audioText: "ケ" },
      { kana: "コ", reading: "ko", audioText: "コ" },
    ],
  },
  {
    id: "katakana-sa-row",
    title: "サ行",
    subtitle: "Baris S",
    lessonId: "katakana-sa-row",
    cells: [
      { kana: "サ", reading: "sa", audioText: "サ" },
      { kana: "シ", reading: "shi", audioText: "シ" },
      { kana: "ス", reading: "su", audioText: "ス" },
      { kana: "セ", reading: "se", audioText: "セ" },
      { kana: "ソ", reading: "so", audioText: "ソ" },
    ],
  },
  {
    id: "katakana-ta-row",
    title: "タ行",
    subtitle: "Baris T",
    lessonId: "katakana-ta-row",
    cells: [
      { kana: "タ", reading: "ta", audioText: "タ" },
      { kana: "チ", reading: "chi", audioText: "チ" },
      { kana: "ツ", reading: "tsu", audioText: "ツ" },
      { kana: "テ", reading: "te", audioText: "テ" },
      { kana: "ト", reading: "to", audioText: "ト" },
    ],
  },
  {
    id: "katakana-na-row",
    title: "ナ行",
    subtitle: "Baris N",
    lessonId: "katakana-na-row",
    cells: [
      { kana: "ナ", reading: "na", audioText: "ナ" },
      { kana: "ニ", reading: "ni", audioText: "ニ" },
      { kana: "ヌ", reading: "nu", audioText: "ヌ" },
      { kana: "ネ", reading: "ne", audioText: "ネ" },
      { kana: "ノ", reading: "no", audioText: "ノ" },
    ],
  },
  {
    id: "katakana-ha-row",
    title: "ハ行",
    subtitle: "Baris H",
    lessonId: "katakana-ha-row",
    cells: [
      { kana: "ハ", reading: "ha", audioText: "ハ" },
      { kana: "ヒ", reading: "hi", audioText: "ヒ" },
      { kana: "フ", reading: "fu", audioText: "フ" },
      { kana: "ヘ", reading: "he", audioText: "ヘ" },
      { kana: "ホ", reading: "ho", audioText: "ホ" },
    ],
  },
  {
    id: "katakana-ma-row",
    title: "マ行",
    subtitle: "Baris M",
    lessonId: "katakana-ma-row",
    cells: [
      { kana: "マ", reading: "ma", audioText: "マ" },
      { kana: "ミ", reading: "mi", audioText: "ミ" },
      { kana: "ム", reading: "mu", audioText: "ム" },
      { kana: "メ", reading: "me", audioText: "メ" },
      { kana: "モ", reading: "mo", audioText: "モ" },
    ],
  },
  {
    id: "katakana-ya-row",
    title: "ヤ行",
    subtitle: "Baris Y",
    lessonId: "katakana-ya-row",
    cells: [
      { kana: "ヤ", reading: "ya", audioText: "ヤ" },
      null,
      { kana: "ユ", reading: "yu", audioText: "ユ" },
      null,
      { kana: "ヨ", reading: "yo", audioText: "ヨ" },
    ],
  },
  {
    id: "katakana-ra-row",
    title: "ラ行",
    subtitle: "Baris R",
    lessonId: "katakana-ra-row",
    cells: [
      { kana: "ラ", reading: "ra", audioText: "ラ" },
      { kana: "リ", reading: "ri", audioText: "リ" },
      { kana: "ル", reading: "ru", audioText: "ル" },
      { kana: "レ", reading: "re", audioText: "レ" },
      { kana: "ロ", reading: "ro", audioText: "ロ" },
    ],
  },
  {
    id: "katakana-wa-row",
    title: "ワ行",
    subtitle: "Baris W",
    lessonId: "katakana-wa-n-row",
    cells: [
      { kana: "ワ", reading: "wa", audioText: "ワ" },
      null,
      null,
      null,
      { kana: "ヲ", reading: "wo / o", audioText: "ヲ" },
    ],
  },
  {
    id: "katakana-n-row",
    title: "ン",
    subtitle: "Konsonan akhir",
    lessonId: "katakana-wa-n-row",
    cells: [
      null,
      null,
      { kana: "ン", reading: "n", audioText: "ン" },
      null,
      null,
    ],
  },
];