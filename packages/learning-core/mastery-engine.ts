export type MasteryInput = {
  accuracy: number;
  difficulty: number;
  responseTimeSeconds: number;
  attempts: number;
  repeatedErrors: number;
  daysSinceReview: number;
  confidence?: number;
  importance: number;
};

export function calculateMasteryScore(input: MasteryInput) {
  const confidence = input.confidence ?? 0.5;
  const speed = Math.max(0, 1 - input.responseTimeSeconds / 120);
  const penalty = input.repeatedErrors * 7 + Math.max(0, input.attempts - 1) * 3;
  const raw = input.accuracy * 55 + input.difficulty * 8 + speed * 10 + confidence * 10 + input.importance * 12 - input.daysSinceReview * 0.5 - penalty;
  const score = Math.round(Math.min(100, Math.max(0, raw)));
  const level = score >= 90 ? "mastered" : score >= 75 ? "strong" : score >= 50 ? "developing" : "weak";
  const recommendation = score >= 90 ? "review_later" : score >= 80 ? "unlock_next" : score >= 50 ? "reinforce" : "repeat";
  return { score, level, recommendation };
}
