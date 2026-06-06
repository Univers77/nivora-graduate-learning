export function getNextReviewDate(input: { correct: boolean; responseTimeSeconds: number; masteryCount: number; from?: Date }) {
  const from = input.from ?? new Date();
  const days = !input.correct ? 1 : input.responseTimeSeconds > 60 ? 3 : Math.min(45, 7 * Math.max(1, input.masteryCount));
  return new Date(from.getTime() + days * 86_400_000);
}
