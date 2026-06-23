import React from "react";
import { StyleSheet, View } from "react-native";

import { AppCard } from "../../components/AppCard";
import { AppText } from "../../components/AppText";
import { ProgressBar } from "../../components/ProgressBar";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

type LessonHeaderProps = {
  title: string;
  currentActivityNumber: number;
  totalActivities: number;
  progress: number;
};

export function LessonHeader({
  title,
  currentActivityNumber,
  totalActivities,
  progress,
}: LessonHeaderProps) {
  return (
    <AppCard>
      <View style={styles.topRow}>
        <AppText variant="small" color={colors.textMuted}>
          Aktivitas {currentActivityNumber} dari {totalActivities}
        </AppText>

        <AppText variant="small" color={colors.primaryDark}>
          {Math.round(progress * 100)}%
        </AppText>
      </View>

      <AppText variant="heading" style={styles.title}>
        {title}
      </AppText>

      <ProgressBar progress={progress} />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
});