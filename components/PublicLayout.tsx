"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getSettings } from "@/lib/firebase-data";
import type { SiteSettings } from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/seed-data";
import { Logo } from "./Logo";

const links = [
  ["Home", "/"],
  ["Sobre", "/sobre"],
  ["Serviços", "/servicos"],
  ["Portfólio", "/portfolio"],
  ["Depoimentos", "/depoimentos"],
  ["Contato", "/contato"]
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const whatsappHref = settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}` : "";

  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" aria-label="BGFS Digital"><Logo /></Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-white/80 lg:flex">
            {links.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-gold">{label}</Link>)}
            <Link href="/admin" className="rounded-full border border-gold/40 px-4 py-2 text-gold transition hover:bg-gold hover:text-ink">Admin</Link>
          </nav>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t border-white/10 bg-ink px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-4 text-white/85">
              {links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href}>{label}</Link>)}
              <Link onClick={() => setOpen(false)} href="/admin" className="text-gold">Admin</Link>
            </div>
          </div>
        )}
      </header>
      {children}
      <footer className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-md text-sm leading-7 text-white/65">Soluções digitais premium para empresas que querem crescer online com design, tecnologia, performance e painel administrativo.</p>
          </div>
          <div>
            <h3 className="font-bold text-gold">Navegação</h3>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}
              <Link href="/politica-de-privacidade" className="hover:text-white">Política de privacidade</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gold">Contato</h3>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <p>{settings.email}</p>
              {settings.phone && <p>{settings.phone}</p>}
              {settings.instagram && <p>Instagram: {settings.instagram}</p>}
              {settings.linkedin && <p>LinkedIn: {settings.linkedin}</p>}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45">© {new Date().getFullYear()} BGFS Digital. Todos os direitos reservados.</div>
      </footer>
      {whatsappHref && (
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white shadow-premium transition hover:scale-105">WhatsApp</a>
      )}
    </div>
  );
}
