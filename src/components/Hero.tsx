import { contact, profile } from '@/data/portfolioData'
import { TextScramble } from '@/components/TextScramble'
import { MagneticLink } from '@/components/MagneticLink'
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from '@/components/hero/icons'
import { HeroBackground } from '@/components/hero/HeroBackground'
import { Masthead } from '@/components/hero/Masthead'
import { CodeWindow } from '@/components/hero/CodeWindow'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden pt-16"
    >
      <HeroBackground />

      <div className="relative z-10">
        <Masthead />

        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <HeroContent />

            <aside className="relative lg:col-span-5 lg:pt-10">
              <PinnedTag>FILE PREVIEW</PinnedTag>
              <CodeWindow />
              <Caption>
                Fig 1 — Live preview from the desk of {profile.name}
              </Caption>
            </aside>
          </div>

          <ScrollHint />
        </div>
      </div>
    </section>
  )
}

function HeroContent() {
  return (
    <div className="relative lg:col-span-7">
      {/* Editorial eyebrow */}
      <div className="flex items-center gap-3">
        <span className="h-px w-12 bg-accent" />
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
          The Feature · 04
        </p>
      </div>

      <p className="mt-6 font-display text-[10px] uppercase tracking-[0.32em] text-muted md:text-xs">
        Featuring the Software Development Engineer
      </p>

      <h1 className="mt-3 font-display text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-fg md:text-7xl lg:text-[5.2rem]">
        <TextScramble text="Cyrus Daniel" />
        <br />
        <span className="text-fg/85">
          <TextScramble text="Santos." />
        </span>
      </h1>

      <p className="mt-6 inline-flex items-center text-xs uppercase tracking-[0.25em] text-muted">
        {profile.role}
        <span
          aria-hidden="true"
          className="cursor-blink ml-2 inline-block h-3 w-[2px] bg-accent align-middle"
        />
      </p>

      {/* Pull quote (editorial) */}
      <blockquote className="relative mt-10 max-w-xl border-l-2 border-accent/60 pl-5 md:pl-6">
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

      {/* Drop cap intro line */}
      <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted md:text-base">
        <span className="float-left mr-2 font-display text-5xl font-semibold leading-[0.85] text-accent">
          A
        </span>
        full-stack engineer growing into systems work — schema design,
        state-machine modeling, and production deployment for SaaS and
        manufacturing platforms. Currently building{' '}
        <span className="text-fg">{profile.currentlyBuilding}</span>.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <MagneticLink
          href="#work"
          className="group inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/10 px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-accent/15"
        >
          Read the feature
          <ArrowUpRightIcon className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </MagneticLink>

        <MagneticLink
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-elevated/40 px-5 py-3 text-sm font-medium text-muted transition-colors hover:border-hairline/40 hover:text-fg"
        >
          <MailIcon className="h-4 w-4" />
          Get in touch
        </MagneticLink>
      </div>

      <SocialRow />
    </div>
  )
}

function SocialRow() {
  const items = [
    { label: 'GitHub', href: contact.socials[0]?.href, Icon: GitHubIcon },
    { label: 'LinkedIn', href: contact.socials[1]?.href, Icon: LinkedInIcon },
    { label: 'Email', href: `mailto:${contact.email}`, Icon: MailIcon },
  ].filter(
    (l): l is { label: string; href: string; Icon: typeof GitHubIcon } =>
      Boolean(l.href),
  )

  return (
    <ul className="mt-8 flex items-center gap-2">
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
            aria-label={label}
            className="grid h-10 w-10 place-items-center rounded-md border border-border bg-elevated/40 text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent motion-reduce:transition-none"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function PinnedTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 max-w-xs text-[10px] uppercase tracking-[0.22em] text-subtle">
      {children}
    </p>
  )
}

function ScrollHint() {
  return (
    <div className="mt-16 flex items-center justify-center">
      <a
        href="#about"
        className="group inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-subtle transition-colors hover:text-accent"
      >
        <span>Continue reading</span>
        <span
          aria-hidden="true"
          className="h-8 w-px bg-gradient-to-b from-accent/60 to-transparent transition-all duration-300 group-hover:h-10"
        />
      </a>
    </div>
  )
}
