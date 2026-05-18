import type { ReactElement, SVGProps } from 'react'
import {
  AwsIcon,
  GitHubIcon,
  NextJsIcon,
  ReactIcon,
  TypeScriptIcon,
} from '@/components/hero/icons'
import {
  DockerIcon,
  JavaIcon,
  PostgresIcon,
  SpringIcon,
} from '@/components/hero/icons'
import {
  MySqlIcon,
  TailwindIcon,
} from '@/components/projects/icons'

type IconProps = SVGProps<SVGSVGElement>
export type IconComp = (props: IconProps) => ReactElement

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
} satisfies Partial<SVGProps<SVGSVGElement>>

export function ViteIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 2 4 13h6l-2 9 12-14h-6l2-6Z" />
    </svg>
  )
}

export function ThreeJsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 3 19h18L12 3Z" />
      <path d="M12 3v16" />
      <path d="M3 19l9-8 9 8" />
    </svg>
  )
}

export function VercelIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3 22 20H2L12 3Z" />
    </svg>
  )
}

export function LinuxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* simplified penguin: head + body + feet */}
      <ellipse cx="12" cy="10" rx="4" ry="5" />
      <circle cx="10.5" cy="9" r="0.7" fill="currentColor" />
      <circle cx="13.5" cy="9" r="0.7" fill="currentColor" />
      <path d="M11 11.5c.5.4 1.5.4 2 0" />
      <path d="M8 14c-1 2-2 4-2 6h12c0-2-1-4-2-6" />
      <path d="M9 20l-1 1M15 20l1 1" />
    </svg>
  )
}

export function NginxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19V5l8 14V5l8 14V5" />
    </svg>
  )
}

export function GitLabIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 21-9-7 2-7 2 5h10l2-5 2 7-9 7Z" />
      <path d="M7 12h10" />
    </svg>
  )
}

export const SKILL_ICONS: Record<string, IconComp> = {
  // Frontend
  React: ReactIcon,
  'Next.js': NextJsIcon,
  TypeScript: TypeScriptIcon,
  'Tailwind CSS': TailwindIcon,
  Vite: ViteIcon,
  'React Three Fiber': ThreeJsIcon,
  'Three.js': ThreeJsIcon,
  // Backend
  Java: JavaIcon,
  'Spring Boot': SpringIcon,
  PostgreSQL: PostgresIcon,
  MySQL: MySqlIcon,
  // Infrastructure
  Docker: DockerIcon,
  Vercel: VercelIcon,
  AWS: AwsIcon,
  Linux: LinuxIcon,
  Nginx: NginxIcon,
  GitHub: GitHubIcon,
  GitLab: GitLabIcon,
}
