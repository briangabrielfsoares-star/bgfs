"use client";

import { useEffect, useState } from "react";
import { AuthGate } from "@/components/admin/AuthGate";
import { AdminCard } from "@/components/admin/AdminShell";
import { DEFAULT_PAGES } from "@/lib/seed-data";
import { getPage, upsertAdminDoc } from "@/lib/firebase-data";
import type { PageContent } from "@/lib/types";

const pages = [
  ["home", "Home"],
  ["about", "Sobre"],
  ["services", "Serviços"],
  ["portfolio", "Portfólio"],
  ["testimonials", "Depoimentos"],
  ["contact", "Contato"],
  ["privacy", "Política"]
];

export default function Page() {
  const [selected, setSelected] = useState("home");
  const [form, setForm] = useState<PageContent>(DEFAULT_PAGES.home);
  const [msg, setMsg] = useState("");

  useEffect(() => { getPage(selected).then(setForm); }, [selected]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await upsertAdminDoc("PagesContent", selected, { ...form, id: selected });
    setMsg("Conteúdo salvo.");
  }

  return (
    <AuthGate>
      <div className="space-y-6">
        <div><p className="text-sm font-bold uppercase tracking-[.25em] text-gold">Admin</p><h1 className="mt-2 text-4xl font-black text-ink">Conteúdo das páginas</h1></div>
        <div className="flex flex-wrap gap-2">{pages.map(([id,label]) => <button key={id} onClick={() => setSelected(id)} className={`rounded-full px-4 py-2 text-sm font-bold ${selected === id ? "bg-ink text-white" : "bg-white"}`}>{label}</button>)}</div>
        <AdminCard title={`Editar: ${pages.find(([id]) => id === selected)?.[1]}`}>
          <form onSubmit={save} className="grid gap-4">
            <label className="text-sm font-bold text-slate-700">Badge<input className="input mt-2" value={form.badge || ""} onChange={(e) => setForm({ ...form, badge: e.target.value })} /></label>
            <label className="text-sm font-bold text-slate-700">Título<input className="input mt-2" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
            <label className="text-sm font-bold text-slate-700">Subtítulo<textarea className="input mt-2 min-h-24" value={form.subtitle || ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></label>
            <label className="text-sm font-bold text-slate-700">Texto principal<textarea className="input mt-2 min-h-36" value={form.body || ""} onChange={(e) => setForm({ ...form, body: e.target.value })} /></label>
            <div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-bold text-slate-700">Texto do botão<input className="input mt-2" value={form.ctaText || ""} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} /></label><label className="text-sm font-bold text-slate-700">Link do botão<input className="input mt-2" value={form.ctaHref || ""} onChange={(e) => setForm({ ...form, ctaHref: e.target.value })} /></label></div>
            <button className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-black text-white">Salvar conteúdo</button>
            {msg && <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-ocean">{msg}</p>}
          </form>
        </AdminCard>
      </div>
    </AuthGate>
  );
}
