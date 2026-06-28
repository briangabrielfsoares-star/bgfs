import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BGFS Digital | Soluções digitais premium",
  description: "Criação de sites, sistemas web, lojas virtuais, marketplaces, automações e soluções digitais para empresas.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bgfs-digital.vercel.app"),
  openGraph: {
    title: "BGFS Digital",
    description: "Soluções digitais premium para empresas que querem crescer online.",
    type: "website",
    locale: "pt_BR"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
