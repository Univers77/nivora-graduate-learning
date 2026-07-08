import { BookOpen, BrainCircuit, FileQuestion, FileText, GraduationCap, LayoutDashboard, Menu, Network, Orbit, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LanguageToggle, useLanguage } from "../../i18n/LanguageProvider";
import { useOscarSession } from "../../stores/useOscarSession";
import { FloatingGuide } from "../guide/FloatingGuide";

export function AppShell() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { session, updateLastRoute } = useOscarSession();
  const { t } = useLanguage();
  const links = [
    ["/dashboard", t.nav.dashboard, LayoutDashboard],
    ["/course", t.nav.course, GraduationCap],
    ["/module-1", t.nav.module1, Network],
    ["/practice", t.nav.practice, FileQuestion],
    ["/glossary", t.nav.glossary, BookOpen],
    ["/skill-tree", t.nav.skillTree, Network],
    ["/learning-memory", t.nav.memory, BrainCircuit],
    ["/study-docs", t.nav.docs, FileText],
    ["/learning-vault", t.nav.vault, BookOpen],
  ] as const;
  useEffect(() => updateLastRoute(`${location.pathname}${location.search}${location.hash}`), [location, updateLastRoute]);
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      <button aria-label={t.nav.open} className="fixed right-4 top-4 z-50 rounded-full border border-white/10 bg-panel p-3 lg:hidden" onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <aside className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-40 flex w-[250px] flex-col border-r border-white/10 bg-ink p-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}>
        <div className="mb-7 flex items-center justify-between gap-3"><NavLink to="/dashboard" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-lime text-ink shadow-lg shadow-lime/20"><Orbit size={22}/></span><span><span className="block text-xl font-bold tracking-[-.06em]">NIVORA</span><span className="mt-0.5 block text-[9px] uppercase tracking-[.2em] text-white/35">{t.nav.graduate}</span></span></NavLink></div>
        <div className="mb-5"><LanguageToggle /></div>
        <nav className="flex-1 space-y-1 overflow-y-auto pb-5" aria-label={t.nav.aria}>
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${isActive ? "bg-lime text-ink" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </nav>
        <div className="rounded-2xl border border-lime/20 bg-lime/5 p-4">
          <p className="eyebrow">{t.nav.momentum}</p><p className="mt-2 text-2xl font-bold">{session.streakDays} {t.nav.days}</p><p className="text-xs text-white/50">+{session.points} {t.nav.points}</p>
        </div>
      </aside>
      <main className="grid-noise min-w-0 p-4 pt-20 sm:p-8 lg:p-10"><Outlet /></main>
      <FloatingGuide />
    </div>
  );
}
