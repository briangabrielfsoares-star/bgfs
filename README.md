# BGFS Digital — Site institucional com painel admin

Este ZIP já vem com o projeto completo da **BGFS Digital**: site público, painel administrativo, Firebase preparado, logo SVG provisória, dados de exemplo, regras de segurança, upload de imagens e instruções de deploy.

> O README está dentro do ZIP junto com o projeto. Você só precisa baixar este ZIP, extrair e seguir os passos abaixo.

## O que vem pronto

- Next.js com App Router
- Tailwind CSS
- Firebase Auth, Firestore e Storage
- Site público responsivo
- Painel admin em `/admin`
- Setup guiado em `/admin/setup`
- Login por e-mail e senha
- CRUD de serviços
- CRUD de portfólio/cases
- CRUD de depoimentos
- Edição de textos das páginas
- Visualização de leads
- Configuração de contato e redes sociais
- Upload de imagens no Firebase Storage
- Logo provisória em SVG
- Dados de exemplo: 6 serviços, 4 cases e 5 depoimentos
- Regras do Firestore e Storage já incluídas

## Como abrir no computador

1. Extraia o ZIP.
2. Abra a pasta `bgfs-digital-ready` no VS Code.
3. No terminal, rode:

```bash
npm install
npm run dev
```

4. Acesse:

```txt
http://localhost:3000
```

O site abre mesmo antes de configurar o Firebase, usando os dados iniciais locais.

## Configuração simples do Firebase

Acesse:

```txt
http://localhost:3000/admin/setup
```

A tela vai te guiar. O resumo é:

1. Criar um projeto em `console.firebase.google.com` chamado `bgfs-digital`.
2. Ativar **Authentication > Sign-in method > E-mail/senha**.
3. Criar o **Firestore Database**.
4. Criar o **Storage**.
5. Criar um app Web no Firebase e copiar a configuração.
6. Colar a configuração na tela `/admin/setup`.
7. Colar o conteúdo de `firestore.rules` nas regras do Firestore.
8. Colar o conteúdo de `storage.rules` nas regras do Storage.
9. Criar o admin com o e-mail:

```txt
briangabrielfsoares@gmail.com
```

10. Clicar em **Criar dados de exemplo**.

## Deploy na Vercel

1. Suba o projeto para o GitHub.
2. Acesse a Vercel.
3. Importe o repositório.
4. Em **Environment Variables**, adicione:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_SETUP_ADMIN_EMAIL=briangabrielfsoares@gmail.com
NEXT_PUBLIC_SITE_URL=
```

5. Clique em Deploy.

Importante: a configuração salva pela tela `/admin/setup` funciona no navegador local. Para o site publicado na Vercel, o ideal é colocar as mesmas chaves em **Environment Variables** da Vercel.

## Páginas públicas

- `/`
- `/sobre`
- `/servicos`
- `/portfolio`
- `/depoimentos`
- `/contato`
- `/politica-de-privacidade`

## Painel admin

- `/admin`
- `/admin/setup`
- `/admin/login`
- `/admin/conteudo`
- `/admin/servicos`
- `/admin/portfolio`
- `/admin/depoimentos`
- `/admin/leads`
- `/admin/configuracoes`

## Coleções do Firestore

- `AdminUsers`
- `PagesContent`
- `Services`
- `Portfolio`
- `Testimonials`
- `Leads`
- `Settings`

## Personalização

Você pode editar tudo pelo painel admin depois de configurar o Firebase:

- Textos da Home
- Textos das páginas
- Serviços
- Cases
- Depoimentos
- E-mail
- WhatsApp
- Redes sociais
- Logo
- Leads recebidos

## Como gerar outro ZIP

No terminal:

```bash
npm run zip
```

Isso vai gerar `bgfs-digital-ready.zip` na pasta acima do projeto.
