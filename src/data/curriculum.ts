import { CurriculumLevel, Lesson } from "../types/curriculum";
import { hiraganaLessons } from "./lessons/hiraganaLessons";

export const curriculum: CurriculumLevel[] = [
  {
    id: "letters",
    title: "Belajar Huruf Jepang",
    subtitle: "Mulai dari Hiragana, Katakana, dan Kanji dasar",
    description:
      "Tahap pertama untuk membangun fondasi membaca bahasa Jepang dari nol.",
    lessons: hiraganaLessons,
  },
  {
    id: "basic",
    title: "Level Dasar",
    subtitle: "Kosakata dan pola kalimat dasar",
    description:
      "Belajar salam, perkenalan, angka, waktu, dan kalimat dasar bahasa Jepang.",
    isLocked: true,
    lessons: [],
  },
  {
    id: "intermediate",
    title: "Level Menengah",
    subtitle: "Percakapan dan tata bahasa lanjutan",
    description:
      "Belajar memahami kalimat lebih panjang, percakapan sehari-hari, dan bacaan pendek.",
    isLocked: true,
    lessons: [],
  },
  {
    id: "advanced",
    title: "Level Lanjutan",
    subtitle: "Bacaan, listening, dan ekspresi natural",
    description:
      "Belajar bahasa Jepang yang lebih natural untuk studi, kerja, dan kehidupan di Jepang.",
    isLocked: true,
    lessons: [],
  },
];

export function getLevelById(levelId: string): CurriculumLevel | undefined {
  return curriculum.find((level) => level.id === levelId);
}

export function getLessonById(
  levelId: string,
  lessonId: string
): Lesson | undefined {
  const level = getLevelById(levelId);
  return level?.lessons.find((lesson) => lesson.id === lessonId);
}