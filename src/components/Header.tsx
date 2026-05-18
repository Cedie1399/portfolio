import { profile } from '@/data/portfolioData'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-canvas/60 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="font-display text-sm font-semibold tracking-tight text-fg"
        >
          {profile.name}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
