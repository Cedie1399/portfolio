import { useEffect, useState } from 'react'
import { profile } from '@/data/portfolioData'
import { cn } from '@/lib/cn'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-canvas/60 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <a
          href="#hero"
          onClick={() => setOpen(false)}
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

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:text-fg md:hidden"
        >
          <HamburgerIcon open={open} />
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          'overflow-hidden transition-[max-height,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden',
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0',
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col border-t border-border/40 px-6 pb-4 pt-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-4 w-5 flex-col items-stretch justify-between"
    >
      <span
        className={cn(
          'block h-0.5 w-full origin-center bg-current transition-transform duration-200 motion-reduce:transition-none',
          open && 'translate-y-[7px] rotate-45',
        )}
      />
      <span
        className={cn(
          'block h-0.5 w-full bg-current transition-opacity duration-200 motion-reduce:transition-none',
          open && 'opacity-0',
        )}
      />
      <span
        className={cn(
          'block h-0.5 w-full origin-center bg-current transition-transform duration-200 motion-reduce:transition-none',
          open && '-translate-y-[7px] -rotate-45',
        )}
      />
    </div>
  )
}
