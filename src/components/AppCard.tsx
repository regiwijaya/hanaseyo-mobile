import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type AppCardProps = ViewProps & {
  children: React.ReactNode;
};

export function AppCard({ children, style, ...props }: AppCardProps) {
  return (
    <View {...props} style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});