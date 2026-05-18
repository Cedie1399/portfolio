import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
} satisfies Partial<SVGProps<SVGSVGElement>>

export function DatabaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
    </svg>
  )
}

export function WorkflowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="3" width="6" height="5" rx="1" />
      <rect x="15.5" y="3" width="6" height="5" rx="1" />
      <rect x="9" y="16" width="6" height="5" rx="1" />
      <path d="M5.5 8v3a2 2 0 0 0 2 2h9a2 2 0 0 1 2 2v1" />
      <path d="M12 13v3" />
    </svg>
  )
}

export function RocketIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4c4 0 6 2 6 6-2 0-4 1-5 2l-5 5-3-3 5-5c1-1 2-3 2-5Z" />
      <path d="M9 12 5 16l3 3 4-4" />
      <path d="M5 19c-1 1-1 3-1 3s2 0 3-1" />
      <circle cx="16" cy="8" r="1.2" />
    </svg>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  )
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  )
}

export function ActivityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </svg>
  )
}

export function WrenchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.7 6.3a4 4 0 0 1 5 5l-1.8-1.8a2 2 0 0 0-2.8 0L13.3 11l-2.3-2.3 1.8-1.8a2 2 0 0 0 0-2.8L11 2.3a4 4 0 0 0-5 5l1.8-1.8a2 2 0 0 1 2.8 0l.7.7L4 13.3a2 2 0 0 0 0 2.8l3.9 3.9a2 2 0 0 0 2.8 0l7.3-7.3.7.7a2 2 0 0 1 0 2.8L17 18a4 4 0 0 0 5-5Z" />
    </svg>
  )
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="7" width="19" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M2.5 13c3 1.5 6 2 9.5 2s6.5-.5 9.5-2" />
    </svg>
  )
}

export function GraduationCapIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 10 5-10 5L2 8l10-5Z" />
      <path d="M6 10.5v5c0 2 3 3.5 6 3.5s6-1.5 6-3.5v-5" />
      <path d="M22 8v6" />
    </svg>
  )
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
      <path d="m14 4-4 16" />
    </svg>
  )
}
