import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react'
import type { Project } from '@/data/portfolioData'

type Props = {
  project: Project | null
  onClose: () => void
}

export default function CaseStudyDialog({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const lastProjectRef = useRef<Project | null>(null)

  if (project) {
    lastProjectRef.current = project
  }
  const rendered = project ?? lastProjectRef.current
  const cs = rendered?.caseStudy

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="case-study-title"
      className="case-study-dialog m-0 ml-auto h-screen max-h-screen w-full max-w-full border-l border-border bg-canvas p-0 text-fg md:max-w-2xl"
    >
      {rendered && cs && (
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-border/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                Case Study
              </p>
              <span className="hidden text-[10px] uppercase tracking-[0.22em] text-subtle sm:inline">
                · Esc to close
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted transition-colors hover:border-fg/40 hover:text-fg"
            >
              <span aria-hidden="true" className="text-base leading-none">
                ✕
              </span>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-10">
            <h2
              id="case-study-title"
              className="font-display text-3xl font-semibold leading-tight text-fg md:text-4xl"
            >
              {rendered.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {rendered.description}
            </p>

            <Section title="Problem">
              <p>{cs.problem}</p>
            </Section>

            <Section title="Approach">
              <ul className="space-y-2.5">
                {cs.approach.map((item, i) => (
                  <Bullet key={i}>{item}</Bullet>
                ))}
              </ul>
            </Section>

            <Section title="Outcomes">
              <ul className="space-y-2.5">
                {cs.outcomes.map((item, i) => (
                  <Bullet key={i}>{item}</Bullet>
                ))}
              </ul>
            </Section>

            <Section title="Key Features">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cs.features.map((feature, i) => (
                  <article
                    key={i}
                    className="rounded-xl border border-border bg-elevated/40 p-4"
                  >
                    <h4 className="font-display text-sm font-semibold text-fg">
                      {feature.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </Section>
          </div>
        </div>
      )}
    </dialog>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="mt-10">
      <h3 className="mb-4 text-[10px] uppercase tracking-[0.22em] text-muted">
        {title}
      </h3>
      <div className="text-sm leading-relaxed text-fg/85">{children}</div>
    </section>
  )
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent/60">
      {children}
    </li>
  )
}
