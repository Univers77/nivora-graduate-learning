import { ArrowRight, BookOpen, BrainCircuit, CheckCircle2, ChevronRight, FileQuestion, GraduationCap, Lightbulb, Network, Search, Target, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import course from "../../data/course-complete.json";
import { PageHeader, Progress } from "../shared/UI";

type Unit = (typeof course.units)[number];
type Question = (typeof course.questions)[number];

const unitProgress: Record<string, number> = { U1: 34, U2: 0, U3: 0, U4: 0, U5: 0, U6: 0 };
const unitSpanish: Record<string, string> = {
  U1: "Fundamentos y naturaleza del trabajo",
  U2: "Individuo, equipo, estructura y cultura",
  U3: "Cultura, diversidad, motivación y desempeño",
  U4: "Percepción, decisiones, aprendizaje y refuerzo",
  U5: "Negociación, grupos y comunicación",
  U6: "Liderazgo, recursos humanos, cambio y estrés",
};

export function CourseOverviewPage() {
  const totals = {
    concepts: course.glossary.length,
    questions: course.questions.length,
    theories: course.units.reduce((sum, unit) => sum + unit.theories.length, 0),
    activities: course.units.reduce((sum, unit) => sum + unit.activities.length, 0),
  };

  return <div className="mx-auto max-w-7xl">
    <PageHeader eyebrow="CRKC 5001 · Programa completo" title="Tu mapa para dominar Organisational Behaviour" description="Doce semanas convertidas en una ruta clara: fundamentos, teoría, casos, práctica activa y evidencia para las evaluaciones oficiales." />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[[BookOpen, "6 unidades", "Ruta completa"], [BrainCircuit, `${totals.concepts} conceptos`, "Glosario conectado"], [GraduationCap, `${totals.theories} teorías`, "Marcos esenciales"], [FileQuestion, `${totals.questions} preguntas`, "Práctica de desarrollo"]].map(([Icon,value,note])=>{const I=Icon as typeof BookOpen; return <article className="panel p-5" key={value as string}><I className="text-lime"/><p className="mt-6 text-2xl font-bold">{value as string}</p><p className="mt-1 text-sm text-white/40">{note as string}</p></article>})}
    </section>
    <section className="mt-8 grid gap-5 xl:grid-cols-[1fr_330px]">
      <div className="space-y-4">{course.units.map((unit,index)=><UnitCard unit={unit} index={index} key={unit.id}/>)}</div>
      <aside className="space-y-5">
        <article className="panel p-6"><Trophy className="text-lime"/><h2 className="mt-5 text-xl font-bold">Evaluación oficial</h2><div className="mt-5 space-y-3">{[["Quiz","30%","U2 + U5"],["Contribuciones","20%","U3 + U4"],["Portafolio final","50%","U6 + integración"]].map(([name,value,note])=><div className="rounded-2xl border border-white/10 p-4" key={name}><div className="flex justify-between gap-3"><p className="font-semibold">{name}</p><span className="eyebrow">{value}</span></div><p className="mt-1 text-xs text-white/35">{note}</p></div>)}</div></article>
        <article className="rounded-3xl border border-cyan/20 bg-cyan/[.06] p-6"><Target className="text-cyan"/><h2 className="mt-5 text-xl font-bold">Método recomendado</h2><p className="mt-2 text-sm text-white/45">Comprende la idea, aplícala al caso, recupérala sin apuntes y conecta el resultado con tu portafolio.</p><Link to="/practice" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan">Abrir banco de práctica <ArrowRight size={15}/></Link></article>
      </aside>
    </section>
  </div>;
}

function UnitCard({ unit, index }: { unit: Unit; index: number }) {
  const progress = unitProgress[unit.id] ?? 0;
  return <Link to={`/course/${unit.id.toLowerCase()}`} className={`group block rounded-3xl border p-6 transition-colors ${progress ? "border-lime/30 bg-lime/[.055]" : "border-white/10 bg-panel/70 hover:border-white/20"}`}>
    <div className="flex items-start gap-4"><div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-mono text-sm font-bold ${progress ? "bg-lime text-ink" : "bg-white/5 text-white/40"}`}>{String(index+1).padStart(2,"0")}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">{unit.id} · Semanas {unit.weeks}</p><h2 className="mt-2 text-xl font-bold">{unitSpanish[unit.id]}</h2></div><ChevronRight className="text-white/25 transition-transform group-hover:translate-x-1"/></div><p className="mt-3 text-sm text-white/45">{unit.question}</p><div className="mt-5 flex flex-wrap gap-2"><span className="pill">{unit.concepts.length} conceptos</span><span className="pill">{unit.theories.length} teorías</span><span className="pill">{unit.activities.length} actividades</span></div>{progress > 0 && <div className="mt-5"><Progress value={progress}/></div>}</div></div>
  </Link>;
}

export function UnitDetailPage() {
  const { unitId } = useParams();
  const unit = course.units.find(item => item.id.toLowerCase() === unitId);
  if (!unit) return <Navigate to="/course" replace />;
  const questions = course.questions.filter(question => question.unit === unit.id);

  return <div className="mx-auto max-w-7xl">
    <header className="rounded-[34px] border border-lime/25 bg-gradient-to-br from-lime/10 via-panel to-panel p-7 sm:p-10"><div className="flex flex-wrap items-center justify-between gap-3"><span className="eyebrow">{unit.id} · Semanas {unit.weeks}</span><span className="pill">{unit.assessment}</span></div><h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-[-.05em] sm:text-6xl">{unitSpanish[unit.id]}</h1><p className="mt-5 max-w-3xl text-lg text-white/55">{unit.question}</p><div className="mt-7 flex flex-wrap gap-3"><Link to="/practice" className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink"><FileQuestion size={16}/>Practicar esta unidad</Link><Link to="/glossary" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/70"><BookOpen size={16}/>Consultar glosario</Link></div></header>
    <section className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><article className="panel p-6 sm:p-8"><p className="eyebrow">Propósito</p><h2 className="mt-3 text-2xl font-bold">{unit.purpose}</h2><div className="mt-7 space-y-3">{unit.outcomes.map(outcome=><div className="flex gap-3 rounded-2xl border border-white/10 p-4" key={outcome}><CheckCircle2 className="mt-0.5 shrink-0 text-lime" size={18}/><p className="text-sm text-white/60">{outcome}</p></div>)}</div></article><article className="panel p-6 sm:p-8"><Lightbulb className="text-cyan"/><p className="mt-6 eyebrow">Caso central</p><p className="mt-3 text-lg leading-relaxed text-white/70">{unit.case}</p></article></section>
    <section className="mt-7"><p className="eyebrow">Contenido profundo</p><h2 className="mt-2 text-3xl font-bold">Construye comprensión</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{unit.content.map(([title,text])=><article className="panel p-6" key={title}><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/50">{text}</p></article>)}</div></section>
    <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_.85fr]"><article className="panel p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="eyebrow">Teorías esenciales</p><h2 className="mt-2 text-2xl font-bold">Marcos para analizar</h2></div><Network className="text-lime"/></div><div className="mt-6 space-y-3">{unit.theories.map(([author,name,use])=><div className="rounded-2xl border border-white/10 p-4" key={name}><div className="flex flex-wrap justify-between gap-2"><p className="font-semibold">{name}</p><span className="text-xs text-lime">{author}</span></div><p className="mt-2 text-sm text-white/45">{use}</p></div>)}</div></article><aside className="space-y-5"><article className="panel p-6"><p className="eyebrow">Aplicación</p><h2 className="mt-2 text-2xl font-bold">Actividades</h2><div className="mt-5 space-y-3">{unit.activities.map((activity,index)=><div className="flex gap-3 rounded-2xl bg-white/[.035] p-4" key={activity}><span className="font-mono text-xs text-lime">0{index+1}</span><p className="text-sm text-white/60">{activity}</p></div>)}</div></article><article className="rounded-3xl border border-lime/25 bg-lime/10 p-6"><p className="eyebrow">Banco de práctica</p><p className="mt-3 text-3xl font-bold">{questions.length} preguntas</p><p className="mt-2 text-sm text-white/50">Todas usan la estructura concepto → teoría → ejemplo → análisis → impacto → recomendación.</p></article></aside></section>
  </div>;
}

export function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("Todas");
  const filtered = useMemo(()=>course.glossary.filter(item => (unit === "Todas" || item.unit === unit) && `${item.term} ${item.definition}`.toLowerCase().includes(query.toLowerCase())),[query,unit]);
  return <div className="mx-auto max-w-7xl"><PageHeader eyebrow="70 conceptos conectados" title="Glosario activo" description="Consulta términos clave y úsalos como tarjetas de recuperación para fortalecer el lenguaje del curso."/><div className="panel p-4 sm:p-5"><div className="grid gap-3 sm:grid-cols-[1fr_auto]"><label className="flex items-center gap-3 rounded-2xl border border-white/10 px-4"><Search size={17} className="text-white/35"/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Buscar concepto o definición..." className="w-full bg-transparent py-3 text-sm outline-none"/></label><div className="flex flex-wrap gap-2">{["Todas","U1","U2","U3","U4","U5","U6"].map(value=><button onClick={()=>setUnit(value)} className={`rounded-full px-4 py-2 text-xs font-bold ${unit===value?"bg-lime text-ink":"border border-white/10 text-white/55"}`} key={value}>{value}</button>)}</div></div></div><p className="my-5 text-sm text-white/35">{filtered.length} conceptos encontrados</p><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map(item=><article className="panel p-5" key={`${item.unit}-${item.term}`}><span className="eyebrow">{item.unit}</span><h2 className="mt-4 text-xl font-bold">{item.term}</h2><p className="mt-3 text-sm leading-relaxed text-white/50">{item.definition}</p></article>)}</div></div>;
}

export function PracticeBankPage() {
  const [unit, setUnit] = useState("U1");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const questions = course.questions.filter(item => item.unit === unit);
  const current = questions[index % questions.length] as Question;
  const changeUnit = (value: string) => { setUnit(value); setIndex(0); setRevealed(false); };
  const next = () => { setIndex(value => (value + 1) % questions.length); setRevealed(false); };
  return <div className="mx-auto max-w-5xl"><PageHeader eyebrow="Recuperación activa" title="Banco de práctica" description="Responde sin consultar apuntes. Después compara tu estructura con la guía y registra qué debes reforzar."/><div className="mb-5 flex flex-wrap gap-2">{course.units.map(item=><button onClick={()=>changeUnit(item.id)} className={`rounded-full px-4 py-2 text-xs font-bold ${unit===item.id?"bg-lime text-ink":"border border-white/10 text-white/55"}`} key={item.id}>{item.id}</button>)}</div><article className="panel overflow-hidden"><div className="border-b border-white/10 bg-gradient-to-br from-lime/10 to-transparent p-7 sm:p-10"><div className="flex flex-wrap justify-between gap-3"><span className="eyebrow">{unit} · Pregunta {index+1} de {questions.length}</span><span className="pill">{current.difficulty}</span></div><h2 className="mt-7 text-3xl font-bold leading-tight sm:text-5xl">{current.question}</h2></div><div className="p-7 sm:p-10"><p className="text-sm text-white/40">Estructura sugerida para tu respuesta</p><div className="mt-4 flex flex-wrap gap-2">{["Concepto","Teoría","Ejemplo","Análisis","Impacto","Recomendación"].map((step,i)=><span className="pill" key={step}><span className="font-mono text-lime">0{i+1}</span>{step}</span>)}</div>{revealed&&<div className="mt-7 rounded-2xl border border-cyan/20 bg-cyan/5 p-5"><p className="text-sm font-bold text-cyan">Guía de respuesta</p><p className="mt-2 text-white/55">{current.answer_guide}</p></div>}<div className="mt-8 flex flex-wrap justify-between gap-3"><button onClick={()=>setRevealed(true)} className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/70">Mostrar guía</button><button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink">Siguiente pregunta <ArrowRight size={16}/></button></div></div></article></div>;
}
