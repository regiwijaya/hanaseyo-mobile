import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppButton } from "../components/AppButton";
import { AppText } from "../components/AppText";
import { ScreenContainer } from "../components/ScreenContainer";
import { getLessonById } from "../data/curriculum";
import { ActivityFooter } from "../features/activity/ActivityFooter";
import { ActivityRenderer } from "../features/activity/ActivityRenderer";
import { LessonHeader } from "../features/lesson/LessonHeader";
import { RootStackParamList } from "../navigation/types";
import { markLessonCompleted } from "../services/progressService";
import { spacing } from "../theme/spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Activity">;

export function ActivityScreen({ navigation, route }: Props) {
  const { levelId, lessonId } = route.params;
  const lesson = getLessonById(levelId, lessonId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (!lesson) {
    return (
      <ScreenContainer>
        <AppText variant="heading">Lesson tidak ditemukan</AppText>
        <AppButton
          title="Kembali"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ScreenContainer>
    );
  }

  const activeLesson = lesson;
  const currentActivity = activeLesson.activities[currentIndex];

  if (!currentActivity) {
    return (
      <ScreenContainer>
        <AppText variant="heading">Aktivitas tidak ditemukan</AppText>
        <AppButton
          title="Kembali"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ScreenContainer>
    );
  }

  const isFirstActivity = currentIndex === 0;
  const isLastActivity = currentIndex === activeLesson.activities.length - 1;
  const progress = (currentIndex + 1) / activeLesson.activities.length;

  const activityNeedsAnswer =
    currentActivity.type === "quiz" || currentActivity.type === "listening";

  const isNextDisabled = activityNeedsAnswer && !selectedAnswer;

  function goToPreviousActivity() {
    if (isFirstActivity) {
      return;
    }

    setSelectedAnswer(null);
    setCurrentIndex((value) => value - 1);
  }

  async function goToNextActivity() {
    if (isNextDisabled) {
      return;
    }

    if (isLastActivity) {
      await markLessonCompleted(activeLesson.id);

      Alert.alert("Lesson selesai", "Progress belajar Anda sudah disimpan.", [
        {
          text: "Kembali ke daftar lesson",
          onPress: () => navigation.goBack(),
        },
      ]);

      return;
    }

    setSelectedAnswer(null);
    setCurrentIndex((value) => value + 1);
  }

  return (
    <ScreenContainer contentStyle={styles.container}>
      <LessonHeader
        title={activeLesson.title}
        currentActivityNumber={currentIndex + 1}
        totalActivities={activeLesson.activities.length}
        progress={progress}
      />

      <ActivityRenderer
        activity={currentActivity}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={setSelectedAnswer}
      />

      <ActivityFooter
        isFirstActivity={isFirstActivity}
        isLastActivity={isLastActivity}
        isNextDisabled={isNextDisabled}
        nextDisabledMessage={
          isNextDisabled ? "Pilih jawaban terlebih dahulu untuk lanjut." : ""
        }
        onPrevious={goToPreviousActivity}
        onNext={goToNextActivity}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
});