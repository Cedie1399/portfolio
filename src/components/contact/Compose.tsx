import { useEffect, useRef, useState, type SVGProps } from 'react'
import { cn } from '@/lib/cn'
import { ArrowUpRightIcon, MailIcon } from '@/components/hero/icons'

type Topic = {
  key: string
  label: string
  subject: string
  body: string
}

const TOPICS: Topic[] = [
  {
    key: 'sde',
    label: 'SDE role',
    subject: 'SDE role inquiry',
    body:
      "Hi Cyrus,\n\nWe're looking for a Software Development Engineer and your portfolio caught our eye. Would you have time for a short call?\n\n— ",
  },
  {
    key: 'contract',
    label: 'Contract work',
    subject: 'Contract engagement',
    body:
      "Hi Cyrus,\n\nWe have a short-term project that lines up with your stack. Are you taking on contract work?\n\n— ",
  },
  {
    key: 'systems',
    label: 'Systems chat',
    subject: 'Talking systems',
    body:
      "Hi Cyrus,\n\nLoved the case studies — would you be up for a quick chat about how you approached the multi-tenant schema work?\n\n— ",
  },
  {
    key: 'hello',
    label: 'Just say hi',
    subject: 'Hello Cyrus',
    body: "Hi Cyrus,\n\nSaw your portfolio and just wanted to say hello.\n\n— ",
  },
]

type Props = {
  email: string
}

export function Compose({ email }: Props) {
  const [activeKey, setActiveKey] = useState<string>(TOPICS[0]?.key ?? '')
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const active = TOPICS.find((t) => t.key === activeKey) ?? TOPICS[0]!
  const mailto = `mailto:${email}?subject=${encodeURIComponent(active.subject)}&body=${encodeURIComponent(active.body)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — mailto still works */
    }
  }

  return (
    <article className="rounded-2xl border border-border bg-elevated/40 p-5 backdrop-blur-sm md:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
          Compose · pick your topic
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
          subject pre-filled
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {TOPICS.map((t) => {
          const isActive = t.key === activeKey
          return (
            <li key={t.key}>
              <button
                type="button"
                onClick={() => setActiveKey(t.key)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors',
                  isActive
                    ? 'border-accent/60 bg-accent/15 text-accent'
                    : 'border-border bg-elevated/40 text-muted hover:border-hairline/40 hover:text-fg',
                )}
              >
                {t.label}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Preview line */}
      <div
        key={activeKey}
        className="mt-5 overflow-hidden rounded-lg border border-border bg-canvas/70 px-4 py-3 animate-[fadeIn_220ms_ease-out] motion-reduce:animate-none"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
          Subject preview
        </p>
        <p className="mt-1 font-mono text-sm text-fg">
          <span className="text-accent">re:</span> {active.subject}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={mailto}
          className="group inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/10 px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-accent/15"
        >
          <MailIcon className="h-4 w-4 text-accent" />
          Send email
          <ArrowUpRightIcon className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </a>

        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-elevated/40 px-4 py-3 text-sm font-medium text-muted transition-colors hover:border-hairline/40 hover:text-fg"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 text-accent" />
              Copied {email}
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" />
              Copy email
            </>
          )}
        </button>
      </div>
    </article>
  )
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m4 12 5 5L20 6" />
    </svg>
  )
}

function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  )
}
