import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { ProgressBar } from "../components/ProgressBar";
import { getLevelById } from "../data/curriculum";
import { RootStackParamList } from "../navigation/types";
import { getCompletedLessonIds } from "../services/progressService";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = NativeStackScreenProps<RootStackParamList, "LessonList">;

export function LessonListScreen({ navigation, route }: Props) {
  const { levelId } = route.params;
  const level = getLevelById(levelId);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCompletedLessonIds().then(setCompletedLessonIds);
    }, [])
  );

  if (!level) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <AppText variant="heading">Level tidak ditemukan</AppText>
      </ScrollView>
    );
  }

  const totalLessons = level.lessons.length;
  const completedCount = level.lessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id)
  ).length;

  const progress = totalLessons > 0 ? completedCount / totalLessons : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <AppText variant="heading">{level.title}</AppText>
        <AppText color={colors.textMuted}>{level.description}</AppText>
      </View>

      <AppCard>
        <AppText variant="subheading">Progress</AppText>
        <AppText color={colors.textMuted} style={styles.progressText}>
          {completedCount} dari {totalLessons} lesson selesai
        </AppText>
        <ProgressBar progress={progress} />
      </AppCard>

      <View style={styles.list}>
        {level.lessons.map((lesson) => {
          const isCompleted = completedLessonIds.includes(lesson.id);

          return (
            <Pressable
              key={lesson.id}
              onPress={() =>
                navigation.navigate("Activity", {
                  levelId,
                  lessonId: lesson.id,
                })
              }
              style={({ pressed }) => pressed && styles.pressed}
            >
              <AppCard>
                <View style={styles.cardHeader}>
                  <AppText variant="subheading">{lesson.title}</AppText>

                  {isCompleted ? (
                    <AppText variant="small" color={colors.success}>
                      Selesai
                    </AppText>
                  ) : (
                    <AppText variant="small" color={colors.textMuted}>
                      Baru
                    </AppText>
                  )}
                </View>

                <AppText color={colors.textMuted} style={styles.description}>
                  {lesson.description}
                </AppText>

                <AppText variant="small" color={colors.textMuted}>
                  {lesson.activities.length} aktivitas • ±{" "}
                  {lesson.estimatedMinutes} menit
                </AppText>
              </AppCard>
            </Pressable>
          );
        })}
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
    gap: spacing.sm,
  },
  progressText: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  pressed: {
    opacity: 0.78,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  description: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
});