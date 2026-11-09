import { lineRadial } from 'd3'
import type { GameProfile } from '../catalog'
import { decimal } from '../format'

const orange = '#bd5005'

const radarLabels = ['Duração', 'Compl.', 'Idade', 'Nota', 'Jogadores']
const radarAngle = (index: number) => index * 2 * Math.PI / radarLabels.length
const radarPath = lineRadial<number>().angle((_, index) => radarAngle(index % radarLabels.length)).radius(value => value * 63)
const radarShape = (values: number[]) => radarPath([...values, values[0]])

export function RadarCharts({ profiles, reference, count }: { profiles: GameProfile[]; reference: string; count: number }) {
  const base = profiles.find(game => game.id === reference) ?? profiles[0]
  if (!base) return null

  const maxima = radarLabels.map((_, index) => Math.max(...profiles.map(game => game.values[index])))
  const normalize = (values: number[]) => values.map((value, index) => value / maxima[index])
  const baseProfile = normalize(base.values)
  const distance = (game: typeof base) => normalize(game.values)
    .reduce((sum, value, index) => sum + (value - baseProfile[index]) ** 2, 0)
  const matches = profiles.filter(game => game !== base).sort((a, b) => distance(a) - distance(b))
  const cards = [base, ...matches.slice(0, count)]
  return <div className="radars">{cards.map(game => <article key={game.id} className={game === base ? 'radar reference' : 'radar'}>
    <span className="eyebrow">{game === base ? 'Referência' : 'Parecido'}</span>
    <h3>{game.name}</h3>
    <svg viewBox="0 0 240 184" role="img" aria-label={`Perfil de ${game.name}`}>
      <g transform="translate(120, 92)">
        {[0.33, 0.66, 1].map(level => <path key={level} d={radarShape(radarLabels.map(() => level)) ?? ''} fill="none" className="gridline" />)}
        {radarLabels.map((label, index) => {
          const angle = radarAngle(index)
          return <g key={label}>
            <line x2={63 * Math.sin(angle)} y2={-63 * Math.cos(angle)} className="gridline" />
            <text x={77 * Math.sin(angle)} y={-77 * Math.cos(angle) + 3} textAnchor={index === 0 ? 'middle' : index < 3 ? 'start' : 'end'}>{label}</text>
          </g>
        })}
        <path d={radarShape(normalize(game.values)) ?? ''} fill="#8b97a625" stroke="#495566" strokeWidth={2} />
        {game !== base && <path d={radarShape(baseProfile) ?? ''} fill="none" stroke={orange} strokeDasharray="4 4" strokeWidth={2} />}
      </g>
    </svg>
    <small>{game.values[0]} min · {decimal(game.values[1])} compl. · {game.values[2]}+ anos · {decimal(game.values[3])} nota · {game.players} jog.</small>
  </article>)}</div>
}
