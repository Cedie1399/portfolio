import { useRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  strength?: number
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export function MagneticLink({
  children,
  className,
  strength = 0.25,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia(REDUCED_MOTION).matches) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * strength
    const y = (event.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        'transition-transform duration-300 ease-out motion-reduce:transition-none',
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  )
}
