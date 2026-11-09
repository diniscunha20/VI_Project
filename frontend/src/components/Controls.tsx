import type { ReactNode } from 'react'

export function Controls({ title = 'Parâmetros', note, children }: {
  title?: string
  note?: string
  children: ReactNode
}) {
  return <section className="controls" aria-label="Parâmetros da vista">
    <p className="eyebrow">{title}</p>
    <div className="control-row">{children}</div>
    {note && <small>{note}</small>}
  </section>
}
