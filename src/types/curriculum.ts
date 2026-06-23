export type ActivityType =
  | "vocabulary"
  | "quiz"
  | "pronunciation"
  | "listening";

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

export type PronunciationActivity = {
  id: string;
  type: "pronunciation";
  title: string;
  instruction: string;
  targetText: string;
  targetReading?: string;
  meaning?: string;
  audioText: string;
};

export type ListeningActivity = {
  id: string;
  type: "listening";
  title: string;
  instruction: string;
  audioText: string;
  choices: string[];
  correctAnswer: string;
  explanation?: string;
};

export type LessonActivity =
  | VocabularyActivity
  | QuizActivity
  | PronunciationActivity
  | ListeningActivity;

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