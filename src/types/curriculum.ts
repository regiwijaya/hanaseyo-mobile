export type ActivityType = "vocabulary" | "quiz";

export type VocabularyActivity = {
  id: string;
  type: "vocabulary";
  character: string;
  reading: string;
  meaning: string;
  example?: string;
  exampleReading?: string;
  exampleMeaning?: string;
  audioText: string;
};

export type QuizActivity = {
  id: string;
  type: "quiz";
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation?: string;
};

export type LessonActivity = VocabularyActivity | QuizActivity;

export type Lesson = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  activities: LessonActivity[];
};

export type CurriculumLevel = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isLocked?: boolean;
  lessons: Lesson[];
};