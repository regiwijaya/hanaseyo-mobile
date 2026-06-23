import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import * as Speech from "expo-speech";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type SpeakerButtonProps = {
  text: string;
  label?: string;
  language?: string;
};

export function SpeakerButton({
  text,
  label = "Dengar",
  language = "ja-JP",
}: SpeakerButtonProps) {
  function handlePress() {
    Speech.stop();
    Speech.speak(text, {
      language,
      rate: 0.82,
      pitch: 1,
    });
  }

  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={handlePress}>
      <Text style={styles.icon}>🔊</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.75,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.primaryDark,
  },
});