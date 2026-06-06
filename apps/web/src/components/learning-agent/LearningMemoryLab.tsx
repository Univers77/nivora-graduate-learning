import { BrainCircuit, CheckCircle2, Download, Eye, RotateCcw, ShieldCheck, Sparkles, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import path from "../../data/ob-learning-path.json";
import { useLearningMemory } from "../../stores/useLearningMemory";
import { Progress } from "../shared/UI";

const actionLabels = { start: "Comenzar", repeat: "Recuperación activa", reinforce: "Cambiar explicación", practice: "Practicar", review_later: "Repasar luego" };

export function LearningMemoryLab() {
  const { events, record, clear, exportJson, concepts, recommendation } = useLearningMemory();
  const [selected, setSelected] = useState(recommendation.conceptId);
  const [confidence, setConfidence] = useState(3);
  const concept = concepts.find((item) => item.conceptId === selected) ?? concepts[0];
  const unit = path.units.find((item) => item.id === concept.unitId)!;
  const logAnswer = (correct: boolean) => record({ type: "quiz_answered", unitId: concept.unitId, conceptId: concept.conceptId, correct, confidence: confidence / 5, difficulty: 2, durationSeconds: correct ? 34 : 58 });

  return <div className="grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
    <section className="space-y-6">
      <article className="panel overflow-hidden">
        <div className="border-b border-white/10 bg-lime/5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">Siguiente mejor acción</p><h2 className="mt-2 text-3xl font-bold">{recommendation.title}</h2><p className="mt-2 max-w-xl text-sm text-white/55">{recommendation.reason}</p></div><span className="pill border-lime/30 text-lime">{recommendation.estimatedMinutes} min</span></div>
          <button onClick={() => { setSelected(recommendation.conceptId); record({ type: "recommendation_accepted", unitId: concept.unitId, conceptId: recommendation.conceptId }); }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink"><Sparkles size={16}/>{actionLabels[recommendation.action]}</button>
        </div>
        <div className="p-6"><p className="eyebrow">Laboratorio de evidencia</p><div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]"><select aria-label="Concepto a practicar" value={selected} onChange={(event)=>setSelected(event.target.value)} className="rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm">{concepts.map(item=><option key={item.conceptId} value={item.conceptId}>{item.title}</option>)}</select><span className="pill">{unit.title}</span></div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.025] p-5"><p className="text-sm text-white/45">Pregunta de recuperación</p><p className="mt-2 text-xl font-semibold">¿Puedes explicar “{concept.title}” y aplicarlo a una organización real sin consultar apuntes?</p><div className="mt-5"><label className="text-xs text-white/45" htmlFor="confidence">Confianza antes de responder: {confidence}/5</label><input id="confidence" className="mt-2 w-full accent-lime" type="range" min="1" max="5" value={confidence} onChange={(event)=>setConfidence(Number(event.target.value))}/></div><div className="mt-5 flex flex-wrap gap-3"><button onClick={()=>logAnswer(true)} className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-bold text-ink"><CheckCircle2 size={16}/>Lo expliqué bien</button><button onClick={()=>logAnswer(false)} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70"><XCircle size={16}/>Necesito refuerzo</button><button onClick={()=>record({type:"reflection_saved",unitId:concept.unitId,conceptId:concept.conceptId,note:"Reflexión local registrada"})} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70"><Eye size={16}/>Registrar reflexión</button></div></div>
        </div>
      </article>
      <article className="panel p-6"><div className="flex items-center justify-between"><div><p className="eyebrow">Mapa de memoria</p><h2 className="mt-2 text-2xl font-bold">Dominio por concepto</h2></div><BrainCircuit className="text-lime"/></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{concepts.filter(item=>item.attempts>0).map(item=><button onClick={()=>setSelected(item.conceptId)} className="rounded-2xl border border-white/10 p-4 text-left hover:border-lime/30" key={item.conceptId}><div className="flex justify-between gap-3"><p className="font-semibold">{item.title}</p><span className="eyebrow">{item.masteryScore}%</span></div><p className="mb-3 mt-1 text-xs text-white/40">{item.attempts} evidencias · {item.state}</p><Progress value={item.masteryScore}/></button>)}</div>{events.length===0&&<p className="mt-5 rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-white/45">Aún no hay evidencia. Registra tu primera interacción para que el motor aprenda.</p>}</article>
    </section>
    <aside className="space-y-6">
      <article className="panel p-6"><ShieldCheck className="text-lime"/><h2 className="mt-5 text-xl font-bold">Memoria privada y explicable</h2><p className="mt-2 text-sm text-white/45">Todo se guarda solamente en este navegador. Puedes revisar, exportar o borrar la memoria cuando quieras.</p><div className="mt-5 grid grid-cols-2 gap-3"><button onClick={exportJson} disabled={!events.length} className="rounded-xl border border-white/10 p-3 text-sm disabled:opacity-30"><Download className="mx-auto mb-2" size={17}/>Exportar</button><button onClick={clear} disabled={!events.length} className="rounded-xl border border-white/10 p-3 text-sm disabled:opacity-30"><Trash2 className="mx-auto mb-2" size={17}/>Borrar</button></div></article>
      <article className="panel p-6"><p className="eyebrow">Registro reciente</p><h2 className="mt-2 text-xl font-bold">{events.length} interacciones</h2><div className="mt-5 space-y-3">{events.slice(-6).reverse().map(event=><div className="rounded-xl border border-white/10 p-3" key={event.id}><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">{event.type.replace(/_/g," ")}</p>{event.correct===true?<CheckCircle2 size={15} className="text-lime"/>:event.correct===false?<RotateCcw size={15} className="text-cyan"/>:null}</div><p className="mt-1 text-xs text-white/35">{concepts.find(item=>item.conceptId===event.conceptId)?.title}</p></div>)}</div></article>
    </aside>
  </div>;
}
