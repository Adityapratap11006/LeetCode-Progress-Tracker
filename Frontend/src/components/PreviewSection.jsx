import { motion } from 'framer-motion'
import { BarChart3, CheckCircle2, TrendingUp, Zap } from 'lucide-react'

export default function PreviewSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Beautiful{' '}
            <span className="text-gradient">analytics</span> at a glance
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-sm">
            Everything you need to understand your progress, identify patterns, and stay motivated.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-bright/5 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white">Dashboard Overview</h3>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <div className="w-2 h-2 rounded-full bg-purple-bright" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: CheckCircle2, label: 'Solved', value: '147', color: 'text-success' },
                  { icon: BarChart3, label: 'Medium', value: '63', color: 'text-warning' },
                  { icon: TrendingUp, label: 'Streak', value: '28d', color: 'text-purple-glow' },
                  { icon: Zap, label: 'Efficiency', value: '92%', color: 'text-success' },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-lg p-3 flex items-center gap-3">
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                    <div>
                      <p className="text-xs text-muted">{s.label}</p>
                      <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div className="glass rounded-lg p-4">
                <p className="text-xs text-muted mb-3">Weekly Activity</p>
                <div className="flex items-end gap-2 h-20">
                  {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-purple-bright/60 to-purple-bright/30 transition-all duration-500"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[10px] text-muted">S{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chart Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-bright/5 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white">Difficulty Distribution</h3>
                <span className="text-[11px] text-muted">Last 30 days</span>
              </div>

              <div className="flex items-center justify-center h-48 gap-8">
                {/* Donut chart placeholder */}
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#22c55e" strokeWidth="10"
                      strokeDasharray={`${(48/100) * 301.6} 301.6`} strokeLinecap="round" />
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#f59e0b" strokeWidth="10"
                      strokeDasharray={`${(30/100) * 301.6} 301.6`} strokeDashoffset={`-${(48/100) * 301.6}`} strokeLinecap="round" />
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#ef4444" strokeWidth="10"
                      strokeDasharray={`${(22/100) * 301.6} 301.6`} strokeDashoffset={`-${(78/100) * 301.6}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">147</p>
                      <p className="text-[10px] text-muted">total</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Easy', value: '48%', color: '#22c55e' },
                    { label: 'Medium', value: '30%', color: '#f59e0b' },
                    { label: 'Hard', value: '22%', color: '#ef4444' },
                  ].map((d) => (
                    <div key={d.label} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-xs text-muted">{d.label}</span>
                      <span className="text-xs font-medium text-white ml-2">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
