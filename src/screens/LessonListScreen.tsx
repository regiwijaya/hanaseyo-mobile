import React, { useCallback, useMemo, useState } from "react";
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
import { Lesson } from "../types/curriculum";

type Props = NativeStackScreenProps<RootStackParamList, "LessonList">;

type ChartRouteName = "HiraganaChart" | "KatakanaChart";

type LessonSection = {
  id: string;
  title: string;
  subtitle: string;
  chartButtonTitle?: string;
  chartRoute?: ChartRouteName;
  lessons: Lesson[];
};

export function LessonListScreen({ navigation, route }: Props) {
  const { levelId } = route.params;
  const level = getLevelById(levelId);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCompletedLessonIds().then(setCompletedLessonIds);
    }, [])
  );

  const lessonSections = useMemo<LessonSection[]>(() => {
    if (!level) {
      return [];
    }

    if (levelId !== "letters") {
      return [
        {
          id: "all-lessons",
          title: "Daftar Lesson",
          subtitle: `${level.lessons.length} lesson tersedia`,
          lessons: level.lessons,
        },
      ];
    }

    const hiraganaLessons = level.lessons.filter(
      (lesson) => lesson.category === "hiragana"
    );

    const katakanaLessons = level.lessons.filter(
      (lesson) => lesson.category === "katakana"
    );

    return [
      {
        id: "hiragana",
        title: "Hiragana",
        subtitle: `${hiraganaLessons.length} lesson dasar`,
        chartButtonTitle: "Buka Tabel Hiragana",
        chartRoute: "HiraganaChart",
        lessons: hiraganaLessons,
      },
      {
        id: "katakana",
        title: "Katakana",
        subtitle: `${katakanaLessons.length} lesson dasar`,
        chartButtonTitle: "Buka Tabel Katakana",
        chartRoute: "KatakanaChart",
        lessons: katakanaLessons,
      },
    ];
  }, [level, levelId]);

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

  function getSectionCompletedCount(lessons: Lesson[]) {
    return lessons.filter((lesson) => completedLessonIds.includes(lesson.id))
      .length;
  }

  function navigateToChart(chartRoute: ChartRouteName) {
    if (chartRoute === "HiraganaChart") {
      navigation.navigate("HiraganaChart");
      return;
    }

    if (chartRoute === "KatakanaChart") {
      navigation.navigate("KatakanaChart");
    }
  }

  function renderLessonCard(lesson: Lesson, index: number) {
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
            {lesson.activities.length} aktivitas • ± {lesson.estimatedMinutes}{" "}
            menit
          </AppText>
        </AppCard>
      </Pressable>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <AppText variant="heading">{level.title}</AppText>
        <AppText color={colors.textMuted}>{level.description}</AppText>
      </View>

      <AppCard>
        <View style={styles.cardHeader}>
          <AppText variant="subheading">Progress Total</AppText>
          <StatusBadge label={`${completedCount}/${totalLessons}`} tone="success" />
        </View>

        <AppText color={colors.textMuted} style={styles.progressText}>
          {completedCount} dari {totalLessons} lesson selesai
        </AppText>

        <ProgressBar progress={progress} />
      </AppCard>

      <View style={styles.sections}>
        {lessonSections.map((section) => {
          const sectionCompletedCount = getSectionCompletedCount(
            section.lessons
          );
          const sectionProgress =
            section.lessons.length > 0
              ? sectionCompletedCount / section.lessons.length
              : 0;

          return (
            <AppCard key={section.id} style={styles.sectionCard}>
              <View style={styles.cardHeader}>
                <View style={styles.lessonTitleWrapper}>
                  <AppText variant="heading">{section.title}</AppText>
                  <AppText color={colors.textMuted}>{section.subtitle}</AppText>
                </View>

                <StatusBadge
                  label={`${sectionCompletedCount}/${section.lessons.length}`}
                  tone="success"
                />
              </View>

              <ProgressBar progress={sectionProgress} />

              {section.chartRoute && section.chartButtonTitle ? (
                <AppButton
                  title={section.chartButtonTitle}
                  variant="secondary"
                  onPress={() => navigateToChart(section.chartRoute!)}
                />
              ) : null}

              <View style={styles.lessonList}>
                {section.lessons.map((lesson, index) =>
                  renderLessonCard(lesson, index)
                )}
              </View>
            </AppCard>
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
  progressText: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  sections: {
    gap: spacing.lg,
  },
  sectionCard: {
    gap: spacing.lg,
  },
  lessonList: {
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