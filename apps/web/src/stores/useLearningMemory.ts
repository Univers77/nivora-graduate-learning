import { useCallback, useEffect, useMemo, useState } from "react";
import { buildConceptMemory, createInteraction, getBestRecommendation } from "../lib/learning-memory-engine";
import { buildOscarObsidianNote } from "../lib/obsidian-export";
import type { OscarSession } from "./useOscarSession";
import type { LearningInteraction } from "../types/learning-memory";

const STORAGE_KEY = "nivora:learning-memory:v1";
const NOTE_STORAGE_KEY = "nivora:obsidian-note:v1";
const LEDGER_STORAGE_KEY = "nivora:github-progress-ledger:v1";

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

  const syncAuditCopies = useCallback((nextEvents: LearningInteraction[], session?: OscarSession) => {
    const fallbackSession: OscarSession = session ?? {
      authenticated: true,
      learnerName: "Oscar Vargas",
      lastRoute: "/dashboard",
      currentUnit: "U1",
      currentLesson: "/module-1/lesson",
      points: 0,
      streakDays: 0,
      overallMastery: 0,
      completedSteps: [],
      passedCheckpoints: [],
      quizScores: {},
      unlockedUnits: ["U1"],
      guideOpen: false,
    };
    localStorage.setItem(NOTE_STORAGE_KEY, buildOscarObsidianNote(nextEvents, fallbackSession));
    localStorage.setItem(LEDGER_STORAGE_KEY, JSON.stringify({
      learner: fallbackSession.learnerName,
      course: "CRKC 5001 Organisational Behaviour",
      updated: new Date().toISOString(),
      targetFiles: {
        obsidian: "Oscar Vargas/NIVORA/learning-memory.md",
        github: "learning-vault/progress/oscar-vargas-ledger.json",
      },
      pendingSync: true,
      events: nextEvents,
    }, null, 2));
  }, []);

  const record = useCallback((event: Omit<LearningInteraction, "id" | "timestamp" | "moduleId">, session?: OscarSession) => {
    setEvents((current) => {
      const nextEvents = [...current, createInteraction(event)];
      syncAuditCopies(nextEvents, session);
      return nextEvents;
    });
  }, [syncAuditCopies]);
  const clear = useCallback(() => {
    setEvents([]);
    localStorage.removeItem(NOTE_STORAGE_KEY);
    localStorage.removeItem(LEDGER_STORAGE_KEY);
  }, []);
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
