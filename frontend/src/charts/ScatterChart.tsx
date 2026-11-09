import { scaleLinear } from 'd3'
import type { EventGame } from '../catalog'

const grey = '#8b97a6'
const orange = '#bd5005'

type Limits = { games: EventGame[]; minutes: number; weight: number }

export function ScatterChart({ games, minutes, weight }: Limits) {
  const x = scaleLinear([1, 5], [55, 735])
  const y = scaleLinear([Math.min(5, ...games.map(game => game.rating)), Math.max(8, ...games.map(game => game.rating))], [245, 28])
  return <svg viewBox="0 0 760 290" role="img" aria-label="Dispersão da complexidade e nota dos jogos">
    <text x={58} y={17}>Nota ↑</text>
    {y.ticks(5).map(tick => <g key={tick}>
      <line className="gridline" x1={55} x2={735} y1={y(tick)} y2={y(tick)} />
      <text x={43} y={y(tick) + 4} textAnchor="end">{tick.toLocaleString('pt-PT')}</text>
    </g>)}
    {x.ticks(4).map(tick => <g key={tick}>
      <line className="gridline" x1={x(tick)} x2={x(tick)} y1={28} y2={245} />
      <text x={x(tick)} y={263} textAnchor="middle">{tick}</text>
    </g>)}
    <line x1={x(weight)} x2={x(weight)} y1={28} y2={245} stroke={orange} strokeDasharray="4 4" />
    <text x={x(weight) - 7} y={41} textAnchor="end" fill={orange}>limite de complexidade</text>
    {games.map(game => <rect key={game.id} x={x(game.weight) - 3} y={y(game.rating) - 3} width={6} height={6}
      fill={game.weight <= weight && game.minutes <= minutes ? orange : grey} opacity={0.7}>
      <title>{game.name} · complexidade {game.weight} · nota {game.rating.toFixed(1)} · {game.minutes} min</title>
    </rect>)}
    <text x={395} y={284} textAnchor="middle">Complexidade · 1 leve a 5 pesada</text>
  </svg>
}
