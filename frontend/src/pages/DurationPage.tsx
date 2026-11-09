import { DurationChart } from '../charts/DurationChart'
import { eventGames } from '../demo'
import { Panel } from '../components/Panel'

export function DurationPage({ minutes }: { minutes: number }) {
  return <Panel title={`Distribuição das durações · ${eventGames.length} jogos de Halloween`} description="Todos os jogos da amostra, agrupados em intervalos de 30 minutos.">
    <div className="chart-scroll"><DurationChart minutes={minutes} /></div>
  </Panel>
}
