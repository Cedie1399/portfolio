export type CaseStudyFeature = {
  title: string
  description: string
}

export type CaseStudy = {
  problem: string
  approach: string[]
  outcomes: string[]
  features: CaseStudyFeature[]
}

export type Project = {
  id: string
  title: string
  summary: string
  description: string
  tech: string[]
  highlights: string[]
  links?: { label: string; href: string }[]
  caseStudy?: CaseStudy
}

export type Experience = {
  id: string
  company: string
  role: string
  period: string
  highlights: string[]
}

export type SkillCategory = {
  category: 'Frontend' | 'Backend' | 'Infrastructure'
  items: string[]
}

export type Education = {
  id: string
  school: string
  degree: string
  period: string
  details?: string
}

export const profile = {
  name: 'Cyrus Daniel Santos',
  initials: 'CDS',
  role: 'Software Development Engineer',
  location: 'Manila, PH',
  status: 'Open to opportunities',
  currentlyBuilding: 'AirEvent Gala @ Solutions Resource Inc',
  tagline:
    'Full-stack engineer growing into systems work — multi-tenant SaaS, manufacturing platforms, and interactive web experiences.',
  about:
    'Growing from full-stack web development into a Software Development Engineer with a focus on schema design, state-machine modeling, and production deployment.',
}

export const experiences: Experience[] = [
  {
    id: 'sri-sde',
    company: 'Solutions Resource Inc',
    role: 'Software Development Engineer',
    period: 'Sep 2025 — Present',
    highlights: [
      'Engineering across the AirEvent Gala stack — a virtual event management platform spanning events, exhibitor booths, virtual rooms, meeting scheduling, payments, and reporting.',
      'Working in a layered Spring Boot 2.7 + PostgreSQL backend (JWT auth, JPA/Hibernate, Specification pattern, event-driven email notifications) with a React frontend on top.',
      'Integrating third-party systems — Stripe (payments), AWS (S3 + SES), Twilio (SMS), and GoHighLevel (CRM) — into a single, coherent API surface.',
    ],
  },
  {
    id: 'sri-web-developer',
    company: 'Solutions Resource Inc',
    role: 'Web Developer',
    period: 'Aug 2019 — Aug 2022',
    highlights: [
      'Maintained, updated, and developed new pages to enhance speed and usability, resulting in a 25% improvement in page load times and a more engaging user experience.',
      'Proactively managed and maintained a portfolio of websites, achieving 99% uptime and ensuring consistent performance across diverse platforms.',
      'Designed and built bespoke WordPress websites from scratch — delivering solutions that met both functional and aesthetic client requirements.',
    ],
  },
  {
    id: 'sri-bootcamp',
    company: 'Solutions Resource Inc',
    role: 'Full Stack Development Bootcamp',
    period: 'Jun 2019 — Aug 2019',
    highlights: [
      'Designed mockup layouts with a focus on UX and visual consistency, refining them with stakeholder feedback before development.',
      'Picked up multiple web development languages and tools across the program, building a foundation that translated directly into client-facing work.',
    ],
  },
]

export const education: Education[] = [
  {
    id: 'dlsau-bs-cs',
    school: 'De La Salle Araneta University',
    degree: 'Bachelor of Science in Computer Science',
    period: 'Sep 2022 — Sep 2026',
    details:
      'Completed in parallel with returning to SRI in Sep 2025 as an SDE. Thesis: Petmania (see Selected Work).',
  },
]

export const projects: Project[] = [
  {
    id: 'airevent',
    title: 'AirEvent Gala',
    summary:
      'Virtual event platform — events, exhibitor booths, virtual rooms, meeting scheduling, payments, and reporting.',
    description:
      'AirEvent Gala is a virtual event management platform powering online gala events end-to-end. It coordinates events, exhibitor booths, virtual rooms, meeting scheduling, payment processing, and reporting across attendees, organizers, partners, and agencies on a single Spring Boot + React stack.',
    tech: [
      'Java 11',
      'Spring Boot 2.7',
      'PostgreSQL',
      'React',
      'JWT',
      'JPA / Hibernate',
      'Stripe',
      'AWS (S3, SES)',
      'Twilio',
    ],
    highlights: [
      'Layered Controller / Service / Repository architecture with JPA Specifications and MapStruct DTO mapping.',
      'JWT-based stateless auth with role-based access control across attendee, organizer, exhibitor, and partner roles.',
      'Event-driven email pipeline for invitations and onboarding via Spring Events.',
    ],
    caseStudy: {
      problem:
        'Virtual gala events require many systems cooperating across roles — attendees, organizers, exhibitors, partners, and agencies. Building each piece in isolation is easy; getting them to behave as one coherent platform is the hard part, and a missed integration point becomes a missed event.',
      approach: [
        'Strict layered architecture (Controller → Service → Repository → Entity) so each concern stays in its own layer and tests stay local.',
        'JWT-based stateless auth with role-based access control for the different participant roles, plus OTP-driven password reset.',
        'Event-driven email notifications via Spring Events — invitations, booth-manager onboarding, partner outreach — decoupled from the request path.',
        'JPA Specification pattern for dynamic filtering and projections for read-heavy endpoints; MapStruct for boilerplate-free DTO mapping.',
        'Third-party integration as first-class concerns: Stripe (payments), AWS S3 + SES (storage + transactional email), Twilio (SMS), GoHighLevel (CRM).',
      ],
      outcomes: [
        'Coherent platform powering virtual gala events across multiple participant roles.',
        'Swagger-documented REST API covering events, rooms, booths, payments, meetings, and reporting.',
        'Multi-tenant data model with isolation between organizations, partnerships, and agencies.',
      ],
      features: [
        {
          title: 'Virtual rooms & booths',
          description:
            'Customizable rooms and exhibitor booths with styling, assets, and role-scoped access.',
        },
        {
          title: 'Payment processing',
          description:
            'Stripe integration with payment intents, payment history, and subscription support.',
        },
        {
          title: 'Meeting scheduler',
          description:
            'Virtual meeting scheduling with participant management and email notifications.',
        },
        {
          title: 'Reporting & analytics',
          description:
            'Event analytics, user activity reports, and Excel exports via Apache POI.',
        },
      ],
    },
  },
  {
    id: 'petmania',
    title: 'Petmania',
    summary:
      'Online vet clinic — appointments, pet medical records, inventory, invoicing, and Semaphore SMS notifications.',
    description:
      'Petmania is a full-stack online veterinary clinic platform, built as a university thesis. It handles clinic appointments, pet medical records, clinic-side inventory and invoicing, and reaches owners over SMS via Semaphore — chosen specifically so the notification layer holds up under intermittent connectivity.',
    tech: [
      'React 19',
      'React Router 7',
      'TypeScript',
      'Tailwind CSS v4',
      'shadcn / Radix UI',
      'Spring Boot 4',
      'Java 21',
      'MySQL',
      'Semaphore SMS',
    ],
    highlights: [
      'Designed the full data model: users, pets, medical records, appointments, inventory, invoices, notifications.',
      'Integrated Semaphore SMS for appointment reminders and clinic notifications.',
      'Owned the deployment end-to-end on a self-managed server.',
    ],
    caseStudy: {
      problem:
        'Veterinary appointment coordination, medical-record keeping, and clinic-side inventory typically live in separate tools — leaving owners to chase information across channels. Reach also had to survive intermittent connectivity, so SMS could not be an afterthought layered on later.',
      approach: [
        'Built the data model as one coherent system across users, pets, medical records, appointments, inventory, and invoicing — keeping write paths simple and read paths fast.',
        'Used React Router 7 with shadcn/Radix UI for a clinic-facing interface that stays consistent across pages.',
        'Integrated Semaphore SMS as a first-class notification channel for appointment reminders and clinic updates.',
        'Owned deployment end-to-end on a self-managed server — process supervision and reverse proxy configured by hand.',
      ],
      outcomes: [
        'Working production system delivered as the thesis artifact.',
        'Full lifecycle ownership demonstrated — architecture through to operations.',
        'SMS layer remained reliable under intermittent connectivity.',
      ],
      features: [
        {
          title: 'Appointment + medical records',
          description:
            'Linked appointments and pet medical records so clinic history is reachable from any patient view.',
        },
        {
          title: 'Inventory + invoicing',
          description:
            'Clinic-side inventory tied to invoices so billing reflects what was actually used.',
        },
        {
          title: 'Semaphore SMS',
          description:
            'Real-time SMS alerts for appointment reminders and clinic updates with retry handling.',
        },
        {
          title: 'Self-managed deployment',
          description:
            'Configured the server, process manager, and reverse proxy by hand — no PaaS.',
        },
      ],
    },
  },
  {
    id: 'fabrication-shop',
    title: 'Motorcycle Accessories Fabrication System',
    summary:
      'Custom shop management for a motorcycle accessories fabricator — orders, BoMs, production tracking, and inventory.',
    description:
      'A custom web application for a motorcycle accessories fabrication business. The system manages orders end-to-end, tracks manufacturing time per job, controls raw and finished inventory, and ties Bill of Materials transitions to production-stage events — so every part on the floor is accounted for at every step.',
    tech: [
      'Next.js (App Router)',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Spring Boot 4',
      'Java 17',
      'PostgreSQL',
      'Docker',
    ],
    highlights: [
      'Bill of Materials transitions modeled as explicit state machines tied to production-stage events.',
      'Order lifecycle tracked via OrderStatusEvent records for audit and reconciliation.',
      'Manufacturing log captures per-job production time for cost and throughput analysis.',
    ],
    caseStudy: {
      problem:
        'Custom-fab production needs exact accounting of parts and time at every stage. Raw materials must be deducted at the right moment, BoMs must transition cleanly between states, and any drift surfaces as untraceable shrinkage and unreliable cost estimates on the shop floor.',
      approach: [
        'Modeled Bill of Materials transitions as explicit state machines — no implicit "in-between" states that can be reached by accident.',
        'Captured order lifecycle as `OrderStatusEvent` records, so the moment of every state change is auditable rather than inferred.',
        'Split inventory into raw materials and finished products with a `ManufacturingLog` bridging the two — production time is tracked per job, not estimated after the fact.',
        'Designed the schema with a `tenant_id` default so the same product could be turned into a SaaS for other shops without re-architecting.',
      ],
      outcomes: [
        'Inventory stays reconcilable across stages — drift becomes a recoverable event, not a silent failure.',
        'Order and production state transitions auditable end-to-end.',
        'Foundation in place for multi-tenant deployment to other fabrication businesses.',
      ],
      features: [
        {
          title: 'BoM state machine',
          description:
            'Explicit states with named transitions — no hidden midpoint states.',
        },
        {
          title: 'Inventory: raw + finished',
          description:
            'Separate tracking for materials and products with deductions driven by production-stage events.',
        },
        {
          title: 'Manufacturing log',
          description:
            'Per-job production time records that feed cost and throughput reporting.',
        },
        {
          title: 'Multi-tenant ready',
          description:
            'Tenant-scoped schema from day one so the system can scale beyond a single shop.',
        },
      ],
    },
  },
]

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
      'React Three Fiber',
      'Three.js',
    ],
  },
  {
    category: 'Backend',
    items: ['Java', 'Spring Boot', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'Infrastructure',
    items: ['Docker', 'Vercel', 'AWS', 'Linux', 'Nginx', 'GitHub', 'GitLab'],
  },
]

export const contact = {
  email: 'cediesky@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Cedie1399' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/cyrusdanielsantos/',
    },
  ],
}
