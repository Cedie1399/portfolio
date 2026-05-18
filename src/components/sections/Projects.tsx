import { useMemo, useState } from 'react'
import { useGsapSection } from '@/hooks/useGsapSection'
import CaseStudyDialog from '@/components/CaseStudyDialog'
import {
  AirEventVisual,
  FabricationVisual,
  PetmaniaVisual,
} from '@/components/projects/visuals'
import {
  ProjectSpread,
  type SpreadMeta,
} from '@/components/projects/ProjectSpread'
import {
  FilterChips,
  type FilterKey,
} from '@/components/projects/FilterChips'
import { projects, type Project } from '@/data/portfolioData'

type ExtendedMeta = SpreadMeta & { filter: FilterKey }

const META: Record<string, ExtendedMeta> = {
  airevent: {
    feature: '01 of 03',
    status: 'Production',
    year: '2025',
    domainLabel: 'Virtual events · SaaS',
    filter: 'saas',
    primaryTech: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'AWS', 'Stripe'],
    stats: [
      { value: 4, label: 'Third-party integrations' },
      { value: 5, label: 'Participant roles' },
      { value: 9, label: 'Platform modules' },
    ],
    Visual: AirEventVisual,
  },
  petmania: {
    feature: '02 of 03',
    status: 'Thesis',
    year: '2025',
    domainLabel: 'Healthcare · Vet clinic',
    filter: 'healthcare',
    primaryTech: ['React', 'TypeScript', 'Spring Boot', 'MySQL', 'Tailwind'],
    stats: [
      { value: 7, label: 'Linked entities' },
      { value: 1, label: 'Production system' },
      { value: 100, suffix: '%', label: 'SMS uptime' },
    ],
    Visual: PetmaniaVisual,
  },
  'fabrication-shop': {
    feature: '03 of 03',
    status: 'Custom',
    year: '2025',
    domainLabel: 'Manufacturing · Multi-tenant',
    filter: 'manufacturing',
    primaryTech: ['Next.js', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Docker'],
    stats: [
      { value: 4, label: 'BoM state transitions' },
      { value: 100, suffix: '%', label: 'Order audit trail' },
      { value: 1, label: 'Tenant-scoped schema' },
    ],
    Visual: FabricationVisual,
  },
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const [filter, setFilter] = useState<FilterKey>('all')
  const sectionRef = useGsapSection<HTMLElement>()

  const counts = useMemo<Record<FilterKey, number>>(() => {
    const total = projects.length
    return projects.reduce(
      (acc, p) => {
        const meta = META[p.id]
        if (meta) acc[meta.filter] = (acc[meta.filter] ?? 0) + 1
        return acc
      },
      { all: total, saas: 0, healthcare: 0, manufacturing: 0 } as Record<
        FilterKey,
        number
      >,
    )
  }, [])

  return (
    <section ref={sectionRef} id="work" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <PageHeader />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <FilterChips
            active={filter}
            onChange={setFilter}
            counts={counts}
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
            {counts[filter]} of {projects.length} shown
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {projects.map((project) => {
            const meta = META[project.id]
            if (!meta) return null
            const dimmed = filter !== 'all' && meta.filter !== filter
            return (
              <ProjectSpread
                key={project.id}
                project={project}
                meta={meta}
                dimmed={dimmed}
                onOpen={() => setActive(project)}
              />
            )
          })}
        </div>
      </div>

      <CaseStudyDialog project={active} onClose={() => setActive(null)} />
    </section>
  )
}

function PageHeader() {
  return (
    <header className="border-b border-border/60 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            Page 03 · Selected Work
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-fg md:text-5xl">
            Three case studies, one engineer.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Full-stack work across virtual events SaaS, a veterinary clinic
            platform, and a custom motorcycle-accessories fabrication shop —
            with the same emphasis on schema design, explicit state, and
            production ownership.
          </p>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-subtle md:block">
          Spread · 3 features
        </p>
      </div>
    </header>
  )
}
