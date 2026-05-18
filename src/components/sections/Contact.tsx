import { BentoGrid } from '@/components/BentoGrid'
import {
  BentoBody,
  BentoCard,
  BentoEyebrow,
  BentoTitle,
} from '@/components/BentoCard'
import { MagneticLink } from '@/components/MagneticLink'
import { SectionHeader } from '@/components/SectionHeader'
import { useGsapSection } from '@/hooks/useGsapSection'
import { contact } from '@/data/portfolioData'

export default function Contact() {
  const sectionRef = useGsapSection<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="06"
          label="Contact"
          title="Let's build something."
        />

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

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <MagneticLink
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent hover:border-accent/60 hover:bg-accent/15 hover:text-accent-bright"
              >
                {contact.email}
              </MagneticLink>

              <ul className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-muted">
                {contact.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="transition-colors hover:text-accent"
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
