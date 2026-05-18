import type { ReactElement, SVGProps } from 'react'
import { useGsapSection } from '@/hooks/useGsapSection'
import { contact, profile } from '@/data/portfolioData'
import { LiveClock } from '@/components/contact/LiveClock'
import { Compose } from '@/components/contact/Compose'
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from '@/components/hero/icons'

type IconComp = (props: SVGProps<SVGSVGElement>) => ReactElement

export default function Contact() {
  const sectionRef = useGsapSection<HTMLElement>()

  const github = contact.socials.find((s) => s.label === 'GitHub')?.href ?? ''
  const linkedin =
    contact.socials.find((s) => s.label === 'LinkedIn')?.href ?? ''

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <PageHeader />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <EditorsNote />
          <CallOut />
        </div>

        <div className="mt-6">
          <Compose email={contact.email} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <MethodCard
            Icon={MailIcon}
            method="Email"
            handle={contact.email}
            cta="Send a message"
            href={`mailto:${contact.email}`}
          />
          <MethodCard
            Icon={GitHubIcon}
            method="GitHub"
            handle={extractHandle(github)}
            cta="See the code"
            href={github}
            external
          />
          <MethodCard
            Icon={LinkedInIcon}
            method="LinkedIn"
            handle={extractHandle(linkedin)}
            cta="Connect"
            href={linkedin}
            external
          />
        </div>

        <FinMarker />
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
            Page 07 · Contact
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-fg md:text-5xl">
            Let's build something.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Software Development Engineer roles, contract work, or interesting
            systems problems — pick a topic below and the subject line writes
            itself.
          </p>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-subtle md:block">
          Endpaper · fin
        </p>
      </div>
    </header>
  )
}

function EditorsNote() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border bg-elevated/40 p-5 backdrop-blur-sm md:p-7 lg:col-span-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 opacity-[0.05]"
      >
        <MailIcon className="h-48 w-48 text-fg" />
      </div>

      <p className="relative font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
        Editor's note · from the desk of
      </p>

      <blockquote className="relative mt-5 border-l-2 border-accent/60 pl-5 md:pl-6">
        <span
          aria-hidden="true"
          className="absolute -left-1.5 -top-3 font-display text-3xl leading-none text-accent/60"
        >
          “
        </span>
        <p className="font-display text-base leading-snug text-fg/90 md:text-lg">
          The next interesting system to build is the one I haven't seen yet —
          if you're shipping it, I'd like to hear about it.
        </p>
        <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.3em] text-subtle">
          <span>— {profile.name}</span>
          <span className="font-mono">{profile.role}</span>
        </footer>
      </blockquote>

      <div className="relative mt-6 border-t border-border/60 pt-5">
        <LiveClock />
      </div>
    </article>
  )
}

function CallOut() {
  return (
    <aside className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/[0.06] via-elevated/40 to-elevated/20 p-5 md:p-7 lg:col-span-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
        At a glance
      </p>

      <dl className="mt-5 space-y-4">
        <Field label="Based" value={profile.location} />
        <Field label="Status" value={profile.status} accent />
        <Field label="Stack" value="Java · Spring · React · Postgres" />
        <Field label="Currently" value={profile.currentlyBuilding} />
      </dl>
    </aside>
  )
}

function Field({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
        {label}
      </dt>
      <dd
        className={`mt-1 text-sm leading-snug ${accent ? 'text-accent' : 'text-fg'}`}
      >
        {value}
      </dd>
    </div>
  )
}

type MethodProps = {
  Icon: IconComp
  method: string
  handle: string
  cta: string
  href: string
  external?: boolean
}

function MethodCard({
  Icon,
  method,
  handle,
  cta,
  href,
  external = false,
}: MethodProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="group block focus-visible:outline-none"
    >
      <article className="flex h-full flex-col rounded-2xl border border-border bg-elevated/40 p-5 backdrop-blur-sm transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-elevated/60">
        <div className="flex items-start justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
            <Icon className="h-5 w-5" />
          </div>
          <ArrowUpRightIcon className="h-4 w-4 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent motion-reduce:transition-none" />
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-muted">
          {method}
        </p>
        <p className="mt-1 truncate font-display text-sm font-semibold text-fg">
          {handle}
        </p>

        <p className="mt-auto pt-6 text-xs uppercase tracking-[0.18em] text-accent">
          {cta} →
        </p>
      </article>
    </a>
  )
}

function FinMarker() {
  return (
    <div className="mt-16 flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <span className="h-px w-12 bg-border" />
        <span className="font-display text-xs uppercase tracking-[0.5em] text-subtle">
          Fin
        </span>
        <span className="h-px w-12 bg-border" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
        Thanks for reading · {new Date().getFullYear()}
      </p>
    </div>
  )
}

function extractHandle(url: string): string {
  if (!url) return ''
  try {
    const u = new URL(url)
    const last = u.pathname.replace(/\/+$/, '').split('/').filter(Boolean).pop()
    return last ? `@${last}` : url
  } catch {
    return url
  }
}
