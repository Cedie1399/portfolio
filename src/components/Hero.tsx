import { lazy, Suspense, useEffect, useState } from 'react'
import { profile } from '@/data/portfolioData'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const HeroScene = lazy(() => import('@/scene/HeroScene'))

type IdleWindow = Window & {
  requestIdleCallback?: (
    cb: () => void,
    opts?: { timeout: number },
  ) => number
  cancelIdleCallback?: (handle: number) => void
}

function scheduleIdle(cb: () => void): () => void {
  const win = window as IdleWindow
  if (win.requestIdleCallback) {
    const handle = win.requestIdleCallback(cb, { timeout: 2000 })
    return () => win.cancelIdleCallback?.(handle)
  }
  const handle = window.setTimeout(cb, 1500)
  return () => window.clearTimeout(handle)
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const [load3D, setLoad3D] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    return scheduleIdle(() => setLoad3D(true))
  }, [reducedMotion])

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {!reducedMotion && load3D && (
        <div aria-hidden="true" className="absolute inset-0">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(7,10,15,0.65) 0%, rgba(7,10,15,0) 70%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            'linear-gradient(to bottom, rgba(7,10,15,0) 0%, #070a0f 100%)',
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.25em] text-muted">
          {profile.role}
        </p>
        <h1 className="mb-6 max-w-3xl font-display text-5xl font-semibold leading-tight text-fg md:text-7xl">
          {profile.name}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {profile.tagline}
        </p>
        <div className="mt-12 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-subtle">
          <span className="h-px w-8 bg-subtle/40" />
          Scroll
        </div>
      </div>
    </section>
  )
}
