import { BentoGrid } from '@/components/BentoGrid'
import { BentoCard, BentoEyebrow, BentoTitle } from '@/components/BentoCard'
import { skills } from '@/data/portfolioData'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            05 · Skills
          </p>
          <h2 className="font-display text-3xl font-semibold text-fg md:text-4xl">
            Stack & tooling.
          </h2>
        </header>

        <BentoGrid>
          {skills.map((cat) => (
            <BentoCard
              key={cat.category}
              className="md:col-span-2 lg:col-span-2"
            >
              <BentoEyebrow>{cat.category}</BentoEyebrow>
              <BentoTitle>{categoryHeading(cat.category)}</BentoTitle>

              {cat.items.length === 0 ? (
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-subtle">
                  Coming soon · add via portfolioData.ts
                </p>
              ) : (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border/70 bg-surface/60 px-2.5 py-1 text-[11px] tracking-wide text-fg/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}

function categoryHeading(category: string): string {
  switch (category) {
    case 'Frontend':
      return 'UI, interaction, 3D'
    case 'Backend':
      return 'APIs, data, services'
    case 'Infrastructure':
      return 'Deploy, ops, tooling'
    default:
      return category
  }
}
