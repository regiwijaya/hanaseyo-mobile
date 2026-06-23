import React from "react";
import { StyleSheet, View } from "react-native";

import { AppButton } from "../../components/AppButton";
import { AppText } from "../../components/AppText";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

type ActivityFooterProps = {
  isFirstActivity: boolean;
  isLastActivity: boolean;
  isNextDisabled?: boolean;
  nextDisabledMessage?: string;
  onPrevious: () => void;
  onNext: () => void;
};

export function ActivityFooter({
  isFirstActivity,
  isLastActivity,
  isNextDisabled = false,
  nextDisabledMessage,
  onPrevious,
  onNext,
}: ActivityFooterProps) {
  return (
    <View style={styles.footer}>
      {isNextDisabled && nextDisabledMessage ? (
        <AppText variant="small" color={colors.textMuted} align="center">
          {nextDisabledMessage}
        </AppText>
      ) : null}

      <AppButton
        title="Sebelumnya"
        variant="secondary"
        disabled={isFirstActivity}
        onPress={onPrevious}
      />

      <AppButton
        title={isLastActivity ? "Selesaikan Lesson" : "Lanjut"}
        disabled={isNextDisabled}
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