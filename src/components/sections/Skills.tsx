import { useGsapSection } from '@/hooks/useGsapSection'
import { SKILL_ICONS } from '@/components/skills/icons'
import {
  SkillCatalog,
  type SkillMeta,
} from '@/components/skills/SkillCatalog'

// Per-skill metadata: role + plain-English note + which projects use it.
// Notes are written first-person, kept short for the detail panel.
const SKILL_META: Record<string, SkillMeta> = {
  React: {
    role: 'Frontend framework',
    note: 'The UI layer for every web project I ship — from clinic dashboards to event platforms.',
    usedIn: ['AirEvent Gala', 'Petmania', 'Fabrication shop', 'This site'],
  },
  'Next.js': {
    role: 'App framework',
    note: 'App Router on the fabrication system — server components and route handlers where they earn their keep.',
    usedIn: ['Fabrication shop'],
  },
  TypeScript: {
    role: 'Frontend language',
    note: 'Default for any non-trivial frontend — the type system pays for itself the moment a refactor lands.',
    usedIn: ['Petmania', 'Fabrication shop', 'This site'],
  },
  'Tailwind CSS': {
    role: 'UI styling',
    note: 'Utility-first styling — keeps design tokens consistent without the cascade fighting back.',
    usedIn: ['Petmania', 'Fabrication shop', 'This site'],
  },
  Vite: {
    role: 'Build tool',
    note: 'Fast HMR + ESM-native bundling. Powers this portfolio.',
    usedIn: ['This site'],
  },
  'React Three Fiber': {
    role: '3D in React',
    note: 'Declarative Three.js — used for the original hero scene before the editorial redesign.',
    usedIn: ['This site'],
  },
  'Three.js': {
    role: '3D engine',
    note: 'The underlying WebGL renderer beneath R3F — reached for when raw scene control is needed.',
    usedIn: ['This site'],
  },
  Java: {
    role: 'Backend runtime',
    note: 'Primary backend language at SRI — versions 11, 17, 21 in production across projects.',
    usedIn: ['AirEvent Gala', 'Petmania', 'Fabrication shop'],
  },
  'Spring Boot': {
    role: 'API framework',
    note: 'Layered Controller → Service → Repository on every backend — Specifications for filters, Spring Events for async work.',
    usedIn: ['AirEvent Gala', 'Petmania', 'Fabrication shop'],
  },
  PostgreSQL: {
    role: 'Primary database',
    note: 'Default relational store — earned for multi-tenant schemas and JPA Specification pattern work.',
    usedIn: ['AirEvent Gala', 'Fabrication shop'],
  },
  MySQL: {
    role: 'Relational database',
    note: 'Backed the Petmania thesis — paired with Spring Boot 4 and JPA.',
    usedIn: ['Petmania'],
  },
  Docker: {
    role: 'Containerization',
    note: 'Reproducible local dev + deploy targets on the fabrication system.',
    usedIn: ['Fabrication shop'],
  },
  Vercel: {
    role: 'Hosting · CI',
    note: 'Zero-config deploy target for the portfolio and most React/Next sites.',
    usedIn: ['This site'],
  },
  AWS: {
    role: 'Storage + email',
    note: 'S3 for asset storage and SES for transactional email on AirEvent Gala.',
    usedIn: ['AirEvent Gala'],
  },
  Linux: {
    role: 'Server OS',
    note: 'Self-managed server work — process supervision, file layout, package management.',
    usedIn: ['Petmania'],
  },
  Nginx: {
    role: 'Reverse proxy',
    note: 'Terminating TLS and reverse-proxying app servers on the Petmania self-managed deployment.',
    usedIn: ['Petmania'],
  },
  GitHub: {
    role: 'Source control · CI',
    note: 'Personal projects, the portfolio, and open work — primary remote.',
    usedIn: ['This site'],
  },
  GitLab: {
    role: 'Source control',
    note: 'Used at SRI for client and internal projects alongside GitHub.',
    usedIn: ['AirEvent Gala'],
  },
}

// Skills shown in the "primary stack" featured strip — the things reached for first.
const PRIMARY_STACK = [
  'React',
  'TypeScript',
  'Java',
  'Spring Boot',
  'PostgreSQL',
  'AWS',
]

export default function Skills() {
  const sectionRef = useGsapSection<HTMLElement>()

  return (
    <section ref={sectionRef} id="skills" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <PageHeader />

        <div className="mt-10">
          <PrimaryStack />
        </div>

        <div className="mt-10">
          <SkillCatalog meta={SKILL_META} />
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
            Page 06 · Skills
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-fg md:text-5xl">
            Stack &amp; tooling.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            A field guide to what's in the toolbox — primary stack at the top,
            the full catalog below. Click any tool to see where it actually
            shows up in the case studies.
          </p>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-subtle md:block">
          Field guide · 18 tools
        </p>
      </div>
    </header>
  )
}

function PrimaryStack() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/[0.06] via-elevated/40 to-elevated/20 p-5 md:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            Primary stack · What I reach for first
          </p>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The six tools that show up on every current production project.
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
          Featured · 06
        </span>
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
        {PRIMARY_STACK.map((name) => {
          const Icon = SKILL_ICONS[name]
          return (
            <li key={name}>
              <div
                title={name}
                className="group/primary flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-canvas/60 p-2 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-canvas/80 hover:text-fg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {Icon ? (
                  <Icon className="h-6 w-6 text-muted transition-colors duration-300 group-hover/primary:text-accent" />
                ) : (
                  <span className="text-xs font-semibold">
                    {name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className="text-center text-[10px] uppercase leading-tight tracking-[0.12em]">
                  {shortName(name)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

function shortName(name: string): string {
  if (name === 'PostgreSQL') return 'Postgres'
  if (name === 'Spring Boot') return 'Spring'
  return name
}
