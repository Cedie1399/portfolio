import { useGsapSection } from '@/hooks/useGsapSection'
import { SKILL_ICONS } from '@/components/skills/icons'
import { BRAND_COLORS } from '@/components/skills/brandColors'
import { ArrowUpRightIcon } from '@/components/hero/icons'
import { skills } from '@/data/portfolioData'

type HeadlineEntry = {
  name: string
  role: string
  copy: string
  usedIn: string[]
}

const HEADLINE_SIX: HeadlineEntry[] = [
  {
    name: 'Java',
    role: 'Backend runtime',
    copy: 'Primary backend language at Solutions Resource Inc. Versions 11, 17, and 21 in production across projects — reached for when correctness and predictable performance matter more than time-to-prototype.',
    usedIn: ['AirEvent Gala', 'Petmania', 'Fabrication shop'],
  },
  {
    name: 'Spring Boot',
    role: 'API framework',
    copy: 'The framework I write APIs in. Layered Controller → Service → Repository on every backend; JPA Specifications for dynamic filters; Spring Events for the async work that shouldn\'t block the request path.',
    usedIn: ['AirEvent Gala', 'Petmania', 'Fabrication shop'],
  },
  {
    name: 'PostgreSQL',
    role: 'Primary database',
    copy: 'Default relational store. Multi-tenant schemas on AirEvent Gala, BoM state-machine tables on the fabrication shop. Indexes added when measured, not assumed.',
    usedIn: ['AirEvent Gala', 'Fabrication shop'],
  },
  {
    name: 'React',
    role: 'Frontend framework',
    copy: 'The UI layer for every web project I ship — from clinic dashboards to event consoles to this site. Component patterns matured to the point of feeling boring, which is the goal.',
    usedIn: ['AirEvent Gala', 'Petmania', 'Fabrication shop', 'This site'],
  },
  {
    name: 'TypeScript',
    role: 'Frontend language',
    copy: "Default for any non-trivial frontend. The type system pays for itself the first time a refactor lands and the compiler catches what code review wouldn't have.",
    usedIn: ['Petmania', 'Fabrication shop', 'This site'],
  },
  {
    name: 'AWS',
    role: 'Storage + email',
    copy: 'S3 for asset storage and SES for transactional email on AirEvent Gala. Service breadth earned per project, not collected for résumé reasons.',
    usedIn: ['AirEvent Gala'],
  },
]

const ROLE_MAP: Record<string, string> = {
  'Next.js': 'App framework',
  'Tailwind CSS': 'UI styling',
  Vite: 'Build tool',
  'React Three Fiber': '3D in React',
  'Three.js': '3D engine',
  MySQL: 'Relational database',
  Docker: 'Containerization',
  Vercel: 'Hosting · CI',
  Linux: 'Server OS',
  Nginx: 'Reverse proxy',
  GitHub: 'Source control',
  GitLab: 'Source control',
}

export default function Skills() {
  const sectionRef = useGsapSection<HTMLElement>()

  const headlineNames = new Set(HEADLINE_SIX.map((h) => h.name))
  const otherTools = skills
    .flatMap((c) => c.items)
    .filter((n) => !headlineNames.has(n))
  const totalTools = HEADLINE_SIX.length + otherTools.length

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <PageHeader totalTools={totalTools} />

        <div className="mt-10 sm:mt-12">
          <HeadlineLead />
          <ol className="mt-8 divide-y divide-border/40 sm:mt-10">
            {HEADLINE_SIX.map((entry, idx) => (
              <li key={entry.name}>
                <HeadlineArticle entry={entry} index={idx} />
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 sm:mt-20">
          <AlsoInTheKit names={otherTools} />
        </div>

        <div className="mt-12 sm:mt-16">
          <ClosingNote />
        </div>
      </div>
    </section>
  )
}

function PageHeader({ totalTools }: { totalTools: number }) {
  return (
    <header className="border-b border-border/60 pb-6 sm:pb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            Page 06 · Skills
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-tight text-fg sm:mt-4 sm:text-3xl md:text-5xl">
            Stack &amp; tooling.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 md:text-base">
            A magazine feature on what's in the toolbox — the headline six up
            top with the story behind each one, the supporting cast below.
          </p>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-subtle md:block">
          Field guide · {totalTools} tools
        </p>
      </div>
    </header>
  )
}

function HeadlineLead() {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
        Issue 06 · The Headline Six
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-fg sm:text-2xl md:text-4xl">
        Six tools that ship on every current project.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
        Earned through production work — not collected for résumé reasons.
        Each one has a story; the rest of the kit waits below the fold.
      </p>
    </div>
  )
}

function HeadlineArticle({
  entry,
  index,
}: {
  entry: HeadlineEntry
  index: number
}) {
  const Icon = SKILL_ICONS[entry.name]
  const color = BRAND_COLORS[entry.name] ?? '#34d399'
  const num = String(index + 1).padStart(2, '0')
  const delay = `${(index * 0.42).toFixed(2)}s`

  return (
    <article
      className="relative grid gap-5 py-8 md:grid-cols-12 md:gap-8 md:py-10"
      style={{ ['--brand' as string]: color }}
    >
      <div className="flex items-baseline gap-3 md:col-span-2 md:block md:gap-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-subtle">
          No. {num}
        </p>
        <p
          aria-hidden="true"
          className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl md:mt-1 md:text-7xl"
          style={{
            color: 'transparent',
            WebkitTextStroke: `1.5px ${color}`,
          }}
        >
          {num}
        </p>
      </div>

      <div className="md:col-span-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className="icon-float grid h-12 w-12 shrink-0 place-items-center rounded-xl border bg-canvas/60 sm:h-14 sm:w-14"
            style={{
              borderColor: `${color}55`,
              color,
              animationDelay: delay,
              boxShadow: `0 8px 24px -14px ${color}88`,
            }}
          >
            {Icon ? (
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
            ) : (
              <span className="font-mono text-sm font-semibold">
                {entry.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </span>

          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold leading-tight text-fg sm:text-2xl md:text-3xl">
              {entry.name}
            </h3>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.22em] text-subtle sm:mt-1">
              {entry.role}
            </p>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg/85 sm:mt-5 sm:text-base">
          {entry.copy}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
            Used in ·
          </p>
          {entry.usedIn.map((project) => (
            <ProjectChip key={project} project={project} />
          ))}
        </div>
      </div>
    </article>
  )
}

function AlsoInTheKit({ names }: { names: string[] }) {
  return (
    <section>
      <header className="border-b border-border/40 pb-4 sm:pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
          Also in the kit
        </p>
        <h3 className="mt-2 max-w-2xl font-display text-xl font-semibold leading-tight text-fg sm:text-2xl md:text-3xl">
          The supporting cast — {names.length} more tools that earn their slot
          per project.
        </h3>
      </header>

      <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
        {names.map((name) => (
          <li key={name}>
            <ToolChip name={name} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ToolChip({ name }: { name: string }) {
  const Icon = SKILL_ICONS[name]
  const color = BRAND_COLORS[name] ?? '#34d399'
  const role = ROLE_MAP[name] ?? ''

  return (
    <span
      title={role ? `${name} — ${role}` : name}
      className="group/chip inline-flex items-center gap-2 rounded-full border border-border bg-canvas/60 px-3 py-1.5 text-xs text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand)]/50 hover:bg-canvas/80 hover:text-fg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{ ['--brand' as string]: color }}
    >
      <span
        className="grid h-4 w-4 shrink-0 place-items-center transition-transform duration-300 group-hover/chip:rotate-12"
        style={{ color }}
      >
        {Icon ? (
          <Icon className="h-3.5 w-3.5" />
        ) : (
          <span className="font-mono text-[8px] font-semibold">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="font-medium uppercase tracking-[0.14em]">
        {shortName(name)}
      </span>
    </span>
  )
}

function ProjectChip({ project }: { project: string }) {
  const lower = project.toLowerCase()
  const internal = !(lower.includes('this site') || lower.includes('portfolio'))
  const content = (
    <>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      {project}
      {internal && (
        <ArrowUpRightIcon className="h-3 w-3 opacity-70 transition-transform duration-200 group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5 motion-reduce:transition-none" />
      )}
    </>
  )

  const className =
    'group/chip inline-flex items-center gap-1.5 rounded-full border border-border bg-canvas/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-accent/40 hover:text-fg'

  if (internal) {
    return (
      <a href="#work" className={className}>
        {content}
      </a>
    )
  }
  return <span className={className}>{content}</span>
}

function ClosingNote() {
  return (
    <blockquote className="relative border-l-2 border-accent/60 py-2 pl-5 md:pl-6">
      <span
        aria-hidden="true"
        className="absolute -left-1.5 -top-2 font-display text-3xl leading-none text-accent/60"
      >
        "
      </span>
      <p className="max-w-2xl font-display text-base leading-snug text-fg/90 md:text-lg">
        The tool is the boring part. What it gets used for is the story —
        every entry here points back at a case study.
      </p>
      <footer className="mt-3 text-[10px] uppercase tracking-[0.3em] text-subtle">
        — Editor's note
      </footer>
    </blockquote>
  )
}

function shortName(name: string): string {
  if (name === 'PostgreSQL') return 'Postgres'
  if (name === 'Spring Boot') return 'Spring'
  if (name === 'Tailwind CSS') return 'Tailwind'
  if (name === 'React Three Fiber') return 'R3F'
  return name
}
