import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Solo">;

export function SoloScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppText variant="heading">Mode Solo</AppText>

      <AppText color={colors.textMuted}>
        Belajar mandiri berdasarkan kurikulum yang tersusun dari dasar sampai
        lanjutan.
      </AppText>

      <AppCard>
        <AppText variant="subheading">Alur belajar</AppText>

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
        <AppText variant="subheading">Fitur yang akan dikembangkan</AppText>

        <AppText color={colors.textMuted} style={styles.text}>
          Kosakata, tombol speaker, latihan listening, rekaman suara, grammar,
          reading, kuis, dan sistem progress.
        </AppText>
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  text: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});