export const getDifficulty = (accuracy: number) => accuracy >= 0.85 ? "increase" : accuracy < 0.55 ? "decrease" : "maintain";
