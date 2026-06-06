import type { LearningInteraction } from "../types/learning-memory";
import type { OscarSession } from "../stores/useOscarSession";

export function buildOscarObsidianNote(events: LearningInteraction[], session: OscarSession) {
  const byConcept = new Map<string, LearningInteraction[]>();
  events.forEach((event) => {
    byConcept.set(event.conceptId, [...(byConcept.get(event.conceptId) ?? []), event]);
  });

  const conceptLines = [...byConcept.entries()].map(([concept, items]) => {
    const correct = items.filter((item) => item.correct === true).length;
    const attempts = items.filter((item) => item.type === "quiz_answered").length;
    return `- ${concept}: ${items.length} evidencias, ${correct}/${attempts || 0} respuestas correctas`;
  });

  return `---
learner: Demo Learner
platform: NIVORA
course: CRKC 5001 Organisational Behaviour
updated: ${new Date().toISOString()}
---

# Memoria de aprendizaje

## Estado inicial

- Puntos de dominio: ${session.points}
- Racha: ${session.streakDays} dias
- Dominio general: ${session.overallMastery}%
- Unidad actual: ${session.currentUnit}
- Ultima ruta: ${session.lastRoute}

## Recomendacion de retencion

1. Estudiar en bloques de 12 minutos.
2. Responder sin mirar apuntes antes de releer.
3. Explicar cada concepto con: concepto, teoria, ejemplo, impacto y recomendacion.
4. Reforzar en 24 horas todo concepto fallado.
5. Cerrar cada sesion con una reflexion breve.

## Evidencia por concepto

${conceptLines.length ? conceptLines.join("\n") : "- Sin evidencias todavia. Punto de partida en cero."}

## Registro reciente

${events.slice(-20).reverse().map((event) => `- ${event.timestamp} | ${event.type} | ${event.unitId} | ${event.conceptId}${typeof event.correct === "boolean" ? ` | correct=${event.correct}` : ""}${event.note ? ` | ${event.note}` : ""}`).join("\n") || "- Sin interacciones registradas."}
`;
}

export function downloadOscarObsidianNote(markdown: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "NIVORA_memoria_aprendizaje.md";
  link.click();
  URL.revokeObjectURL(url);
}
