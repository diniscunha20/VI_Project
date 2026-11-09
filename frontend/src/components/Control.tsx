export function Control({ label, value, options, onChange }: {
  label: string
  value: string | number
  options: [string | number, string][]
  onChange?: (value: string) => void
}) {
  return <label>{label}
    <select value={value} disabled={!onChange} onChange={event => onChange?.(event.target.value)}>
      {options.map(([key, text]) => <option key={key} value={key}>{text}</option>)}
    </select>
  </label>
}
