import {
  Lesson,
  LessonActivity,
  LessonCategory,
  ListeningActivity,
  PronunciationActivity,
  QuizActivity,
  ReviewActivity,
  VocabularyActivity,
} from "../../types/curriculum";

type KanaLessonItem = {
  id: string;
  kana: string;
  reading: string;
  example: string;
  exampleReading: string;
  exampleMeaning: string;
  note?: string;
};

type CreateKanaLessonInput = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  category?: LessonCategory;
  pronunciationTitle: string;
  pronunciationInstruction: string;
  pronunciationMeaning: string;
  reviewTitle: string;
  reviewInstruction: string;
  items: KanaLessonItem[];
};

function getCategoryFromId(id: string): LessonCategory {
  if (id.startsWith("hiragana-")) {
    return "hiragana";
  }

  if (id.startsWith("katakana-")) {
    return "katakana";
  }

  return "general";
}

function getChoices(items: KanaLessonItem[]): string[] {
  return items.map((item) => item.kana);
}

function getUniqueQuizItems(items: KanaLessonItem[]): KanaLessonItem[] {
  const firstItem = items[0];
  const secondItem = items[1] ?? firstItem;
  const lastItem = items[items.length - 1] ?? firstItem;

  const selectedItems = [secondItem, lastItem].filter(Boolean);
  const uniqueItems: KanaLessonItem[] = [];

  selectedItems.forEach((item) => {
    if (!uniqueItems.some((uniqueItem) => uniqueItem.id === item.id)) {
      uniqueItems.push(item);
    }
  });

  return uniqueItems;
}

function getUniqueListeningItems(items: KanaLessonItem[]): KanaLessonItem[] {
  const firstItem = items[0];
  const lastItem = items[items.length - 1] ?? firstItem;

  const selectedItems = [firstItem, lastItem].filter(Boolean);
  const uniqueItems: KanaLessonItem[] = [];

  selectedItems.forEach((item) => {
    if (!uniqueItems.some((uniqueItem) => uniqueItem.id === item.id)) {
      uniqueItems.push(item);
    }
  });

  return uniqueItems;
}

export function createHiraganaLesson({
  id,
  title,
  description,
  estimatedMinutes,
  category,
  pronunciationTitle,
  pronunciationInstruction,
  pronunciationMeaning,
  reviewTitle,
  reviewInstruction,
  items,
}: CreateKanaLessonInput): Lesson {
  const choices = getChoices(items);

  const vocabularyActivities: VocabularyActivity[] = items.map((item) => ({
    id: `vocab-${item.id}`,
    type: "vocabulary",
    character: item.kana,
    reading: item.reading,
    meaning: `Bunyi huruf: ${item.reading}`,
    example: item.example,
    exampleReading: item.exampleReading,
    exampleMeaning: item.exampleMeaning,
    audioText: item.kana,
  }));

  const pronunciationActivity: PronunciationActivity = {
    id: `pronunciation-${id}`,
    type: "pronunciation",
    title: pronunciationTitle,
    instruction: pronunciationInstruction,
    targetText: items.map((item) => item.kana).join(" "),
    targetReading: items.map((item) => item.reading).join("・"),
    meaning: pronunciationMeaning,
    audioText: items.map((item) => item.kana).join(""),
  };

  const listeningActivities: ListeningActivity[] = getUniqueListeningItems(
    items
  ).map((item) => ({
    id: `listening-${item.id}`,
    type: "listening",
    title: "Dengarkan bunyi huruf",
    instruction: "Tekan tombol speaker, lalu pilih huruf yang Anda dengar.",
    audioText: item.kana,
    choices,
    correctAnswer: item.kana,
    explanation: `Bunyi yang diputar adalah ${item.kana}, dibaca '${item.reading}'.`,
  }));

  const quizActivities: QuizActivity[] = getUniqueQuizItems(items).map(
    (item) => ({
      id: `quiz-${item.id}`,
      type: "quiz",
      question: `Huruf mana yang dibaca "${item.reading}"?`,
      choices,
      correctAnswer: item.kana,
      explanation: item.note ?? `${item.kana} dibaca '${item.reading}'.`,
    })
  );

  const reviewActivity: ReviewActivity = {
    id: `review-${id}`,
    type: "review",
    title: reviewTitle,
    instruction: reviewInstruction,
    items: items.map((item) => ({
      label: item.kana,
      reading: item.reading,
      meaning: `${item.example} = ${item.exampleMeaning}`,
      audioText: item.kana,
    })),
  };

  const activities: LessonActivity[] = [
    ...vocabularyActivities,
    pronunciationActivity,
    ...listeningActivities,
    ...quizActivities,
    reviewActivity,
  ];

  return {
    id,
    title,
    description,
    estimatedMinutes,
    category: category ?? getCategoryFromId(id),
    activities,
  };
}

export const createKanaLesson = createHiraganaLesson;