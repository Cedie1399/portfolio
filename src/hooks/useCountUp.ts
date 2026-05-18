import { useEffect, useRef, useState } from 'react'

type Options = {
  duration?: number
  threshold?: number
}

// Animates a number from 0 → target the first time the returned ref enters
// the viewport. Honors prefers-reduced-motion (sets the value immediately).
export function useCountUp<T extends HTMLElement>(
  target: number,
  { duration = 1400, threshold = 0.3 }: Options = {},
) {
  const ref = useRef<T>(null)
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      const startTime = performance.now()
      let frame = 0
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(target * eased))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(frame)
    }

    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start()
          ob.disconnect()
        }
      },
      { threshold },
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [target, duration, threshold])

  return { ref, value }
}
