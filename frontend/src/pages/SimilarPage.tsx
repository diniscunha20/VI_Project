import { RadarCharts } from '../charts/RadarCharts'
import { Control } from '../components/Control'
import { Controls } from '../components/Controls'
import { similar } from '../demo'
import { Panel } from '../components/Panel'

export function SimilarPage({ reference, count, onReferenceChange, onCountChange }: {
  reference: string
  count: number
  onReferenceChange: (reference: string) => void
  onCountChange: (count: number) => void
}) {
  return <>
    <Controls>
      <Control label="Jogo de referência" value={reference} options={similar.map(game => [game.name, game.name])} onChange={onReferenceChange} />
      <Control label="Mostrar" value={count}
        options={[[1, '1 parecido'], [2, '2 parecidos'], [3, '3 parecidos']]} onChange={value => onCountChange(Number(value))} />
    </Controls>
    <Panel title="Comparar títulos semelhantes" description="Todos os cartões usam as mesmas escalas. O tracejado laranja repete o perfil de referência.">
      <RadarCharts reference={reference} count={count} />
    </Panel>
  </>
}
