"use client";

import { useEffect, useState } from "react";
import { AuthGate } from "@/components/admin/AuthGate";
import { listAdminCollection, updateLeadStatus } from "@/lib/firebase-data";
import type { Lead } from "@/lib/types";

export default function Page() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [msg, setMsg] = useState("");
  async function load() {
    const data = await listAdminCollection<Lead>("Leads");
    setLeads(data.reverse());
  }
  useEffect(() => { load().catch((e) => setMsg(e.message)); }, []);
  async function status(id: string, value: string) {
    await updateLeadStatus(id, value);
    await load();
  }
  return (
    <AuthGate>
      <div className="space-y-6">
        <div><p className="text-sm font-bold uppercase tracking-[.25em] text-gold">Admin</p><h1 className="mt-2 text-4xl font-black text-ink">Leads recebidos</h1></div>
        {msg && <p className="rounded-2xl bg-white p-4 text-sm font-bold text-red-700">{msg}</p>}
        <div className="grid gap-4">
          {leads.map((lead) => <article key={lead.id} className="rounded-[1.6rem] bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-4 md:flex-row"><div><h2 className="text-xl font-black text-ink">{lead.name}</h2><p className="text-sm text-slate-500">{lead.email} {lead.phone && `• ${lead.phone}`}</p><p className="mt-3 font-bold text-ocean">{lead.service}</p><p className="mt-3 leading-7 text-slate-700">{lead.message}</p></div><select className="input max-w-xs" value={lead.status || "novo"} onChange={(e) => lead.id && status(lead.id, e.target.value)}><option value="novo">Novo</option><option value="em_atendimento">Em atendimento</option><option value="finalizado">Finalizado</option></select></div></article>)}
          {!leads.length && <p className="rounded-2xl bg-white p-6 text-slate-600">Nenhum lead recebido ainda.</p>}
        </div>
      </div>
    </AuthGate>
  );
}
