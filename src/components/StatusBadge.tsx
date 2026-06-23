import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type StatusBadgeTone = "primary" | "success" | "muted" | "locked";

type StatusBadgeProps = {
  label: string;
  tone?: StatusBadgeTone;
};

export function StatusBadge({ label, tone = "muted" }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, styles[tone]]}>
      <Text style={[styles.text, tone === "locked" ? styles.lockedText : null]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  primary: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.primary,
  },
  success: {
    backgroundColor: "#EAF8F1",
    borderColor: colors.success,
  },
  muted: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  locked: {
    backgroundColor: "#F3F4F6",
    borderColor: colors.disabled,
  },
  text: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  lockedText: {
    color: colors.textMuted,
  },
});