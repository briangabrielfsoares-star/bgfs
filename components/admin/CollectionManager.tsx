"use client";

import { useEffect, useState } from "react";
import { uploadSiteImage, listAdminCollection, removeAdminDoc, upsertAdminDoc } from "@/lib/firebase-data";

type Field = { name: string; label: string; type?: "text" | "textarea" | "number" | "checkbox" | "image" };

export function CollectionManager({ collectionName, title, fields, defaults }: { collectionName: string; title: string; fields: Field[]; defaults: Record<string, unknown> }) {
  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [form, setForm] = useState<Record<string, any>>(defaults);
  const [msg, setMsg] = useState("");

  async function load() {
    const data = await listAdminCollection<Record<string, any>>(collectionName);
    setItems(data);
  }

  useEffect(() => { load().catch((e) => setMsg(e.message)); }, []);

  function edit(item: Record<string, any>) {
    setForm(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const id = String(form.id || form.title || form.name || Date.now()).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await upsertAdminDoc(collectionName, id, { ...form, id });
    setForm(defaults);
    setMsg("Salvo com sucesso.");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Excluir este item?")) return;
    await removeAdminDoc(collectionName, id);
    await load();
  }

  async function upload(field: string, file?: File) {
    if (!file) return;
    const url = await uploadSiteImage(file, collectionName.toLowerCase());
    setForm({ ...form, [field]: url });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[.25em] text-gold">Admin</p>
        <h1 className="mt-2 text-4xl font-black text-ink">{title}</h1>
      </div>
      <form onSubmit={save} className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className={`${field.type === "textarea" ? "md:col-span-2" : ""} text-sm font-bold text-slate-700`}>
              {field.label}
              {field.type === "textarea" ? (
                <textarea className="input mt-2 min-h-28" value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />
              ) : field.type === "checkbox" ? (
                <select className="input mt-2" value={form[field.name] === false ? "false" : "true"} onChange={(e) => setForm({ ...form, [field.name]: e.target.value === "true" })}><option value="true">Ativo</option><option value="false">Inativo</option></select>
              ) : field.type === "image" ? (
                <div className="mt-2"><input className="input" value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} placeholder="URL da imagem" /><input className="mt-2 text-sm" type="file" accept="image/*" onChange={(e) => upload(field.name, e.target.files?.[0])} /></div>
              ) : (
                <input className="input mt-2" type={field.type || "text"} value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: field.type === "number" ? Number(e.target.value) : e.target.value })} />
              )}
            </label>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3"><button className="rounded-full bg-ink px-6 py-3 text-sm font-black text-white">Salvar</button><button type="button" onClick={() => setForm(defaults)} className="rounded-full border border-slate-200 px-6 py-3 text-sm font-black">Novo</button></div>
        {msg && <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-ocean">{msg}</p>}
      </form>
      <div className="grid gap-4">
        {items.map((item) => <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><p className="font-black text-ink">{item.title || item.name || item.id}</p><p className="mt-1 text-sm text-slate-500">{item.description || item.text || item.category || item.email}</p></div><div className="flex gap-2"><button onClick={() => edit(item)} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold">Editar</button><button onClick={() => remove(item.id)} className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700">Excluir</button></div></div></div>)}
      </div>
    </div>
  );
}
