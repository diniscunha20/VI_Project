import { interpolateBlues } from 'd3'
import type { games } from '../demo'

export function PlayersChart({ rows }: { rows: typeof games }) {
  const columns = ['1', '2', '3', '4', '5', '6', '7', '8+']
  return <div className="table-scroll"><table className="heatmap">
    <thead><tr><th scope="col">Jogo</th>{columns.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
    <tbody>{rows.map(game => <tr key={game.name}>
      <th scope="row">{game.name}</th>
      {game.votes.map((vote, index) => <td key={index} className={vote === Math.max(...game.votes.map(value => value ?? -1)) ? 'best' : ''}
        style={{ background: vote === null ? '#eef0f2' : interpolateBlues(0.14 + vote / 100), color: vote !== null && vote >= 50 ? '#fff' : undefined }}>
        {vote === null ? '–' : `${vote}%`}
      </td>)}
    </tr>)}</tbody>
  </table></div>
}
