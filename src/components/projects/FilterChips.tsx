import { cn } from '@/lib/cn'

export type FilterKey = 'all' | 'saas' | 'healthcare' | 'manufacturing'

type Props = {
  active: FilterKey
  onChange: (key: FilterKey) => void
  counts: Record<FilterKey, number>
}

const OPTIONS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'saas', label: 'SaaS' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'manufacturing', label: 'Manufacturing' },
]

export function FilterChips({ active, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="mr-2 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
        Filter ·
      </p>
      {OPTIONS.map(({ key, label }) => {
        const isActive = key === active
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={cn(
              'group inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors',
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
