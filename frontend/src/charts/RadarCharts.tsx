import { lineRadial } from 'd3'
import { similar } from '../demo'

const orange = '#bd5005'

const radarLabels = ['Duração', 'Compl.', 'Idade', 'Nota', 'Jogadores']
const radarMax = [60, 5, 16, 10, 8]
const radarAngle = (index: number) => index * 2 * Math.PI / radarLabels.length
const radarPath = lineRadial<number>().angle((_, index) => radarAngle(index % radarLabels.length)).radius(value => value * 63)
const radarShape = (values: number[]) => radarPath([...values, values[0]])
const normalize = (values: number[]) => values.map((value, index) => value / radarMax[index])

export function RadarCharts({ reference, count }: { reference: string; count: number }) {
  const base = similar.find(game => game.name === reference) ?? similar[0]
  const baseProfile = normalize(base.values)
  const distance = (game: typeof base) => normalize(game.values)
    .reduce((sum, value, index) => sum + (value - baseProfile[index]) ** 2, 0)
  const matches = similar.filter(game => game !== base).sort((a, b) => distance(a) - distance(b))
  const cards = [base, ...matches.slice(0, count)]
  return <div className="radars">{cards.map(game => <article key={game.name} className={game === base ? 'radar reference' : 'radar'}>
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
    <small>{game.values[0]} min · {game.values[1].toLocaleString('pt-PT')} compl. · {game.values[2]}+ anos · {game.values[3].toLocaleString('pt-PT')} nota · {game.players} jog.</small>
  </article>)}</div>
}
