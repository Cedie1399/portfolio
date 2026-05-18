import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/smooth-scroll'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export function useGsapSection<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const section = ref.current
    if (!section) return
    if (window.matchMedia(REDUCED_MOTION).matches) return

    const ctx = gsap.context(() => {
      const header = section.querySelector(':scope > div > header')
      const cards = section.querySelectorAll('article')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      })

      if (header) {
        tl.from(header, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
        })
      }

      if (cards.length) {
        tl.from(
          cards,
          {
            opacity: 0,
            y: 24,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.07,
          },
          header ? '-=0.35' : 0,
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return ref
}
