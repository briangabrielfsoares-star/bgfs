"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AdminCard } from "@/components/admin/AdminShell";
import { auth, db, getFirebaseConfig, isFirebaseConfigComplete, saveLocalFirebaseConfig, setupAdminEmail, type FirebaseClientConfig } from "@/lib/firebase";
import { seedDatabase } from "@/lib/firebase-data";

export default function Page() {
  const [config, setConfig] = useState<FirebaseClientConfig>(getFirebaseConfig());
  const [email, setEmail] = useState(setupAdminEmail);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: keyof FirebaseClientConfig, value: string) {
    setConfig({ ...config, [key]: value.trim() });
  }

  function saveConfig() {
    saveLocalFirebaseConfig(config);
    setMsg("Configuração salva neste navegador. Agora crie o admin e depois gere os dados de exemplo.");
    setTimeout(() => window.location.reload(), 700);
  }

  async function createAdmin() {
    setLoading(true);
    setMsg("");
    try {
      let credential;
      try {
        credential = await createUserWithEmailAndPassword(auth(), email, password);
      } catch {
        credential = await signInWithEmailAndPassword(auth(), email, password);
      }
      await setDoc(doc(db(), "AdminUsers", credential.user.uid), {
        uid: credential.user.uid,
        email: credential.user.email,
        role: "admin",
        active: true,
        createdAt: serverTimestamp()
      }, { merge: true });
      setMsg("Admin criado/logado com sucesso. Agora você pode popular o site com os dados de exemplo.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Não foi possível criar o admin.");
    } finally {
      setLoading(false);
    }
  }

  async function seed() {
    setLoading(true);
    try {
      await seedDatabase();
      setMsg("Dados de exemplo criados: páginas, 6 serviços, 4 cases, 5 depoimentos e configurações.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erro ao criar dados de exemplo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[.25em] text-gold">Setup guiado</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Configurar BGFS Digital</h1>
        <p className="mt-3 max-w-3xl text-slate-600">Esta tela foi feita para evitar mexer em arquivos confusos. Primeiro crie um projeto no Firebase, cole a configuração Web aqui, habilite login por e-mail/senha e publique as regras que já vieram no ZIP.</p>
      </div>

      <AdminCard title="1. Criar Firebase do jeito simples">
        <ol className="grid gap-3 text-sm leading-7 text-slate-700">
          <li><b>1)</b> Acesse console.firebase.google.com e crie um projeto chamado <b>bgfs-digital</b>.</li>
          <li><b>2)</b> Em <b>Authentication</b>, ative o provedor <b>E-mail/senha</b>.</li>
          <li><b>3)</b> Em <b>Firestore Database</b>, crie o banco em modo produção.</li>
          <li><b>4)</b> Em <b>Storage</b>, crie o bucket padrão.</li>
          <li><b>5)</b> Em <b>Project settings &gt; Your apps &gt; Web app</b>, copie a configuração Firebase e cole abaixo.</li>
          <li><b>6)</b> Em <b>Rules</b>, cole os arquivos <code>firestore.rules</code> e <code>storage.rules</code> que estão dentro do ZIP.</li>
        </ol>
      </AdminCard>

      <AdminCard title="2. Colar configuração Web do Firebase">
        <div className="grid gap-4 md:grid-cols-2">
          {Object.keys(config).map((key) => (
            <label key={key} className="text-sm font-bold text-slate-700">{key}<input className="input mt-2" value={config[key as keyof FirebaseClientConfig]} onChange={(e) => update(key as keyof FirebaseClientConfig, e.target.value)} /></label>
          ))}
        </div>
        <button onClick={saveConfig} className="mt-5 rounded-full bg-ink px-6 py-3 text-sm font-black text-white">Salvar configuração</button>
        <p className="mt-3 text-sm text-slate-500">Status: {isFirebaseConfigComplete(config) ? "configuração completa" : "faltam campos"}</p>
      </AdminCard>

      <AdminCard title="3. Criar primeiro admin">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-700">E-mail admin<input className="input mt-2" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="text-sm font-bold text-slate-700">Senha nova<input className="input mt-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Crie uma senha segura" /></label>
        </div>
        <button disabled={loading || !password} onClick={createAdmin} className="mt-5 rounded-full bg-ocean px-6 py-3 text-sm font-black text-white disabled:opacity-60">Criar admin / entrar</button>
        <p className="mt-3 text-xs text-slate-500">Por segurança, as regras aceitam criação inicial apenas para: {setupAdminEmail}</p>
      </AdminCard>

      <AdminCard title="4. Criar dados de exemplo">
        <p className="text-slate-600">Depois de logar como admin, clique aqui para criar páginas, configurações, 6 serviços, 4 cases e 5 depoimentos.</p>
        <button disabled={loading} onClick={seed} className="mt-5 rounded-full bg-gold px-6 py-3 text-sm font-black text-ink disabled:opacity-60">Criar dados de exemplo</button>
      </AdminCard>

      {msg && <div className="rounded-2xl bg-white p-5 text-sm font-bold text-ocean shadow-sm">{msg}</div>}
    </div>
  );
}
