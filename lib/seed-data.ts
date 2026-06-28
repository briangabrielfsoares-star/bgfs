import type { PageContent, PortfolioItem, Service, SiteSettings, Testimonial } from "./types";

export const DEFAULT_SETTINGS: SiteSettings = {
  companyName: "BGFS Digital",
  email: "briangabrielfsoares@gmail.com",
  phone: "",
  whatsapp: "",
  instagram: "",
  linkedin: "",
  tiktok: "",
  ctaText: "Solicitar orçamento",
  ctaHref: "/contato",
  logoUrl: "/logo-bgfs.svg"
};

export const DEFAULT_PAGES: Record<string, PageContent> = {
  home: {
    id: "home",
    badge: "Tecnologia premium para negócios digitais",
    title: "Soluções digitais premium para empresas que querem crescer online.",
    subtitle: "Criamos sites, sistemas, lojas virtuais, marketplaces e automações com design moderno, performance, segurança e painel administrativo.",
    ctaText: "Solicitar orçamento",
    ctaHref: "/contato"
  },
  about: {
    id: "about",
    badge: "Sobre a BGFS Digital",
    title: "Uma empresa digital focada em transformar ideias em produtos reais.",
    subtitle: "A BGFS Digital desenvolve experiências web modernas, escaláveis e administráveis para empresas que querem presença forte, processos melhores e mais resultado no digital.",
    body: "Unimos estratégia, design, tecnologia e automação para entregar soluções limpas, rápidas e prontas para crescer. Nosso foco é criar projetos que o cliente consiga administrar com facilidade, sem depender de alterações manuais no código."
  },
  services: {
    id: "services",
    title: "Serviços digitais para cada fase da sua empresa",
    subtitle: "Do primeiro site institucional ao sistema com painel completo, a BGFS Digital cria soluções sob medida para negócios que querem evoluir."
  },
  portfolio: {
    id: "portfolio",
    title: "Cases e projetos pensados para resultado",
    subtitle: "Exemplos iniciais de soluções que demonstram o tipo de entrega que a BGFS Digital pode construir para empresas."
  },
  testimonials: {
    id: "testimonials",
    title: "Depoimentos de clientes",
    subtitle: "O objetivo é entregar clareza, confiança e qualidade em cada etapa do projeto."
  },
  contact: {
    id: "contact",
    title: "Vamos construir sua próxima solução digital?",
    subtitle: "Conte o que sua empresa precisa e retornaremos com uma proposta alinhada ao seu objetivo."
  },
  privacy: {
    id: "privacy",
    title: "Política de Privacidade",
    subtitle: "Esta política explica como a BGFS Digital coleta, usa e protege as informações enviadas por seus visitantes.",
    body: "Coletamos apenas os dados necessários para atendimento comercial, como nome, e-mail, telefone e mensagem enviados pelos formulários. As informações são usadas para responder solicitações, elaborar propostas e melhorar o relacionamento com clientes. Não vendemos dados pessoais. O titular pode solicitar correção ou exclusão de seus dados pelo e-mail de contato informado no site."
  }
};

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "sites-institucionais",
    title: "Sites institucionais",
    description: "Sites profissionais, responsivos, rápidos e com painel administrativo para empresas que querem presença digital forte.",
    icon: "Globe",
    order: 1,
    active: true
  },
  {
    id: "landing-pages",
    title: "Landing pages",
    description: "Páginas de alta conversão para campanhas, lançamentos, anúncios, captura de leads e apresentação de ofertas.",
    icon: "MousePointerClick",
    order: 2,
    active: true
  },
  {
    id: "lojas-virtuais",
    title: "Lojas virtuais",
    description: "E-commerces modernos com catálogo, integração, checkout, gestão de produtos e experiência pensada para vender.",
    icon: "ShoppingBag",
    order: 3,
    active: true
  },
  {
    id: "marketplaces",
    title: "Marketplaces",
    description: "Plataformas comerciais inspiradas nos grandes players, com estrutura escalável para múltiplos vendedores e produtos.",
    icon: "Store",
    order: 4,
    active: true
  },
  {
    id: "sistemas-admin",
    title: "Sistemas com painel admin",
    description: "Sistemas web personalizados com login, banco de dados, CRUDs, dashboards e controle de conteúdo.",
    icon: "LayoutDashboard",
    order: 5,
    active: true
  },
  {
    id: "automacoes-consultoria",
    title: "Automações e consultoria digital",
    description: "Integrações, automações e orientação técnica para melhorar processos, reduzir tarefas manuais e escalar operações.",
    icon: "Sparkles",
    order: 6,
    active: true
  }
];

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: "site-premium-empresa",
    title: "Site premium para empresa de serviços",
    category: "Site institucional",
    description: "Projeto institucional com visual sofisticado, SEO básico, formulário de contato, área de serviços e painel para editar conteúdo.",
    result: "Presença digital mais profissional e captação organizada de leads.",
    order: 1,
    active: true
  },
  {
    id: "landing-page-campanha",
    title: "Landing page para campanha de vendas",
    category: "Landing page",
    description: "Página de conversão com seções estratégicas, chamadas claras, prova social e integração com formulário de leads.",
    result: "Comunicação direta e estrutura pronta para anúncios.",
    order: 2,
    active: true
  },
  {
    id: "painel-admin-conteudo",
    title: "Sistema com painel administrativo",
    category: "Sistema web",
    description: "Dashboard para gerenciar serviços, cases, depoimentos, leads e configurações do site sem alterar código.",
    result: "Mais autonomia para atualizar o projeto em tempo real.",
    order: 3,
    active: true
  },
  {
    id: "ecommerce-firebase",
    title: "Loja virtual com Firebase",
    category: "E-commerce",
    description: "Estrutura de loja online com banco em nuvem, autenticação, upload de imagens e base pronta para escala.",
    result: "Operação digital preparada para catálogo e vendas online.",
    order: 4,
    active: true
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "ana-costa",
    name: "Ana Costa",
    company: "Consultoria empresarial",
    text: "A entrega ficou moderna, rápida e muito profissional. O painel administrativo facilitou muito a atualização do conteúdo.",
    rating: 5,
    order: 1,
    active: true
  },
  {
    id: "marcos-silva",
    name: "Marcos Silva",
    company: "Loja online",
    text: "O projeto trouxe clareza para nossa presença digital e deixou tudo mais organizado para receber novos clientes.",
    rating: 5,
    order: 2,
    active: true
  },
  {
    id: "juliana-rocha",
    name: "Juliana Rocha",
    company: "Serviços premium",
    text: "Gostei muito do visual sofisticado e da comunicação direta. O resultado transmite confiança logo no primeiro acesso.",
    rating: 5,
    order: 3,
    active: true
  },
  {
    id: "pedro-almeida",
    name: "Pedro Almeida",
    company: "Startup digital",
    text: "A estrutura ficou pronta para crescer. Ter Firebase e painel admin desde o início ajudou muito no processo.",
    rating: 5,
    order: 4,
    active: true
  },
  {
    id: "camila-nunes",
    name: "Camila Nunes",
    company: "Agência parceira",
    text: "A BGFS Digital entende o que uma empresa precisa para parecer profissional, moderna e confiável online.",
    rating: 5,
    order: 5,
    active: true
  }
];
