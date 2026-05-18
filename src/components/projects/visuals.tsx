// Thematic SVG illustrations for project cards. Each visual scales to its
// container via preserveAspectRatio="xMidYMid slice" so it can fill a tall
// header or a square panel without distortion.

const COMMON = {
  className: 'h-full w-full',
  preserveAspectRatio: 'xMidYMid slice' as const,
  'aria-hidden': true,
}

export function AirEventVisual() {
  return (
    <svg viewBox="0 0 320 180" {...COMMON}>
      <defs>
        <linearGradient id="ae-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f1419" />
          <stop offset="100%" stopColor="#070a0f" />
        </linearGradient>
        <radialGradient id="ae-spot" cx="0.5" cy="0" r="0.7">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="180" fill="url(#ae-bg)" />

      {/* spotlight wash */}
      <rect x="80" y="0" width="160" height="120" fill="url(#ae-spot)" />

      {/* stage */}
      <path
        d="M105 70 L215 70 L230 95 L90 95 Z"
        fill="#161b22"
        stroke="#34d399"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      {/* screen */}
      <rect
        x="135"
        y="40"
        width="50"
        height="28"
        rx="2"
        fill="#1f2632"
        stroke="#34d399"
        strokeWidth="1"
        strokeOpacity="0.6"
      />
      <line
        x1="143"
        y1="49"
        x2="177"
        y2="49"
        stroke="#34d399"
        strokeOpacity="0.5"
      />
      <line
        x1="143"
        y1="55"
        x2="170"
        y2="55"
        stroke="#8b949e"
        strokeOpacity="0.5"
      />
      <line
        x1="143"
        y1="61"
        x2="165"
        y2="61"
        stroke="#8b949e"
        strokeOpacity="0.3"
      />

      {/* booth grid */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = 50 + col * 75
        const y = 115 + row * 28
        const active = i === 1
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="60"
              height="20"
              rx="2"
              fill={active ? '#0f1419' : '#0b0f14'}
              stroke={active ? '#34d399' : '#1f2632'}
              strokeWidth="1"
            />
            <circle
              cx={x + 8}
              cy={y + 10}
              r="2"
              fill={active ? '#34d399' : '#3a4658'}
            />
            <line
              x1={x + 16}
              y1={y + 8}
              x2={x + 50}
              y2={y + 8}
              stroke="#3a4658"
              strokeOpacity="0.7"
            />
            <line
              x1={x + 16}
              y1={y + 13}
              x2={x + 42}
              y2={y + 13}
              stroke="#3a4658"
              strokeOpacity="0.4"
            />
          </g>
        )
      })}

      {/* corner accent dots */}
      <circle cx="20" cy="20" r="1.5" fill="#34d399" fillOpacity="0.7" />
      <circle cx="300" cy="20" r="1.5" fill="#34d399" fillOpacity="0.3" />
      <circle cx="20" cy="160" r="1.5" fill="#34d399" fillOpacity="0.3" />
    </svg>
  )
}

export function PetmaniaVisual() {
  return (
    <svg viewBox="0 0 320 180" {...COMMON}>
      <defs>
        <linearGradient id="pm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f1419" />
          <stop offset="100%" stopColor="#070a0f" />
        </linearGradient>
        <radialGradient id="pm-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="180" fill="url(#pm-bg)" />
      <rect x="40" y="10" width="240" height="160" fill="url(#pm-glow)" />

      {/* faint medical grid behind */}
      <g stroke="#1f2632" strokeWidth="0.5" strokeOpacity="0.6">
        <line x1="0" y1="60" x2="320" y2="60" />
        <line x1="0" y1="120" x2="320" y2="120" />
        <line x1="80" y1="0" x2="80" y2="180" />
        <line x1="240" y1="0" x2="240" y2="180" />
      </g>

      {/* paw print (centered) */}
      <g
        transform="translate(160 95)"
        fill="none"
        stroke="#e6edf3"
        strokeOpacity="0.85"
        strokeWidth="2"
      >
        {/* main pad */}
        <ellipse cx="0" cy="22" rx="28" ry="22" fill="#0f1419" />
        {/* toes */}
        <ellipse cx="-28" cy="-8" rx="10" ry="13" fill="#0f1419" />
        <ellipse cx="-10" cy="-22" rx="10" ry="13" fill="#0f1419" />
        <ellipse cx="10" cy="-22" rx="10" ry="13" fill="#0f1419" />
        <ellipse cx="28" cy="-8" rx="10" ry="13" fill="#0f1419" />
      </g>

      {/* medical cross overlay */}
      <g transform="translate(228 50)">
        <rect
          x="-3"
          y="-12"
          width="6"
          height="24"
          rx="1"
          fill="#34d399"
          fillOpacity="0.85"
        />
        <rect
          x="-12"
          y="-3"
          width="24"
          height="6"
          rx="1"
          fill="#34d399"
          fillOpacity="0.85"
        />
      </g>

      {/* signal blips (SMS) */}
      <g fill="#34d399" fillOpacity="0.7">
        <circle cx="60" cy="40" r="2" />
        <circle cx="80" cy="40" r="1.5" fillOpacity="0.5" />
        <circle cx="100" cy="40" r="1" fillOpacity="0.3" />
      </g>

      {/* heartbeat line */}
      <polyline
        points="20,150 60,150 70,140 80,160 90,135 100,150 140,150"
        fill="none"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FabricationVisual() {
  return (
    <svg viewBox="0 0 320 180" {...COMMON}>
      <defs>
        <linearGradient id="fb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f1419" />
          <stop offset="100%" stopColor="#070a0f" />
        </linearGradient>
        <pattern
          id="fb-grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="#1f2632"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
        </pattern>
        <marker
          id="fb-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L8 5 L0 10 Z" fill="#3a4658" />
        </marker>
      </defs>

      <rect width="320" height="180" fill="url(#fb-bg)" />
      <rect width="320" height="180" fill="url(#fb-grid)" />

      {/* state-machine row at bottom */}
      <g stroke="#3a4658" strokeWidth="1" fill="#0f1419">
        <rect x="20" y="145" width="40" height="20" rx="2" />
        <rect x="90" y="145" width="40" height="20" rx="2" />
        <rect x="160" y="145" width="40" height="20" rx="2" />
        <rect
          x="230"
          y="145"
          width="40"
          height="20"
          rx="2"
          stroke="#34d399"
        />
      </g>
      <g stroke="#3a4658" strokeWidth="1" strokeOpacity="0.7" fill="none">
        <path d="M60 155 L90 155" markerEnd="url(#fb-arrow)" />
        <path d="M130 155 L160 155" markerEnd="url(#fb-arrow)" />
        <path d="M200 155 L230 155" markerEnd="url(#fb-arrow)" />
      </g>

      {/* gears */}
      <Gear cx={110} cy={75} r={32} teeth={10} accent />
      <Gear cx={185} cy={95} r={22} teeth={8} />
      <Gear cx={235} cy={55} r={16} teeth={8} />

      {/* spark dots */}
      <g fill="#34d399">
        <circle cx="60" cy="35" r="1.5" fillOpacity="0.7" />
        <circle cx="280" cy="115" r="1.5" fillOpacity="0.5" />
        <circle cx="50" cy="110" r="1" fillOpacity="0.4" />
      </g>
    </svg>
  )
}

function Gear({
  cx,
  cy,
  r,
  teeth,
  accent = false,
}: {
  cx: number
  cy: number
  r: number
  teeth: number
  accent?: boolean
}) {
  const stroke = accent ? '#34d399' : '#8b949e'
  const opacity = accent ? 0.85 : 0.45
  const toothLen = r * 0.22
  const lines = Array.from({ length: teeth }).map((_, i) => {
    const angle = (i / teeth) * Math.PI * 2
    const x1 = cx + Math.cos(angle) * r
    const y1 = cy + Math.sin(angle) * r
    const x2 = cx + Math.cos(angle) * (r + toothLen)
    const y2 = cy + Math.sin(angle) * (r + toothLen)
    return { x1, y1, x2, y2 }
  })
  return (
    <g stroke={stroke} strokeOpacity={opacity} fill="none" strokeWidth="1.5">
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r * 0.35} />
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
      ))}
    </g>
  )
}
