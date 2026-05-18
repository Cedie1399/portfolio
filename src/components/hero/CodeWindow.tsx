import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TabKey = 'about.ts' | 'stack.ts' | 'contact.ts'

const TABS: TabKey[] = ['about.ts', 'stack.ts', 'contact.ts']

export function CodeWindow() {
  const [tab, setTab] = useState<TabKey>('about.ts')

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-surface/90 shadow-2xl shadow-black/40 backdrop-blur-md">
      {/* Top chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-elevated/70 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="ml-2 text-[10px] uppercase tracking-[0.22em] text-subtle">
          ~/portfolio
        </p>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Code preview"
        className="flex items-stretch border-b border-border bg-elevated/40"
      >
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
            className={cn(
              'group/tab relative -mb-px px-4 py-2 font-mono text-[11px] tracking-wide transition-colors',
              tab === t
                ? 'text-fg'
                : 'text-muted hover:text-fg',
            )}
          >
            <span className="mr-1.5 text-accent/70">
              {fileIcon(t)}
            </span>
            {t}
            {tab === t && (
              <span
                aria-hidden="true"
                className="absolute inset-x-2 -bottom-px h-[2px] bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative overflow-hidden">
        <div
          key={tab}
          className="animate-[fadeIn_220ms_ease-out] motion-reduce:animate-none"
        >
          <pre className="grid grid-cols-[2.5rem_1fr] gap-x-3 px-3 py-5 font-mono text-[12px] leading-6 md:text-[13px]">
            <LineNumbers count={LINES[tab].length} />
            <code className="text-fg/90">
              {LINES[tab].map((line, i) => (
                <div key={i} className="whitespace-pre">
                  {line}
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-border bg-elevated/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-subtle">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            TypeScript
          </span>
          <span>UTF-8 · LF</span>
        </div>
      </div>
    </div>
  )
}

function LineNumbers({ count }: { count: number }) {
  return (
    <code aria-hidden="true" className="text-right text-subtle/70 select-none">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{(i + 1).toString().padStart(2, '0')}</div>
      ))}
    </code>
  )
}

function fileIcon(name: TabKey): string {
  switch (name) {
    case 'about.ts':
      return '◉'
    case 'stack.ts':
      return '◆'
    case 'contact.ts':
      return '✉'
  }
}

// ── Syntax tokens ───────────────────────────────────────────────────────────

function Kw({ children }: { children: ReactNode }) {
  return <span className="text-[#ff7b72]">{children}</span>
}

function Str({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>
}

function Num({ children }: { children: ReactNode }) {
  return <span className="text-[#a5d6ff]">{children}</span>
}

function Prop({ children }: { children: ReactNode }) {
  return <span className="text-[#d2a8ff]">{children}</span>
}

function Var({ children }: { children: ReactNode }) {
  return <span className="text-[#79c0ff]">{children}</span>
}

function Cm({ children }: { children: ReactNode }) {
  return <span className="text-subtle/80 italic">{children}</span>
}

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="cursor-blink ml-0.5 inline-block h-[1em] w-[7px] -translate-y-[1px] bg-accent align-middle"
    />
  )
}

// ── Tab content (JSX so we keep token colors) ───────────────────────────────

const LINES: Record<TabKey, ReactNode[]> = {
  'about.ts': [
    <>
      <Cm>// who's behind this</Cm>
    </>,
    <>
      <Kw>const</Kw> <Var>cedie</Var> = {'{'}
    </>,
    <>
      {'  '}
      <Prop>name</Prop>: <Str>'Cyrus Daniel Santos'</Str>,
    </>,
    <>
      {'  '}
      <Prop>role</Prop>: <Str>'Software Development Engineer'</Str>,
    </>,
    <>
      {'  '}
      <Prop>based</Prop>: <Str>'Manila, PH'</Str>,
    </>,
    <>
      {'  '}
      <Prop>building</Prop>: <Str>'AirEvent Gala'</Str>,
    </>,
    <>
      {'  '}
      <Prop>open</Prop>: <Kw>true</Kw>,
      <Cursor />
    </>,
    <>{'}'}</>,
  ],
  'stack.ts': [
    <>
      <Cm>// what i reach for first</Cm>
    </>,
    <>
      <Kw>export const</Kw> <Var>stack</Var> = {'{'}
    </>,
    <>
      {'  '}
      <Prop>frontend</Prop>: [<Str>'React'</Str>, <Str>'TypeScript'</Str>,{' '}
      <Str>'Next.js'</Str>],
    </>,
    <>
      {'  '}
      <Prop>backend</Prop>: [<Str>'Java'</Str>, <Str>'Spring Boot'</Str>,{' '}
      <Str>'Postgres'</Str>],
    </>,
    <>
      {'  '}
      <Prop>infra</Prop>: [<Str>'Docker'</Str>, <Str>'AWS'</Str>,{' '}
      <Str>'Vercel'</Str>],
    </>,
    <>
      {'  '}
      <Prop>years</Prop>: <Num>6</Num>,
    </>,
    <>{'}'}</>,
  ],
  'contact.ts': [
    <>
      <Cm>// how to reach me</Cm>
    </>,
    <>
      <Kw>export const</Kw> <Var>contact</Var> = {'{'}
    </>,
    <>
      {'  '}
      <Prop>email</Prop>: <Str>'cediesky@gmail.com'</Str>,
    </>,
    <>
      {'  '}
      <Prop>github</Prop>: <Str>'@Cedie1399'</Str>,
    </>,
    <>
      {'  '}
      <Prop>linkedin</Prop>: <Str>'@cyrusdanielsantos'</Str>,
    </>,
    <>
      {'  '}
      <Prop>replyWithin</Prop>: <Str>'~24h'</Str>,
    </>,
    <>{'}'}</>,
  ],
}
