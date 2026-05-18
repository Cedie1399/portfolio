import { BentoGrid } from '@/components/BentoGrid'
import { BentoCard, BentoEyebrow, BentoTitle } from '@/components/BentoCard'
import { experiences } from '@/data/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            03 · Experience
          </p>
          <h2 className="font-display text-3xl font-semibold text-fg md:text-4xl">
            Where I've built.
          </h2>
        </header>

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
                    className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-accent/60"
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
