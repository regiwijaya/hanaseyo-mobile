import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { ProgressBar } from "../components/ProgressBar";
import { ScreenContainer } from "../components/ScreenContainer";
import { StatusBadge } from "../components/StatusBadge";
import { curriculum } from "../data/curriculum";
import { RootStackParamList } from "../navigation/types";
import { getCompletedLessonIds } from "../services/progressService";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

type AvailableLesson = {
  levelId: string;
  lessonId: string;
  title: string;
  description: string;
};

export function HomeScreen({ navigation }: Props) {
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCompletedLessonIds().then(setCompletedLessonIds);
    }, [])
  );

  const availableLessons = useMemo<AvailableLesson[]>(() => {
    return curriculum
      .filter((level) => !level.isLocked)
      .flatMap((level) =>
        level.lessons.map((lesson) => ({
          levelId: level.id,
          lessonId: lesson.id,
          title: lesson.title,
          description: lesson.description,
        }))
      );
  }, []);

  const nextLesson =
    availableLessons.find(
      (lesson) => !completedLessonIds.includes(lesson.lessonId)
    ) ?? availableLessons[0];

  const completedCount = availableLessons.filter((lesson) =>
    completedLessonIds.includes(lesson.lessonId)
  ).length;

  const progress =
    availableLessons.length > 0 ? completedCount / availableLessons.length : 0;

  function handleContinueLearning() {
    if (!nextLesson) {
      navigation.navigate("LevelList");
      return;
    }

    navigation.navigate("Activity", {
      levelId: nextLesson.levelId,
      lessonId: nextLesson.lessonId,
    });
  }

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <StatusBadge label="MVP Foundation" tone="primary" />

        <AppText variant="title">Hanaseyo</AppText>

        <AppText color={colors.textMuted}>
          Belajar bahasa Jepang dari nol dengan alur yang rapi, bertahap, dan
          mudah diikuti.
        </AppText>
      </View>

      <AppCard style={styles.continueCard}>
        <View style={styles.cardHeader}>
          <View style={styles.flex}>
            <AppText variant="subheading">Lanjutkan Belajar</AppText>
            <AppText color={colors.textMuted} style={styles.miniText}>
              {nextLesson
                ? nextLesson.title
                : "Pilih level belajar terlebih dahulu"}
            </AppText>
          </View>

          <StatusBadge
            label={`${completedCount}/${availableLessons.length}`}
            tone="success"
          />
        </View>

        {nextLesson ? (
          <AppText color={colors.textMuted} style={styles.cardText}>
            {nextLesson.description}
          </AppText>
        ) : null}

        <ProgressBar progress={progress} />

        <View style={styles.buttonSpacing}>
          <AppButton title="Mulai / Lanjutkan" onPress={handleContinueLearning} />
        </View>
      </AppCard>

      <AppCard>
        <AppText variant="subheading">Mode Solo</AppText>

        <AppText color={colors.textMuted} style={styles.cardText}>
          Belajar mandiri berdasarkan kurikulum: huruf Jepang, level dasar,
          menengah, dan lanjutan.
        </AppText>

        <AppButton
          title="Masuk Mode Solo"
          variant="secondary"
          onPress={() => navigation.navigate("Solo")}
        />
      </AppCard>

      <AppCard>
        <AppText variant="subheading">Activity Engine</AppText>

        <AppText color={colors.textMuted} style={styles.miniText}>
          Fondasi aplikasi sudah memakai sistem aktivitas. Kita bisa menambah
          vocabulary, quiz, listening, recording, grammar, dan review tanpa
          membuat screen baru satu per satu.
        </AppText>
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.sm,
    paddingTop: spacing.lg,
  },
  continueCard: {
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  cardText: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  miniText: {
    marginTop: spacing.xs,
  },
  buttonSpacing: {
    marginTop: spacing.sm,
  },
});