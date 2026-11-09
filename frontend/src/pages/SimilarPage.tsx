import { RadarCharts } from '../charts/RadarCharts'
import { Control } from '../components/Control'
import { Controls } from '../components/Controls'
import type { GameProfile } from '../catalog'
import { Panel } from '../components/Panel'

export function SimilarPage({ profiles, reference, count, onReferenceChange, onCountChange }: {
  profiles: GameProfile[]
  reference: string
  count: number
  onReferenceChange: (reference: string) => void
  onCountChange: (count: number) => void
}) {
  if (!profiles.length) return <Panel title="Comparar títulos semelhantes"><p>Sem perfis disponíveis no catálogo.</p></Panel>

  return <>
    <Controls>
      <Control label="Jogo de referência" value={reference} options={profiles.map(game => [game.id, game.name])} onChange={onReferenceChange} />
      <Control label="Mostrar" value={count}
        options={[[1, '1 parecido'], [2, '2 parecidos'], [3, '3 parecidos']]} onChange={value => onCountChange(Number(value))} />
    </Controls>
    <Panel title="Comparar títulos semelhantes" description="Comparação de perfis entre os 50 jogos mais avaliados com dados completos. O tracejado laranja repete o perfil de referência.">
      <RadarCharts profiles={profiles} reference={reference} count={count} />
    </Panel>
  </>
}
