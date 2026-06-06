import { LockKeyhole, Orbit, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OSCAR_CREDENTIALS, useOscarSession } from "../../stores/useOscarSession";

export function LoginPage() {
  const { login, session } = useOscarSession();
  const navigate = useNavigate();
  const [username, setUsername] = useState(OSCAR_CREDENTIALS.username);
  const [password, setPassword] = useState(OSCAR_CREDENTIALS.password);
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!login(username, password)) {
      setError("Usuario o contraseña incorrectos.");
      return;
    }
    navigate(session.lastRoute || "/dashboard", { replace: true });
  };

  return <main className="grid-noise min-h-screen bg-ink px-5 py-8">
    <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <div><span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-ink shadow-xl shadow-lime/20"><Orbit size={30}/></span><p className="mt-8 eyebrow">Private Graduate Learning</p><h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-[-.07em] sm:text-7xl">NIVORA para Oscar Vargas.</h1><p className="mt-5 max-w-xl text-lg text-white/55">Una experiencia premium para dominar CRKC 5001 desde cero, continuar donde quedaste y convertir cada interacción en memoria de aprendizaje.</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{["Progreso en cero","Guía paso a paso","Memoria Obsidian"].map((item)=><div className="rounded-2xl border border-white/10 bg-white/[.035] p-4" key={item}><ShieldCheck className="text-lime" size={18}/><p className="mt-4 text-sm font-semibold">{item}</p></div>)}</div></div>
      <form onSubmit={submit} className="panel p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="eyebrow">Acceso demo</p><h2 className="mt-2 text-3xl font-bold">Entrar a la plataforma</h2></div><LockKeyhole className="text-lime"/></div><label className="mt-8 block text-sm text-white/55">Usuario<input value={username} onChange={(event)=>setUsername(event.target.value)} autoComplete="username" className="mt-2 w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime" /></label><label className="mt-5 block text-sm text-white/55">Contraseña<input value={password} onChange={(event)=>setPassword(event.target.value)} type="password" autoComplete="current-password" className="mt-2 w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime" /></label>{error&&<p className="mt-4 rounded-2xl border border-cyan/30 bg-cyan/10 p-3 text-sm text-cyan">{error}</p>}<button className="mt-7 w-full rounded-full bg-lime px-5 py-3.5 font-bold text-ink">Continuar aprendizaje</button><div className="mt-6 rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm text-white/55"><p className="font-semibold text-white">Credenciales de Oscar</p><p className="mt-2">Usuario: <span className="font-mono text-lime">{OSCAR_CREDENTIALS.username}</span></p><p>Contraseña: <span className="font-mono text-lime">{OSCAR_CREDENTIALS.password}</span></p></div></form>
    </section>
  </main>;
}
