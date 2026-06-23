import React from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppCard } from "../components/AppCard";
import { AppText } from "../components/AppText";
import { curriculum } from "../data/curriculum";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { RootStackParamList } from "../navigation/types";

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
    <ScrollView contentContainerStyle={styles.container}>
      <AppText variant="heading">Pilih Level Belajar</AppText>

      <AppText color={colors.textMuted}>
        Untuk MVP pertama, kita mulai dari Belajar Huruf Jepang.
      </AppText>

      <View style={styles.list}>
        {curriculum.map((level) => (
          <Pressable
            key={level.id}
            onPress={() => handleLevelPress(level.id, level.isLocked)}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <AppCard style={level.isLocked ? styles.lockedCard : undefined}>
              <View style={styles.cardHeader}>
                <AppText variant="subheading">{level.title}</AppText>

                {level.isLocked ? (
                  <AppText variant="small" color={colors.textMuted}>
                    Segera
                  </AppText>
                ) : (
                  <AppText variant="small" color={colors.success}>
                    Tersedia
                  </AppText>
                )}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
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
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
});