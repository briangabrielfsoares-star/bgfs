"use client";

import { useEffect, useState } from "react";
import { AuthGate } from "@/components/admin/AuthGate";
import { AdminCard } from "@/components/admin/AdminShell";
import { DEFAULT_SETTINGS } from "@/lib/seed-data";
import { getSettings, uploadSiteImage, upsertAdminDoc } from "@/lib/firebase-data";
import type { SiteSettings } from "@/lib/types";

export default function Page() {
  const [form, setForm] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [msg, setMsg] = useState("");
  useEffect(() => { getSettings().then(setForm); }, []);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    await upsertAdminDoc("Settings", "main", form as unknown as Record<string, unknown>);
    setMsg("Configurações salvas.");
  }
  async function upload(file?: File) {
    if (!file) return;
    const url = await uploadSiteImage(file, "logos");
    setForm({ ...form, logoUrl: url });
  }
  return (
    <AuthGate>
      <div className="space-y-6">
        <div><p className="text-sm font-bold uppercase tracking-[.25em] text-gold">Admin</p><h1 className="mt-2 text-4xl font-black text-ink">Configurações</h1></div>
        <AdminCard title="Dados gerais do site">
          <form onSubmit={save} className="grid gap-4 md:grid-cols-2">
            {(["companyName", "email", "phone", "whatsapp", "instagram", "linkedin", "tiktok", "ctaText", "ctaHref"] as (keyof SiteSettings)[]).map((key) => <label key={key} className="text-sm font-bold text-slate-700">{key}<input className="input mt-2" value={(form[key] as string) || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></label>)}
            <label className="text-sm font-bold text-slate-700 md:col-span-2">Logo URL<input className="input mt-2" value={form.logoUrl || ""} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} /><input className="mt-2" type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0])} /></label>
            <button className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-black text-white">Salvar</button>
          </form>
          {msg && <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-ocean">{msg}</p>}
        </AdminCard>
      </div>
    </AuthGate>
  );
}
