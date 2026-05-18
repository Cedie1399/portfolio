import { BentoGrid } from '@/components/BentoGrid'
import {
  BentoBody,
  BentoCard,
  BentoEyebrow,
  BentoTitle,
} from '@/components/BentoCard'
import { contact } from '@/data/portfolioData'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            06 · Contact
          </p>
          <h2 className="font-display text-3xl font-semibold text-fg md:text-4xl">
            Let's build something.
          </h2>
        </header>

        <BentoGrid>
          <BentoCard
            className="md:col-span-4 lg:col-span-6"
            interactive={false}
          >
            <BentoEyebrow>Open to opportunities</BentoEyebrow>
            <BentoTitle>Reach out</BentoTitle>
            <BentoBody>
              Software Development Engineer roles, contract work, or
              interesting systems problems — I'd like to hear about it.
            </BentoBody>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-fg/20 bg-fg/5 px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-fg/10"
              >
                {contact.email}
              </a>
              <ul className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-muted">
                {contact.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="transition-colors hover:text-fg"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  )
}
