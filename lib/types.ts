export type SiteSettings = {
  companyName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  ctaText: string;
  ctaHref: string;
  logoUrl?: string;
};

export type PageContent = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  body?: string;
  ctaText?: string;
  ctaHref?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
  active?: boolean;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  result?: string;
  order?: number;
  active?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  text: string;
  rating?: number;
  order?: number;
  active?: boolean;
};

export type Lead = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status?: "novo" | "em_atendimento" | "finalizado";
  createdAt?: unknown;
};
