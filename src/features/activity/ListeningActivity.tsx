import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppCard } from "../../components/AppCard";
import { AppText } from "../../components/AppText";
import { SpeakerButton } from "../../components/SpeakerButton";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { ListeningActivity as ListeningActivityType } from "../../types/curriculum";

type ListeningActivityProps = {
  activity: ListeningActivityType;
  selectedAnswer?: string | null;
  onSelectAnswer?: (answer: string) => void;
};

export function ListeningActivity({
  activity,
  selectedAnswer,
  onSelectAnswer,
}: ListeningActivityProps) {
  const hasAnswered = Boolean(selectedAnswer);

  return (
    <View style={styles.container}>
      <AppCard style={styles.card}>
        <AppText variant="small" color={colors.textMuted} align="center">
          Latihan listening
        </AppText>

        <AppText variant="heading" align="center" style={styles.title}>
          {activity.title}
        </AppText>

        <AppText color={colors.textMuted} align="center">
          {activity.instruction}
        </AppText>

        <View style={styles.speakerWrapper}>
          <SpeakerButton text={activity.audioText} label="Dengarkan soal" />
        </View>
      </AppCard>

      <AppCard>
        <AppText variant="subheading">Pilih jawaban</AppText>

        <View style={styles.choices}>
          {activity.choices.map((choice) => {
            const isSelected = selectedAnswer === choice;
            const isCorrect = choice === activity.correctAnswer;
            const shouldShowCorrect = hasAnswered && isCorrect;
            const shouldShowWrong = hasAnswered && isSelected && !isCorrect;

            return (
              <Pressable
                key={choice}
                onPress={() => onSelectAnswer?.(choice)}
                style={[
                  styles.choice,
                  isSelected ? styles.choiceSelected : null,
                  shouldShowCorrect ? styles.choiceCorrect : null,
                  shouldShowWrong ? styles.choiceWrong : null,
                ]}
              >
                <AppText variant="heading" align="center">
                  {choice}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        {hasAnswered ? (
          <View style={styles.feedback}>
            <AppText
              variant="subheading"
              color={
                selectedAnswer === activity.correctAnswer
                  ? colors.success
                  : colors.danger
              }
            >
              {selectedAnswer === activity.correctAnswer
                ? "Benar!"
                : "Belum tepat"}
            </AppText>

            {activity.explanation ? (
              <AppText color={colors.textMuted}>{activity.explanation}</AppText>
            ) : null}
          </View>
        ) : null}
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  card: {
    alignItems: "center",
    gap: spacing.md,
  },
  title: {
    marginTop: spacing.xs,
  },
  speakerWrapper: {
    width: "100%",
    marginTop: spacing.md,
  },
  choices: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  choice: {
    minHeight: 72,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceSelected: {
    borderColor: colors.primary,
  },
  choiceCorrect: {
    borderColor: colors.success,
    backgroundColor: "#EAF8F1",
  },
  choiceWrong: {
    borderColor: colors.danger,
    backgroundColor: "#FFF1EC",
  },
  feedback: {
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
});