import { BentoGrid } from '@/components/BentoGrid'
import {
  BentoBody,
  BentoCard,
  BentoEyebrow,
  BentoTitle,
} from '@/components/BentoCard'
import { SectionHeader } from '@/components/SectionHeader'
import { useGsapSection } from '@/hooks/useGsapSection'
import { profile } from '@/data/portfolioData'

export default function About() {
  const sectionRef = useGsapSection<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="01"
          label="About"
          title="Engineer growing into systems work."
        />

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
