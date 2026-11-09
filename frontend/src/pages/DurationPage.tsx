import { DurationChart } from '../charts/DurationChart'
import type { EventGame } from '../catalog'
import { Panel } from '../components/Panel'

export function DurationPage({ games, minutes }: { games: EventGame[]; minutes: number }) {
  return <Panel title={`Distribuição das durações · ${games.length} jogos de Halloween`} description="Jogos do catálogo no recorte de Halloween, em intervalos de 30 minutos até 180 minutos.">
    <div className="chart-scroll"><DurationChart games={games} minutes={minutes} /></div>
  </Panel>
}
