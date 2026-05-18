import type { ReactElement } from 'react'
import { cn } from '@/lib/cn'
import { useCountUp } from '@/hooks/useCountUp'
import { ArrowUpRightIcon } from '@/components/hero/icons'
import { TECH_ICONS, TECH_ROLES } from '@/components/projects/icons'
import type { Project } from '@/data/portfolioData'

export type ProjectStat = {
  value: number
  suffix?: string
  label: string
}

export type SpreadMeta = {
  feature: string
  status: 'Production' | 'Thesis' | 'Custom'
  year: string
  domainLabel: string
  primaryTech: string[]
  stats: ProjectStat[]
  Visual: () => ReactElement
}

type Props = {
  project: Project
  meta: SpreadMeta
  dimmed: boolean
  onOpen: () => void
}

const STATUS_TONE: Record<SpreadMeta['status'], string> = {
  Production: 'border-accent/40 bg-accent/10 text-accent',
  Thesis: 'border-hairline/30 bg-hairline/5 text-hairline',
  Custom: 'border-border bg-elevated/60 text-muted',
}

export function ProjectSpread({ project, meta, dimmed, onOpen }: Props) {
  const { Visual } = meta

  return (
    <article className="relative overflow-hidden rounded-2xl border border-border bg-elevated/40 backdrop-blur-sm">
      <div
        aria-hidden={dimmed || undefined}
        inert={dimmed || undefined}
        className={cn(
          'transition-[opacity,filter,transform] duration-500 motion-reduce:transition-none',
          dimmed &&
            'pointer-events-none opacity-30 saturate-0 scale-[0.99] cursor-default',
        )}
      >
      {/* Header strip */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-canvas/40 px-6 py-3 md:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
          Feature · {meta.feature}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] ${STATUS_TONE[meta.status]}`}
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${meta.status === 'Production' ? 'bg-accent' : 'bg-current'}`}
            />
            {meta.status}
          </span>
          <span className="font-mono text-[10px] tracking-wide text-subtle">
            {meta.year}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-subtle">
            · {meta.domainLabel}
          </span>
        </div>
      </header>

      {/* Title + summary */}
      <div className="px-6 pt-7 md:px-8 md:pt-9">
        <h3 className="font-display text-2xl font-semibold leading-tight text-fg md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {project.summary}
        </p>
      </div>

      {/* Body grid */}
      <div className="grid gap-6 px-6 pb-6 pt-6 md:grid-cols-12 md:gap-8 md:px-8 md:pb-8 md:pt-8">
        <ClickableVisual project={project} Visual={Visual} onOpen={onOpen} />

        <div className="md:col-span-5">
          <div className="rounded-xl border border-border bg-canvas/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              At a glance
            </p>
            <ul className="mt-4 space-y-3">
              {meta.stats.map((stat) => (
                <StatRow key={stat.label} stat={stat} />
              ))}
            </ul>

            <div className="mt-5 border-t border-border/60 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                Tech
              </p>
              <TechStrip names={meta.primaryTech} />
            </div>
          </div>

          {project.caseStudy && (
            <button
              type="button"
              onClick={onOpen}
              className="group mt-4 inline-flex w-full items-center justify-between rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent/15"
            >
              Read full case study
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
            </button>
          )}
        </div>
      </div>
      </div>
    </article>
  )
}

function ClickableVisual({
  project,
  Visual,
  onOpen,
}: {
  project: Project
  Visual: () => ReactElement
  onOpen: () => void
}) {
  const clickable = Boolean(project.caseStudy)
  return (
    <figure className="md:col-span-7">
      <button
        type="button"
        onClick={clickable ? onOpen : undefined}
        disabled={!clickable}
        aria-label={`Open ${project.title} case study`}
        className={cn(
          'group relative block w-full overflow-hidden rounded-xl border border-border bg-canvas/60',
          clickable && 'cursor-pointer',
        )}
      >
        <div className="aspect-[16/10] w-full">
          <Visual />
        </div>
        {clickable && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center bg-gradient-to-t from-canvas/90 via-canvas/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-canvas/80 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-accent backdrop-blur">
              Open case study
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 rounded bg-canvas/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-subtle backdrop-blur"
        >
          Fig. {project.id.slice(0, 3)}
        </span>
      </button>
      <figcaption className="mt-3 max-w-xl text-[11px] uppercase tracking-[0.22em] text-subtle">
        Fig. {project.id.slice(0, 3)} — System topology, illustrated.
      </figcaption>
    </figure>
  )
}

function StatRow({ stat }: { stat: ProjectStat }) {
  const { ref, value } = useCountUp<HTMLLIElement>(stat.value, {
    duration: 1500,
  })
  return (
    <li
      ref={ref}
      className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-2 last:border-b-0 last:pb-0"
    >
      <span className="text-xs uppercase tracking-[0.18em] text-muted">
        {stat.label}
      </span>
      <span
        className="font-display text-2xl font-semibold leading-none text-fg"
        aria-label={`${stat.value}${stat.suffix ?? ''} ${stat.label}`}
      >
        {value}
        {stat.suffix && (
          <span className="text-base text-accent">{stat.suffix}</span>
        )}
      </span>
    </li>
  )
}

function TechStrip({ names }: { names: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {names.map((name) => {
        const Icon = TECH_ICONS[name]
        const role = TECH_ROLES[name]
        return (
          <li
            key={name}
            className="group/chip relative inline-flex items-center gap-1.5 rounded-md border border-border bg-canvas/70 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-accent/40 hover:text-fg"
          >
            {Icon ? (
              <Icon className="h-3.5 w-3.5 text-muted transition-colors group-hover/chip:text-accent" />
            ) : null}
            {name}
            {role && (
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-canvas/95 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-fg opacity-0 shadow-md backdrop-blur transition-opacity duration-200 group-hover/chip:opacity-100 motion-reduce:transition-none"
              >
                {role}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
