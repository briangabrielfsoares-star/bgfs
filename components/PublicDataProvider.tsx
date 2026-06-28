"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import { DEFAULT_PAGES, DEFAULT_PORTFOLIO, DEFAULT_SERVICES, DEFAULT_SETTINGS, DEFAULT_TESTIMONIALS } from "@/lib/seed-data";
import { getPage, getPortfolio, getServices, getSettings, getTestimonials } from "@/lib/firebase-data";
import type { PageContent, PortfolioItem, Service, SiteSettings, Testimonial } from "@/lib/types";
import { Section, SectionHeader } from "./Section";

export function HomePage() {
  const [home, setHome] = useState<PageContent>(DEFAULT_PAGES.home);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIO);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    Promise.all([getPage("home"), getSettings(), getServices(), getPortfolio(), getTestimonials()]).then(([p, s, sv, pf, ts]) => {
      setHome(p); setSettings(s); setServices(sv.slice(0, 6)); setPortfolio(pf.slice(0, 3)); setTestimonials(ts.slice(0, 3));
    });
  }, []);

  return (
    <main>
      <section className="bg-premium text-white">
        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div className="animate-fade-up">
            <p className="mb-5 inline-flex rounded-full border border-gold/30 bg-white/10 px-4 py-2 text-sm font-bold text-gold">{home.badge}</p>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">{home.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{home.subtitle}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href={home.ctaHref || settings.ctaHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-black text-ink transition hover:bg-white">
                {home.ctaText || settings.ctaText} <ArrowRight size={18} />
              </Link>
              <Link href="/portfolio" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-ink">Ver cases</Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-center">
              {["Design premium", "Firebase", "Painel admin"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold text-white/80">{item}</div>)}
            </div>
          </div>
          <div className="glass rounded-[2rem] p-6 shadow-premium">
            <div className="rounded-[1.5rem] bg-white p-7 text-ink">
              <p className="text-sm font-bold uppercase tracking-[.2em] text-ocean">Projeto completo</p>
              <h2 className="mt-4 text-3xl font-black">Site + painel administrativo + leads</h2>
              <div className="mt-6 space-y-4">
                {["Conteúdo editável", "CRUD de serviços", "CRUD de portfólio", "Depoimentos", "Configurações", "Upload de imagens"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"><CheckCircle2 className="text-gold" /> <span className="font-semibold">{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader badge="Serviços" title="Soluções digitais com acabamento premium" subtitle="Tudo o que uma empresa precisa para iniciar, profissionalizar ou escalar sua operação digital." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </Section>

      <section className="bg-ink text-white">
        <Section>
          <SectionHeader light badge="Portfólio" title="Projetos com estratégia, design e tecnologia" subtitle="Cases de exemplo já cadastrados para demonstrar a estrutura do site e do painel." />
          <div className="grid gap-6 lg:grid-cols-3">
            {portfolio.map((item) => <PortfolioCard key={item.id} item={item} dark />)}
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader badge="Depoimentos" title="Confiança para entregar soluções digitais" subtitle="Prova social inicial que você pode editar pelo painel administrativo." />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => <TestimonialCard key={item.id} item={item} />)}
        </div>
      </Section>
    </main>
  );
}

export function GenericPage({ pageId }: { pageId: "about" | "services" | "portfolio" | "testimonials" | "privacy" }) {
  const [page, setPage] = useState<PageContent>(DEFAULT_PAGES[pageId]);
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIO);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    getPage(pageId).then(setPage);
    if (pageId === "services") getServices().then(setServices);
    if (pageId === "portfolio") getPortfolio().then(setPortfolio);
    if (pageId === "testimonials") getTestimonials().then(setTestimonials);
  }, [pageId]);

  return (
    <main>
      <HeroSmall page={page} />
      {pageId === "about" && <AboutBody page={page} />}
      {pageId === "services" && <Section><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map((s) => <ServiceCard key={s.id} service={s} />)}</div></Section>}
      {pageId === "portfolio" && <Section><div className="grid gap-6 md:grid-cols-2">{portfolio.map((p) => <PortfolioCard key={p.id} item={p} />)}</div></Section>}
      {pageId === "testimonials" && <Section><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{testimonials.map((t) => <TestimonialCard key={t.id} item={t} />)}</div></Section>}
      {pageId === "privacy" && <Section><article className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 leading-8 text-slate-700 shadow-premium">{page.body}</article></Section>}
    </main>
  );
}

function HeroSmall({ page }: { page: PageContent }) {
  return (
    <section className="bg-premium px-5 py-24 text-center text-white">
      <div className="mx-auto max-w-4xl animate-fade-up">
        {page.badge && <p className="mb-4 text-sm font-bold uppercase tracking-[.25em] text-gold">{page.badge}</p>}
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">{page.title}</h1>
        {page.subtitle && <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">{page.subtitle}</p>}
      </div>
    </section>
  );
}

function AboutBody({ page }: { page: PageContent }) {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-ink p-8 text-white shadow-premium">
          <p className="text-sm font-bold uppercase tracking-[.25em] text-gold">Método BGFS</p>
          <h2 className="mt-5 text-3xl font-black">Clareza, tecnologia e autonomia.</h2>
          <p className="mt-5 leading-8 text-white/70">Cada entrega é pensada para unir design premium com uma estrutura administrável, para que o site continue evoluindo depois do lançamento.</p>
        </div>
        <div className="rounded-[2rem] bg-white p-8 leading-8 text-slate-700 shadow-premium">
          <p>{page.body}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Estratégia", "Design", "Escala"].map((item) => <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 font-bold text-ocean">{item}</div>)}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return <article className="card-hover rounded-[1.6rem] border border-slate-200 bg-white p-7"><p className="text-sm font-black uppercase tracking-[.2em] text-gold">{service.icon || "Digital"}</p><h3 className="mt-4 text-2xl font-black text-ink">{service.title}</h3><p className="mt-4 leading-7 text-slate-600">{service.description}</p></article>;
}

function PortfolioCard({ item, dark = false }: { item: PortfolioItem; dark?: boolean }) {
  return <article className={`card-hover rounded-[1.8rem] border p-7 ${dark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white"}`}><p className="text-sm font-black uppercase tracking-[.2em] text-gold">{item.category}</p><h3 className={`mt-4 text-2xl font-black ${dark ? "text-white" : "text-ink"}`}>{item.title}</h3><p className={`mt-4 leading-7 ${dark ? "text-white/70" : "text-slate-600"}`}>{item.description}</p>{item.result && <p className={`mt-5 rounded-2xl p-4 text-sm font-bold ${dark ? "bg-white/10 text-white" : "bg-slate-50 text-ocean"}`}>Resultado: {item.result}</p>}</article>;
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return <article className="card-hover rounded-[1.6rem] border border-slate-200 bg-white p-7"><div className="mb-5 flex gap-1 text-gold">{Array.from({ length: item.rating || 5 }).map((_, i) => <Star key={i} size={17} fill="currentColor" />)}</div><p className="leading-7 text-slate-700">“{item.text}”</p><div className="mt-6"><p className="font-black text-ink">{item.name}</p><p className="text-sm text-slate-500">{item.company}</p></div></article>;
}
