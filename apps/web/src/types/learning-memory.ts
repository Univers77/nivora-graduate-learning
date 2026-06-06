export type InteractionType =
  | "lesson_started"
  | "lesson_completed"
  | "quiz_answered"
  | "confidence_reported"
  | "reflection_saved"
  | "recommendation_accepted";

export type LearningInteraction = {
  id: string;
  type: InteractionType;
  timestamp: string;
  moduleId: string;
  unitId: string;
  conceptId: string;
  durationSeconds?: number;
  correct?: boolean;
  difficulty?: number;
  confidence?: number;
  note?: string;
};

export type ConceptMemory = {
  conceptId: string;
  title: string;
  unitId: string;
  attempts: number;
  correctAnswers: number;
  averageConfidence: number;
  masteryScore: number;
  state: "weak" | "developing" | "strong" | "mastered";
  nextReview: string;
};

export type LearningRecommendation = {
  action: "start" | "repeat" | "reinforce" | "practice" | "review_later";
  conceptId: string;
  title: string;
  reason: string;
  estimatedMinutes: number;
  priority: number;
};
