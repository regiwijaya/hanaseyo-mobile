import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import { RootStackParamList } from "../navigation/types";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Solo">;

export function SoloScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <SectionHeader
        title="Mode Solo"
        subtitle="Belajar mandiri berdasarkan kurikulum yang tersusun dari dasar sampai lanjutan."
      />

      <AppCard>
        <View style={styles.headerRow}>
          <AppText variant="subheading">Alur Belajar</AppText>
          <StatusBadge label="Step by step" tone="primary" />
        </View>

        <AppText color={colors.textMuted} style={styles.text}>
          1. Belajar huruf Jepang{"\n"}
          2. Level dasar{"\n"}
          3. Level menengah{"\n"}
          4. Level lanjutan
        </AppText>

        <AppButton
          title="Pilih Level"
          onPress={() => navigation.navigate("LevelList")}
        />
      </AppCard>

      <AppCard>
        <AppText variant="subheading">Jenis Aktivitas</AppText>

        <AppText color={colors.textMuted} style={styles.text}>
          Kosakata, tombol speaker, listening, rekaman suara, grammar, reading,
          kuis, review, dan sistem progress.
        </AppText>

        <StatusBadge label="Akan dikembangkan bertahap" tone="muted" />
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  text: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});