import type { ReactNode } from 'react'

export function Panel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return <section className="panel">
    <h2>{title}</h2>
    {description && <p className="description">{description}</p>}
    {children}
  </section>
}
