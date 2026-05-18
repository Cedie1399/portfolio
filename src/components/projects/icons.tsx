import type { ReactElement, SVGProps } from 'react'
import {
  AwsIcon,
  DockerIcon,
  JavaIcon,
  NextJsIcon,
  PostgresIcon,
  ReactIcon,
  SpringIcon,
  TypeScriptIcon,
} from '@/components/hero/icons'

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

export function MySqlIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M4 5v13c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M9 9c1.5 2 4 4 7 5" />
      <path d="M14.5 14.5c.6.4 1 1 1 1.5" />
    </svg>
  )
}

export function TailwindIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 10c1.5-3 3.5-4.5 6-4.5s3.5 1 4.5 2 1.5 1.5 3 1.5c-1.5 3-3.5 4.5-6 4.5s-3.5-1-4.5-2-1.5-1.5-3-1.5Z" />
      <path d="M2 16c1.5-3 3.5-4.5 6-4.5s3.5 1 4.5 2 1.5 1.5 3 1.5c-1.5 3-3.5 4.5-6 4.5s-3.5-1-4.5-2S3.5 16 2 16Z" />
    </svg>
  )
}

export function StripeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 15c.5.6 1.5 1 2.5 1 1.4 0 2.5-.6 2.5-1.5S12 13 11 12.7c-1.2-.3-2.5-.7-2.5-1.7S9.4 9.5 10.5 9.5c.9 0 1.7.3 2.2.8" />
    </svg>
  )
}

export const TECH_ROLES: Record<string, string> = {
  React: 'Frontend framework',
  TypeScript: 'Frontend language',
  'Next.js': 'App framework',
  Java: 'Backend runtime',
  'Spring Boot': 'API framework',
  PostgreSQL: 'Primary database',
  MySQL: 'Primary database',
  Tailwind: 'UI styling',
  Docker: 'Containerization',
  AWS: 'Storage · email',
  Stripe: 'Payments',
}

export const TECH_ICONS: Record<string, IconComp> = {
  React: ReactIcon,
  TypeScript: TypeScriptIcon,
  'Next.js': NextJsIcon,
  Java: JavaIcon,
  'Spring Boot': SpringIcon,
  PostgreSQL: PostgresIcon,
  MySQL: MySqlIcon,
  Tailwind: TailwindIcon,
  Docker: DockerIcon,
  AWS: AwsIcon,
  Stripe: StripeIcon,
}
