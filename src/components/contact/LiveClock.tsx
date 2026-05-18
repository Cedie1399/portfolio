import { useEffect, useState } from 'react'

type Snapshot = {
  time: string
  hour24: number
  isWorking: boolean
  hoursUntilReply: number
}

function snapshot(): Snapshot {
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  const hour24 = Number(
    now.toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
      hour: 'numeric',
      hour12: false,
    }),
  )
  const isWorking = hour24 >= 8 && hour24 < 22
  const hoursUntilReply = isWorking
    ? 3
    : hour24 < 8
      ? 8 - hour24
      : 24 - hour24 + 8
  return { time, hour24, isWorking, hoursUntilReply }
}

export function LiveClock() {
  const [s, setS] = useState<Snapshot>(() => snapshot())

  useEffect(() => {
    const id = window.setInterval(() => setS(snapshot()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
        <span className="relative flex h-2 w-2">
          <span
            className={
              s.isWorking
                ? 'absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden'
                : 'hidden'
            }
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              s.isWorking ? 'bg-accent' : 'bg-hairline/60'
            }`}
          />
        </span>
        {s.isWorking ? 'Usually online' : 'Off hours'}
      </span>

      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-elevated/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
        <ClockGlyph />
        Manila ·{' '}
        <span className="text-fg" aria-live="polite">
          {s.time}
        </span>
      </span>

      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-subtle">
        Replies in ~
        <span className="text-accent">{s.hoursUntilReply}h</span>
      </span>
    </div>
  )
}

function ClockGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3 w-3 text-accent/70"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
