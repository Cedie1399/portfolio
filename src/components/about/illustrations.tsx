// Illustrative SVGs for the three Focus Areas. Each scales to its container
// and uses the slate + emerald palette to match section design.

const FRAME = {
  className: 'h-full w-full',
  preserveAspectRatio: 'xMidYMid meet' as const,
  'aria-hidden': true,
}

export function SchemaIllustration() {
  return (
    <svg viewBox="0 0 360 240" {...FRAME}>
      <defs>
        <linearGradient id="sch-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f1419" />
          <stop offset="100%" stopColor="#0b0f14" />
        </linearGradient>
        <marker
          id="sch-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L8 5 L0 10 Z" fill="#34d399" fillOpacity="0.8" />
        </marker>
      </defs>

      {/* faint grid */}
      <g stroke="#1f2632" strokeOpacity="0.4" strokeWidth="0.5">
        <line x1="0" y1="60" x2="360" y2="60" />
        <line x1="0" y1="120" x2="360" y2="120" />
        <line x1="0" y1="180" x2="360" y2="180" />
      </g>

      {/* users table */}
      <Table x={20} y={36} title="users" rows={['id  uuid', 'email  str', 'name  str']} />
      {/* orders table - center, larger */}
      <Table
        x={150}
        y={70}
        title="orders"
        rows={['id  uuid', 'user_id  fk →', 'status  enum']}
        accent
      />
      {/* line_items */}
      <Table
        x={270}
        y={36}
        title="items"
        rows={['id  uuid', 'order_id  fk →', 'product  str']}
      />
      {/* tenants */}
      <Table
        x={90}
        y={160}
        title="tenants"
        rows={['id  uuid', 'name  str']}
      />

      {/* relations */}
      <g
        stroke="#34d399"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="3 3"
      >
        <path d="M100 76 L150 90" markerEnd="url(#sch-arrow)" />
        <path d="M240 90 L270 76" markerEnd="url(#sch-arrow)" />
        <path d="M120 160 L165 130" markerEnd="url(#sch-arrow)" />
      </g>

      {/* foreign key label */}
      <text
        x="120"
        y="68"
        fill="#34d399"
        fontFamily="ui-monospace"
        fontSize="9"
        opacity="0.8"
      >
        1:N
      </text>
    </svg>
  )
}

function Table({
  x,
  y,
  title,
  rows,
  accent = false,
}: {
  x: number
  y: number
  title: string
  rows: string[]
  accent?: boolean
}) {
  const w = 80
  const headerH = 16
  const rowH = 12
  const h = headerH + rowH * rows.length + 4
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        fill="url(#sch-card)"
        stroke={accent ? '#34d399' : '#3a4658'}
        strokeWidth="1"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={headerH}
        rx="3"
        fill={accent ? '#34d399' : '#1f2632'}
        fillOpacity={accent ? '0.18' : '1'}
      />
      <text
        x={x + 6}
        y={y + 11}
        fill={accent ? '#34d399' : '#e6edf3'}
        fontFamily="ui-monospace"
        fontSize="9"
        fontWeight="600"
      >
        {title}
      </text>
      {rows.map((r, i) => (
        <text
          key={i}
          x={x + 6}
          y={y + headerH + 9 + i * rowH}
          fill="#8b949e"
          fontFamily="ui-monospace"
          fontSize="8"
        >
          {r}
        </text>
      ))}
    </g>
  )
}

export function StateMachineIllustration() {
  return (
    <svg viewBox="0 0 360 240" {...FRAME}>
      <defs>
        <marker
          id="sm-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L8 5 L0 10 Z" fill="#8b949e" />
        </marker>
        <marker
          id="sm-arrow-accent"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L8 5 L0 10 Z" fill="#34d399" />
        </marker>
      </defs>

      {/* faint scan lines */}
      <g stroke="#1f2632" strokeOpacity="0.3" strokeWidth="0.5">
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} />
        ))}
      </g>

      {/* states */}
      <StateNode cx={50} cy={120} label="draft" />
      <StateNode cx={140} cy={70} label="in_prod" accent />
      <StateNode cx={140} cy={170} label="halted" />
      <StateNode cx={240} cy={120} label="ready" accent />
      <StateNode cx={330} cy={120} label="shipped" final />

      {/* transitions */}
      <g fill="none" strokeWidth="1.3">
        <path
          d="M75 110 C100 85, 110 75, 115 70"
          stroke="#34d399"
          strokeOpacity="0.8"
          markerEnd="url(#sm-arrow-accent)"
        />
        <path
          d="M75 130 C100 155, 110 165, 115 170"
          stroke="#8b949e"
          strokeOpacity="0.6"
          markerEnd="url(#sm-arrow)"
        />
        <path
          d="M165 70 C195 70, 215 105, 220 115"
          stroke="#34d399"
          strokeOpacity="0.8"
          markerEnd="url(#sm-arrow-accent)"
        />
        <path
          d="M165 170 C195 170, 215 135, 220 125"
          stroke="#8b949e"
          strokeOpacity="0.6"
          markerEnd="url(#sm-arrow)"
        />
        <path
          d="M265 120 L308 120"
          stroke="#34d399"
          strokeOpacity="0.8"
          markerEnd="url(#sm-arrow-accent)"
        />
      </g>

      {/* transition labels */}
      <g
        fontFamily="ui-monospace"
        fontSize="8"
        fill="#34d399"
        opacity="0.9"
      >
        <text x="78" y="86">start()</text>
        <text x="170" y="92">qa.pass</text>
        <text x="270" y="115">ship</text>
      </g>
    </svg>
  )
}

function StateNode({
  cx,
  cy,
  label,
  accent = false,
  final = false,
}: {
  cx: number
  cy: number
  label: string
  accent?: boolean
  final?: boolean
}) {
  return (
    <g>
      {final && (
        <circle
          cx={cx}
          cy={cy}
          r="22"
          fill="none"
          stroke="#34d399"
          strokeOpacity="0.4"
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r="18"
        fill="#0b0f14"
        stroke={accent || final ? '#34d399' : '#3a4658'}
        strokeWidth="1.2"
      />
      <text
        x={cx}
        y={cy + 3}
        fill={accent || final ? '#34d399' : '#e6edf3'}
        textAnchor="middle"
        fontFamily="ui-monospace"
        fontSize="8"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  )
}

export function ProductionIllustration() {
  return (
    <svg viewBox="0 0 360 240" {...FRAME}>
      <defs>
        <linearGradient id="prod-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#161b22" />
          <stop offset="100%" stopColor="#0b0f14" />
        </linearGradient>
      </defs>

      {/* track line */}
      <line
        x1="40"
        y1="80"
        x2="320"
        y2="80"
        stroke="#34d399"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* pipeline stages */}
      <PipelineStage x={20} y={56} label="commit" sub="git push" />
      <PipelineStage x={100} y={56} label="build" sub="vite" />
      <PipelineStage x={180} y={56} label="deploy" sub="vercel" accent />
      <PipelineStage x={260} y={56} label="live" sub="prod" />

      {/* server / monitoring */}
      <g>
        <rect
          x="40"
          y="140"
          width="280"
          height="70"
          rx="6"
          fill="url(#prod-card)"
          stroke="#3a4658"
        />
        <text
          x="52"
          y="158"
          fill="#8b949e"
          fontFamily="ui-monospace"
          fontSize="9"
          textAnchor="start"
        >
          server · process supervisor · nginx
        </text>
        {/* uptime bars */}
        <g>
          {Array.from({ length: 24 }).map((_, i) => {
            const failing = i === 9 || i === 16
            return (
              <rect
                key={i}
                x={52 + i * 10}
                y={172}
                width="6"
                height="20"
                rx="1"
                fill={failing ? '#3a4658' : '#34d399'}
                fillOpacity={failing ? '0.8' : '0.7'}
              />
            )
          })}
        </g>
        <text
          x="52"
          y="203"
          fill="#34d399"
          fontFamily="ui-monospace"
          fontSize="8"
        >
          99.2% uptime · 24h
        </text>
      </g>

      {/* connecting arrows */}
      <g stroke="#34d399" strokeOpacity="0.6" strokeWidth="1" fill="none">
        <path d="M290 110 C290 130, 280 130, 270 140" />
      </g>
    </svg>
  )
}

function PipelineStage({
  x,
  y,
  label,
  sub,
  accent = false,
}: {
  x: number
  y: number
  label: string
  sub: string
  accent?: boolean
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={60}
        height={48}
        rx="6"
        fill="#0f1419"
        stroke={accent ? '#34d399' : '#3a4658'}
        strokeWidth="1.2"
      />
      <text
        x={x + 30}
        y={y + 22}
        textAnchor="middle"
        fill={accent ? '#34d399' : '#e6edf3'}
        fontFamily="ui-monospace"
        fontSize="10"
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x={x + 30}
        y={y + 36}
        textAnchor="middle"
        fill="#8b949e"
        fontFamily="ui-monospace"
        fontSize="8"
      >
        {sub}
      </text>
    </g>
  )
}
