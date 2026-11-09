import { bin, mean, scaleLinear } from 'd3'
import type { EventGame } from '../catalog'

const grey = '#8b97a6'
const orange = '#bd5005'

export function DurationChart({ games, minutes }: { games: EventGame[]; minutes: number }) {
  const groups = bin<EventGame, number>()
    .value(game => Math.min(game.minutes, 180))
    .domain([0, 210])
    .thresholds([30, 60, 90, 120, 150, 180])(games)
  const x = scaleLinear([0, 210], [55, 735])
  const y = scaleLinear([0, Math.max(1, ...groups.map(group => group.length))], [245, 28]).nice()
  const average = mean(games, game => game.minutes) ?? 0
  const labels = ['0–30', '30–60', '60–90', '90–120', '120–150', '150–180', '180+']

  return <svg viewBox="0 0 760 290" role="img" aria-label="Histograma da duração dos jogos">
    {y.ticks(3).map(tick => <g key={tick}>
      <line className="gridline" x1={55} x2={735} y1={y(tick)} y2={y(tick)} />
      <text x={43} y={y(tick) + 4} textAnchor="end">{tick}</text>
    </g>)}
    {groups.map((group, index) => {
      const left = x(group.x0 ?? 0)
      const right = x(group.x1 ?? 0)
      const center = (left + right) / 2
      return <g key={index}>
        <rect x={left} y={y(group.length)} width={right - left - 1} height={y(0) - y(group.length)} fill={grey}>
          <title>{labels[index]} min · {group.length} jogos</title>
        </rect>
        <text className="value" x={center} y={y(group.length) - 7} textAnchor="middle">{group.length}</text>
        <text x={center} y={263} textAnchor="middle">{labels[index]}</text>
      </g>
    })}
    <line x1={x(minutes)} x2={x(minutes)} y1={51} y2={245} stroke={orange} strokeWidth={2} strokeDasharray="5 5" />
    <text x={x(minutes) + 8} y={52} fill={orange}>limite {minutes} min</text>
    <line x1={x(Math.min(average, 180))} x2={x(Math.min(average, 180))} y1={33} y2={245} stroke="currentColor" strokeDasharray="5 5" />
    <text className="value" x={x(Math.min(average, 180)) + 8} y={37}>média {Math.round(average)} min</text>
    <text x={395} y={284} textAnchor="middle">Duração em minutos</text>
  </svg>
}
