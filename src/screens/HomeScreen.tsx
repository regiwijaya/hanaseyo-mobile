import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <AppText variant="title">Hanaseyo</AppText>
        <AppText color={colors.textMuted}>
          Belajar bahasa Jepang dari nol dengan alur yang rapi, bertahap, dan
          mudah diikuti.
        </AppText>
      </View>

      <AppCard>
        <AppText variant="subheading">Mulai belajar hari ini</AppText>
        <AppText color={colors.textMuted} style={styles.cardText}>
          Masuk ke Mode Solo untuk belajar huruf Jepang, kosakata, listening,
          grammar, dan kuis secara bertahap.
        </AppText>

        <AppButton
          title="Masuk Mode Solo"
          onPress={() => navigation.navigate("Solo")}
        />
      </AppCard>

      <AppCard>
        <AppText variant="subheading">Fondasi aplikasi</AppText>
        <AppText color={colors.textMuted} style={styles.cardText}>
          Versi awal ini sudah memakai struktur Activity Engine. Nanti kita bisa
          menambahkan banyak jenis latihan tanpa membuat screen baru
          satu-satu.
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
  hero: {
    gap: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  cardText: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});