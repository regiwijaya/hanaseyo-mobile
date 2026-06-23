import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

type AppTextVariant =
  | "title"
  | "heading"
  | "subheading"
  | "body"
  | "small"
  | "japaneseLarge";

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  color?: string;
  align?: TextStyle["textAlign"];
};

export function AppText({
  variant = "body",
  color,
  align,
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        styles[variant],
        color ? { color } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "800",
    lineHeight: 38,
  },
  heading: {
    fontSize: typography.heading,
    fontWeight: "800",
    lineHeight: 30,
  },
  subheading: {
    fontSize: typography.subheading,
    fontWeight: "700",
    lineHeight: 24,
  },
  body: {
    fontSize: typography.body,
    lineHeight: 24,
  },
  small: {
    fontSize: typography.small,
    lineHeight: 18,
  },
  japaneseLarge: {
    fontSize: typography.japaneseLarge,
    fontWeight: "800",
    lineHeight: 112,
  },
});