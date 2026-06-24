import { LessonCategory } from "../types/curriculum";

export type RootStackParamList = {
  Home: undefined;
  Solo: undefined;
  LevelList: undefined;
  LettersHome: undefined;
  LessonList: {
    levelId: string;
    category?: LessonCategory;
  };
  Activity: {
    levelId: string;
    lessonId: string;
  };
  HiraganaChart: undefined;
  KatakanaChart: undefined;
};