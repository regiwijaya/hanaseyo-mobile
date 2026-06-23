import React from "react";
import { StyleSheet, View } from "react-native";

import { AppButton } from "../../components/AppButton";
import { spacing } from "../../theme/spacing";

type ActivityFooterProps = {
  isFirstActivity: boolean;
  isLastActivity: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function ActivityFooter({
  isFirstActivity,
  isLastActivity,
  onPrevious,
  onNext,
}: ActivityFooterProps) {
  return (
    <View style={styles.footer}>
      <AppButton
        title="Sebelumnya"
        variant="secondary"
        disabled={isFirstActivity}
        onPress={onPrevious}
      />

      <AppButton
        title={isLastActivity ? "Selesaikan Lesson" : "Lanjut"}
        onPress={onNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    gap: spacing.md,
  },
});