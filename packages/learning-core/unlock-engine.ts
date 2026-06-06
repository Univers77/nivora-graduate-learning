export function shouldUnlockNextLesson(input: { masteryScore: number; failedCriticalConcepts: string[]; reviewMode?: boolean; rescueMode?: boolean }) {
  if (input.reviewMode || input.rescueMode) return true;
  return input.masteryScore >= 80 && input.failedCriticalConcepts.length === 0;
}
