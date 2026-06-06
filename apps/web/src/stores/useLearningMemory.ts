import { useCallback, useEffect, useMemo, useState } from "react";
import { buildConceptMemory, createInteraction, getBestRecommendation } from "../lib/learning-memory-engine";
import type { LearningInteraction } from "../types/learning-memory";

const STORAGE_KEY = "nivora:learning-memory:v1";

function readEvents(): LearningInteraction[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as LearningInteraction[];
  } catch {
    return [];
  }
}

export function useLearningMemory() {
  const [events, setEvents] = useState<LearningInteraction[]>(readEvents);
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(events)), [events]);

  const record = useCallback((event: Omit<LearningInteraction, "id" | "timestamp" | "moduleId">) => {
    setEvents((current) => [...current, createInteraction(event)]);
  }, []);
  const clear = useCallback(() => setEvents([]), []);
  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `learning-memory-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [events]);

  return { events, record, clear, exportJson, concepts: useMemo(() => buildConceptMemory(events), [events]), recommendation: useMemo(() => getBestRecommendation(events), [events]) };
}
