import Link from "next/link";

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const classes = variant === "primary"
    ? "bg-gold text-ink hover:bg-white"
    : "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-ink";
  return (
    <Link href={href} className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition ${classes}`}>
      {children}
    </Link>
  );
}
