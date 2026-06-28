"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminShell";
import { AuthGate } from "@/components/admin/AuthGate";
import { seedDatabase } from "@/lib/firebase-data";

export default function Page() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function seed() {
    setLoading(true);
    try {
      await seedDatabase();
      setMsg("Dados iniciais criados/atualizados com sucesso.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erro ao criar dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGate>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.25em] text-gold">Painel administrativo</p>
          <h1 className="mt-2 text-4xl font-black text-ink">BGFS Digital</h1>
          <p className="mt-3 text-slate-600">Gerencie conteúdo, serviços, cases, depoimentos, leads e configurações do site.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[['Conteúdo','/admin/conteudo'],['Serviços','/admin/servicos'],['Leads','/admin/leads']].map(([label,href]) => <Link key={href} href={href} className="rounded-[2rem] bg-white p-6 text-2xl font-black text-ink shadow-sm transition hover:-translate-y-1">{label}</Link>)}
        </div>
        <AdminCard title="Dados de exemplo">
          <p className="text-slate-600">Use este botão para recriar ou atualizar os dados iniciais: 6 serviços, 4 cases, 5 depoimentos, páginas e configurações.</p>
          <button disabled={loading} onClick={seed} className="mt-5 rounded-full bg-gold px-6 py-3 text-sm font-black text-ink disabled:opacity-60">{loading ? "Criando..." : "Criar dados de exemplo"}</button>
          {msg && <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-ocean">{msg}</p>}
        </AdminCard>
      </div>
    </AuthGate>
  );
}
