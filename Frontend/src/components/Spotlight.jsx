import { useEffect, useRef } from 'react'
import { cn } from '../lib/utils'

export default function Spotlight({ className, fill = 'rgba(139, 92, 246, 0.15)' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--spotlight-x', `${x}%`)
      el.style.setProperty('--spotlight-y', `${y}%`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={ref}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${fill}, transparent 60%)`,
        }}
      />
    </div>
  )
}
