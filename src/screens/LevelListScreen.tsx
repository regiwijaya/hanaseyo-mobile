import React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import { curriculum } from "../data/curriculum";
import { RootStackParamList } from "../navigation/types";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = NativeStackScreenProps<RootStackParamList, "LevelList">;

export function LevelListScreen({ navigation }: Props) {
  function handleLevelPress(levelId: string, isLocked?: boolean) {
    if (isLocked) {
      Alert.alert(
        "Belum tersedia",
        "Level ini akan kita buka setelah fondasi awal aplikasi selesai."
      );
      return;
    }

    navigation.navigate("LessonList", { levelId });
  }

  return (
    <ScreenContainer>
      <SectionHeader
        title="Pilih Level Belajar"
        subtitle="Untuk MVP pertama, kita mulai dari Belajar Huruf Jepang."
      />

      <View style={styles.list}>
        {curriculum.map((level) => (
          <Pressable
            key={level.id}
            onPress={() => handleLevelPress(level.id, level.isLocked)}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <AppCard style={level.isLocked ? styles.lockedCard : undefined}>
              <View style={styles.cardHeader}>
                <AppText variant="subheading" style={styles.title}>
                  {level.title}
                </AppText>

                <StatusBadge
                  label={level.isLocked ? "Segera" : "Tersedia"}
                  tone={level.isLocked ? "locked" : "success"}
                />
              </View>

              <AppText color={colors.textMuted} style={styles.subtitle}>
                {level.subtitle}
              </AppText>

              <AppText variant="small" color={colors.textMuted}>
                {level.description}
              </AppText>
            </AppCard>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
  pressed: {
    opacity: 0.78,
  },
  lockedCard: {
    opacity: 0.65,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  title: {
    flex: 1,
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
});