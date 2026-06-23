import { motion } from 'framer-motion'

const features = [
  { icon: '🔥', title: 'Streak Tracking', desc: 'Maintain your daily streak with visual progress tracking and smart reminders.' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'Beautiful charts showing your problem-solving patterns, difficulty distribution and more.' },
  { icon: '🗓️', title: 'Activity Heatmap', desc: 'GitHub-style heatmap showing your coding activity across the year.' },
  { icon: '📚', title: 'Study Lists', desc: 'Organize problems into custom study lists for focused preparation.' },
  { icon: '🔄', title: 'Revision System', desc: 'Smart spaced-repetition algorithm to review problems at optimal intervals.' },
  { icon: '⚡', title: 'Smart Progress', desc: 'AI-powered insights to identify weak areas and track improvement over time.' },
]

export default function FeaturesSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Everything you need to{' '}
            <span className="text-gradient">master DSA</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            AlgoForge provides all the tools you need to track, analyze, and improve your LeetCode performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative glass-card glass-card-hover p-6 cursor-default"
            >
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
