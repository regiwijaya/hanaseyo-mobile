import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { ProgressBar } from "../components/ProgressBar";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import { getLevelById } from "../data/curriculum";
import { RootStackParamList } from "../navigation/types";
import { getCompletedLessonIds } from "../services/progressService";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { Lesson, LessonCategory } from "../types/curriculum";

type Props = NativeStackScreenProps<RootStackParamList, "LettersHome">;

type ChartRouteName = "HiraganaChart" | "KatakanaChart";

type LetterMenuItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category?: LessonCategory;
  chartRoute?: ChartRouteName;
  isLocked?: boolean;
};

const letterMenuItems: LetterMenuItem[] = [
  {
    id: "hiragana",
    title: "Hiragana",
    subtitle: "ひらがな",
    description:
      "Huruf dasar Jepang yang banyak dipakai untuk kata asli Jepang, partikel, dan akhiran tata bahasa.",
    category: "hiragana",
    chartRoute: "HiraganaChart",
  },
  {
    id: "katakana",
    title: "Katakana",
    subtitle: "カタカナ",
    description:
      "Huruf Jepang yang banyak dipakai untuk kata serapan, nama asing, istilah luar negeri, dan penekanan.",
    category: "katakana",
    chartRoute: "KatakanaChart",
  },
  {
    id: "kanji-basic",
    title: "Kanji Dasar",
    subtitle: "基本漢字",
    description:
      "Tahap berikutnya setelah Hiragana dan Katakana. Nanti berisi Kanji paling dasar untuk pemula.",
    category: "kanji",
    isLocked: true,
  },
  {
    id: "letter-review",
    title: "Review Huruf",
    subtitle: "まとめ練習",
    description:
      "Latihan campuran untuk menguji hafalan Hiragana, Katakana, bunyi huruf, dan bacaan.",
    category: "general",
    isLocked: true,
  },
];

export function LettersHomeScreen({ navigation }: Props) {
  const lettersLevel = getLevelById("letters");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCompletedLessonIds().then(setCompletedLessonIds);
    }, [])
  );

  const allLessons = lettersLevel?.lessons ?? [];

  const totalCompletedCount = allLessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id)
  ).length;

  const totalProgress =
    allLessons.length > 0 ? totalCompletedCount / allLessons.length : 0;

  const lessonGroups = useMemo(() => {
    return {
      hiragana: allLessons.filter((lesson) => lesson.category === "hiragana"),
      katakana: allLessons.filter((lesson) => lesson.category === "katakana"),
      kanji: allLessons.filter((lesson) => lesson.category === "kanji"),
      vocabulary: allLessons.filter((lesson) => lesson.category === "vocabulary"),
      grammar: allLessons.filter((lesson) => lesson.category === "grammar"),
      general: allLessons.filter((lesson) => lesson.category === "general"),
    };
  }, [allLessons]);

  function getLessonsByCategory(category?: LessonCategory): Lesson[] {
    if (!category) {
      return [];
    }

    return lessonGroups[category];
  }

  function getCompletedCount(lessons: Lesson[]) {
    return lessons.filter((lesson) => completedLessonIds.includes(lesson.id))
      .length;
  }

  function navigateToChart(chartRoute?: ChartRouteName) {
    if (chartRoute === "HiraganaChart") {
      navigation.navigate("HiraganaChart");
      return;
    }

    if (chartRoute === "KatakanaChart") {
      navigation.navigate("KatakanaChart");
    }
  }

  function openCategoryLessons(category?: LessonCategory) {
    if (!category) {
      return;
    }

    navigation.navigate("LessonList", {
      levelId: "letters",
      category,
    });
  }

  return (
    <ScreenContainer>
      <SectionHeader
        title="Belajar Huruf Jepang"
        subtitle="Mulai dari Hiragana dan Katakana, lalu nanti lanjut ke Kanji dasar dan latihan review."
      />

      <AppCard>
        <View style={styles.cardHeader}>
          <View style={styles.titleWrapper}>
            <AppText variant="subheading">Progress Huruf Jepang</AppText>
            <AppText color={colors.textMuted}>
              {totalCompletedCount} dari {allLessons.length} lesson selesai
            </AppText>
          </View>

          <StatusBadge
            label={`${totalCompletedCount}/${allLessons.length}`}
            tone="success"
          />
        </View>

        <ProgressBar progress={totalProgress} />
      </AppCard>

      <View style={styles.menuList}>
        {letterMenuItems.map((item) => {
          const lessons = getLessonsByCategory(item.category);
          const completedCount = getCompletedCount(lessons);
          const progress =
            lessons.length > 0 ? completedCount / lessons.length : 0;

          return (
            <AppCard
              key={item.id}
              style={[styles.menuCard, item.isLocked ? styles.lockedCard : null]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.titleWrapper}>
                  <AppText variant="heading">{item.title}</AppText>
                  <AppText color={colors.textMuted}>{item.subtitle}</AppText>
                </View>

                <StatusBadge
                  label={
                    item.isLocked
                      ? "Segera hadir"
                      : `${completedCount}/${lessons.length}`
                  }
                  tone={item.isLocked ? "muted" : "success"}
                />
              </View>

              <AppText color={colors.textMuted}>{item.description}</AppText>

              {lessons.length > 0 ? (
                <View style={styles.progressArea}>
                  <ProgressBar progress={progress} />
                  <AppText variant="small" color={colors.textMuted}>
                    {lessons.length} lesson tersedia
                  </AppText>
                </View>
              ) : null}

              <View style={styles.buttonGroup}>
                <AppButton
                  title={item.isLocked ? "Belum tersedia" : `Mulai ${item.title}`}
                  disabled={item.isLocked}
                  onPress={() => openCategoryLessons(item.category)}
                />

                {item.chartRoute ? (
                  <AppButton
                    title={`Buka Tabel ${item.title}`}
                    variant="secondary"
                    onPress={() => navigateToChart(item.chartRoute)}
                  />
                ) : null}
              </View>
            </AppCard>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  titleWrapper: {
    flex: 1,
    gap: spacing.xs,
  },
  menuList: {
    gap: spacing.md,
  },
  menuCard: {
    gap: spacing.lg,
  },
  lockedCard: {
    opacity: 0.78,
  },
  progressArea: {
    gap: spacing.sm,
  },
  buttonGroup: {
    gap: spacing.md,
  },
});