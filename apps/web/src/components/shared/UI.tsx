import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">{eyebrow}</p><h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1><p className="mt-3 max-w-2xl text-white/55">{description}</p></div>{action}</header>;
}

export function StatCard({ icon: Icon, label, value, note }: { icon: LucideIcon; label: string; value: string; note: string }) {
  return <article className="panel p-5"><div className="flex items-start justify-between"><p className="text-sm text-white/50">{label}</p><Icon size={18} className="text-lime" /></div><p className="mt-4 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-white/40">{note}</p></article>;
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="panel border-dashed p-8 text-center"><p className="font-semibold">{title}</p><p className="mt-2 text-sm text-white/45">{text}</p></div>;
}

export function Progress({ value }: { value: number }) {
  return <div className="progress-track" aria-label={`${value}% completado`}><div className="progress-fill" style={{ width: `${value}%` }} /></div>;
}
