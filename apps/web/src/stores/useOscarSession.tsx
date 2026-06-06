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
  guideOpen: true,
};

function readSession(): OscarSession {
  try {
    return { ...initialSession, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") };
  } catch {
    return initialSession;
  }
}

export function resetOscarLearningState() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("nivora:learning-memory:v1");
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
    setSession((current) => ({ ...current, authenticated: true, guideOpen: true }));
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

  const setGuideOpen = useCallback((guideOpen: boolean) => {
    setSession((current) => ({ ...current, guideOpen }));
  }, []);

  const reset = useCallback(() => {
    resetOscarLearningState();
    setSession(initialSession);
  }, []);

  return { session, login, logout, updateLastRoute, completeStep, setGuideOpen, reset };
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
