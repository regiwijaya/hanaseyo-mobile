import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppCard } from "../../components/AppCard";
import { AppText } from "../../components/AppText";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { QuizActivity as QuizActivityType } from "../../types/curriculum";

type QuizActivityProps = {
  activity: QuizActivityType;
  selectedAnswer?: string | null;
  onSelectAnswer?: (answer: string) => void;
};

export function QuizActivity({
  activity,
  selectedAnswer,
  onSelectAnswer,
}: QuizActivityProps) {
  const hasAnswered = Boolean(selectedAnswer);

  return (
    <View style={styles.container}>
      <AppCard>
        <AppText variant="small" color={colors.textMuted}>
          Kuis
        </AppText>

        <AppText variant="heading" style={styles.question}>
          {activity.question}
        </AppText>

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
  question: {
    marginTop: spacing.sm,
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