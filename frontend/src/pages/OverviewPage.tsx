import { eventGames } from '../demo'
import type { games } from '../demo'
import { decimal } from '../format'
import { Panel } from '../components/Panel'

export function OverviewPage({ shortlist, matchingCount }: { shortlist: typeof games; matchingCount: number }) {
  return <Panel title="Halloween · lista curta da noite" description="Jogos de referência que cabem nos limites da noite, ordenados pela nota.">
    <div className="metrics">
      <div><strong>{eventGames.length}</strong><span>jogos na amostra de Halloween</span></div>
      <div><strong>{matchingCount}</strong><span>cabem nos limites da noite</span></div>
      <div><strong>{shortlist.length}</strong><span>jogos de referência na lista curta</span></div>
    </div>
    <div className="table-scroll"><table>
      <thead><tr>{['Jogo', 'Temas', 'Melhor com', 'Duração', 'Complexidade', 'Nota'].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
      <tbody>{shortlist.map(game => <tr key={game.name}>
        <th scope="row">{game.name}</th><td>{game.theme}</td><td>{game.best} jogadores</td><td>{game.minutes} min</td>
        <td>{decimal(game.weight)}</td><td>{decimal(game.rating)}</td>
      </tr>)}</tbody>
    </table></div>
    {!shortlist.length && <p className="footnote">Nenhum jogo de referência cabe nestes limites.</p>}
  </Panel>
}
