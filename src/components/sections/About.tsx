import { BentoGrid } from '@/components/BentoGrid'
import {
  BentoBody,
  BentoCard,
  BentoEyebrow,
  BentoTitle,
} from '@/components/BentoCard'
import { profile } from '@/data/portfolioData'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            01 · About
          </p>
          <h2 className="font-display text-3xl font-semibold text-fg md:text-4xl">
            Engineer growing into systems work.
          </h2>
        </header>

        <BentoGrid>
          <BentoCard className="md:col-span-4 lg:col-span-4">
            <BentoEyebrow>Background</BentoEyebrow>
            <BentoTitle>From full-stack delivery to systems design</BentoTitle>
            <BentoBody>{profile.about}</BentoBody>
          </BentoCard>

          <BentoCard className="md:col-span-4 lg:col-span-2">
            <BentoEyebrow>Currently</BentoEyebrow>
            <BentoTitle>{profile.role}</BentoTitle>
            <BentoBody>{profile.tagline}</BentoBody>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  )
}
