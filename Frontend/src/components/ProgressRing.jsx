import { useEffect, useState } from 'react'

export default function ProgressRing({ solved, total, size = 120, strokeWidth = 8 }) {
  const [offset, setOffset] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = total > 0 ? solved / total : 0

  useEffect(() => {
    const timer = setTimeout(() => setOffset(circumference * (1 - progress)), 300)
    return () => clearTimeout(timer)
  }, [progress, circumference])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="url(#progress-grad)" strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference}
          strokeDashoffset={offset} className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="progress-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{total > 0 ? Math.round(progress * 100) : 0}%</span>
        <span className="text-[11px] text-muted">solved</span>
      </div>
    </div>
  )
}
