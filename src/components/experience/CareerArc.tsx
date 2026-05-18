import type { ReactElement, SVGProps } from 'react'
import { cn } from '@/lib/cn'

type IconComp = (props: SVGProps<SVGSVGElement>) => ReactElement

export type ChapterMarker = {
  key: string
  year: string
  marker: string
  shortLabel: string
  Icon: IconComp
}

type Props = {
  chapters: ChapterMarker[]
  activeKey: string
  onSelect: (key: string) => void
}

export function CareerArc({ chapters, activeKey, onSelect }: Props) {
  const total = chapters.length

  return (
    <div className="rounded-2xl border border-border bg-elevated/40 p-5 backdrop-blur-sm md:p-7">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
          Career arc · interactive
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
          click a node to switch chapter
        </p>
      </div>

      <div className="relative pt-4">
        {/* Connecting rail */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[8%] right-[8%] top-[34px] h-px bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40"
        />

        {/* Markers — chronological left → right (oldest first) */}
        <ol className="relative grid grid-cols-3 gap-2 md:gap-4">
          {[...chapters].reverse().map((c) => {
            const isActive = c.key === activeKey
            return (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={() => onSelect(c.key)}
                  aria-pressed={isActive}
                  aria-label={`Switch to chapter ${c.shortLabel}`}
                  className={cn(
                    'group flex w-full flex-col items-center gap-2 text-center transition-colors',
                  )}
                >
                  <span
                    className={cn(
                      'relative grid h-9 w-9 place-items-center rounded-full border bg-canvas transition-all duration-300 md:h-11 md:w-11',
                      isActive
                        ? 'border-accent bg-accent/15 text-accent scale-110 shadow-[0_0_0_4px_rgba(7,10,15,1),0_0_18px_-4px_rgba(52,211,153,0.7)]'
                        : 'border-border text-muted shadow-[0_0_0_4px_rgba(7,10,15,1)] group-hover:border-accent/50 group-hover:text-accent',
                    )}
                  >
                    <c.Icon className="h-4 w-4 md:h-5 md:w-5" />
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-ping rounded-full border border-accent/50 motion-reduce:hidden"
                      />
                    )}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.22em] transition-colors',
                      isActive
                        ? 'text-accent'
                        : 'text-subtle group-hover:text-fg',
                    )}
                  >
                    {c.year}
                  </span>
                  <span
                    className={cn(
                      'hidden font-mono text-[10px] uppercase tracking-[0.18em] transition-colors md:block',
                      isActive ? 'text-fg' : 'text-subtle',
                    )}
                  >
                    {c.shortLabel}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Indicator showing position */}
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
        Chapter{' '}
        <span className="text-accent">
          {String(
            chapters.findIndex((c) => c.key === activeKey) + 1,
          ).padStart(2, '0')}
        </span>{' '}
        of {String(total).padStart(2, '0')}
      </p>
    </div>
  )
}
