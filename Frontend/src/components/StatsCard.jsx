import { motion } from 'framer-motion'

export default function StatsCard({ icon: Icon, label, value, color = 'text-purple-glow', gradient = 'from-purple-bright/10 to-transparent', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden glass-card glass-card-hover glass-card-glow p-5 card-glow"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`} />
      <div className="relative z-10 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-glass border border-glass-border shrink-0">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted">{label}</p>
          <motion.p
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className={`text-2xl font-bold mt-1 ${color}`}
          >
            {value ?? '—'}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
