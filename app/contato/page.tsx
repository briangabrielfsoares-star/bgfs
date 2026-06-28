import { ContactForm } from "@/components/ContactForm";
import { PublicLayout } from "@/components/PublicLayout";
import { Section } from "@/components/Section";

export default function Page() {
  return (
    <PublicLayout>
      <main>
        <section className="bg-premium px-5 py-24 text-center text-white">
          <p className="mb-4 text-sm font-bold uppercase tracking-[.25em] text-gold">Contato</p>
          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Vamos construir sua próxima solução digital?</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">Conte o que sua empresa precisa e retornaremos com uma proposta alinhada ao seu objetivo.</p>
        </section>
        <Section>
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-[2rem] bg-ink p-8 text-white shadow-premium">
              <h2 className="text-3xl font-black">Fale com a BGFS Digital</h2>
              <p className="mt-5 leading-8 text-white/70">No primeiro contato, descreva o tipo de projeto, objetivo, prazo desejado e referências visuais, se tiver.</p>
              <div className="mt-8 rounded-2xl bg-white/10 p-5 text-sm text-white/75">E-mail: briangabrielfsoares@gmail.com</div>
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>
    </PublicLayout>
  );
}
