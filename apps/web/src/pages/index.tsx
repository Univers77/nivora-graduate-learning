import { ArrowRight, BookOpen, BrainCircuit, FileText, Gauge, GraduationCap, LockKeyhole, Network, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { LearningMemoryLab } from "../components/learning-agent/LearningMemoryLab";
import { PageHeader, Progress } from "../components/shared/UI";
import content from "../data/mock-content.json";
import modules from "../data/mock-modules.json";

const button = "inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink transition-transform hover:scale-[1.02]";
const secondary = "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/75 hover:bg-white/5";

export function LandingPage() {
  return <div className="grid-noise min-h-screen overflow-hidden">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6"><p className="text-xl font-bold tracking-[-.06em]">NIVORA</p><Link to="/dashboard" className={secondary}>Abrir plataforma</Link></nav>
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:pt-24">
      <section className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
        <div><p className="eyebrow">Graduate Learning, evolved.</p><h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[.96] tracking-[-.06em] sm:text-7xl lg:text-8xl">Tu posgrado, convertido en <span className="text-lime">dominio real.</span></h1><p className="mt-7 max-w-xl text-lg text-white/55">NIVORA combina profundidad académica, práctica activa y momentum diario para aprender con intención y demostrar lo que sabes.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/dashboard" className={button}>Entrar a NIVORA <ArrowRight size={17}/></Link><Link to="/study-docs" className={secondary}>Abrir lecturas</Link></div></div>
        <div className="panel pulse-soft p-7 sm:p-9"><span className="pill">CRKC 5001 · Ruta activa</span><p className="mt-9 text-5xl font-bold">6 unidades</p><p className="mt-2 text-white/45">Desde los fundamentos hasta liderazgo, cambio y bienestar.</p><div className="mt-8"><Progress value={16}/></div><p className="mt-3 text-xs text-white/35">Módulo 1 en desarrollo</p></div>
      </section>
      <section className="mt-28"><p className="eyebrow">Metodología</p><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[GraduationCap,"Fundamentos rigurosos"],[BrainCircuit,"Recuperación activa"],[Gauge,"Dominio medible"],[FileText,"Lecturas completas"]].map(([Icon,label])=>{const I=Icon as typeof GraduationCap; return <div className="panel p-6" key={label as string}><I className="text-lime"/><p className="mt-8 font-semibold">{label as string}</p><p className="mt-2 text-sm text-white/40">Cada recurso tiene un propósito dentro de la ruta.</p></div>})}</div></section>
    </main>
  </div>;
}

export function LearningVaultPage() {
  return <><PageHeader eyebrow="Fuentes del curso" title="Biblioteca académica" description="Materiales organizados por unidad, propósito y estado de estudio."/><div className="panel overflow-hidden"><div className="flex items-center gap-3 border-b border-white/10 p-4"><Search size={18} className="text-white/35"/><input aria-label="Buscar material" placeholder="Buscar por título, tipo o unidad..." className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"/></div><div className="divide-y divide-white/10">{content.map(item=><article className="grid gap-3 p-5 sm:grid-cols-[1fr_auto_auto] sm:items-center" key={item.id}><div><p className="font-semibold">{item.title}</p><p className="mt-1 text-xs text-white/40">{item.module} · {item.updated}</p></div><span className="pill">{item.type}</span><span className={`pill ${item.status==="Disponible"?"border-lime/30 text-lime":""}`}>{item.status}</span></article>)}</div></div></>;
}

export function SkillTreePage() {
  return <><PageHeader eyebrow="Ruta curricular CRKC 5001" title="Mapa de dominio" description="Avanza por comprensión demostrada y conexiones entre conceptos, no solo por completar pantallas."/><div className="panel min-h-[520px] p-6 sm:p-10"><div className="mx-auto flex max-w-2xl flex-col items-center gap-5">{modules.map((m,i)=><div className="contents" key={m.id}>{i>0&&<div className="h-7 w-px bg-white/15"/>}<article className={`w-full rounded-3xl border p-5 ${m.progress>0?"border-lime/30 bg-lime/5":"border-white/10 bg-white/[.02]"}`}><div className="flex items-center gap-4"><div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${m.progress>0?"bg-lime text-ink":"bg-white/10 text-white/40"}`}>{m.progress>0?<Network/>:<LockKeyhole/>}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><p className="font-semibold">{m.title}</p><p className="mt-1 text-xs text-white/35">{m.description}</p></div><span className="eyebrow">{m.progress}%</span></div><Progress value={m.progress}/></div></div></article></div>)}</div></div></>;
}

export function StudyDocsPage() {
  return <><PageHeader eyebrow="Biblioteca académica" title="Lecturas completas" description="Documentos profundos para estudiar con calma, subrayar y refrescar la memoria."/><div className="space-y-5"><article className="overflow-hidden rounded-[32px] border border-lime/25 bg-gradient-to-br from-lime/10 to-panel"><div className="grid gap-6 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end"><div><span className="pill border-lime/25 text-lime">Curso completo · 6 unidades</span><h2 className="mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">Organisational Behaviour CRKC 5001</h2><p className="mt-4 max-w-2xl text-white/50">Base completa con contenido profundo, teorías, casos, actividades, fuentes, glosario y estructura oficial de evaluación.</p><div className="mt-6 flex flex-wrap gap-2"><span className="pill">12 semanas</span><span className="pill">70 conceptos</span><span className="pill">48 preguntas</span></div></div><FileText size={72} className="text-lime/50"/></div><div className="flex flex-wrap gap-3 border-t border-white/10 bg-black/10 p-5 sm:px-9"><a href="./readings/OB_CRKC5001_Modulo_Completo_Codex.pdf" target="_blank" rel="noreferrer" className={button}><BookOpen size={16}/>Leer PDF completo</a><a href="./readings/OB_CRKC5001_Modulo_Completo_Codex.docx" className={secondary} download><FileText size={16}/>Descargar Word</a></div></article><article className="panel p-6 sm:p-8"><span className="pill">Unidad 1 · Guía aplicada</span><h2 className="mt-5 text-2xl font-bold">Fundamentos del comportamiento organizacional</h2><p className="mt-3 max-w-2xl text-sm text-white/45">Lectura concentrada sobre fundamentos, niveles de análisis, management, cultura y clima.</p><div className="mt-6 flex flex-wrap gap-3"><a href="./readings/CRKC5001_Unidad_1_Organisational_Behaviour.pdf" target="_blank" rel="noreferrer" className={button}><BookOpen size={16}/>Leer PDF</a><a href="./readings/CRKC5001_Unidad_1_Organisational_Behaviour.docx" className={secondary} download><FileText size={16}/>Descargar Word</a></div></article></div></>;
}

export function LearningMemoryPage() {
  return <><PageHeader eyebrow="Práctica adaptativa" title="Repaso inteligente" description="Convierte cada respuesta en evidencia de aprendizaje y recomienda la siguiente práctica útil."/><LearningMemoryLab/></>;
}
