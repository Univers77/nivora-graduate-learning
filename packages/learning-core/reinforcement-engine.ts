export function generateReinforcementPlan(concept: string) {
  return {
    failedConcept: concept,
    simpleExplanation: `Explica ${concept} con una sola idea central.`,
    newExample: `Aplica ${concept} a un caso cotidiano.`,
    analogy: `Relaciona ${concept} con una ruta que cambia segun el destino.`,
    miniExercise: `Escribe dos diferencias clave sobre ${concept}.`,
    recoveryQuestion: `Que recordarias primero sobre ${concept}?`,
    reviewRecommendation: "Revisar en 24 horas.",
  };
}
