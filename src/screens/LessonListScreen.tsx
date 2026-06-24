import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { ProgressBar } from "../components/ProgressBar";
import { ScreenContainer } from "../components/ScreenContainer";
import { StatusBadge } from "../components/StatusBadge";
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
      <ScreenContainer>
        <AppText variant="heading">Level tidak ditemukan</AppText>
      </ScreenContainer>
    );
  }

  const totalLessons = level.lessons.length;
  const completedCount = level.lessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id)
  ).length;

  const progress = totalLessons > 0 ? completedCount / totalLessons : 0;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <AppText variant="heading">{level.title}</AppText>
        <AppText color={colors.textMuted}>{level.description}</AppText>
      </View>

      {levelId === "letters" ? (
        <View style={styles.referenceList}>
          <AppCard>
            <View style={styles.cardHeader}>
              <View style={styles.lessonTitleWrapper}>
                <AppText variant="subheading">Tabel Hiragana</AppText>
                <AppText color={colors.textMuted} style={styles.description}>
                  Lihat semua Hiragana dasar dalam satu tabel dan dengarkan
                  bunyi setiap huruf.
                </AppText>
              </View>

              <StatusBadge label="Referensi" tone="primary" />
            </View>

            <AppButton
              title="Buka Tabel Hiragana"
              variant="secondary"
              onPress={() => navigation.navigate("HiraganaChart")}
            />
          </AppCard>

          <AppCard>
            <View style={styles.cardHeader}>
              <View style={styles.lessonTitleWrapper}>
                <AppText variant="subheading">Tabel Katakana</AppText>
                <AppText color={colors.textMuted} style={styles.description}>
                  Lihat semua Katakana dasar dalam satu tabel dan dengarkan
                  bunyi setiap huruf.
                </AppText>
              </View>

              <StatusBadge label="Referensi" tone="primary" />
            </View>

            <AppButton
              title="Buka Tabel Katakana"
              variant="secondary"
              onPress={() => navigation.navigate("KatakanaChart")}
            />
          </AppCard>
        </View>
      ) : null}

      <AppCard>
        <View style={styles.cardHeader}>
          <AppText variant="subheading">Progress</AppText>
          <StatusBadge label={`${completedCount}/${totalLessons}`} tone="success" />
        </View>

        <AppText color={colors.textMuted} style={styles.progressText}>
          {completedCount} dari {totalLessons} lesson selesai
        </AppText>

        <ProgressBar progress={progress} />
      </AppCard>

      <View style={styles.list}>
        {level.lessons.map((lesson, index) => {
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
                  <View style={styles.lessonTitleWrapper}>
                    <AppText variant="small" color={colors.textMuted}>
                      Lesson {index + 1}
                    </AppText>

                    <AppText variant="subheading">{lesson.title}</AppText>
                  </View>

                  <StatusBadge
                    label={isCompleted ? "Selesai" : "Baru"}
                    tone={isCompleted ? "success" : "muted"}
                  />
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
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  referenceList: {
    gap: spacing.md,
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
  lessonTitleWrapper: {
    flex: 1,
    gap: spacing.xs,
  },
  description: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
});