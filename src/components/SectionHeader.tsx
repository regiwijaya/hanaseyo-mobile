import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { AppText } from "./AppText";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading">{title}</AppText>

      {subtitle ? (
        <AppText color={colors.textMuted}>{subtitle}</AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
});