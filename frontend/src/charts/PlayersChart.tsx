import { interpolateBlues } from 'd3'
import type { EventGame } from '../catalog'

const recommendations = {
  Best: { label: 'Melhor', color: interpolateBlues(0.85) },
  Recommended: { label: 'Recomendado', color: interpolateBlues(0.35) },
  NotRecommended: { label: 'Desaconselhado', color: '#f2e9e2' },
}

export function PlayersChart({ rows }: { rows: EventGame[] }) {
  const columns = [1, 2, 3, 4, 5, 6, 7, 8]
  return <div className="table-scroll"><table className="heatmap">
    <thead><tr><th scope="col">Jogo</th>{columns.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
    <tbody>{rows.map(game => <tr key={game.id}>
      <th scope="row">{game.name}</th>
      {game.recommendations.map((value, index) => {
        const recommendation = value ? recommendations[value] : null
        return <td key={index} className={value === 'Best' ? 'best' : ''}
          style={{ background: recommendation?.color ?? '#eef0f2', color: value === 'Best' ? '#fff' : undefined }}>
          {recommendation?.label ?? '–'}
        </td>
      })}
    </tr>)}</tbody>
  </table></div>
}
