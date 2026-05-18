import { profile } from '@/data/portfolioData'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/30 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 md:flex-row">
        <p className="text-xs text-subtle">© 2026 {profile.name}</p>
        <p className="text-[10px] uppercase tracking-[0.22em] text-subtle">
          Built with Vite · React Three Fiber · Tailwind
        </p>
      </div>
    </footer>
  )
}
