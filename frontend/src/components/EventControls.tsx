import { decimal } from '../format'
import { Control } from './Control'
import { Controls } from './Controls'

export function EventControls({ minutes, weight, onMinutesChange, onWeightChange }: {
  minutes: number
  weight: number
  onMinutesChange: (minutes: number) => void
  onWeightChange: (weight: number) => void
}) {
  function reset() {
    onMinutesChange(60)
    onWeightChange(2.5)
  }

  return <Controls title="Filtrar jogos" note="Halloween usa a categoria Horror, jogos compatíveis com grupos de 4 a 8 e pelo menos 30 avaliações.">
    <Control label="Evento" value="Halloween" options={ [['Halloween', 'Halloween']] } />
    <Control label="Duração máx. da noite" value={minutes}
      options={[30, 45, 60, 90, 120].map(value => [value, `${value} min`])} onChange={value => onMinutesChange(Number(value))} />
    <Control label="Complexidade máx." value={weight}
      options={[1.5, 2, 2.5, 3, 4, 5].map(value => [value, decimal(value)])} onChange={value => onWeightChange(Number(value))} />
    <button className="reset" onClick={reset}>Repor limites</button>
  </Controls>
}
