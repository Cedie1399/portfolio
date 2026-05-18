import { useLayoutEffect, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#:;'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

type Props = {
  text: string
  className?: string
}

export function TextScramble({ text, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia(REDUCED_MOTION).matches) {
      el.textContent = text
      return
    }

    const targets = Array.from(text)
    const revealAt = targets.map(
      (_, i) => 14 + Math.floor(i * 1.8) + Math.floor(Math.random() * 18),
    )
    const totalFrames = Math.max(...revealAt) + 2

    let frame = 0
    let cancelled = false
    let rafId = 0

    const randChar = () =>
      CHARS[Math.floor(Math.random() * CHARS.length)] ?? '?'

    const tick = () => {
      if (cancelled) return

      let str = ''
      for (let i = 0; i < targets.length; i++) {
        if (frame >= (revealAt[i] ?? 0)) {
          str += targets[i]
        } else if (targets[i] === ' ') {
          str += ' '
        } else {
          str += randChar()
        }
      }

      el.textContent = str

      if (frame >= totalFrames) return
      frame++
      rafId = requestAnimationFrame(tick)
    }

    // Sync initial scrambled state so first paint isn't the raw text
    el.textContent = targets
      .map((c) => (c === ' ' ? ' ' : randChar()))
      .join('')

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [text])

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  )
}
