export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-5 py-20 ${className}`}>{children}</section>;
}

export function SectionHeader({ badge, title, subtitle, light = false }: { badge?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {badge && <p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-gold">{badge}</p>}
      <h2 className={`text-3xl font-black tracking-tight md:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {subtitle && <p className={`mt-5 text-base leading-8 md:text-lg ${light ? "text-white/70" : "text-slate-600"}`}>{subtitle}</p>}
    </div>
  );
}
