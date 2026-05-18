import { useState } from 'react'
import { cn } from '@/lib/cn'

// Program: Sep 2022 — Sep 2026. SRI return: Sep 2025.
const START = new Date('2022-09-01').getTime()
const END = new Date('2026-09-01').getTime()
const SRI_RETURN = new Date('2025-09-01').getTime()

const YEARS = [
  { idx: 0, label: 'Year 1', range: '2022 — 2023', note: 'Foundations' },
  { idx: 1, label: 'Year 2', range: '2023 — 2024', note: 'Core CS' },
  { idx: 2, label: 'Year 3', range: '2024 — 2025', note: 'Specialization' },
  { idx: 3, label: 'Year 4', range: '2025 — 2026', note: 'Thesis · Petmania' },
]

function yearProgress(yearIdx: number, now = Date.now()): number {
  const totalDuration = END - START
  const yearDuration = totalDuration / 4
  const yearStart = START + yearIdx * yearDuration
  const yearEnd = yearStart + yearDuration
  if (now <= yearStart) return 0
  if (now >= yearEnd) return 1
  return (now - yearStart) / yearDuration
}

function currentYear(now = Date.now()): number {
  const totalDuration = END - START
  return Math.min(3, Math.max(0, Math.floor(((now - START) / totalDuration) * 4)))
}

function sriOverlapStart(): number {
  const totalDuration = END - START
  return ((SRI_RETURN - START) / totalDuration) * 100
}

export function AcademicTimeline() {
  const [hovered, setHovered] = useState<number | null>(null)
  const active = currentYear()
  const overlapStart = sriOverlapStart()

  return (
    <div className="rounded-2xl border border-border bg-elevated/40 p-5 backdrop-blur-sm md:p-7">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
          Academic timeline · 4 years
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
          hover a year for context
        </p>
      </div>

      <div className="relative">
        {/* Year segments */}
        <ol className="grid grid-cols-4 gap-1.5">
          {YEARS.map((y) => {
            const fill = yearProgress(y.idx)
            const isActive = y.idx === active
            const isPast = fill >= 1
            const isHovered = hovered === y.idx
            return (
              <li
                key={y.idx}
                onMouseEnter={() => setHovered(y.idx)}
                onMouseLeave={() => setHovered(null)}
                className="group relative"
              >
                {/* Segment track */}
                <div
                  className={cn(
                    'relative h-10 overflow-hidden rounded-md border bg-canvas/60 transition-colors duration-300',
                    isActive
                      ? 'border-accent/60'
                      : isPast
                        ? 'border-accent/30'
                        : 'border-border',
                    isHovered && 'border-accent/80',
                  )}
                >
                  {/* Fill */}
                  <div
                    className="absolute inset-y-0 left-0 bg-accent/15"
                    style={{ width: `${fill * 100}%` }}
                  />
                  {isActive && (
                    <div
                      className="absolute inset-y-0 left-0 border-r-2 border-accent"
                      style={{ width: `${fill * 100}%` }}
                    />
                  )}

                  {/* Label */}
                  <div className="relative flex h-full items-center justify-between px-3">
                    <span
                      className={cn(
                        'font-display text-xs font-semibold transition-colors',
                        isActive
                          ? 'text-fg'
                          : isPast
                            ? 'text-fg/70'
                            : 'text-subtle',
                      )}
                    >
                      {y.label}
                    </span>
                    {isActive && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Below: year range + note */}
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                  {y.range}
                </p>
                <p
                  className={cn(
                    'mt-0.5 text-[10px] uppercase tracking-[0.15em] transition-colors',
                    isHovered || isActive ? 'text-accent' : 'text-subtle/80',
                  )}
                >
                  {y.note}
                </p>
              </li>
            )
          })}
        </ol>

        {/* SRI overlap band */}
        <div className="relative mt-6 h-6">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
          <div
            className="absolute top-1/2 flex h-5 -translate-y-1/2 items-center rounded-full border border-accent/40 bg-canvas px-3 backdrop-blur"
            style={{
              left: `${overlapStart}%`,
              right: 0,
            }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
              while at SRI · returned Sep 2025
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
