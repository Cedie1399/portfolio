import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SmoothScrollHandle = {
  destroy: () => void
}

// How far from the top of the viewport the scrolled-to anchor target
// should land. We aim for ~22% of viewport height so the section heading
// sits in the upper third (centered-feeling), clamped to never overlap
// the sticky navbar at small viewport heights.
const NAVBAR_CLEARANCE_PX = 80
const VIEWPORT_OFFSET_RATIO = 0.22

function computeAnchorOffset(): number {
  if (typeof window === 'undefined') return NAVBAR_CLEARANCE_PX
  return Math.max(
    NAVBAR_CLEARANCE_PX,
    Math.round(window.innerHeight * VIEWPORT_OFFSET_RATIO),
  )
}

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

    // Prefer scrolling to the section's <header> element (eyebrow +
    // heading) so the visible content lands predictably — bypasses the
    // section's outer py-24 padding. Falls back to the target itself
    // (e.g. #hero, which has no inner <header>).
    const sectionHeader = el.querySelector<HTMLElement>(
      ':scope > div > header',
    )
    const scrollTarget = sectionHeader ?? el

    lenis.scrollTo(scrollTarget, {
      offset: -computeAnchorOffset(),
      duration: 0.9,
    })

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
