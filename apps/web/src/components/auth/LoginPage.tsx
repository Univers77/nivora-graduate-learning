import { Layers3, LockKeyhole, Orbit, ShieldCheck, Sparkles } from "lucide-react";
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

  return <main className="grid-noise min-h-dvh overflow-hidden bg-ink px-5 py-8">
    <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <div className="relative order-2 lg:order-1">
        <div className="intro-orb left-8 top-6"/>
        <div className="intro-orb intro-orb-delayed bottom-8 right-12"/>
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-ink shadow-xl shadow-lime/20"><Orbit size={30}/></span>
        <p className="mt-8 eyebrow">Graduate Learning OS</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-[-.07em] sm:text-7xl">Aprende paso a paso. Avanza solo cuando dominas.</h1>
        <p className="mt-5 max-w-xl text-lg text-white/55">Ruta académica con contenido, control rápido y desbloqueo progresivo para construir comprensión real.</p>
        <div className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3">{["Contenido claro","Quiz obligatorio","Avance bloqueado"].map((item)=><div className="motion-card rounded-2xl border border-white/10 bg-white/[.035] p-4" key={item}><ShieldCheck className="text-lime" size={18}/><p className="mt-4 text-sm font-semibold">{item}</p></div>)}</div>
      </div>
      <div className="relative order-1 lg:order-2">
        <div className="device-showcase mb-5 hidden rounded-[34px] border border-lime/20 bg-gradient-to-br from-white/10 via-panel to-cyan/10 p-4 shadow-2xl shadow-black/40 sm:block">
          <div className="shine-surface rounded-[26px] border border-white/10 bg-ink/70 p-5">
            <div className="flex items-center justify-between"><span className="pill"><Sparkles size={14}/>Ritmo recomendado</span><Layers3 className="text-lime"/></div>
            <div className="mt-8 h-2 rounded-full bg-white/10"><div className="h-full w-1/3 rounded-full bg-lime"/></div>
            <div className="mt-5 grid grid-cols-3 gap-2">{["12m","0%","U1"].map((item)=><div className="rounded-2xl border border-white/10 bg-white/[.04] p-3 text-center font-mono text-sm text-lime" key={item}>{item}</div>)}</div>
          </div>
        </div>
        <form onSubmit={submit} className="panel p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="eyebrow">Acceso de estudiante</p><h2 className="mt-2 text-3xl font-bold">Entrar a la plataforma</h2></div><LockKeyhole className="text-lime"/></div><label className="mt-8 block text-sm text-white/55">Usuario<input value={username} onChange={(event)=>setUsername(event.target.value)} autoComplete="username" className="mt-2 w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime" /></label><label className="mt-5 block text-sm text-white/55">Contraseña<input value={password} onChange={(event)=>setPassword(event.target.value)} type="password" autoComplete="current-password" className="mt-2 w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime" /></label>{error&&<p className="mt-4 rounded-2xl border border-cyan/30 bg-cyan/10 p-3 text-sm text-cyan">{error}</p>}<button className="mt-7 w-full rounded-full bg-lime px-5 py-3.5 font-bold text-ink transition-transform active:scale-[.98]">Continuar aprendizaje</button><div className="mt-6 rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm text-white/55"><p className="font-semibold text-white">Credenciales</p><p className="mt-2">Usuario: <span className="font-mono text-lime">{OSCAR_CREDENTIALS.username}</span></p><p>Contraseña: <span className="font-mono text-lime">{OSCAR_CREDENTIALS.password}</span></p></div></form>
      </div>
    </section>
  </main>;
}
