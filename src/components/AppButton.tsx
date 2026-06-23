import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type AppButtonVariant = "primary" | "secondary" | "ghost";

type AppButtonProps = PressableProps & {
  title: string;
  variant?: AppButtonVariant;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function AppButton({
  title,
  variant = "primary",
  fullWidth = true,
  disabled,
  style,
  ...props
}: AppButtonProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth ? styles.fullWidth : null,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" ? styles.textPrimary : styles.textSecondary,
          disabled ? styles.textDisabled : null,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 18,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  pressed: {
    opacity: 0.78,
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  text: {
    fontSize: 16,
    fontWeight: "800",
  },
  textPrimary: {
    color: "#FFFFFF",
  },
  textSecondary: {
    color: colors.primaryDark,
  },
  textDisabled: {
    color: "#FFFFFF",
  },
});