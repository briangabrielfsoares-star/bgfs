"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, isFirebaseConfigComplete } from "@/lib/firebase";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigComplete()) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth(), (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <p className="rounded-2xl bg-white p-6">Carregando...</p>;
  if (!isFirebaseConfigComplete()) {
    return <SetupPrompt />;
  }
  if (!user) {
    return <LoginPrompt />;
  }
  return <>{children}</>;
}

function SetupPrompt() {
  return <div className="rounded-[2rem] bg-white p-8 shadow-sm"><h1 className="text-3xl font-black">Firebase ainda não configurado</h1><p className="mt-3 text-slate-600">Acesse a tela de setup guiado para colar a configuração do Firebase e ativar login, painel, leads e uploads.</p><Link href="/admin/setup" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-black text-white">Ir para setup</Link></div>;
}

function LoginPrompt() {
  return <div className="rounded-[2rem] bg-white p-8 shadow-sm"><h1 className="text-3xl font-black">Faça login para continuar</h1><p className="mt-3 text-slate-600">Entre com o e-mail admin configurado.</p><Link href="/admin/login" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-black text-white">Ir para login</Link></div>;
}
