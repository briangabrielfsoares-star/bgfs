"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("briangabrielfsoares@gmail.com");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      await signInWithEmailAndPassword(auth(), email, password);
      router.push("/admin");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Não foi possível entrar.");
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={submit} className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[.25em] text-gold">Admin</p>
        <h1 className="mt-3 text-4xl font-black text-ink">Entrar no painel</h1>
        <label className="mt-8 block text-sm font-bold text-slate-700">E-mail<input className="input mt-2" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="mt-4 block text-sm font-bold text-slate-700">Senha<input type="password" className="input mt-2" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button className="mt-6 rounded-full bg-ink px-7 py-4 text-sm font-black text-white">Entrar</button>
        {msg && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{msg}</p>}
      </form>
    </div>
  );
}
