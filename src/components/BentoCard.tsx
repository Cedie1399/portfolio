import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useReveal } from '@/hooks/useReveal'

type BentoCardProps = {
  children: ReactNode
  className?: string
  interactive?: boolean
}

export function BentoCard({
  children,
  className,
  interactive = true,
}: BentoCardProps) {
  const { ref, revealed } = useReveal<HTMLElement>()

  return (
    <article
      ref={ref}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-elevated/40 p-6 backdrop-blur-sm',
        'transition-all duration-500 ease-out motion-reduce:transition-none',
        interactive && 'hover:border-fg/15 hover:bg-elevated/60',
        revealed
          ? 'translate-y-0 opacity-100'
          : 'translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        className,
      )}
    >
      {children}
    </article>
  )
}

export function BentoEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
      {children}
    </p>
  )
}

export function BentoTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-fg">
      {children}
    </h3>
  )
}

export function BentoBody({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-sm leading-relaxed text-muted">{children}</p>
  )
}
