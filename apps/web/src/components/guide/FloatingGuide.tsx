import { BookOpen, CheckCircle2, Compass, Download, FolderOpen, LogOut, RotateCcw, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildOscarObsidianNote, downloadOscarObsidianNote } from "../../lib/obsidian-export";
import { useLearningMemory } from "../../stores/useLearningMemory";
import { useOscarSession } from "../../stores/useOscarSession";

export function FloatingGuide() {
  const { session, setGuideOpen, completeStep, reset, logout } = useOscarSession();
  const { events } = useLearningMemory();
  const note = buildOscarObsidianNote(events, session);
  const supported = "showDirectoryPicker" in window;
  type DirectoryHandle = {
    getDirectoryHandle: (name: string, options?: { create?: boolean }) => Promise<DirectoryHandle>;
    getFileHandle: (name: string, options?: { create?: boolean }) => Promise<{ createWritable: () => Promise<{ write: (content: string) => Promise<void>; close: () => Promise<void> }> }>;
  };
  const [obsidianHandle, setObsidianHandle] = useState<DirectoryHandle | null>(null);
  const [syncStatus, setSyncStatus] = useState("Memoria local activa");

  const writeObsidianNote = useCallback(async (root: DirectoryHandle, markdown: string) => {
    const learner = await root.getDirectoryHandle("Learner", { create: true });
    const nivora = await learner.getDirectoryHandle("NIVORA", { create: true });
    const file = await nivora.getFileHandle("learning-memory.md", { create: true });
    const writable = await file.createWritable();
    await writable.write(markdown);
    await writable.close();
  }, []);

  useEffect(() => {
    if (!obsidianHandle) return;
    writeObsidianNote(obsidianHandle, note).then(() => setSyncStatus("Obsidian sincronizado")).catch(() => setSyncStatus("Obsidian requiere reconexión"));
  }, [events.length, note, obsidianHandle, writeObsidianNote]);

  const connectObsidian = async () => {
    completeStep("obsidian");
    if (!supported) {
      downloadOscarObsidianNote(note);
      return;
    }
    try {
      const picker = (window as unknown as { showDirectoryPicker: () => Promise<DirectoryHandle> }).showDirectoryPicker;
      const root = await picker();
      await writeObsidianNote(root, note);
      setObsidianHandle(root);
      setSyncStatus("Obsidian conectado en tiempo real");
      completeStep("obsidian-connected");
    } catch {
      downloadOscarObsidianNote(note);
    }
  };

  if (!session.guideOpen) {
    return <button onClick={()=>setGuideOpen(true)} className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 inline-flex items-center gap-2 rounded-full bg-lime px-4 py-3 text-sm font-bold text-ink shadow-2xl shadow-black/40 transition-transform active:scale-[.96]"><Compass size={18}/>Guía</button>;
  }

  const steps = [
    ["01", "Comienza por Unidad 1", "Haz una lección de 12 minutos y no intentes leer todo de golpe.", "/module-1/lesson"],
    ["02", "Recupera sin mirar", "Ve al banco de práctica y responde una pregunta antes de consultar la guía.", "/practice"],
    ["03", "Refuerza conceptos", "Usa el glosario solo después de intentar explicar el concepto con tus palabras.", "/glossary"],
    ["04", "Registra evidencia", "En Repaso inteligente marca qué explicaste bien y qué necesita refuerzo.", "/learning-memory"],
  ];

  return <aside className="guide-sheet fixed bottom-[calc(.75rem+env(safe-area-inset-bottom))] right-3 z-50 flex max-h-[calc(100dvh-1.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-[min(390px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[28px] border border-lime/25 bg-[#120b0f]/95 shadow-2xl shadow-black/50 backdrop-blur">
    <div className="shrink-0 border-b border-white/10 bg-gradient-to-br from-lime/15 to-cyan/10 p-5"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Asistente de ruta</p><h2 className="mt-2 text-2xl font-bold">Paso a paso</h2><p className="mt-2 text-sm text-white/55">Objetivo: máxima retención, progreso desde cero y memoria trazable.</p></div><button aria-label="Cerrar guía" onClick={()=>setGuideOpen(false)} className="rounded-full border border-white/10 p-2 text-white/55"><X size={17}/></button></div></div>
    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">{steps.map(([n,title,text,to])=><Link to={to} onClick={()=>completeStep(title)} className="block rounded-2xl border border-white/10 bg-white/[.035] p-4 transition-colors hover:border-lime/35" key={n}><div className="flex gap-3"><span className="font-mono text-xs text-lime">{n}</span><div><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-white/45">{text}</p></div></div></Link>)}</div>
    <div className="grid gap-2 border-t border-white/10 p-4 sm:grid-cols-2"><button onClick={connectObsidian} className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-4 py-3 text-sm font-bold text-ink"><FolderOpen size={16}/>{supported ? "Conectar Obsidian" : "Exportar memoria"}</button><button onClick={()=>downloadOscarObsidianNote(note)} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-white/70"><Download size={16}/>Descargar nota</button><button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan/25 px-4 py-3 text-sm text-cyan"><RotateCcw size={16}/>Reiniciar cero</button><button onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-white/70"><LogOut size={16}/>Salir</button></div>
    <div className="flex flex-wrap items-center gap-2 px-5 pb-4 text-xs text-white/40"><Sparkles size={14} className="text-lime"/><span>{events.length ? `${events.length} evidencias guardadas` : "Sin evidencias todavía"}</span><CheckCircle2 size={14} className="text-lime"/><span>{syncStatus}</span><BookOpen size={14} className="text-cyan"/></div>
  </aside>;
}
