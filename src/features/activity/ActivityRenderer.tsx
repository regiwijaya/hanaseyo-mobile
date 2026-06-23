import React from "react";

import { LessonActivity } from "../../types/curriculum";
import { PronunciationActivity } from "./PronunciationActivity";
import { QuizActivity } from "./QuizActivity";
import { VocabularyActivity } from "./VocabularyActivity";

type ActivityRendererProps = {
  activity: LessonActivity;
  selectedAnswer?: string | null;
  onSelectAnswer?: (answer: string) => void;
};

export function ActivityRenderer({
  activity,
  selectedAnswer,
  onSelectAnswer,
}: ActivityRendererProps) {
  if (activity.type === "vocabulary") {
    return <VocabularyActivity activity={activity} />;
  }

  if (activity.type === "pronunciation") {
    return <PronunciationActivity activity={activity} />;
  }

  if (activity.type === "quiz") {
    return (
      <QuizActivity
        activity={activity}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={onSelectAnswer}
      />
    );
  }

  return null;
}