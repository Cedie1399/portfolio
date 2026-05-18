import { profile } from '@/data/portfolioData'

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

function todayLabel(): string {
  const d = new Date()
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function Masthead() {
  return (
    <div className="relative border-y border-border/60 bg-canvas/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2 px-6 py-3 text-[10px] uppercase tracking-[0.22em]">
        <p className="font-display font-semibold text-fg">
          Cyrus<span className="text-accent">·</span>Quarterly
        </p>

        <p className="hidden text-muted md:block">
          Vol 04 <span className="text-subtle">·</span> Issue 1{' '}
          <span className="text-subtle">·</span> {todayLabel()}
        </p>

        <p className="text-muted">
          <span aria-hidden="true" className="text-accent">
            ✦{' '}
          </span>
          {profile.location}
        </p>

        <span className="hidden items-center gap-2 text-accent md:inline-flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          On press
        </span>
      </div>
    </div>
  )
}
