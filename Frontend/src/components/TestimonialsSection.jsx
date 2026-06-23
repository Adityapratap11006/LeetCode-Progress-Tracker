import { motion } from 'framer-motion'

const testimonials = [
  { name: 'Alex Chen', role: 'Software Engineer @ Google', text: 'AlgoForge completely transformed my interview prep. The streak system kept me accountable for 150 days straight.' },
  { name: 'Sarah Kim', role: 'SWE Intern @ Meta', text: 'The analytics and revision system helped me identify weak spots I never knew I had. Landed my dream internship!' },
  { name: 'Marcus Johnson', role: 'SDE @ Amazon', text: 'I tried every LeetCode tracker out there. AlgoForge is the only one that stuck. The UI is gorgeous and it actually works.' },
  { name: 'Priya Patel', role: 'Full Stack @ Stripe', text: 'The heatmap and progress tracking make it so satisfying to see my growth over time. Highly recommend.' },
  { name: 'James Wilson', role: 'Engineer @ Microsoft', text: 'Finally a tool that respects my time. Clean, fast, and the revision reminders are perfectly timed.' },
  { name: 'Elena Rodriguez', role: 'SWE @ Apple', text: 'I love the study lists feature. I can organize problems by company and track my readiness for each one.' },
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Loved by{' '}
            <span className="text-gradient">engineers</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-sm">
            Join thousands of developers who use AlgoForge to master LeetCode.
          </p>
        </motion.div>

        {/* Row 1 */}
        <div className="flex gap-4 mb-4 animate-float" style={{ animationDuration: '20s' }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="shrink-0 w-[320px] glass-card p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-bright to-indigo-bright flex items-center justify-center text-xs font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-[11px] text-muted">{t.role}</p>
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* Row 2 (reverse) */}
        <div className="flex gap-4 animate-float" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="shrink-0 w-[320px] glass-card p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-bright to-indigo-bright flex items-center justify-center text-xs font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-[11px] text-muted">{t.role}</p>
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
