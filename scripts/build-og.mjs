import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = resolve(__dirname, '../public/og-image.png')

const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, system-ui, sans-serif'

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="30%" cy="35%" r="90%">
      <stop offset="0%" stop-color="#0f1419"/>
      <stop offset="100%" stop-color="#070a0f"/>
    </radialGradient>
    <linearGradient id="hairline" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Polyhedron motif, right side -->
  <g transform="translate(960, 250)" stroke="#3a4658" stroke-width="2" fill="none" stroke-linejoin="round">
    <path d="M0 -150 L130 -75 L130 75 L0 150 L-130 75 L-130 -75 Z"/>
    <path d="M0 -150 L0 0 L-130 -75"/>
    <path d="M0 0 L130 -75"/>
    <path d="M0 0 L0 150"/>
  </g>

  <!-- Smaller polyhedron, accent -->
  <g transform="translate(820, 460) scale(0.45)" stroke="#3a4658" stroke-width="2.8" fill="none" stroke-linejoin="round">
    <path d="M0 -110 L95 -55 L95 55 L0 110 L-95 55 L-95 -55 Z"/>
  </g>

  <!-- Eyebrow -->
  <text x="80" y="200" font-family='${FONT_STACK}'
        font-size="22" font-weight="500" fill="#8b949e" letter-spacing="6">
    SOFTWARE DEVELOPMENT ENGINEER
  </text>

  <!-- Name -->
  <text x="80" y="320" font-family='${FONT_STACK}'
        font-size="88" font-weight="700" fill="#e6edf3" letter-spacing="-2">
    Cyrus Daniel Santos
  </text>

  <!-- Tagline -->
  <text x="80" y="386" font-family='${FONT_STACK}'
        font-size="30" font-weight="400" fill="#8b949e">
    Full-stack engineer · Spring Boot · React · 3D
  </text>

  <!-- Bottom hairline accent + URL -->
  <rect x="80" y="510" width="60" height="1" fill="url(#hairline)"/>
  <text x="80" y="540" font-family='${FONT_STACK}'
        font-size="20" font-weight="500" fill="#cbd5e1" letter-spacing="3">
    cyrusdanielsantos.vercel.app
  </text>
</svg>
`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUTPUT)

console.log(`✓ Generated ${OUTPUT}`)
