import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BentoGridProps = {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-fr',
        className,
      )}
    >
      {children}
    </div>
  )
}
