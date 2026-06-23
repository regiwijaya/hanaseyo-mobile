import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppButton } from "../components/AppButton";
import { AppText } from "../components/AppText";
import { ProgressBar } from "../components/ProgressBar";
import { getLessonById } from "../data/curriculum";
import { ActivityRenderer } from "../features/activity/ActivityRenderer";
import { RootStackParamList } from "../navigation/types";
import { markLessonCompleted } from "../services/progressService";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Activity">;

export function ActivityScreen({ navigation, route }: Props) {
  const { levelId, lessonId } = route.params;
  const lesson = getLessonById(levelId, lessonId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (!lesson) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <AppText variant="heading">Lesson tidak ditemukan</AppText>
        <AppButton
          title="Kembali"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    );
  }

  const activeLesson = lesson;
  const currentActivity = activeLesson.activities[currentIndex];

  if (!currentActivity) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <AppText variant="heading">Aktivitas tidak ditemukan</AppText>
        <AppButton
          title="Kembali"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    );
  }

  const isFirstActivity = currentIndex === 0;
  const isLastActivity = currentIndex === activeLesson.activities.length - 1;
  const progress = (currentIndex + 1) / activeLesson.activities.length;

  function goToPreviousActivity() {
    if (isFirstActivity) {
      return;
    }

    setSelectedAnswer(null);
    setCurrentIndex((value) => value - 1);
  }

  async function goToNextActivity() {
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <AppText variant="small" color={colors.textMuted}>
          {currentIndex + 1} / {activeLesson.activities.length}
        </AppText>

        <AppText variant="heading">{activeLesson.title}</AppText>

        <ProgressBar progress={progress} />
      </View>

      <ActivityRenderer
        activity={currentActivity}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={setSelectedAnswer}
      />

      <View style={styles.footer}>
        <AppButton
          title="Sebelumnya"
          variant="secondary"
          disabled={isFirstActivity}
          onPress={goToPreviousActivity}
        />

        <AppButton
          title={isLastActivity ? "Selesaikan Lesson" : "Lanjut"}
          onPress={goToNextActivity}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.md,
  },
  footer: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
});