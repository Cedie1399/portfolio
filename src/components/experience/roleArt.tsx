// Thematic SVG illustrations for each career chapter. Each scales to its
// container.

const FRAME = {
  className: 'h-full w-full',
  preserveAspectRatio: 'xMidYMid meet' as const,
  'aria-hidden': true,
}

export function SdeArt() {
  return (
    <svg viewBox="0 0 360 240" {...FRAME}>
      <defs>
        <linearGradient id="sde-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f1419" />
          <stop offset="100%" stopColor="#070a0f" />
        </linearGradient>
      </defs>

      <rect width="360" height="240" fill="url(#sde-bg)" />

      {/* faint grid */}
      <g stroke="#1f2632" strokeOpacity="0.4" strokeWidth="0.5">
        {[60, 120, 180].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} />
        ))}
      </g>

      {/* core service node */}
      <g>
        <rect
          x="140"
          y="100"
          width="80"
          height="40"
          rx="6"
          fill="#0b0f14"
          stroke="#34d399"
          strokeWidth="1.4"
        />
        <text
          x="180"
          y="118"
          textAnchor="middle"
          fill="#34d399"
          fontFamily="ui-monospace"
          fontSize="10"
          fontWeight="600"
        >
          api
        </text>
        <text
          x="180"
          y="130"
          textAnchor="middle"
          fill="#8b949e"
          fontFamily="ui-monospace"
          fontSize="8"
        >
          spring boot
        </text>
      </g>

      {/* peripheral services */}
      <Service x={30} y={40} label="auth" />
      <Service x={250} y={40} label="payments" sub="stripe" accent />
      <Service x={30} y={170} label="storage" sub="s3" />
      <Service x={250} y={170} label="email" sub="ses" />
      <Service x={140} y={20} label="react" small />
      <Service x={140} y={195} label="postgres" accent small />

      {/* connecting lines */}
      <g
        stroke="#34d399"
        strokeOpacity="0.5"
        strokeWidth="1"
        fill="none"
      >
        <path d="M82 60 L142 110" />
        <path d="M248 60 L218 110" />
        <path d="M82 190 L142 130" />
        <path d="M248 190 L218 130" />
        <path d="M180 40 L180 100" />
        <path d="M180 140 L180 195" />
      </g>
    </svg>
  )
}

function Service({
  x,
  y,
  label,
  sub,
  accent = false,
  small = false,
}: {
  x: number
  y: number
  label: string
  sub?: string
  accent?: boolean
  small?: boolean
}) {
  const w = small ? 48 : 60
  const h = small ? 24 : 32
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill="#0f1419"
        stroke={accent ? '#34d399' : '#3a4658'}
        strokeWidth="1"
      />
      <text
        x={x + w / 2}
        y={y + (small ? 16 : 14)}
        textAnchor="middle"
        fill={accent ? '#34d399' : '#e6edf3'}
        fontFamily="ui-monospace"
        fontSize={small ? 8 : 9}
        fontWeight="600"
      >
        {label}
      </text>
      {sub && !small && (
        <text
          x={x + w / 2}
          y={y + 26}
          textAnchor="middle"
          fill="#8b949e"
          fontFamily="ui-monospace"
          fontSize="7"
        >
          {sub}
        </text>
      )}
    </g>
  )
}

export function WebDevArt() {
  return (
    <svg viewBox="0 0 360 240" {...FRAME}>
      <defs>
        <linearGradient id="wd-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f1419" />
          <stop offset="100%" stopColor="#070a0f" />
        </linearGradient>
      </defs>

      <rect width="360" height="240" fill="url(#wd-bg)" />

      {/* faint scanlines */}
      <g stroke="#1f2632" strokeOpacity="0.35" strokeWidth="0.5">
        {[40, 100, 160, 200].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} />
        ))}
      </g>

      {/* desktop window */}
      <BrowserWindow
        x={40}
        y={36}
        width={200}
        height={140}
        rotate={-3}
        accent
      />
      {/* tablet */}
      <BrowserWindow x={210} y={70} width={100} height={120} rotate={4} />
      {/* mobile */}
      <BrowserWindow x={280} y={100} width={50} height={90} rotate={-2} />

      {/* heartbeat / uptime line */}
      <polyline
        points="20,210 80,210 95,196 110,222 125,200 220,200 235,215 250,200 340,200"
        fill="none"
        stroke="#34d399"
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text
        x="20"
        y="228"
        fill="#34d399"
        fontFamily="ui-monospace"
        fontSize="8"
      >
        99% uptime · 25% faster
      </text>
    </svg>
  )
}

function BrowserWindow({
  x,
  y,
  width,
  height,
  rotate,
  accent = false,
}: {
  x: number
  y: number
  width: number
  height: number
  rotate: number
  accent?: boolean
}) {
  const cx = x + width / 2
  const cy = y + height / 2
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="4"
        fill="#0b0f14"
        stroke={accent ? '#34d399' : '#3a4658'}
        strokeWidth="1.2"
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={12}
        rx="4"
        fill="#161b22"
      />
      {/* dots */}
      <circle cx={x + 6} cy={y + 6} r="1.5" fill="#ff5f57" />
      <circle cx={x + 12} cy={y + 6} r="1.5" fill="#febc2e" />
      <circle cx={x + 18} cy={y + 6} r="1.5" fill="#28c840" />
      {/* faux content */}
      <rect
        x={x + 8}
        y={y + 22}
        width={width * 0.7}
        height="3"
        fill={accent ? '#34d399' : '#3a4658'}
        opacity="0.7"
      />
      {[34, 42, 50, 58].map((dy) => (
        <rect
          key={dy}
          x={x + 8}
          y={y + dy}
          width={width * 0.85}
          height="2"
          fill="#3a4658"
          opacity="0.5"
        />
      ))}
      <rect
        x={x + 8}
        y={y + height - 14}
        width={width * 0.35}
        height="6"
        rx="1"
        fill={accent ? '#34d399' : '#3a4658'}
        opacity="0.6"
      />
    </g>
  )
}

export function BootcampArt() {
  return (
    <svg viewBox="0 0 360 240" {...FRAME}>
      <defs>
        <linearGradient id="bc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f1419" />
          <stop offset="100%" stopColor="#070a0f" />
        </linearGradient>
      </defs>

      <rect width="360" height="240" fill="url(#bc-bg)" />

      {/* terminal "code stream" */}
      <g
        fontFamily="ui-monospace"
        fontSize="9"
        fill="#3a4658"
        opacity="0.7"
      >
        <text x="20" y="36">$ git init</text>
        <text x="20" y="52">$ npm install</text>
        <text x="20" y="68">
          <tspan fill="#34d399">→</tspan> learn html · css · js
        </text>
        <text x="20" y="84">$ build first project</text>
        <text x="20" y="100">$ deploy</text>
      </g>

      {/* stack of skill cards */}
      <SkillCard x={150} y={60} label="HTML" rotate={-6} />
      <SkillCard x={170} y={80} label="CSS" rotate={3} />
      <SkillCard x={190} y={100} label="JS" rotate={-2} accent />
      <SkillCard x={210} y={120} label="REACT" rotate={5} />

      {/* graduation cap */}
      <g transform="translate(290 90)">
        <path
          d="M -30 0 L 0 -14 L 30 0 L 0 14 Z"
          fill="#0b0f14"
          stroke="#34d399"
          strokeWidth="1.2"
        />
        <path
          d="M -16 6 L -16 22 C -16 28, 16 28, 16 22 L 16 6"
          fill="none"
          stroke="#34d399"
          strokeOpacity="0.6"
          strokeWidth="1.2"
        />
        <line
          x1="28"
          y1="0"
          x2="32"
          y2="20"
          stroke="#34d399"
          strokeWidth="1.2"
        />
        <circle cx="32" cy="22" r="2" fill="#34d399" />
      </g>

      {/* progress line */}
      <g>
        <rect x="20" y="200" width="320" height="3" rx="1" fill="#1f2632" />
        <rect
          x="20"
          y="200"
          width="260"
          height="3"
          rx="1"
          fill="#34d399"
          opacity="0.8"
        />
        <text
          x="20"
          y="218"
          fill="#34d399"
          fontFamily="ui-monospace"
          fontSize="8"
        >
          foundations · ready to ship
        </text>
      </g>
    </svg>
  )
}

function SkillCard({
  x,
  y,
  label,
  rotate,
  accent = false,
}: {
  x: number
  y: number
  label: string
  rotate: number
  accent?: boolean
}) {
  const w = 60
  const h = 32
  const cx = x + w / 2
  const cy = y + h / 2
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill={accent ? '#0f1419' : '#0b0f14'}
        stroke={accent ? '#34d399' : '#3a4658'}
        strokeWidth="1.2"
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fill={accent ? '#34d399' : '#e6edf3'}
        fontFamily="ui-monospace"
        fontSize="10"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  )
}
