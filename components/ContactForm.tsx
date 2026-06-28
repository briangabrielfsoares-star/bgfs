"use client";

import { useState } from "react";
import { createLead } from "@/lib/firebase-data";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await createLead(form);
      setMessage("Mensagem enviada com sucesso. Em breve a BGFS Digital entrará em contato.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      const text = err instanceof Error ? err.message : "Não foi possível enviar agora.";
      setMessage(`${text} Enquanto isso, envie um e-mail para briangabrielfsoares@gmail.com.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-premium md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-bold text-slate-700">Nome<input required className="input mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="text-sm font-bold text-slate-700">E-mail<input required type="email" className="input mt-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="text-sm font-bold text-slate-700">Telefone<input className="input mt-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label className="text-sm font-bold text-slate-700">Serviço de interesse<input className="input mt-2" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="Site, loja, sistema, automação..." /></label>
      </div>
      <label className="mt-4 block text-sm font-bold text-slate-700">Mensagem<textarea required className="input mt-2 min-h-36" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
      <button disabled={loading} className="mt-6 rounded-full bg-ink px-7 py-4 text-sm font-black text-white transition hover:bg-ocean disabled:opacity-60">{loading ? "Enviando..." : "Enviar mensagem"}</button>
      {message && <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-ocean">{message}</p>}
    </form>
  );
}
