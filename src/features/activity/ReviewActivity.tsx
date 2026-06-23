import React from "react";
import { StyleSheet, View } from "react-native";

import { AppCard } from "../../components/AppCard";
import { AppText } from "../../components/AppText";
import { SpeakerButton } from "../../components/SpeakerButton";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { ReviewActivity as ReviewActivityType } from "../../types/curriculum";

type ReviewActivityProps = {
  activity: ReviewActivityType;
};

export function ReviewActivity({ activity }: ReviewActivityProps) {
  return (
    <View style={styles.container}>
      <AppCard style={styles.headerCard}>
        <AppText variant="small" color={colors.textMuted} align="center">
          Review
        </AppText>

        <AppText variant="heading" align="center" style={styles.title}>
          {activity.title}
        </AppText>

        <AppText color={colors.textMuted} align="center">
          {activity.instruction}
        </AppText>
      </AppCard>

      <View style={styles.list}>
        {activity.items.map((item, index) => (
          <AppCard key={`${item.label}-${index}`} style={styles.itemCard}>
            <View style={styles.itemMain}>
              <View style={styles.characterBox}>
                <AppText variant="heading" align="center">
                  {item.label}
                </AppText>
              </View>

              <View style={styles.itemText}>
                <AppText variant="subheading">{item.reading}</AppText>

                {item.meaning ? (
                  <AppText color={colors.textMuted}>{item.meaning}</AppText>
                ) : null}
              </View>
            </View>

            {item.audioText ? (
              <SpeakerButton text={item.audioText} label="Dengar" />
            ) : null}
          </AppCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  headerCard: {
    alignItems: "center",
    gap: spacing.md,
  },
  title: {
    marginTop: spacing.xs,
  },
  list: {
    gap: spacing.md,
  },
  itemCard: {
    gap: spacing.md,
  },
  itemMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  characterBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    flex: 1,
    gap: spacing.xs,
  },
});