import { BentoGrid } from '@/components/BentoGrid'
import { BentoCard, BentoEyebrow, BentoTitle } from '@/components/BentoCard'
import { SectionHeader } from '@/components/SectionHeader'
import { useGsapSection } from '@/hooks/useGsapSection'
import { education } from '@/data/portfolioData'

export default function Education() {
  const sectionRef = useGsapSection<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="education"
      className="scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="04"
          label="Education"
          title="Where I studied."
        />

        <BentoGrid>
          {education.map((entry) => (
            <BentoCard
              key={entry.id}
              className="md:col-span-4 lg:col-span-6"
            >
              <BentoEyebrow>{entry.period}</BentoEyebrow>
              <BentoTitle>
                {entry.degree}{' '}
                <span className="text-muted">· {entry.school}</span>
              </BentoTitle>
              {entry.details && (
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {entry.details}
                </p>
              )}
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
