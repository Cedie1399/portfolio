import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Editorial background: dot grid + diagonal blueprint lines + a soft emerald
// spotlight that follows the cursor. Replaces the 3D polyhedron scene.
export function HeroBackground() {
  const spotRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    let frame = 0
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 3

    const onMove = (event: MouseEvent) => {
      mx = event.clientX
      my = event.clientY
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const el = spotRef.current
        if (!el) return
        el.style.background = `radial-gradient(700px circle at ${mx}px ${my}px, rgba(52,211,153,0.10), transparent 55%)`
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(139,148,158,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Diagonal blueprint lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="hero-diag"
            patternUnits="userSpaceOnUse"
            width="180"
            height="180"
            patternTransform="rotate(-12)"
          >
            <path
              d="M0 0 L0 180"
              stroke="#1f2632"
              strokeWidth="1"
              strokeOpacity="0.7"
            />
            <path
              d="M60 0 L60 180"
              stroke="#1f2632"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-diag)" />
      </svg>

      {/* Corner registration marks (magazine-style) */}
      <CornerMark className="left-6 top-6" />
      <CornerMark className="right-6 top-6" rotate={90} />
      <CornerMark className="left-6 bottom-24" rotate={-90} />
      <CornerMark className="right-6 bottom-24" rotate={180} />

      {/* Cursor spotlight (initial center wash even without cursor) */}
      <div
        ref={spotRef}
        className="absolute inset-0 transition-[background] duration-100"
        style={{
          background:
            'radial-gradient(700px circle at 50% 30%, rgba(52,211,153,0.06), transparent 55%)',
        }}
      />

      {/* Center vignette to keep type readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(7,10,15,0.55) 0%, rgba(7,10,15,0) 70%)',
        }}
      />

      {/* Bottom fade to canvas */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            'linear-gradient(to bottom, rgba(7,10,15,0) 0%, #070a0f 100%)',
        }}
      />
    </div>
  )
}

function CornerMark({
  className,
  rotate = 0,
}: {
  className: string
  rotate?: number
}) {
  return (
    <svg
      className={`absolute h-6 w-6 text-accent/60 ${className}`}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M2 2 L10 2 M2 2 L2 10"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}
