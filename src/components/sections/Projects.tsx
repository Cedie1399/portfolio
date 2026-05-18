import { useState } from 'react'
import { BentoGrid } from '@/components/BentoGrid'
import {
  BentoBody,
  BentoCard,
  BentoEyebrow,
  BentoTitle,
} from '@/components/BentoCard'
import CaseStudyDialog from '@/components/CaseStudyDialog'
import { projects, type Project } from '@/data/portfolioData'

const SPANS = [
  'md:col-span-4 lg:col-span-4',
  'md:col-span-4 lg:col-span-2',
  'md:col-span-4 lg:col-span-6',
] as const

function TechTags({ tech }: { tech: Project['tech'] }) {
  if (tech.length === 0 || tech[0] === '—') {
    return (
      <p className="text-[10px] uppercase tracking-[0.22em] text-subtle">
        Tech stack · forthcoming
      </p>
    )
  }
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-full border border-border/70 bg-surface/60 px-2 py-0.5 text-[10px] tracking-wide text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            02 · Selected Work
          </p>
          <h2 className="font-display text-3xl font-semibold text-fg md:text-4xl">
            Case studies across full-stack, SaaS, and manufacturing systems.
          </h2>
        </header>

        <BentoGrid>
          {projects.map((project, i) => (
            <BentoCard
              key={project.id}
              className={SPANS[i] ?? 'md:col-span-4 lg:col-span-2'}
            >
              <BentoEyebrow>Case Study</BentoEyebrow>
              <BentoTitle>{project.title}</BentoTitle>
              <BentoBody>{project.summary}</BentoBody>

              <div className="mt-auto flex flex-col gap-4 pt-6">
                <TechTags tech={project.tech} />
                {project.caseStudy && (
                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    className="self-start text-xs uppercase tracking-[0.18em] text-fg/80 transition-colors hover:text-fg"
                  >
                    Read case study →
                  </button>
                )}
              </div>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>

      <CaseStudyDialog project={active} onClose={() => setActive(null)} />
    </section>
  )
}
