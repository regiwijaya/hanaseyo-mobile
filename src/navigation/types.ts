export type RootStackParamList = {
  Home: undefined;
  Solo: undefined;
  LevelList: undefined;
  LessonList: {
    levelId: string;
  };
  Activity: {
    levelId: string;
    lessonId: string;
  };
  HiraganaChart: undefined;
};