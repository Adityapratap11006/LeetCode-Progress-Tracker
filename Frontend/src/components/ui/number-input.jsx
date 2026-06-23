import { cn } from '../../lib/utils'
import { Minus, Plus } from 'lucide-react'

export function NumberInput({ value, onChange, min = 0, max, label, className }) {
  const decrement = () => {
    const next = Math.max(min, (value || 0) - 1)
    if (onChange) onChange(next)
  }
  const increment = () => {
    let next = (value || 0) + 1
    if (max !== undefined) next = Math.min(max, next)
    if (onChange) onChange(next)
  }

  const handleInputChange = (e) => {
    const raw = e.target.value
    if (raw === '') { onChange?.(0); return }
    const num = parseInt(raw, 10)
    if (!isNaN(num)) {
      let clamped = num
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      onChange?.(clamped)
    }
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="text-xs font-medium text-muted">{label}</label>}
      <div className="flex items-center h-9">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="flex items-center justify-center w-9 h-full rounded-l-lg border border-glass-border border-r-0 bg-glass hover:bg-glass-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95"
        >
          <Minus className="w-3.5 h-3.5 text-muted" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={value ?? 0}
          onChange={handleInputChange}
          className="flex-1 h-full text-center text-sm text-white bg-glass border-y border-glass-border outline-none focus:bg-glass-hover transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={increment}
          disabled={max !== undefined && value >= max}
          className="flex items-center justify-center w-9 h-full rounded-r-lg border border-glass-border border-l-0 bg-glass hover:bg-glass-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 text-muted" />
        </button>
      </div>
    </div>
  )
}
