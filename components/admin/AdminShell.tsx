"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth, isFirebaseConfigComplete } from "@/lib/firebase";
import { Logo } from "@/components/Logo";

const nav = [
  ["Dashboard", "/admin"],
  ["Setup", "/admin/setup"],
  ["Conteúdo", "/admin/conteudo"],
  ["Serviços", "/admin/servicos"],
  ["Portfólio", "/admin/portfolio"],
  ["Depoimentos", "/admin/depoimentos"],
  ["Leads", "/admin/leads"],
  ["Configurações", "/admin/configuracoes"]
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigComplete()) {
      setReady(true);
      return;
    }
    const unsub = onAuthStateChanged(auth(), (current) => {
      setUser(current);
      setReady(true);
    });
    return () => unsub();
  }, []);

  return (
    <div className="admin-grid min-h-screen bg-slate-50">
      <aside className="bg-ink p-5 text-white lg:min-h-screen">
        <Link href="/"><Logo /></Link>
        <nav className="mt-10 grid gap-2">
          {nav.map(([label, href]) => <Link key={href} href={href} className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">{label}</Link>)}
        </nav>
        <div className="mt-10 rounded-2xl bg-white/10 p-4 text-xs text-white/65">
          {ready && user ? <><p>Logado como:</p><p className="mt-1 break-all font-bold text-white">{user.email}</p><button onClick={() => signOut(auth())} className="mt-4 text-gold">Sair</button></> : <p>Acesse Setup ou Login para configurar.</p>}
        </div>
      </aside>
      <main className="p-5 md:p-8">{children}</main>
    </div>
  );
}

export function AdminCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"><h2 className="mb-5 text-2xl font-black text-ink">{title}</h2>{children}</section>;
}
