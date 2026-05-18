import { useState } from 'react'
import { BentoGrid } from '@/components/BentoGrid'
import {
  BentoBody,
  BentoCard,
  BentoEyebrow,
  BentoTitle,
} from '@/components/BentoCard'
import CaseStudyDialog from '@/components/CaseStudyDialog'
import { SectionHeader } from '@/components/SectionHeader'
import { useGsapSection } from '@/hooks/useGsapSection'
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
          className="rounded-full border border-border/70 bg-surface/60 px-2 py-0.5 text-[10px] tracking-wide text-muted transition-colors hover:border-accent/40 hover:text-fg"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const sectionRef = useGsapSection<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="work"
      className="scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02"
          label="Selected Work"
          title="Case studies across full-stack, SaaS, and manufacturing systems."
        />

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
                    className="self-start text-xs uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-bright"
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
