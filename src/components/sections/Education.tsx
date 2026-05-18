import { BentoGrid } from '@/components/BentoGrid'
import { BentoCard, BentoEyebrow, BentoTitle } from '@/components/BentoCard'
import { education } from '@/data/portfolioData'

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            04 · Education
          </p>
          <h2 className="font-display text-3xl font-semibold text-fg md:text-4xl">
            Where I studied.
          </h2>
        </header>

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
