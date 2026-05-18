import { useGsapSection } from '@/hooks/useGsapSection'
import { useCountUp } from '@/hooks/useCountUp'
import { profile } from '@/data/portfolioData'
import { FocusSwitcher } from '@/components/about/FocusSwitcher'
import {
  ActivityIcon,
  CalendarIcon,
  LayersIcon,
  WrenchIcon,
} from '@/components/about/icons'

type Stat = {
  target: number
  suffix?: string
  prefix?: string
  label: string
  caption: string
  Icon: typeof CalendarIcon
}

const STATS: Stat[] = [
  {
    target: 6,
    suffix: '+',
    label: 'Years building',
    caption: 'since 2019',
    Icon: CalendarIcon,
  },
  {
    target: 3,
    label: 'Systems shipped',
    caption: 'to production',
    Icon: LayersIcon,
  },
  {
    target: 99,
    suffix: '%',
    label: 'Uptime delivered',
    caption: 'on owned infra',
    Icon: ActivityIcon,
  },
  {
    target: 18,
    suffix: '+',
    label: 'Tools in stack',
    caption: 'frontend → infra',
    Icon: WrenchIcon,
  },
]

export default function About() {
  const sectionRef = useGsapSection<HTMLElement>()

  return (
    <section ref={sectionRef} id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <PageHeader />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <FeatureArticle />
          <Sidebar />
        </div>

        <div className="mt-16">
          <SubHeader number="02" label="Focus" title="What I keep working on." />
          <FocusSwitcher />
        </div>
      </div>
    </section>
  )
}

function PageHeader() {
  return (
    <header className="border-b border-border/60 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            Page 02 · About
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-fg md:text-5xl">
            Engineer growing into systems work.
          </h2>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-subtle md:block">
          Reading time · ~3 min
        </p>
      </div>
    </header>
  )
}

function SubHeader({
  number,
  label,
  title,
}: {
  number: string
  label: string
  title: string
}) {
  return (
    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
        Section {number} · {label}
      </p>
      <h3 className="font-display text-xl font-semibold text-fg md:text-2xl">
        {title}
      </h3>
    </div>
  )
}

function FeatureArticle() {
  return (
    <article className="lg:col-span-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
        ── Profile · the engineer ──
      </p>

      <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
        <span className="float-left mr-2 mt-1 font-display text-6xl font-semibold leading-[0.78] text-accent md:text-7xl">
          G
        </span>
        {profile.about.slice(1)}
      </p>

      <blockquote className="relative my-10 border-l-2 border-accent/60 pl-5 md:pl-6">
        <span
          aria-hidden="true"
          className="absolute -left-1.5 -top-3 font-display text-3xl leading-none text-accent/60"
        >
          “
        </span>
        <p className="font-display text-lg leading-snug text-fg/90 md:text-xl">
          {profile.tagline}
        </p>
        <footer className="mt-3 text-[10px] uppercase tracking-[0.3em] text-subtle">
          — {profile.name}, on his own work
        </footer>
      </blockquote>

      <p className="text-sm leading-relaxed text-muted md:text-base">
        Currently building{' '}
        <span className="text-fg">{profile.currentlyBuilding}</span>
        {' '}— a virtual event management platform spanning events, exhibitor
        booths, payments, and reporting. Spring Boot + PostgreSQL on the
        backend, React on top, integrating Stripe, AWS, and Twilio as
        first-class concerns.
      </p>
    </article>
  )
}

function Sidebar() {
  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-24 rounded-2xl border border-border bg-elevated/40 p-5 backdrop-blur-sm md:p-6">
        <SidebarHeader />
        <ul className="mt-5 grid grid-cols-2 gap-3">
          {STATS.map((stat) => (
            <StatTile key={stat.label} stat={stat} />
          ))}
        </ul>
        <Marginalia />
      </div>
    </aside>
  )
}

function SidebarHeader() {
  return (
    <div className="flex items-center justify-between">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        At a glance
      </p>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
        Sidebar · 01
      </span>
    </div>
  )
}

function StatTile({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp<HTMLLIElement>(stat.target, {
    duration: 1500,
  })
  return (
    <li
      ref={ref}
      className="group flex flex-col gap-2 rounded-xl border border-border bg-canvas/50 p-3 transition-colors duration-300 hover:border-accent/40"
    >
      <stat.Icon className="h-4 w-4 text-accent/70 transition-colors duration-300 group-hover:text-accent" />
      <p
        className="font-display text-3xl font-semibold leading-none text-fg"
        aria-label={`${stat.target}${stat.suffix ?? ''} ${stat.label}`}
      >
        {stat.prefix}
        {value}
        {stat.suffix}
      </p>
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-fg/80">
          {stat.label}
        </p>
        <p className="text-[10px] tracking-wide text-subtle">{stat.caption}</p>
      </div>
    </li>
  )
}

function Marginalia() {
  return (
    <div className="mt-5 border-t border-border/60 pt-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
        Editor's note
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        Numbers tick up the first time this column scrolls into view — they
        reflect work owned end-to-end, not aggregate team output.
      </p>
    </div>
  )
}
