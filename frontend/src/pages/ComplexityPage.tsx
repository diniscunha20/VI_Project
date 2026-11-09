import { ScatterChart } from '../charts/ScatterChart'
import { Panel } from '../components/Panel'

export function ComplexityPage({ minutes, weight }: { minutes: number; weight: number }) {
  return <Panel title="Complexidade × nota" description="A laranja, os jogos que cabem nos limites da noite.">
    <div className="chart-scroll"><ScatterChart minutes={minutes} weight={weight} /></div>
  </Panel>
}
