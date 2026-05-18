import { BentoGrid } from '@/components/BentoGrid'
import { BentoCard, BentoEyebrow, BentoTitle } from '@/components/BentoCard'
import { SectionHeader } from '@/components/SectionHeader'
import { useGsapSection } from '@/hooks/useGsapSection'
import { experiences } from '@/data/portfolioData'

export default function Experience() {
  const sectionRef = useGsapSection<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="03"
          label="Experience"
          title="Where I've built."
        />

        <BentoGrid>
          {experiences.map((exp) => (
            <BentoCard
              key={exp.id}
              className="md:col-span-4 lg:col-span-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <BentoEyebrow>{exp.period}</BentoEyebrow>
                  <BentoTitle>
                    {exp.role}{' '}
                    <span className="text-muted">· {exp.company}</span>
                  </BentoTitle>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted">
                {exp.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
