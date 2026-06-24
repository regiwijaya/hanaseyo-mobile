import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Speech from "expo-speech";

import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import {
  HiraganaChartCell,
  hiraganaChartColumns,
  hiraganaChartRows,
} from "../data/hiraganaChart";
import { RootStackParamList } from "../navigation/types";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = NativeStackScreenProps<RootStackParamList, "HiraganaChart">;

export function HiraganaChartScreen({ navigation }: Props) {
  function speakKana(text: string) {
    Speech.stop();
    Speech.speak(text, {
      language: "ja-JP",
      rate: 0.82,
      pitch: 1,
    });
  }

  function renderCell(cell: HiraganaChartCell, index: number) {
    if (!cell) {
      return (
        <View key={`empty-${index}`} style={[styles.cell, styles.emptyCell]}>
          <AppText variant="small" color={colors.textMuted} align="center">
            -
          </AppText>
        </View>
      );
    }

    return (
      <Pressable
        key={cell.kana}
        style={({ pressed }) => [styles.cell, pressed ? styles.pressed : null]}
        onPress={() => speakKana(cell.audioText)}
      >
        <AppText variant="heading" align="center">
          {cell.kana}
        </AppText>

        <AppText variant="small" color={colors.textMuted} align="center">
          {cell.reading}
        </AppText>

        <AppText variant="small" color={colors.primaryDark} align="center">
          🔊
        </AppText>
      </Pressable>
    );
  }

  return (
    <ScreenContainer>
      <SectionHeader
        title="Tabel Hiragana"
        subtitle="Tekan setiap huruf untuk mendengar bunyinya. Baris awal sudah terhubung dengan lesson."
      />

      <AppCard>
        <AppText variant="subheading">Cara membaca tabel</AppText>

        <AppText color={colors.textMuted} style={styles.helpText}>
          Kolom menunjukkan bunyi vokal: a, i, u, e, o. Beberapa baris tidak
          memiliki semua kolom, misalnya や行 dan わ行.
        </AppText>

        <View style={styles.columnHeader}>
          <View style={styles.rowLabelSpacer} />

          {hiraganaChartColumns.map((column) => (
            <View key={column} style={styles.columnLabel}>
              <AppText variant="small" color={colors.textMuted} align="center">
                {column}
              </AppText>
            </View>
          ))}
        </View>
      </AppCard>

      <View style={styles.rows}>
        {hiraganaChartRows.map((row) => {
          const lessonId = row.lessonId;

          return (
            <AppCard key={row.id} style={styles.rowCard}>
              <View style={styles.rowTop}>
                <View style={styles.rowTitle}>
                  <AppText variant="subheading">{row.title}</AppText>
                  <AppText variant="small" color={colors.textMuted}>
                    {row.subtitle}
                  </AppText>
                </View>

                {lessonId ? (
                  <StatusBadge label="Lesson tersedia" tone="success" />
                ) : (
                  <StatusBadge label="Belum ada lesson" tone="muted" />
                )}
              </View>

              <View style={styles.gridRow}>
                {row.cells.map((cell, index) => renderCell(cell, index))}
              </View>

              {lessonId ? (
                <AppButton
                  title="Mulai lesson baris ini"
                  variant="secondary"
                  onPress={() =>
                    navigation.navigate("Activity", {
                      levelId: "letters",
                      lessonId,
                    })
                  }
                />
              ) : null}
            </AppCard>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  helpText: {
    marginTop: spacing.sm,
  },
  columnHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  rowLabelSpacer: {
    width: 0,
  },
  columnLabel: {
    flex: 1,
    alignItems: "center",
  },
  rows: {
    gap: spacing.md,
  },
  rowCard: {
    gap: spacing.md,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  rowTitle: {
    flex: 1,
    gap: spacing.xs,
  },
  gridRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  cell: {
    flex: 1,
    minHeight: 86,
    borderRadius: 18,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  emptyCell: {
    backgroundColor: "#F3F4F6",
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.72,
    borderColor: colors.primary,
  },
});