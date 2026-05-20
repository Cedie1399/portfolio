import { useGsapSection } from '@/hooks/useGsapSection'
import { useCountUp } from '@/hooks/useCountUp'
import { education } from '@/data/portfolioData'
import { AcademicTimeline } from '@/components/education/AcademicTimeline'
import {
  BriefcaseIcon,
  GraduationCapIcon,
} from '@/components/about/icons'
import {
  ArrowUpRightIcon,
  SparkleIcon,
} from '@/components/hero/icons'

export default function Education() {
  const sectionRef = useGsapSection<HTMLElement>()
  const entry = education[0]
  if (!entry) return null

  return (
    <section
      ref={sectionRef}
      id="education"
      className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <PageHeader />

        <div className="mt-8 sm:mt-10">
          <AcademicTimeline />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <FeatureArticle entry={entry} />
          <Sidebar />
        </div>

        <div className="mt-8">
          <ThesisSpotlight />
        </div>
      </div>
    </section>
  )
}

function PageHeader() {
  return (
    <header className="border-b border-border/60 pb-6 sm:pb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            Page 05 · Education
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-tight text-fg sm:mt-4 sm:text-3xl md:text-5xl">
            Class of 2026.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 md:text-base">
            Four years of Computer Science finished alongside — not before —
            a return to Solutions Resource Inc as a Software Development
            Engineer. Classroom on one rail, production code on the other.
          </p>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-subtle md:block">
          Reading time · ~2 min
        </p>
      </div>
    </header>
  )
}

function FeatureArticle({
  entry,
}: {
  entry: { degree: string; school: string; period: string; details?: string }
}) {
  return (
    <article className="lg:col-span-7">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
        <SparkleIcon className="h-3 w-3" />
        Bachelor's Program
      </span>

      <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-fg sm:text-2xl md:text-4xl">
        {entry.degree}
      </h3>
      <p className="mt-1.5 text-sm text-muted md:text-base">{entry.school}</p>
      <p className="mt-3 font-mono text-xs tracking-wide text-subtle">
        {entry.period}
      </p>

      <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
        <span className="float-left mr-2 mt-1 font-display text-5xl font-semibold leading-[0.78] text-accent sm:text-6xl">
          F
        </span>
        our years at De La Salle Araneta University, completed in parallel
        with returning to SRI in Sep 2025 as an SDE. The thesis artifact —
        Petmania — shipped end-to-end on a self-managed server. See Selected
        Work for the case study.
      </p>

      <blockquote className="relative mt-8 border-l-2 border-accent/60 pl-5 md:pl-6">
        <span
          aria-hidden="true"
          className="absolute -left-1.5 -top-3 font-display text-3xl leading-none text-accent/60"
        >
          "
        </span>
        <p className="font-display text-base leading-snug text-fg/90 md:text-lg">
          Classroom on one rail, production code on the other — the degree
          finished alongside, not before, the work.
        </p>
        <footer className="mt-3 text-[10px] uppercase tracking-[0.3em] text-subtle">
          — Editor's framing
        </footer>
      </blockquote>
    </article>
  )
}

type SidebarStat = {
  value: number
  suffix?: string
  label: string
}

function Sidebar() {
  const stats: SidebarStat[] = [
    { value: 4, label: 'Years to degree' },
    { value: 10, label: 'Semesters total' },
    { value: 1, label: 'Thesis shipped' },
    { value: 1, suffix: '+', label: 'Yr work overlap' },
  ]

  return (
    <aside className="lg:col-span-5">
      <div className="space-y-4 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-border bg-elevated/40 p-5 backdrop-blur-sm md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              At a glance
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
              Sidebar · 01
            </span>
          </div>

          <div className="mt-5 flex items-center gap-5">
            <GraduationBadge />
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                Degree status
              </p>
              <p className="mt-1 font-display text-base font-semibold text-fg">
                Conferred
              </p>
              <p className="mt-1 text-xs text-muted">
                Class of 2026 · DLSAU
              </p>
            </div>
          </div>

          <ul className="mt-5 grid grid-cols-2 gap-3 border-t border-border/60 pt-5">
            {stats.map((stat) => (
              <StatTile key={stat.label} stat={stat} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

function StatTile({ stat }: { stat: SidebarStat }) {
  const { ref, value } = useCountUp<HTMLLIElement>(stat.value, {
    duration: 1400,
  })
  return (
    <li
      ref={ref}
      className="rounded-xl border border-border bg-canvas/60 p-3"
    >
      <p
        className="font-display text-2xl font-semibold leading-none text-fg"
        aria-label={`${stat.value}${stat.suffix ?? ''} ${stat.label}`}
      >
        {value}
        {stat.suffix && (
          <span className="text-sm text-accent">{stat.suffix}</span>
        )}
      </p>
      <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-subtle">
        {stat.label}
      </p>
    </li>
  )
}

function GraduationBadge() {
  const r = 38
  const circumference = 2 * Math.PI * r

  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ed-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#1f2632"
          strokeWidth="5"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#ed-ring)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center">
          <GraduationCapIcon className="h-6 w-6 text-accent" />
          <p className="-mt-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-fg">
            2026
          </p>
        </div>
      </div>
    </div>
  )
}

function ThesisSpotlight() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/[0.06] via-elevated/40 to-elevated/20 p-5 sm:p-6 md:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 opacity-[0.07] md:-right-10 md:-top-10"
      >
        <GraduationCapIcon className="h-36 w-36 text-fg sm:h-44 sm:w-44 md:h-56 md:w-56" />
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
          Thesis Spotlight · Feature
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
          Artifact · 01
        </span>
      </div>

      <div className="relative mt-4 grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <h4 className="font-display text-xl font-semibold leading-tight text-fg sm:text-2xl md:text-3xl">
            Petmania — a veterinary clinic platform.
          </h4>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            The thesis artifact: a full-stack veterinary clinic system
            covering appointments, pet medical records, inventory and
            invoicing, with SMS notifications via Semaphore — chosen
            specifically so the notification layer holds up under intermittent
            connectivity. Deployed end-to-end on a self-managed server.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent/15"
            >
              Read full case study
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
            </a>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-canvas/60 px-3 py-2.5 text-[10px] uppercase tracking-[0.18em] text-muted">
              <BriefcaseIcon className="h-3.5 w-3.5 text-accent/70" />
              Parallel with SDE role
            </span>
          </div>
        </div>

        <ul className="md:col-span-4 space-y-2 self-end text-xs uppercase tracking-[0.18em]">
          {[
            'Appointments + records',
            'Inventory + invoicing',
            'Semaphore SMS layer',
            'Self-managed deploy',
          ].map((label) => (
            <li
              key={label}
              className="flex items-start gap-2 text-muted"
            >
              <span
                aria-hidden="true"
                className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
