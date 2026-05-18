type Props = {
  number: string
  label: string
  title: string
}

export function SectionHeader({ number, label, title }: Props) {
  return (
    <header className="mb-12 max-w-2xl">
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
        <span className="font-mono text-accent">{number}</span>
        <span className="mx-2 text-subtle">·</span>
        {label}
      </p>
      <h2 className="font-display text-3xl font-semibold text-fg md:text-4xl">
        {title}
      </h2>
    </header>
  )
}
