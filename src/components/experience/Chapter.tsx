import type { ReactElement, SVGProps } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { TECH_ICONS, TECH_ROLES } from '@/components/projects/icons'
import { ArrowUpRightIcon } from '@/components/hero/icons'
import type { Experience } from '@/data/portfolioData'

type IconComp = (props: SVGProps<SVGSVGElement>) => ReactElement
type ArtComp = () => ReactElement

export type ChapterStat = {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export type ChapterEntry = {
  key: string
  exp: Experience
  Icon: IconComp
  Art: ArtComp
  pullQuote: string
  stats: ChapterStat[]
  tech: string[]
}

type Props = {
  entry: ChapterEntry
  index: number
  total: number
  onPrev?: () => void
  onNext?: () => void
}

export function Chapter({ entry, index, total, onPrev, onNext }: Props) {
  const { exp, Art } = entry
  const chapterLabel = `${String(index + 1).padStart(2, '0')} of ${String(total).padStart(2, '0')}`
  const isCurrent = index === 0

  return (
    <article
      key={entry.key}
      className="relative overflow-hidden rounded-2xl border border-border bg-elevated/40 backdrop-blur-sm animate-[fadeIn_280ms_ease-out] motion-reduce:animate-none"
    >
      {/* Header strip */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-canvas/40 px-6 py-3 md:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
          Chapter · {chapterLabel}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Currently
            </span>
          )}
          <span className="font-mono text-[10px] tracking-wide text-subtle">
            {exp.period}
          </span>
        </div>
      </header>

      {/* Title */}
      <div className="px-6 pt-7 md:px-8 md:pt-9">
        <h3 className="font-display text-2xl font-semibold leading-tight text-fg md:text-4xl">
          {exp.role}
        </h3>
        <p className="mt-1.5 text-sm text-muted md:text-base">
          {exp.company}
        </p>
      </div>

      {/* Body grid */}
      <div className="grid gap-6 px-6 pb-6 pt-6 md:grid-cols-12 md:gap-8 md:px-8 md:pb-8 md:pt-8">
        <div className="md:col-span-7">
          {/* Pull quote */}
          <blockquote className="relative border-l-2 border-accent/60 pl-5 md:pl-6">
            <span
              aria-hidden="true"
              className="absolute -left-1.5 -top-3 font-display text-3xl leading-none text-accent/60"
            >
              “
            </span>
            <p className="font-display text-base leading-snug text-fg/90 md:text-lg">
              {entry.pullQuote}
            </p>
          </blockquote>

          {/* Visual */}
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-canvas/60">
            <div className="aspect-[16/10] w-full">
              <Art />
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
              Day to day
            </p>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted md:text-base">
              {exp.highlights.map((h, i) => (
                <li
                  key={i}
                  className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-5">
          {/* At a glance */}
          <div className="sticky top-24 space-y-4">
            <div className="rounded-xl border border-border bg-canvas/60 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                At a glance
              </p>
              <ul className="mt-4 space-y-3">
                {entry.stats.map((stat) => (
                  <StatRow key={stat.label} stat={stat} />
                ))}
              </ul>

              {entry.tech.length > 0 && (
                <div className="mt-5 border-t border-border/60 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                    Tech
                  </p>
                  <TechStrip names={entry.tech} />
                </div>
              )}
            </div>

            <ChapterNav
              index={index}
              total={total}
              onPrev={onPrev}
              onNext={onNext}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

function StatRow({ stat }: { stat: ChapterStat }) {
  const { ref, value } = useCountUp<HTMLLIElement>(stat.value, {
    duration: 1400,
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
        aria-label={`${stat.prefix ?? ''}${stat.value}${stat.suffix ?? ''} ${stat.label}`}
      >
        {stat.prefix}
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

function ChapterNav({
  index,
  total,
  onPrev,
  onNext,
}: {
  index: number
  total: number
  onPrev?: () => void
  onNext?: () => void
}) {
  const hasPrev = index > 0
  const hasNext = index < total - 1
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        disabled={!hasPrev}
        onClick={onPrev}
        className="group inline-flex items-center justify-center gap-2 rounded-md border border-border bg-elevated/40 px-3 py-2.5 text-[10px] uppercase tracking-[0.22em] text-muted transition-colors hover:border-hairline/40 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted"
        aria-label="Previous chapter"
      >
        <ArrowUpRightIcon className="h-3.5 w-3.5 -scale-x-100 -rotate-90" />
        Prev
      </button>
      <button
        type="button"
        disabled={!hasNext}
        onClick={onNext}
        className="group inline-flex items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-2.5 text-[10px] uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent/15 disabled:cursor-not-allowed disabled:opacity-40 disabled:border-border disabled:bg-transparent disabled:text-muted"
        aria-label="Next chapter"
      >
        Next
        <ArrowUpRightIcon className="h-3.5 w-3.5 rotate-90" />
      </button>
    </div>
  )
}
