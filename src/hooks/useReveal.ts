import { useEffect, useRef, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

type Options = {
  rootMargin?: string
  threshold?: number
}

export function useReveal<T extends Element = HTMLElement>(
  options: Options = {},
) {
  const ref = useRef<T | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
        threshold: options.threshold ?? 0.15,
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options.rootMargin, options.threshold])

  return { ref, revealed }
}
