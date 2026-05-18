import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { SKILL_ICONS } from '@/components/skills/icons'
import { ArrowUpRightIcon } from '@/components/hero/icons'
import { skills, type SkillCategory } from '@/data/portfolioData'

export type SkillMeta = {
  role: string
  note: string
  usedIn: string[]
}

type Props = {
  meta: Record<string, SkillMeta>
}

type FilterKey = 'all' | SkillCategory['category']

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'Frontend', label: 'Frontend' },
  { key: 'Backend', label: 'Backend' },
  { key: 'Infrastructure', label: 'Infrastructure' },
]

type SkillRow = { name: string; category: SkillCategory['category'] }

export function SkillCatalog({ meta }: Props) {
  const rows: SkillRow[] = useMemo(
    () => skills.flatMap((c) => c.items.map((name) => ({ name, category: c.category }))),
    [],
  )

  const [filter, setFilter] = useState<FilterKey>('all')
  const [selected, setSelected] = useState<string>(rows[0]?.name ?? '')

  const counts = useMemo<Record<FilterKey, number>>(() => {
    return rows.reduce(
      (acc, r) => {
        acc[r.category] = (acc[r.category] ?? 0) + 1
        return acc
      },
      { all: rows.length, Frontend: 0, Backend: 0, Infrastructure: 0 } as Record<FilterKey, number>,
    )
  }, [rows])

  const activeMeta = meta[selected]
  const activeCategory = rows.find((r) => r.name === selected)?.category

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterChips active={filter} onChange={setFilter} counts={counts} />
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
          {filter === 'all'
            ? `${rows.length} tools total`
            : `${counts[filter]} of ${rows.length}`}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
            {rows.map((row) => {
              const isVisible = filter === 'all' || row.category === filter
              const isSelected = row.name === selected
              return (
                <li key={row.name}>
                  <SkillTile
                    row={row}
                    isSelected={isSelected}
                    isVisible={isVisible}
                    onSelect={() => setSelected(row.name)}
                  />
                </li>
              )
            })}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <DetailPanel
            name={selected}
            meta={activeMeta}
            category={activeCategory}
          />
        </div>
      </div>
    </div>
  )
}

function FilterChips({
  active,
  onChange,
  counts,
}: {
  active: FilterKey
  onChange: (key: FilterKey) => void
  counts: Record<FilterKey, number>
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="mr-2 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
        Filter ·
      </p>
      {FILTERS.map(({ key, label }) => {
        const isActive = key === active
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors',
              isActive
                ? 'border-accent/60 bg-accent/15 text-accent'
                : 'border-border bg-elevated/40 text-muted hover:border-hairline/40 hover:text-fg',
            )}
          >
            {label}
            <span
              className={cn(
                'rounded-sm px-1 font-mono text-[9px]',
                isActive
                  ? 'bg-accent/20 text-accent'
                  : 'bg-canvas/60 text-subtle',
              )}
            >
              {counts[key]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function SkillTile({
  row,
  isSelected,
  isVisible,
  onSelect,
}: {
  row: SkillRow
  isSelected: boolean
  isVisible: boolean
  onSelect: () => void
}) {
  const Icon = SKILL_ICONS[row.name]
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-hidden={!isVisible || undefined}
      inert={!isVisible || undefined}
      className={cn(
        'group/skill flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-xl border p-2 transition-all duration-300 ease-out motion-reduce:transition-none',
        isVisible
          ? 'opacity-100'
          : 'pointer-events-none opacity-25 saturate-0 scale-95',
        isSelected
          ? 'border-accent/70 bg-accent/10 text-fg shadow-[0_8px_24px_-12px_rgba(52,211,153,0.5)]'
          : 'border-border bg-canvas/50 text-muted hover:-translate-y-0.5 hover:border-accent/40 hover:bg-canvas/80 hover:text-fg motion-reduce:hover:translate-y-0',
      )}
    >
      {Icon ? (
        <Icon
          className={cn(
            'h-5 w-5 transition-colors duration-300',
            isSelected ? 'text-accent' : 'text-muted group-hover/skill:text-accent',
          )}
        />
      ) : (
        <span
          className={cn(
            'text-[10px] font-semibold transition-colors duration-300',
            isSelected ? 'text-accent' : 'text-muted group-hover/skill:text-accent',
          )}
        >
          {row.name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-center text-[9px] uppercase leading-tight tracking-[0.1em]">
        {shortName(row.name)}
      </span>
    </button>
  )
}

function DetailPanel({
  name,
  meta,
  category,
}: {
  name: string
  meta?: SkillMeta
  category?: SkillCategory['category']
}) {
  const Icon = SKILL_ICONS[name]
  return (
    <article
      aria-live="polite"
      className="sticky top-24 overflow-hidden rounded-2xl border border-border bg-elevated/40 p-5 backdrop-blur-sm md:p-6"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        Selected · click any tool
      </p>

      <div
        key={name}
        className="mt-4 animate-[fadeIn_220ms_ease-out] motion-reduce:animate-none"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
            {Icon ? (
              <Icon className="h-6 w-6" />
            ) : (
              <span className="font-mono text-xs font-semibold">
                {name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold leading-tight text-fg">
              {name}
            </h4>
            {category && (
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                {category}
              </p>
            )}
          </div>
        </div>

        {meta && (
          <>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-subtle">
              {meta.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg/85">
              {meta.note}
            </p>

            {meta.usedIn.length > 0 && (
              <div className="mt-5 border-t border-border/60 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                  Used in
                </p>
                <ul className="mt-2 space-y-1.5">
                  {meta.usedIn.map((project) => (
                    <ProjectLink key={project} project={project} />
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {!meta && (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Part of the working toolkit. Pick a different tool to see where
            it shows up across the projects.
          </p>
        )}
      </div>
    </article>
  )
}

function ProjectLink({ project }: { project: string }) {
  const lower = project.toLowerCase()
  const internal = !(lower.includes('this site') || lower.includes('portfolio'))
  return (
    <li className="flex items-center justify-between gap-3 text-xs text-muted">
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-accent"
        />
        {project}
      </span>
      {internal && (
        <a
          href="#work"
          className="group inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-accent hover:text-accent-bright"
        >
          jump
          <ArrowUpRightIcon className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </a>
      )}
    </li>
  )
}

function shortName(name: string): string {
  if (name === 'Tailwind CSS') return 'Tailwind'
  if (name === 'React Three Fiber') return 'R3F'
  if (name === 'PostgreSQL') return 'Postgres'
  return name
}
