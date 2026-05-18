import { useState } from 'react'
import { useGsapSection } from '@/hooks/useGsapSection'
import { experiences } from '@/data/portfolioData'
import {
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
} from '@/components/about/icons'
import { CareerArc } from '@/components/experience/CareerArc'
import { Chapter, type ChapterEntry } from '@/components/experience/Chapter'
import {
  BootcampArt,
  SdeArt,
  WebDevArt,
} from '@/components/experience/roleArt'

// Chapter entries — assembled from data + per-chapter narrative metadata.
// Order: newest first (index 0 = current role).
const CHAPTERS: ChapterEntry[] = experiences.map((exp) => {
  switch (exp.id) {
    case 'sri-sde':
      return {
        key: exp.id,
        exp,
        Icon: CodeIcon,
        Art: SdeArt,
        pullQuote:
          'Engineering across the AirEvent Gala stack — events, exhibitor booths, payments, and reporting on a single Spring Boot + React platform.',
        stats: [
          { value: 9, label: 'Platform modules' },
          { value: 4, label: 'Third-party integrations' },
          { value: 1, suffix: '+', label: 'Year on team' },
        ],
        tech: [
          'Java',
          'Spring Boot',
          'PostgreSQL',
          'React',
          'AWS',
          'Stripe',
        ],
      }
    case 'sri-web-developer':
      return {
        key: exp.id,
        exp,
        Icon: BriefcaseIcon,
        Art: WebDevArt,
        pullQuote:
          'Maintained and shipped new pages across a portfolio of sites — a 25% improvement in page load times and 99% uptime.',
        stats: [
          { value: 3, label: 'Years tenure' },
          { value: 25, suffix: '%', label: 'Faster page loads' },
          { value: 99, suffix: '%', label: 'Uptime delivered' },
        ],
        tech: ['WordPress', 'JavaScript', 'PHP', 'HTML/CSS'],
      }
    case 'sri-bootcamp':
      return {
        key: exp.id,
        exp,
        Icon: GraduationCapIcon,
        Art: BootcampArt,
        pullQuote:
          'Picked up multiple web development languages and tools — building the foundation that translated directly into client-facing work.',
        stats: [
          { value: 3, label: 'Month program' },
          { value: 1, label: 'Foundation laid' },
          { value: 0, label: 'Looking back' },
        ],
        tech: ['Full-stack foundations'],
      }
    default:
      return {
        key: exp.id,
        exp,
        Icon: BriefcaseIcon,
        Art: SdeArt,
        pullQuote: exp.highlights[0] ?? '',
        stats: [],
        tech: [],
      }
  }
})

export default function Experience() {
  const sectionRef = useGsapSection<HTMLElement>()
  const [activeKey, setActiveKey] = useState<string>(
    CHAPTERS[0]?.key ?? '',
  )

  const activeIndex = Math.max(
    0,
    CHAPTERS.findIndex((c) => c.key === activeKey),
  )
  const active = CHAPTERS[activeIndex]

  const goPrev = () => {
    const prev = CHAPTERS[activeIndex - 1]
    if (prev) setActiveKey(prev.key)
  }
  const goNext = () => {
    const next = CHAPTERS[activeIndex + 1]
    if (next) setActiveKey(next.key)
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <PageHeader />

        <div className="mt-10 space-y-8">
          <CareerArc
            chapters={CHAPTERS.map((c) => ({
              key: c.key,
              year: yearOf(c.exp.period),
              marker: markerOf(c.exp.period),
              shortLabel: c.exp.role.split(' ').slice(0, 2).join(' '),
              Icon: c.Icon,
            }))}
            activeKey={activeKey}
            onSelect={setActiveKey}
          />

          {active && (
            <Chapter
              entry={active}
              index={activeIndex}
              total={CHAPTERS.length}
              onPrev={activeIndex > 0 ? goPrev : undefined}
              onNext={
                activeIndex < CHAPTERS.length - 1 ? goNext : undefined
              }
            />
          )}
        </div>
      </div>
    </section>
  )
}

function PageHeader() {
  return (
    <header className="border-b border-border/60 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            Page 04 · Experience
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-fg md:text-5xl">
            Where I've built.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Three career chapters at Solutions Resource Inc — start as a
            bootcamp graduate, three years as Web Developer, and a return as
            Software Development Engineer on AirEvent Gala. Click any node on
            the arc to read its chapter.
          </p>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-subtle md:block">
          CV · 3 chapters
        </p>
      </div>
    </header>
  )
}

function yearOf(period: string): string {
  // Extract the start year from strings like "Sep 2025 — Present"
  const m = period.match(/(\d{4})/)
  return m?.[1] ?? ''
}

function markerOf(period: string): string {
  if (/Present/i.test(period)) return 'Now'
  const m = period.match(/(\d{4}).*?(\d{4})/)
  if (m) return `${m[1]}–${m[2].slice(2)}`
  const single = period.match(/(\d{4})/)
  return single?.[1] ?? ''
}
