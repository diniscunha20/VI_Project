import { ScatterChart } from '../charts/ScatterChart'
import type { EventGame } from '../catalog'
import { Panel } from '../components/Panel'

export function ComplexityPage({ games, minutes, weight }: { games: EventGame[]; minutes: number; weight: number }) {
  return <Panel title="Complexidade × nota" description="A laranja, os jogos que cabem nos limites da noite.">
    <div className="chart-scroll"><ScatterChart games={games} minutes={minutes} weight={weight} /></div>
  </Panel>
}
