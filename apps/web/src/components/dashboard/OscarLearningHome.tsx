import { ArrowRight, Award, BarChart3, BookOpen, BrainCircuit, CalendarDays, CheckCircle2, ChevronRight, Flame, LockKeyhole, Play, Sparkles, Star, Target, Trophy, Zap } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import moduleOne from "../../data/module-one.json";
import { useLanguage, type Language } from "../../i18n/LanguageProvider";
import { Progress } from "../shared/UI";
import { useOscarSession } from "../../stores/useOscarSession";

const colorStyles: Record<string, string> = {
  lime: "border-lime/35 bg-lime/10 text-lime",
  cyan: "border-cyan/30 bg-cyan/10 text-cyan",
  violet: "border-violet-400/25 bg-violet-400/10 text-violet-300",
  orange: "border-orange-400/25 bg-orange-400/10 text-orange-300",
  rose: "border-rose-400/25 bg-rose-400/10 text-rose-300",
  gold: "border-amber-300/25 bg-amber-300/10 text-amber-200",
};

const passScore = 80;

const chapterLessons: Record<Language, Array<{
  id: string;
  focus: string;
  title: string;
  concept: string;
  learn: string[];
  example: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}>> = {
  es: [
  {
    id: "ob-start",
    focus: "Definir el campo",
    title: "¿Qué estudia el comportamiento organizacional?",
    concept: "El comportamiento organizacional estudia cómo las personas piensan, sienten y actúan dentro de sistemas de trabajo, y cómo esas conductas afectan desempeño, cultura, bienestar y resultados.",
    learn: ["Distinguir conducta observable de opinión o juicio.", "Mirar individuo, equipo y organización como niveles conectados.", "Evitar explicar problemas complejos culpando solo a una persona."],
    example: "Si un equipo falla plazos, la lectura profesional no empieza culpando a alguien: revisa claridad de roles, carga, comunicación, incentivos y liderazgo.",
    question: "¿Cuál es la mejor primera mirada ante un problema de bajo desempeño?",
    options: ["Analizar persona, equipo y sistema antes de concluir", "Buscar al culpable principal", "Ignorar el contexto y pedir más esfuerzo"],
    correct: 0,
    explanation: "El enfoque profesional evita conclusiones rápidas y observa varios niveles de causa.",
  },
  {
    id: "work-meaning",
    focus: "Naturaleza del trabajo",
    title: "La naturaleza del trabajo",
    concept: "El trabajo no es solo una lista de tareas: combina diseño, autonomía, significado, carga, recursos y condiciones psicológicas que influyen en motivación y desempeño.",
    learn: ["Relacionar diseño del trabajo con energía y resultados.", "Identificar carga, autonomía y claridad como variables gestionables.", "Conectar bienestar con productividad sostenible."],
    example: "Dos personas con el mismo talento pueden rendir distinto si una tiene objetivos claros, feedback y autonomía, y la otra trabaja con prioridades cambiantes.",
    question: "¿Qué intervención ataca una causa del diseño del trabajo?",
    options: ["Rediseñar prioridades, carga y autonomía", "Exigir motivación sin cambiar condiciones", "Medir clima sin tomar acción"],
    correct: 0,
    explanation: "El diseño del trabajo modifica condiciones que producen o bloquean desempeño.",
  },
  {
    id: "manager-role",
    focus: "Management observable",
    title: "Manager, líder y arquitecto del sistema",
    concept: "Gestionar implica coordinar recursos y procesos; liderar implica influir, dar dirección y crear condiciones para que otros actúen con claridad.",
    learn: ["Separar gestión, liderazgo y cultura de equipo.", "Observar conductas, no etiquetas.", "Detectar si el sistema facilita o frena el comportamiento esperado."],
    example: "Un manager puede pedir colaboración, pero si premia solo logros individuales, el sistema enseña competencia interna.",
    question: "¿Qué evidencia muestra liderazgo como conducta observable?",
    options: ["Clarifica prioridades y remueve obstáculos", "Tiene un cargo alto", "Usa frases inspiradoras sin seguimiento"],
    correct: 0,
    explanation: "La conducta observable pesa más que el título o el discurso.",
  },
  {
    id: "three-levels",
    focus: "Tres niveles",
    title: "Tres niveles de análisis",
    concept: "El análisis profesional distingue individuo, equipo y organización para ubicar causas y diseñar intervenciones proporcionadas.",
    learn: ["Individuo: percepción, valores, personalidad y motivación.", "Equipo: normas, roles, comunicación y conflicto.", "Organización: estructura, cultura, procesos y recompensas."],
    example: "Un error repetido puede venir de falta de habilidad individual, norma de equipo informal o proceso organizacional mal diseñado.",
    question: "¿Qué nivel analiza normas compartidas y comunicación cotidiana?",
    options: ["Equipo", "Individuo", "Mercado externo"],
    correct: 0,
    explanation: "Normas y patrones de comunicación emergen principalmente en el nivel de equipo.",
  },
  {
    id: "climate-culture",
    focus: "Clima y cultura",
    title: "Cultura vs. clima organizacional",
    concept: "La cultura refleja supuestos profundos y valores aprendidos; el clima describe cómo las personas perciben el ambiente actual de trabajo.",
    learn: ["No confundir identidad profunda con percepción cotidiana.", "Usar clima para medir señales accionables.", "Usar cultura para entender patrones persistentes."],
    example: "Una empresa puede declarar innovación como valor cultural, pero tener un clima donde la gente teme proponer ideas.",
    question: "¿Qué mide mejor una encuesta de clima?",
    options: ["Percepciones actuales sobre el ambiente de trabajo", "La historia completa de la organización", "El organigrama formal"],
    correct: 0,
    explanation: "El clima captura percepciones actuales y accionables del entorno laboral.",
  },
  {
    id: "climate-lab",
    focus: "Medición aplicada",
    title: "Laboratorio: medir el clima",
    concept: "Una encuesta de clima útil define objetivo, dimensiones, confidencialidad, muestra, análisis y plan de acción antes de recolectar respuestas.",
    learn: ["Diseñar preguntas claras y éticas.", "Interpretar patrones, no solo promedios.", "Cerrar el ciclo comunicando resultados y acciones."],
    example: "Si seguridad psicológica sale baja, la respuesta no es un taller genérico: conviene investigar causas, equipos afectados y conductas de liderazgo.",
    question: "¿Qué paso hace profesional una medición de clima?",
    options: ["Convertir resultados en acciones y seguimiento", "Recolectar respuestas sin explicar propósito", "Publicar rankings sin contexto"],
    correct: 0,
    explanation: "La medición solo crea valor cuando se traduce en aprendizaje, acción y seguimiento.",
  },
  ],
  en: [
    {
      id: "ob-start",
      focus: "Define the field",
      title: "What does organizational behavior study?",
      concept: "Organizational behavior studies how people think, feel, and act inside work systems, and how those behaviors affect performance, culture, wellbeing, and results.",
      learn: ["Distinguish observable behavior from opinion or judgment.", "See individual, team, and organization as connected levels.", "Avoid explaining complex problems by blaming only one person."],
      example: "If a team misses deadlines, a professional reading does not start by blaming someone: it reviews role clarity, workload, communication, incentives, and leadership.",
      question: "What is the best first lens for a low-performance problem?",
      options: ["Analyze person, team, and system before concluding", "Find the main person to blame", "Ignore context and ask for more effort"],
      correct: 0,
      explanation: "A professional approach avoids fast conclusions and observes multiple levels of cause.",
    },
    {
      id: "work-meaning",
      focus: "Nature of work",
      title: "The nature of work",
      concept: "Work is not just a task list: it combines design, autonomy, meaning, workload, resources, and psychological conditions that influence motivation and performance.",
      learn: ["Connect work design with energy and results.", "Identify workload, autonomy, and clarity as manageable variables.", "Link wellbeing with sustainable productivity."],
      example: "Two people with the same talent may perform differently if one has clear goals, feedback, and autonomy while the other faces shifting priorities.",
      question: "Which intervention targets a work-design cause?",
      options: ["Redesign priorities, workload, and autonomy", "Demand motivation without changing conditions", "Measure climate without taking action"],
      correct: 0,
      explanation: "Work design changes the conditions that produce or block performance.",
    },
    {
      id: "manager-role",
      focus: "Observable management",
      title: "Manager, leader, and system architect",
      concept: "Managing means coordinating resources and processes; leading means influencing, giving direction, and creating conditions for others to act with clarity.",
      learn: ["Separate management, leadership, and team culture.", "Observe behaviors, not labels.", "Detect whether the system enables or blocks expected behavior."],
      example: "A manager may ask for collaboration, but if only individual achievements are rewarded, the system teaches internal competition.",
      question: "What evidence shows leadership as observable behavior?",
      options: ["Clarifies priorities and removes obstacles", "Has a senior title", "Uses inspiring phrases without follow-up"],
      correct: 0,
      explanation: "Observable behavior matters more than title or speech.",
    },
    {
      id: "three-levels",
      focus: "Three levels",
      title: "Three levels of analysis",
      concept: "Professional analysis distinguishes individual, team, and organization to locate causes and design proportionate interventions.",
      learn: ["Individual: perception, values, personality, and motivation.", "Team: norms, roles, communication, and conflict.", "Organization: structure, culture, processes, and rewards."],
      example: "A repeated error may come from an individual skill gap, an informal team norm, or a poorly designed organizational process.",
      question: "Which level analyzes shared norms and everyday communication?",
      options: ["Team", "Individual", "External market"],
      correct: 0,
      explanation: "Norms and communication patterns mainly emerge at the team level.",
    },
    {
      id: "climate-culture",
      focus: "Climate and culture",
      title: "Culture vs. organizational climate",
      concept: "Culture reflects deep assumptions and learned values; climate describes how people perceive the current work environment.",
      learn: ["Do not confuse deep identity with everyday perception.", "Use climate to measure actionable signals.", "Use culture to understand persistent patterns."],
      example: "A company may declare innovation as a cultural value while having a climate where people fear proposing ideas.",
      question: "What does a climate survey measure best?",
      options: ["Current perceptions of the work environment", "The full history of the organization", "The formal org chart"],
      correct: 0,
      explanation: "Climate captures current, actionable perceptions of the work environment.",
    },
    {
      id: "climate-lab",
      focus: "Applied measurement",
      title: "Lab: measuring climate",
      concept: "A useful climate survey defines objective, dimensions, confidentiality, sample, analysis, and action plan before collecting responses.",
      learn: ["Design clear and ethical questions.", "Interpret patterns, not just averages.", "Close the loop by communicating results and actions."],
      example: "If psychological safety is low, the answer is not a generic workshop: investigate causes, affected teams, and leadership behaviors.",
      question: "What step makes climate measurement professional?",
      options: ["Turn results into actions and follow-up", "Collect answers without explaining the purpose", "Publish rankings without context"],
      correct: 0,
      explanation: "Measurement creates value only when translated into learning, action, and follow-up.",
    },
  ],
};

function isChapterUnlocked(index: number, passed: string[], lessons = chapterLessons.es) {
  return index === 0 || passed.includes(lessons[index - 1].id);
}

export function OscarLearningHome() {
  const { session } = useOscarSession();
  const { language, t } = useLanguage();
  const lessons = chapterLessons[language];
  const completed = session.passedCheckpoints.length;
  const mastery = Math.round((completed / lessons.length) * 100);
  const nextIndex = lessons.findIndex((chapter) => !session.passedCheckpoints.includes(chapter.id));
  const nextChapter = lessons[Math.max(0, nextIndex)];
  return <div className="mx-auto max-w-7xl">
    <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div><p className="eyebrow">{t.dashboard.session}</p><h1 className="mt-3 text-4xl font-bold tracking-[-.05em] sm:text-6xl">{t.dashboard.title}<br/><span className="text-white/35">{t.dashboard.subtitle}</span></h1><p className="mt-4 max-w-2xl text-white/50">{t.dashboard.intro}</p></div>
      <div className="flex gap-3"><span className="pill"><Flame size={15} className="text-cyan"/>{t.dashboard.days0}</span><span className="pill"><Zap size={15} className="text-lime"/>{t.dashboard.mastery0}</span></div>
    </header>

    <section className="grid gap-5 xl:grid-cols-[1.45fr_.75fr]">
      <article className="relative overflow-hidden rounded-[32px] border border-lime/25 bg-gradient-to-br from-[#2d2250] via-panel to-[#100e22] p-6 sm:p-9">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-lime/10 blur-3xl"/>
        <div className="relative"><div className="flex flex-wrap items-center justify-between gap-3"><span className="pill border-lime/25 bg-lime/10 text-lime"><Sparkles size={14}/>{t.dashboard.next}</span><span className="text-xs text-white/40">{t.dashboard.contentQuiz} {passScore}%</span></div><p className="mt-10 text-sm text-white/45">{t.dashboard.unitChapter} {Math.max(1, nextIndex + 1)}</p><h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">{nextChapter?.title ?? t.dashboard.complete}</h2><p className="mt-4 max-w-xl text-white/50">{t.dashboard.prompt}</p><div className="mt-8 flex flex-wrap gap-3"><Link to={`/module-1/lesson?chapter=${nextChapter?.id ?? "ob-start"}`} className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-bold text-ink"><Play size={17}/>{completed ? t.dashboard.continuePath : t.dashboard.start}</Link><Link to="/study-docs" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-semibold text-white/70"><BookOpen size={16}/>{t.dashboard.fullReading}</Link></div></div>
      </article>
      <aside className="panel p-6"><div className="flex items-center justify-between"><p className="eyebrow">{t.dashboard.unitMastery}</p><Target className="text-lime"/></div><div className="mt-7 grid place-items-center"><div className="relative grid h-40 w-40 place-items-center rounded-full" style={{background:`conic-gradient(#D8B45B 0 ${mastery}%, rgba(255,255,255,.08) ${mastery}% 100%)`}}><div className="grid h-28 w-28 place-items-center rounded-full bg-panel text-center"><div><p className="text-3xl font-bold">{mastery}%</p><p className="text-[10px] uppercase tracking-widest text-white/40">{t.dashboard.unit1}</p></div></div></div></div><div className="mt-7 grid grid-cols-3 gap-2 text-center"><div><p className="text-xl font-bold">{completed}</p><p className="text-[10px] text-white/35">{t.dashboard.checks}</p></div><div><p className="text-xl font-bold">{session.points}</p><p className="text-[10px] text-white/35">XP</p></div><div><p className="text-xl font-bold">{passScore}%</p><p className="text-[10px] text-white/35">{t.dashboard.minimum}</p></div></div></aside>
    </section>

    <section className="mt-10 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
      <div><div className="mb-5 flex items-end justify-between"><div><p className="eyebrow">{t.dashboard.route}</p><h2 className="mt-2 text-3xl font-bold">{t.dashboard.unit1}</h2></div><span className="text-sm text-white/35">6 {t.dashboard.chapters} · {moduleOne.estimated_minutes} {t.dashboard.minutes}</span></div><div className="space-y-4">{moduleOne.chapters.map((chapter,index)=>{const lesson=lessons[index]; const unlocked=isChapterUnlocked(index,session.passedCheckpoints,lessons); const passed=session.passedCheckpoints.includes(chapter.id); const progress=passed?100:unlocked?20:0; const content=<article className={`group relative rounded-3xl border p-5 transition-colors ${passed?"border-lime/35 bg-lime/[.07]":unlocked?"border-lime/20 bg-panel/80 hover:border-lime/35":"border-white/[.06] bg-white/[.015] opacity-60"}`}><div className="flex items-center gap-4"><div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border font-mono text-sm font-bold ${passed?"border-lime bg-lime text-ink":unlocked?colorStyles[chapter.color]:"border-white/10 bg-white/5 text-white/35"}`}>{passed?<CheckCircle2 size={19}/>:unlocked?<Play size={19}/>:<LockKeyhole size={19}/>}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold">{lesson.title}</p><span className="text-xs text-white/35">{chapter.minutes} {t.dashboard.minutes} · quiz {passScore}%</span></div><p className="mt-1 text-sm text-white/40">{unlocked?chapter.description:t.dashboard.locked}</p></div>{unlocked&&<ChevronRight className="shrink-0 text-white/25 transition-transform group-hover:translate-x-1"/>}</div><div className="mt-4"><Progress value={progress}/></div></article>; return unlocked?<Link to={`/module-1/lesson?chapter=${chapter.id}`} key={chapter.id}>{content}</Link>:<div key={chapter.id}>{content}</div>})}</div></div>
      <aside className="space-y-5"><article className="panel p-6"><div className="flex items-center justify-between"><div><p className="eyebrow">{t.dashboard.official}</p><h3 className="mt-2 text-xl font-bold">{t.dashboard.north}</h3></div><Award className="text-lime"/></div><div className="mt-5 space-y-4">{[["Quiz","30%","U2 + U5"],[language === "en" ? "Contributions" : "Contribuciones","20%","U3 + U4"],[language === "en" ? "Final portfolio" : "Portafolio final","50%",language === "en" ? "U6 + synthesis" : "U6 + síntesis"]].map(([name,weight,units])=><div className="rounded-2xl border border-white/10 p-4" key={name}><div className="flex justify-between"><p className="font-semibold">{name}</p><span className="eyebrow">{weight}</span></div><p className="mt-1 text-xs text-white/35">{units}</p></div>)}</div></article><article className="rounded-3xl border border-cyan/20 bg-cyan/[.06] p-6"><BarChart3 className="text-cyan"/><h3 className="mt-6 text-xl font-bold">{t.dashboard.climateLab}</h3><p className="mt-2 text-sm text-white/45">{t.dashboard.climateText}</p><Link to="/module-1/climate-lab" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan">{t.dashboard.openLab} <ArrowRight size={15}/></Link></article></aside>
    </section>
  </div>;
}

export function ModuleOneOverview() {
  const { language, t } = useLanguage();
  const items = language === "en"
    ? [[BrainCircuit,"Multi-level frame","Person, team, and organization"],[Trophy,"720 XP","Measurable progress"],[CalendarDays,"2 weeks","Recommended rhythm"],[Star,"Portfolio-ready","Every activity leaves evidence"]]
    : [[BrainCircuit,"Marco multinivel","Persona, equipo y organización"],[Trophy,"720 XP","Progreso medible"],[CalendarDays,"2 semanas","Ritmo recomendado"],[Star,"Portfolio-ready","Cada actividad deja evidencia"]];
  return <div className="mx-auto max-w-6xl"><div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-panel to-ink p-7 sm:p-12"><p className="eyebrow">CRKC 5001 · {language === "en" ? "Module 1" : "Módulo 1"}</p><h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-[-.05em] sm:text-7xl">{language === "en" ? "Understanding organizations begins with learning how to observe." : "Entender organizaciones comienza por aprender a observar."}</h1><p className="mt-6 max-w-2xl text-lg text-white/50">{language === "en" ? "A practical path: foundations, work, management, and the first climate diagnosis." : "Una ruta práctica: fundamentos, trabajo, management y primer diagnóstico de clima."}</p><div className="mt-9 flex flex-wrap gap-3"><Link to="/module-1/lesson" className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-bold text-ink"><Play size={17}/>{t.dashboard.start}</Link><Link to="/study-docs" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white/70"><BookOpen size={17}/>{language === "en" ? "Open reading" : "Abrir lectura"}</Link></div></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(([Icon,title,text])=>{const I=Icon as typeof BrainCircuit;return <div className="panel p-5" key={title as string}><I className="text-lime"/><p className="mt-6 font-semibold">{title as string}</p><p className="mt-1 text-sm text-white/40">{text as string}</p></div>})}</div></div>;
}

export function ModuleOneLesson() {
  const [params] = useSearchParams();
  const { session, passCheckpoint } = useOscarSession();
  const { language, t } = useLanguage();
  const lessons = chapterLessons[language];
  const requested = params.get("chapter") ?? "ob-start";
  const requestedIndex = lessons.findIndex((chapter) => chapter.id === requested);
  const safeIndex = requestedIndex >= 0 ? requestedIndex : 0;
  const unlocked = isChapterUnlocked(safeIndex, session.passedCheckpoints, lessons);
  const firstLockedIndex = lessons.findIndex((_, index) => !isChapterUnlocked(index, session.passedCheckpoints, lessons));
  const lesson = lessons[unlocked ? safeIndex : Math.max(0, firstLockedIndex - 1)];
  const currentIndex = lessons.findIndex((chapter) => chapter.id === lesson.id);
  const passed = session.passedCheckpoints.includes(lesson.id);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = selected === lesson.correct;
  const score = correct ? 100 : 0;
  const canContinue = passed || (submitted && score >= passScore);
  const submit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === lesson.correct) passCheckpoint(lesson.id, 100);
  };
  const next = lessons[currentIndex + 1];

  return <div className="mx-auto max-w-4xl"><div className="mb-5 flex items-center justify-between gap-4"><div className="flex-1"><div className="flex justify-between text-xs text-white/40"><span>{t.lesson.module} · {t.lesson.chapter} {currentIndex + 1}</span><span>{currentIndex + 1} / {lessons.length}</span></div><div className="mt-3"><Progress value={Math.round(((currentIndex + (passed ? 1 : 0)) / lessons.length) * 100)}/></div></div><Link to="/dashboard" className="rounded-full border border-white/10 p-3 text-white/40">×</Link></div>{!unlocked&&<div className="mb-5 rounded-3xl border border-cyan/25 bg-cyan/10 p-5 text-sm text-cyan">{t.lesson.locked}</div>}<article className="panel overflow-hidden"><div className="bg-gradient-to-br from-lime/20 to-cyan/5 p-7 sm:p-10"><p className="eyebrow">{lesson.focus}</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{lesson.title}</h1><p className="mt-5 max-w-2xl text-lg text-white/55">{lesson.concept}</p></div><div className="p-7 sm:p-10"><p className="text-sm text-white/45">{t.lesson.explain}</p><div className="mt-5 grid gap-3">{lesson.learn.map((item,index)=><div className="rounded-2xl border border-white/10 bg-white/[.03] p-4" key={item}><span className="font-mono text-xs text-lime">0{index+1}</span><p className="mt-2 text-sm text-white/65">{item}</p></div>)}</div><div className="mt-7 rounded-2xl border border-cyan/20 bg-cyan/5 p-5"><p className="font-semibold text-cyan">{t.lesson.example}</p><p className="mt-2 text-sm leading-relaxed text-white/55">{lesson.example}</p></div><section className="mt-8 rounded-3xl border border-lime/25 bg-lime/[.055] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">{t.lesson.quick}</p><h2 className="mt-2 text-2xl font-bold">{lesson.question}</h2></div><span className="pill">{t.lesson.minimum} {passScore}%</span></div><div className="mt-5 grid gap-3">{lesson.options.map((option,index)=><button onClick={()=>setSelected(index)} className={`rounded-2xl border p-4 text-left text-sm transition-colors ${selected===index?"border-lime bg-lime/10 text-white":"border-white/10 text-white/60 hover:border-lime/35"}`} key={option}>{option}</button>)}</div>{submitted&&<div className={`mt-5 rounded-2xl border p-4 ${correct?"border-lime/30 bg-lime/10 text-lime":"border-cyan/30 bg-cyan/10 text-cyan"}`}><p className="font-semibold">{correct ? t.lesson.passed : t.lesson.retry}</p><p className="mt-1 text-sm text-white/55">{lesson.explanation}</p></div>}<div className="mt-6 flex flex-wrap justify-between gap-3"><button onClick={submit} disabled={selected===null} className="rounded-full bg-lime px-6 py-3 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40">{t.lesson.evaluate}</button>{canContinue && next ? <Link to={`/module-1/lesson?chapter=${next.id}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/75">{t.lesson.next} <ArrowRight size={16}/></Link> : canContinue ? <Link to="/module-1/climate-lab" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/75">{t.lesson.lab} <ArrowRight size={16}/></Link> : <span className="text-sm text-white/35">{t.lesson.approveHint}</span>}</div></section></div></article></div>;
}

export function ClimateLab() {
  const { session } = useOscarSession();
  const { language, t } = useLanguage();
  const lessons = chapterLessons[language];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const questions = [["leadership","Mi supervisor comunica las prioridades con claridad."],["communication","Puedo expresar inquietudes y recibir una respuesta útil."],["recognition","El buen trabajo recibe reconocimiento oportuno."],["psychological-safety","Puedo reconocer un error sin temor a consecuencias injustas."]];
  const answered = Object.keys(answers).length;
  const pulse = answered ? Math.round(Object.values(answers).reduce((sum,value)=>sum+value,0) / answered * 20) : 0;
  if (session.passedCheckpoints.length < lessons.length) {
    return <div className="mx-auto max-w-3xl panel p-7 sm:p-10"><p className="eyebrow">{t.lesson.labLocked}</p><h1 className="mt-3 text-3xl font-bold">{t.lesson.labLockedTitle}</h1><p className="mt-3 text-white/50">{t.lesson.labLockedText}</p><Link to="/dashboard" className="mt-7 inline-flex rounded-full bg-lime px-6 py-3 text-sm font-bold text-ink">{t.lesson.back}</Link></div>;
  }
  return <div className="mx-auto max-w-7xl"><header className="mb-8"><p className="eyebrow">Laboratorio aplicado · Capítulo 6</p><h1 className="mt-3 text-4xl font-bold tracking-[-.05em] sm:text-6xl">Medir el clima es convertir percepción en acción.</h1><p className="mt-4 max-w-3xl text-white/50">Una encuesta útil define objetivos, protege confidencialidad, mide dimensiones relevantes y termina en decisiones verificables.</p></header><section className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]"><article className="panel p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="eyebrow">Ciclo profesional</p><h2 className="mt-2 text-2xl font-bold">De pregunta a mejora</h2></div><BarChart3 className="text-cyan"/></div><div className="mt-8 grid gap-4 sm:grid-cols-2">{[["01","Definir objetivo","Qué decisión debe informar la medición"],["02","Elegir dimensiones","Liderazgo, voz, reconocimiento, carga y seguridad"],["03","Diseñar y distribuir","Escala clara, anonimato y participación"],["04","Analizar patrones","Comparar dimensiones, equipos y cambios"],["05","Compartir resultados","Cerrar el ciclo con transparencia"],["06","Actuar y medir de nuevo","Plan, responsables y seguimiento"]].map(([n,title,text],i)=><div className={`rounded-2xl border p-5 ${i===0?"border-lime/35 bg-lime/5":"border-white/10"}`} key={n}><span className="font-mono text-xs text-lime">{n}</span><p className="mt-4 font-semibold">{title}</p><p className="mt-1 text-sm text-white/40">{text}</p></div>)}</div></article><aside className="panel p-6 sm:p-8"><p className="eyebrow">Pulso de ejemplo</p><h2 className="mt-2 text-2xl font-bold">Mapa de clima</h2><div className="mt-7 space-y-5">{moduleOne.climate_dimensions.map(d=><div key={d.id}><div className="flex justify-between gap-3"><div><p className="text-sm font-semibold">{d.title}</p><p className="text-[11px] text-white/35">{d.description}</p></div><span className="font-mono text-sm" style={{color:d.color}}>{d.score}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full" style={{width:`${d.score}%`,backgroundColor:d.color}}/></div></div>)}</div><div className="mt-7 rounded-2xl bg-rose-400/10 p-4"><p className="text-sm font-semibold text-rose-200">Señal prioritaria</p><p className="mt-1 text-xs text-white/45">Seguridad psicológica necesita investigación cualitativa antes de diseñar una intervención.</p></div></aside></section>
  <section className="mt-6 panel p-6 sm:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Práctica interactiva</p><h2 className="mt-2 text-2xl font-bold">Construye un mini pulso</h2><p className="mt-2 text-sm text-white/40">1 = totalmente en desacuerdo · 5 = totalmente de acuerdo</p></div><div className="rounded-2xl bg-lime/10 px-5 py-3 text-right"><p className="text-[10px] uppercase tracking-widest text-white/35">Pulso actual</p><p className="text-3xl font-bold text-lime">{answered?`${pulse}%`:"—"}</p></div></div><div className="mt-7 space-y-4">{questions.map(([id,question],index)=><div className="grid gap-4 rounded-2xl border border-white/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center" key={id}><div><span className="font-mono text-[10px] text-lime">P{index+1}</span><p className="mt-1 font-semibold">{question}</p></div><div className="flex gap-2">{[1,2,3,4,5].map(value=><button aria-label={`${question}: ${value}`} onClick={()=>setAnswers(current=>({...current,[id]:value}))} className={`grid h-9 w-9 place-items-center rounded-full border text-xs font-bold transition-colors ${answers[id]===value?"border-lime bg-lime text-ink":"border-white/10 text-white/45 hover:border-lime/40"}`} key={value}>{value}</button>)}</div></div>)}</div>{answered===questions.length&&<div className="mt-6 rounded-2xl border border-cyan/20 bg-cyan/5 p-5"><p className="font-semibold text-cyan">Pulso completado</p><p className="mt-1 text-sm text-white/45">{pulse<60?"La señal sugiere profundizar con entrevistas antes de proponer acciones.":"La señal es favorable, pero conviene analizar cada dimensión y no quedarse con el promedio."}</p></div>}</section></div>;
}
