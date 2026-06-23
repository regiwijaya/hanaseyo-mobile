import React from "react";
import { StyleSheet, View } from "react-native";

import { AppCard } from "../../components/AppCard";
import { AppText } from "../../components/AppText";
import { SpeakerButton } from "../../components/SpeakerButton";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { VocabularyActivity as VocabularyActivityType } from "../../types/curriculum";

type VocabularyActivityProps = {
  activity: VocabularyActivityType;
};

export function VocabularyActivity({ activity }: VocabularyActivityProps) {
  return (
    <View style={styles.container}>
      <AppCard style={styles.mainCard}>
        <AppText variant="small" color={colors.textMuted} align="center">
          Perhatikan huruf berikut
        </AppText>

        <AppText variant="japaneseLarge" align="center">
          {activity.character}
        </AppText>

        <AppText variant="heading" align="center">
          {activity.reading}
        </AppText>

        <AppText color={colors.textMuted} align="center">
          {activity.meaning}
        </AppText>

        <View style={styles.speakerWrapper}>
          <SpeakerButton text={activity.audioText} />
        </View>
      </AppCard>

      {activity.example ? (
        <AppCard>
          <AppText variant="subheading">Contoh kata</AppText>

          <View style={styles.exampleRow}>
            <AppText variant="heading">{activity.example}</AppText>
            <SpeakerButton
              text={activity.example}
              label="Dengar contoh"
            />
          </View>

          <AppText color={colors.textMuted}>
            {activity.exampleReading}
            {activity.exampleMeaning ? ` = ${activity.exampleMeaning}` : ""}
          </AppText>
        </AppCard>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  mainCard: {
    alignItems: "center",
  },
  speakerWrapper: {
    marginTop: spacing.lg,
    width: "100%",
  },
  exampleRow: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
});