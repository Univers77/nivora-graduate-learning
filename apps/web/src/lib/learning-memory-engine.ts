import path from "../data/ob-learning-path.json";
import type { ConceptMemory, LearningInteraction, LearningRecommendation } from "../types/learning-memory";

const concepts = path.units.flatMap((unit) => unit.concepts.map((concept) => ({ ...concept, unitId: unit.id })));

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export function buildConceptMemory(events: LearningInteraction[]): ConceptMemory[] {
  return concepts.map((concept) => {
    const related = events.filter((event) => event.conceptId === concept.id);
    const answers = related.filter((event) => event.type === "quiz_answered");
    const confidenceEvents = related.filter((event) => typeof event.confidence === "number");
    const correctAnswers = answers.filter((event) => event.correct).length;
    const accuracy = answers.length ? correctAnswers / answers.length : 0;
    const averageConfidence = confidenceEvents.length
      ? confidenceEvents.reduce((sum, event) => sum + (event.confidence ?? 0), 0) / confidenceEvents.length
      : 0;
    const completion = related.some((event) => event.type === "lesson_completed") ? 18 : 0;
    const reflection = related.some((event) => event.type === "reflection_saved") ? 10 : 0;
    const masteryScore = Math.min(100, Math.round(accuracy * 62 + averageConfidence * 10 + completion + reflection));
    const state = masteryScore >= 90 ? "mastered" : masteryScore >= 75 ? "strong" : masteryScore >= 45 ? "developing" : "weak";
    const reviewDays = masteryScore >= 90 ? 30 : masteryScore >= 75 ? 14 : masteryScore >= 45 ? 4 : 1;
    return { conceptId: concept.id, title: concept.title, unitId: concept.unitId, attempts: answers.length, correctAnswers, averageConfidence, masteryScore, state, nextReview: addDays(reviewDays) };
  });
}

export function getBestRecommendation(events: LearningInteraction[]): LearningRecommendation {
  const memory = buildConceptMemory(events);
  const attempted = memory.filter((concept) => concept.attempts > 0);
  const target = attempted.sort((a, b) => a.masteryScore - b.masteryScore)[0] ?? memory[0];
  const lastEvent = [...events].reverse().find((event) => event.conceptId === target.conceptId);
  const repeatedErrors = events.filter((event) => event.conceptId === target.conceptId && event.type === "quiz_answered" && !event.correct).length;

  if (!target.attempts && !lastEvent) {
    return { action: "start", conceptId: target.conceptId, title: target.title, reason: "Es el punto de entrada de la ruta y aún no existe evidencia de aprendizaje.", estimatedMinutes: 8, priority: 100 };
  }
  if (repeatedErrors >= 2) {
    return { action: "reinforce", conceptId: target.conceptId, title: target.title, reason: `Detecté ${repeatedErrors} errores. Conviene cambiar de explicación antes de volver a evaluar.`, estimatedMinutes: 6, priority: 95 };
  }
  if (target.averageConfidence < 0.5 || target.masteryScore < 45) {
    return { action: "repeat", conceptId: target.conceptId, title: target.title, reason: "El dominio o la confianza todavía son bajos; una recuperación activa breve dará mejor señal.", estimatedMinutes: 5, priority: 90 };
  }
  if (target.masteryScore < 75) {
    return { action: "practice", conceptId: target.conceptId, title: target.title, reason: "Ya existe una base, pero falta evidencia consistente para considerarlo fuerte.", estimatedMinutes: 8, priority: 75 };
  }
  return { action: "review_later", conceptId: target.conceptId, title: target.title, reason: "El concepto muestra dominio sólido. Mantén el intervalo y avanza.", estimatedMinutes: 3, priority: 50 };
}

export function createInteraction(input: Omit<LearningInteraction, "id" | "timestamp" | "moduleId">): LearningInteraction {
  return { ...input, id: crypto.randomUUID(), timestamp: new Date().toISOString(), moduleId: path.id };
}
