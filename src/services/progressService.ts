import AsyncStorage from "@react-native-async-storage/async-storage";

const COMPLETED_LESSONS_KEY = "@hanaseyo/completedLessons";

export async function getCompletedLessonIds(): Promise<string[]> {
  try {
    const value = await AsyncStorage.getItem(COMPLETED_LESSONS_KEY);

    if (!value) {
      return [];
    }

    return JSON.parse(value);
  } catch (error) {
    console.warn("Failed to load completed lessons:", error);
    return [];
  }
}

export async function markLessonCompleted(lessonId: string): Promise<void> {
  try {
    const currentIds = await getCompletedLessonIds();

    if (currentIds.includes(lessonId)) {
      return;
    }

    const nextIds = [...currentIds, lessonId];
    await AsyncStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(nextIds));
  } catch (error) {
    console.warn("Failed to save completed lesson:", error);
  }
}

export async function isLessonCompleted(lessonId: string): Promise<boolean> {
  const completedLessonIds = await getCompletedLessonIds();
  return completedLessonIds.includes(lessonId);
}