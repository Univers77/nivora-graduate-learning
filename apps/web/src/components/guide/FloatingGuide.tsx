import { BookOpen, CheckCircle2, Download, FolderOpen, GraduationCap, LogOut, RotateCcw, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageProvider";
import { buildOscarObsidianNote, downloadOscarObsidianNote } from "../../lib/obsidian-export";
import { useLearningMemory } from "../../stores/useLearningMemory";
import { useOscarSession } from "../../stores/useOscarSession";

export function FloatingGuide() {
  const { session, setGuideOpen, completeStep, reset, logout } = useOscarSession();
  const { events } = useLearningMemory();
  const { t } = useLanguage();
  const note = buildOscarObsidianNote(events, session);
  const supported = "showDirectoryPicker" in window;
  type DirectoryHandle = {
    getDirectoryHandle: (name: string, options?: { create?: boolean }) => Promise<DirectoryHandle>;
    getFileHandle: (name: string, options?: { create?: boolean }) => Promise<{ createWritable: () => Promise<{ write: (content: string) => Promise<void>; close: () => Promise<void> }> }>;
  };
  const [obsidianHandle, setObsidianHandle] = useState<DirectoryHandle | null>(null);
  const [syncStatus, setSyncStatus] = useState<string>(t.guide.local);

  const writeObsidianNote = useCallback(async (root: DirectoryHandle, markdown: string) => {
    const learner = await root.getDirectoryHandle("Oscar Vargas", { create: true });
    const nivora = await learner.getDirectoryHandle("NIVORA", { create: true });
    const file = await nivora.getFileHandle("learning-memory.md", { create: true });
    const writable = await file.createWritable();
    await writable.write(markdown);
    await writable.close();
  }, []);

  useEffect(() => {
    if (!obsidianHandle) return;
    writeObsidianNote(obsidianHandle, note).then(() => setSyncStatus(t.guide.synced)).catch(() => setSyncStatus(t.guide.reconnect));
  }, [events.length, note, obsidianHandle, t.guide.reconnect, t.guide.synced, writeObsidianNote]);

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
      setSyncStatus(t.guide.connected);
      completeStep("obsidian-connected");
    } catch {
      downloadOscarObsidianNote(note);
    }
  };

  if (!session.guideOpen) {
    return <button aria-label={t.guide.open} onClick={()=>setGuideOpen(true)} className="mascot-bubble fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-[#16131a]/95 px-3 py-2 text-sm font-bold text-white shadow-2xl shadow-black/40 backdrop-blur transition-transform active:scale-[.96]"><span className="grid h-10 w-10 place-items-center rounded-full bg-lime text-ink"><GraduationCap size={20}/></span><span className="hidden sm:inline">{t.guide.bubble}</span></button>;
  }

  const steps = t.guide.steps;

  return <aside className="guide-sheet fixed bottom-[calc(.75rem+env(safe-area-inset-bottom))] right-3 z-50 flex max-h-[calc(100dvh-1.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-[min(370px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[28px] border border-lime/25 bg-[#120b0f]/95 shadow-2xl shadow-black/50 backdrop-blur">
    <div className="shrink-0 border-b border-white/10 bg-gradient-to-br from-lime/15 to-cyan/10 p-5"><div className="flex items-start justify-between gap-4"><div className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lime text-ink"><GraduationCap size={21}/></span><div><p className="eyebrow">{t.guide.eyebrow}</p><h2 className="mt-1 text-2xl font-bold">{t.guide.title}</h2><p className="mt-2 text-sm text-white/55">{t.guide.text}</p></div></div><button aria-label={t.guide.close} onClick={()=>setGuideOpen(false)} className="rounded-full border border-white/10 p-2 text-white/55"><X size={17}/></button></div></div>
    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">{steps.map(([n,title,text,to])=><Link to={to} onClick={()=>completeStep(title)} className="block rounded-2xl border border-white/10 bg-white/[.035] p-4 transition-colors hover:border-lime/35" key={n}><div className="flex gap-3"><span className="font-mono text-xs text-lime">{n}</span><div><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-white/45">{text}</p></div></div></Link>)}</div>
    <div className="grid gap-2 border-t border-white/10 p-4 sm:grid-cols-2"><button onClick={connectObsidian} className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-4 py-3 text-sm font-bold text-ink"><FolderOpen size={16}/>{supported ? t.guide.connect : t.guide.export}</button><button onClick={()=>downloadOscarObsidianNote(note)} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-white/70"><Download size={16}/>{t.guide.download}</button><button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan/25 px-4 py-3 text-sm text-cyan"><RotateCcw size={16}/>{t.guide.reset}</button><button onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-white/70"><LogOut size={16}/>{t.guide.logout}</button></div>
    <div className="flex flex-wrap items-center gap-2 px-5 pb-4 text-xs text-white/40"><Sparkles size={14} className="text-lime"/><span>{events.length ? `${events.length} ${t.guide.evidence}` : t.guide.noEvidence}</span><CheckCircle2 size={14} className="text-lime"/><span>{syncStatus}</span><BookOpen size={14} className="text-cyan"/></div>
  </aside>;
}
