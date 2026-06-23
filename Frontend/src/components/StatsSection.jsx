import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function StatsSection() {
  const [counts, setCounts] = useState({ solved: 0, streak: 0, hours: 0 })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCounts({
        solved: Math.round(ease * 1250),
        streak: Math.round(ease * 87),
        hours: Math.round(ease * 342),
      })
      if (progress >= 1) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    { label: 'Problems Solved', value: counts.solved, suffix: '+' },
    { label: 'Current Streak', value: counts.streak, suffix: ' days' },
    { label: 'Hours Invested', value: counts.hours, suffix: '+' },
  ]

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card glass-card-hover p-8 text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {s.value}{s.suffix}
              </p>
              <p className="text-sm text-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
