import { PlayersChart } from '../charts/PlayersChart'
import type { EventGame } from '../catalog'
import { Panel } from '../components/Panel'

export function PlayersPage({ shortlist, showAll, onToggle }: { shortlist: EventGame[]; showAll: boolean; onToggle: () => void }) {
  return <Panel title="Recomendação por número de jogadores" description="Classificação da comunidade BoardGameGeek de 1 a 8 jogadores. Um traço indica ausência de dados.">
    {shortlist.length ? <PlayersChart rows={showAll ? shortlist : shortlist.slice(0, 6)} /> : <p className="footnote">Nenhum jogo cabe nestes limites.</p>}
    {shortlist.length > 6 && <button className="more" onClick={onToggle}>{showAll ? 'Ver menos' : `Ver mais ${shortlist.length - 6} jogos`}</button>}
  </Panel>
}
