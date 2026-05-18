import { useState, type ReactElement, type SVGProps } from 'react'
import { cn } from '@/lib/cn'
import {
  ProductionIllustration,
  SchemaIllustration,
  StateMachineIllustration,
} from '@/components/about/illustrations'
import {
  DatabaseIcon,
  RocketIcon,
  WorkflowIcon,
} from '@/components/about/icons'
import { ArrowUpRightIcon } from '@/components/hero/icons'

type IconComp = (props: SVGProps<SVGSVGElement>) => ReactElement
type IllusComp = () => ReactElement

type FocusKey = 'schema' | 'state' | 'production'

type FocusEntry = {
  key: FocusKey
  tab: string
  title: string
  body: string
  Icon: IconComp
  Illustration: IllusComp
  linked: { label: string; href: string }[]
}

const FOCUS: FocusEntry[] = [
  {
    key: 'schema',
    tab: 'Schema Design',
    title: 'Model data so write paths stay simple and read paths stay fast.',
    body: 'Designing relational schemas where every entity has one place to live and one shape to live in — multi-tenant from day one, with foreign keys earning their keep and projections built for the hot reads.',
    Icon: DatabaseIcon,
    Illustration: SchemaIllustration,
    linked: [
      { label: 'AirEvent Gala', href: '#work' },
      { label: 'Petmania', href: '#work' },
    ],
  },
  {
    key: 'state',
    tab: 'State Machines',
    title: 'Explicit transitions over implicit in-between states.',
    body: 'Bill-of-Materials states, order statuses, and approval flows modeled as named transitions on a graph — so the floor never reaches a state by accident, and every status change leaves an audit trail.',
    Icon: WorkflowIcon,
    Illustration: StateMachineIllustration,
    linked: [{ label: 'Fabrication shop', href: '#work' }],
  },
  {
    key: 'production',
    tab: 'Production Ownership',
    title: 'Owning the deployment, the supervisor, and the proxy.',
    body: 'Configuring the server by hand, picking the process manager, terminating TLS at the reverse proxy, watching uptime — production is part of the design, not something handed off after the merge.',
    Icon: RocketIcon,
    Illustration: ProductionIllustration,
    linked: [{ label: 'Petmania', href: '#work' }],
  },
]

export function FocusSwitcher() {
  const [activeKey, setActiveKey] = useState<FocusKey>('schema')
  const active = FOCUS.find((f) => f.key === activeKey) ?? FOCUS[0]
  if (!active) return null
  const { Illustration } = active

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-elevated/40 backdrop-blur-sm">
      <div
        role="tablist"
        aria-label="Focus areas"
        className="flex items-stretch border-b border-border bg-canvas/40"
      >
        {FOCUS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={f.key === activeKey}
            tabIndex={f.key === activeKey ? 0 : -1}
            onClick={() => setActiveKey(f.key)}
            className={cn(
              'group/tab relative flex flex-1 items-center justify-center gap-2 px-3 py-3 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors sm:gap-2.5 sm:text-xs sm:tracking-[0.2em]',
              f.key === activeKey
                ? 'text-fg'
                : 'text-muted hover:text-fg',
            )}
          >
            <f.Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{f.tab}</span>
            <span className="sm:hidden">{f.tab.split(' ')[0]}</span>
            {f.key === activeKey && (
              <span
                aria-hidden="true"
                className="absolute inset-x-3 -bottom-px h-[2px] bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      <div
        key={activeKey}
        className="grid gap-6 p-6 md:grid-cols-12 md:gap-8 md:p-8 animate-[fadeIn_240ms_ease-out] motion-reduce:animate-none"
      >
        <div className="md:col-span-5">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-border bg-canvas/60">
            <Illustration />
          </div>
        </div>

        <div className="md:col-span-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            Focus · {String(FOCUS.indexOf(active) + 1).padStart(2, '0')} of 03
          </p>
          <h4 className="mt-3 font-display text-xl font-semibold leading-snug text-fg md:text-2xl">
            {active.title}
          </h4>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted md:text-base">
            {active.body}
          </p>

          <div className="mt-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-subtle">
              Seen in
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {active.linked.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-accent transition-colors hover:bg-accent/15"
                  >
                    {l.label}
                    <ArrowUpRightIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
