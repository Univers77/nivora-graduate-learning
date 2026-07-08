/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "es" | "en";

const STORAGE_KEY = "nivora:language:v1";

export const copy = {
  es: {
    language: { label: "Idioma", es: "ES", en: "EN", spanish: "Español", english: "English" },
    loading: { eyebrow: "Preparando contenido", text: "Organizando tu siguiente experiencia de aprendizaje..." },
    nav: {
      dashboard: "Inicio",
      course: "Programa completo",
      module1: "Unidad 1",
      practice: "Banco de práctica",
      glossary: "Glosario",
      skillTree: "Mapa de dominio",
      memory: "Repaso inteligente",
      docs: "Lecturas",
      vault: "Biblioteca",
      aria: "Navegación principal",
      open: "Abrir navegación",
      momentum: "Momentum activo",
      days: "días",
      points: "puntos de dominio",
      graduate: "Graduate learning",
    },
    login: {
      eyebrow: "Graduate Learning OS",
      title: "Aprende paso a paso. Avanza solo cuando dominas.",
      description: "Ruta académica con contenido, control rápido y desbloqueo progresivo para construir comprensión real.",
      cards: ["Contenido claro", "Quiz obligatorio", "Avance bloqueado"],
      recommended: "Ritmo recomendado",
      access: "Acceso de estudiante",
      enter: "Entrar a la plataforma",
      user: "Usuario",
      password: "Contraseña",
      continue: "Continuar aprendizaje",
      credentials: "Credenciales",
      error: "Usuario o contraseña incorrectos.",
    },
    guide: {
      open: "Abrir tutor de ruta",
      bubble: "¿Te guío?",
      eyebrow: "Tutor de ruta",
      title: "Siguiente mejor paso",
      text: "Lee, responde el quiz y desbloquea el siguiente capítulo.",
      close: "Cerrar guía",
      steps: [
        ["01", "Comienza por Unidad 1", "Haz una lección de 12 minutos y no intentes leer todo de golpe.", "/module-1/lesson"],
        ["02", "Recupera sin mirar", "Ve al banco de práctica y responde una pregunta antes de consultar la guía.", "/practice"],
        ["03", "Refuerza conceptos", "Usa el glosario solo después de intentar explicar el concepto con tus palabras.", "/glossary"],
        ["04", "Registra evidencia", "En Repaso inteligente marca qué explicaste bien y qué necesita refuerzo.", "/learning-memory"],
      ],
      connect: "Conectar Obsidian",
      export: "Exportar memoria",
      download: "Descargar nota",
      reset: "Reiniciar cero",
      logout: "Salir",
      local: "Memoria local activa",
      synced: "Obsidian sincronizado",
      reconnect: "Obsidian requiere reconexión",
      connected: "Obsidian conectado en tiempo real",
      noEvidence: "Sin evidencias todavía",
      evidence: "evidencias guardadas",
    },
    dashboard: {
      session: "Sesión inicial · 12 minutos",
      title: "Inicio guiado.",
      subtitle: "Base en cero.",
      intro: "La primera base es observar una organización como sistema humano antes de memorizar definiciones.",
      days0: "0 días",
      mastery0: "0 dominio",
      next: "Siguiente paso recomendado",
      contentQuiz: "Contenido + quiz · mínimo",
      unitChapter: "Unidad 1 · Capítulo",
      prompt: "Lee la idea central, responde el control rápido y desbloquea el siguiente capítulo solo si demuestras comprensión.",
      start: "Comenzar desde cero",
      continuePath: "Continuar ruta",
      fullReading: "Lectura completa",
      unitMastery: "Dominio Unidad 1",
      checks: "checks",
      minimum: "mínimo",
      route: "Ruta interactiva",
      unit1: "Unidad 1",
      chapters: "capítulos",
      minutes: "min",
      locked: "Bloqueado hasta aprobar el control anterior.",
      official: "Evaluación oficial",
      north: "Tu norte",
      climateLab: "Laboratorio de clima",
      climateText: "Explora cómo diseñar, aplicar y analizar una encuesta organizacional útil.",
      openLab: "Abrir laboratorio",
      complete: "Unidad completada",
    },
    lesson: {
      module: "Módulo 1",
      chapter: "Capítulo",
      locked: "Ese capítulo aún está bloqueado. Primero aprueba el control rápido anterior.",
      explain: "Lo que debes poder explicar antes de avanzar",
      example: "Ejemplo aplicado",
      quick: "Control rápido",
      minimum: "Mínimo",
      evaluate: "Evaluar respuesta",
      next: "Siguiente capítulo",
      lab: "Ir al laboratorio",
      approveHint: "Aprueba el control para desbloquear el siguiente paso.",
      passed: "Aprobado. Capítulo desbloqueado.",
      retry: "Aún no. Relee la idea y vuelve a intentar.",
      labLocked: "Laboratorio bloqueado",
      labLockedTitle: "Completa los 6 controles rápidos de la Unidad 1.",
      labLockedText: "Este laboratorio exige base conceptual previa. Vuelve a la ruta, aprueba cada quiz con mínimo 80% y luego se habilitará.",
      back: "Volver a la ruta",
    },
    pages: {
      vaultEyebrow: "Fuentes del curso",
      vaultTitle: "Biblioteca académica",
      vaultDesc: "Materiales organizados por unidad, propósito y estado de estudio.",
      search: "Buscar por título, tipo o unidad...",
      skillEyebrow: "Ruta curricular CRKC 5001",
      skillTitle: "Mapa de dominio",
      skillDesc: "Avanza por comprensión demostrada y conexiones entre conceptos, no solo por completar pantallas.",
      docsEyebrow: "Biblioteca académica",
      docsTitle: "Lecturas completas",
      docsDesc: "Documentos profundos para estudiar con calma, subrayar y refrescar la memoria.",
      completeCourse: "Curso completo · 6 unidades",
      docsText: "Base completa con contenido profundo, teorías, casos, actividades, fuentes, glosario y estructura oficial de evaluación.",
      readPdf: "Leer PDF completo",
      downloadWord: "Descargar Word",
      readPdfShort: "Leer PDF",
      unitGuide: "Unidad 1 · Guía aplicada",
      unitTitle: "Fundamentos del comportamiento organizacional",
      unitText: "Lectura concentrada sobre fundamentos, niveles de análisis, management, cultura y clima.",
      memoryEyebrow: "Práctica adaptativa",
      memoryTitle: "Repaso inteligente",
      memoryDesc: "Convierte cada respuesta en evidencia de aprendizaje y recomienda la siguiente práctica útil.",
    },
  },
  en: {
    language: { label: "Language", es: "ES", en: "EN", spanish: "Español", english: "English" },
    loading: { eyebrow: "Preparing content", text: "Organizing your next learning experience..." },
    nav: {
      dashboard: "Home",
      course: "Full program",
      module1: "Unit 1",
      practice: "Practice bank",
      glossary: "Glossary",
      skillTree: "Mastery map",
      memory: "Smart review",
      docs: "Readings",
      vault: "Library",
      aria: "Main navigation",
      open: "Open navigation",
      momentum: "Active momentum",
      days: "days",
      points: "mastery points",
      graduate: "Graduate learning",
    },
    login: {
      eyebrow: "Graduate Learning OS",
      title: "Learn step by step. Move forward only when you master it.",
      description: "An academic path with clear content, quick checks, and progressive unlocking to build real understanding.",
      cards: ["Clear content", "Required quiz", "Locked progression"],
      recommended: "Recommended rhythm",
      access: "Student access",
      enter: "Enter the platform",
      user: "Username",
      password: "Password",
      continue: "Continue learning",
      credentials: "Credentials",
      error: "Incorrect username or password.",
    },
    guide: {
      open: "Open route tutor",
      bubble: "Need help?",
      eyebrow: "Route tutor",
      title: "Next best step",
      text: "Read, answer the quiz, and unlock the next chapter.",
      close: "Close guide",
      steps: [
        ["01", "Start with Unit 1", "Do one 12-minute lesson and avoid reading everything at once.", "/module-1/lesson"],
        ["02", "Recall before looking", "Go to the practice bank and answer one question before checking the guide.", "/practice"],
        ["03", "Reinforce concepts", "Use the glossary only after trying to explain the concept in your own words.", "/glossary"],
        ["04", "Record evidence", "In Smart Review, mark what you explained well and what needs reinforcement.", "/learning-memory"],
      ],
      connect: "Connect Obsidian",
      export: "Export memory",
      download: "Download note",
      reset: "Reset to zero",
      logout: "Sign out",
      local: "Local memory active",
      synced: "Obsidian synced",
      reconnect: "Obsidian needs reconnection",
      connected: "Obsidian connected in real time",
      noEvidence: "No evidence yet",
      evidence: "evidence items saved",
    },
    dashboard: {
      session: "Initial session · 12 minutes",
      title: "Guided start.",
      subtitle: "Zero baseline.",
      intro: "The first foundation is to observe an organization as a human system before memorizing definitions.",
      days0: "0 days",
      mastery0: "0 mastery",
      next: "Recommended next step",
      contentQuiz: "Content + quiz · minimum",
      unitChapter: "Unit 1 · Chapter",
      prompt: "Read the core idea, answer the quick check, and unlock the next chapter only when you show understanding.",
      start: "Start from zero",
      continuePath: "Continue path",
      fullReading: "Full reading",
      unitMastery: "Unit 1 mastery",
      checks: "checks",
      minimum: "minimum",
      route: "Interactive path",
      unit1: "Unit 1",
      chapters: "chapters",
      minutes: "min",
      locked: "Locked until you pass the previous check.",
      official: "Official assessment",
      north: "Your target",
      climateLab: "Climate lab",
      climateText: "Explore how to design, run, and analyze a useful organizational survey.",
      openLab: "Open lab",
      complete: "Unit complete",
    },
    lesson: {
      module: "Module 1",
      chapter: "Chapter",
      locked: "This chapter is still locked. Pass the previous quick check first.",
      explain: "What you should be able to explain before moving on",
      example: "Applied example",
      quick: "Quick check",
      minimum: "Minimum",
      evaluate: "Evaluate answer",
      next: "Next chapter",
      lab: "Go to lab",
      approveHint: "Pass the check to unlock the next step.",
      passed: "Passed. Chapter unlocked.",
      retry: "Not yet. Review the idea and try again.",
      labLocked: "Lab locked",
      labLockedTitle: "Complete the 6 quick checks in Unit 1.",
      labLockedText: "This lab requires the conceptual foundation first. Return to the path, pass each quiz with at least 80%, and then it will unlock.",
      back: "Back to path",
    },
    pages: {
      vaultEyebrow: "Course sources",
      vaultTitle: "Academic library",
      vaultDesc: "Materials organized by unit, purpose, and study status.",
      search: "Search by title, type, or unit...",
      skillEyebrow: "CRKC 5001 curriculum path",
      skillTitle: "Mastery map",
      skillDesc: "Progress through demonstrated understanding and concept connections, not just completed screens.",
      docsEyebrow: "Academic library",
      docsTitle: "Full readings",
      docsDesc: "Deep documents for calm reading, highlighting, and memory refresh.",
      completeCourse: "Full course · 6 units",
      docsText: "Complete base with deep content, theories, cases, activities, sources, glossary, and official assessment structure.",
      readPdf: "Read full PDF",
      downloadWord: "Download Word",
      readPdfShort: "Read PDF",
      unitGuide: "Unit 1 · Applied guide",
      unitTitle: "Organizational behavior foundations",
      unitText: "Focused reading on foundations, levels of analysis, management, culture, and climate.",
      memoryEyebrow: "Adaptive practice",
      memoryTitle: "Smart review",
      memoryDesc: "Turn every answer into learning evidence and recommend the next useful practice.",
    },
  },
} as const;

type Translation = (typeof copy)[Language];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readLanguage);
  const setLanguage = (next: Language) => setLanguageState(next);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: copy[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/[.04] p-1" aria-label={t.language.label}>
      {(["es", "en"] as const).map((item) => (
        <button
          key={item}
          onClick={() => setLanguage(item)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${language === item ? "bg-lime text-ink" : "text-white/55"}`}
          aria-pressed={language === item}
        >
          {t.language[item]}
        </button>
      ))}
    </div>
  );
}
