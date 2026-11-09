import type { EventGame } from '../catalog'
import { decimal } from '../format'
import { Panel } from '../components/Panel'

export function OverviewPage({ shortlist, matchingCount, totalCount }: { shortlist: EventGame[]; matchingCount: number; totalCount: number }) {
  return <Panel title="Halloween · lista curta da noite" description="Até oito jogos do catálogo que cabem nos limites da noite, ordenados pela nota bayesiana.">
    <div className="metrics">
      <div><strong>{totalCount}</strong><span>jogos de Horror no recorte de Halloween</span></div>
      <div><strong>{matchingCount}</strong><span>cabem nos limites da noite</span></div>
      <div><strong>{shortlist.length}</strong><span>jogos na lista curta</span></div>
    </div>
    <div className="table-scroll"><table>
      <thead><tr>{['Jogo', 'Temas', 'Melhor com', 'Duração', 'Complexidade', 'Nota'].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
      <tbody>{shortlist.map(game => <tr key={game.id}>
        <th scope="row">{game.name}</th><td>{game.theme}</td><td>{game.recommendations.flatMap((value, index) => value === 'Best' ? [index + 1] : []).join(', ') || '–'}</td><td>{game.minutes} min</td>
        <td>{decimal(game.weight)}</td><td>{decimal(game.rating)}</td>
      </tr>)}</tbody>
    </table></div>
    {!shortlist.length && <p className="footnote">Nenhum jogo cabe nestes limites.</p>}
  </Panel>
}
