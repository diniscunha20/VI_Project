import { PlayersChart } from '../charts/PlayersChart'
import type { games } from '../demo'
import { Panel } from '../components/Panel'

export function PlayersPage({ shortlist, showAll, onToggle }: { shortlist: typeof games; showAll: boolean; onToggle: () => void }) {
  const playerRows = [...shortlist].sort((a, b) => (b.votes[5] ?? 0) - (a.votes[5] ?? 0))

  return <Panel title="% de votos «Melhor» por número de jogadores" description="Lista curta ordenada pela percentagem de votos para 6 jogadores. A célula com contorno assinala o máximo de cada jogo.">
    {playerRows.length ? <PlayersChart rows={showAll ? playerRows : playerRows.slice(0, 6)} /> : <p className="footnote">Nenhum jogo de referência cabe nestes limites.</p>}
    {playerRows.length > 6 && <button className="more" onClick={onToggle}>{showAll ? 'Ver menos' : `Ver mais ${playerRows.length - 6} jogos`}</button>}
  </Panel>
}
