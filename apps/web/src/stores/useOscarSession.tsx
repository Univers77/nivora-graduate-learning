/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const OSCAR_CREDENTIALS = {
  username: "oscar.vargas",
  password: "Nivora@CRKC5001",
};

export type OscarSession = {
  authenticated: boolean;
  learnerName: string;
  lastRoute: string;
  currentUnit: string;
  currentLesson: string;
  points: number;
  streakDays: number;
  overallMastery: number;
  completedSteps: string[];
  passedCheckpoints: string[];
  quizScores: Record<string, number>;
  unlockedUnits: string[];
  guideOpen: boolean;
};

const STORAGE_KEY = "nivora:oscar-session:v1";

const initialSession: OscarSession = {
  authenticated: false,
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

function readSession(): OscarSession {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    const mobileViewport = window.matchMedia("(max-width: 640px)").matches;
    return { ...initialSession, ...stored, guideOpen: mobileViewport ? false : (stored.guideOpen ?? initialSession.guideOpen) };
  } catch {
    return initialSession;
  }
}

export function resetOscarLearningState() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("nivora:learning-memory:v1");
  localStorage.removeItem("nivora:obsidian-note:v1");
  localStorage.removeItem("nivora:github-progress-ledger:v1");
}

type OscarSessionStore = ReturnType<typeof useOscarSessionState>;

const OscarSessionContext = createContext<OscarSessionStore | null>(null);

function useOscarSessionState() {
  const [session, setSession] = useState<OscarSession>(readSession);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  const login = useCallback((username: string, password: string) => {
    const valid = username.trim().toLowerCase() === OSCAR_CREDENTIALS.username && password === OSCAR_CREDENTIALS.password;
    if (!valid) return false;
    setSession((current) => ({ ...current, authenticated: true, guideOpen: false }));
    return true;
  }, []);

  const logout = useCallback(() => {
    setSession((current) => ({ ...current, authenticated: false }));
  }, []);

  const updateLastRoute = useCallback((route: string) => {
    if (route === "/login") return;
    setSession((current) => ({ ...current, lastRoute: route }));
  }, []);

  const completeStep = useCallback((stepId: string) => {
    setSession((current) => current.completedSteps.includes(stepId) ? current : { ...current, completedSteps: [...current.completedSteps, stepId] });
  }, []);

  const passCheckpoint = useCallback((checkpointId: string, score: number) => {
    setSession((current) => {
      const passedCheckpoints = current.passedCheckpoints.includes(checkpointId) ? current.passedCheckpoints : [...current.passedCheckpoints, checkpointId];
      const completed = passedCheckpoints.length;
      const points = Math.max(current.points, completed * 80);
      const overallMastery = Math.min(100, Math.round((completed / 6) * 100));
      return {
        ...current,
        points,
        overallMastery,
        passedCheckpoints,
        quizScores: { ...current.quizScores, [checkpointId]: score },
        unlockedUnits: completed >= 6 && !current.unlockedUnits.includes("U2") ? [...current.unlockedUnits, "U2"] : current.unlockedUnits,
      };
    });
  }, []);

  const setGuideOpen = useCallback((guideOpen: boolean) => {
    setSession((current) => ({ ...current, guideOpen }));
  }, []);

  const reset = useCallback(() => {
    resetOscarLearningState();
    setSession(initialSession);
  }, []);

  return { session, login, logout, updateLastRoute, completeStep, passCheckpoint, setGuideOpen, reset };
}

export function OscarSessionProvider({ children }: { children: ReactNode }) {
  const value = useOscarSessionState();
  const stableValue = useMemo(() => value, [value]);
  return <OscarSessionContext.Provider value={stableValue}>{children}</OscarSessionContext.Provider>;
}

export function useOscarSession() {
  const context = useContext(OscarSessionContext);
  if (!context) throw new Error("useOscarSession debe usarse dentro de OscarSessionProvider");
  return context;
}
