import { GraduationCapIcon } from '@/components/about/icons'
import { SparkleIcon } from '@/components/hero/icons'

const MILESTONES = [
  {
    year: '2022',
    label: 'Enrolled',
    note: 'Began BS Computer Science at DLSAU',
  },
  {
    year: '2025',
    label: 'Returned to SRI',
    note: 'Resumed work as SDE while finishing degree',
  },
  {
    year: '2026',
    label: 'Graduated',
    note: 'Thesis defended · Petmania shipped',
  },
] as const

export function AcademicTimeline() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/[0.07] via-elevated/40 to-elevated/20 p-5 backdrop-blur-sm md:p-8">
      <div
        aria-hidden="true"
        className="orb-pulse pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/20 blur-3xl md:-right-16 md:-top-16 md:h-64 md:w-64"
      />

      <div className="relative grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            Academic record · Complete
          </p>

          <div className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-accent/40 bg-canvas/70 px-4 py-3 backdrop-blur">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 ring-1 ring-accent/40">
              <GraduationCapIcon className="h-6 w-6 text-accent" />
            </div>
            <div className="leading-tight">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                Bachelor of Science · CS
              </p>
              <p className="font-display text-2xl font-semibold text-fg md:text-3xl">
                Class of 2026
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
            Four years at De La Salle Araneta University — the back half
            overlapping a return to Solutions Resource Inc as an SDE.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
            <SparkleIcon className="h-3 w-3" />
            Degree conferred
          </div>
        </div>

        <ol className="relative md:col-span-7">
          <span
            aria-hidden="true"
            className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-accent/10 md:left-0 md:right-0 md:top-[15px] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r"
          />

          <div className="flex flex-col gap-5 md:flex-row md:gap-3">
            {MILESTONES.map((m, idx) => (
              <li
                key={m.year}
                className="relative flex items-start gap-4 md:flex-1 md:flex-col md:items-start md:gap-3"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/50 bg-canvas font-mono text-[10px] font-semibold text-accent"
                >
                  {idx + 1}
                </span>

                <div className="min-w-0 md:pr-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                    {m.year}
                  </p>
                  <p className="mt-0.5 font-display text-sm font-semibold text-fg">
                    {m.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {m.note}
                  </p>
                </div>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </div>
  )
}
