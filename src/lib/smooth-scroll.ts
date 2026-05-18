import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SmoothScrollHandle = {
  destroy: () => void
}

// Pixels of headroom Lenis leaves above an anchor target.
// Matches the sticky header height + a little breathing room.
const ANCHOR_OFFSET_PX = 96

export function initSmoothScroll(): SmoothScrollHandle | null {
  if (typeof window === 'undefined') return null
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  const onScroll = () => ScrollTrigger.update()
  lenis.on('scroll', onScroll)

  const raf = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // Anchor click interception — Lenis doesn't honor CSS scroll-padding-top
  // by default, so we route hash links through lenis.scrollTo with the
  // correct offset for the sticky header.
  const onAnchorClick = (event: MouseEvent) => {
    if (event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey)
      return

    const target = event.target
    if (!(target instanceof Element)) return

    const link = target.closest<HTMLAnchorElement>('a[href^="#"]')
    if (!link) return

    const hash = link.getAttribute('href') ?? ''
    if (hash.length <= 1) return

    let el: HTMLElement | null = null
    try {
      el = document.querySelector<HTMLElement>(hash)
    } catch {
      return
    }
    if (!el) return

    event.preventDefault()
    lenis.scrollTo(el, { offset: -ANCHOR_OFFSET_PX })

    // Update the URL hash so back-button + bookmarking still work
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash)
    }
  }

  document.addEventListener('click', onAnchorClick)

  return {
    destroy: () => {
      document.removeEventListener('click', onAnchorClick)
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
    },
  }
}

export { gsap, ScrollTrigger }
