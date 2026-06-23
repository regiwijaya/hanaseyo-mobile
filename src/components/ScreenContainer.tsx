import React from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { spacing } from "../theme/spacing";

type ScreenContainerProps = ScrollViewProps & {
  children: React.ReactNode;
  contentStyle?: ViewStyle;
};

export function ScreenContainer({
  children,
  contentStyle,
  ...props
}: ScreenContainerProps) {
  return (
    <ScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, contentStyle]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});