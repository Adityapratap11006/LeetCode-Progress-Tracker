import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, LayoutDashboard, CheckCircle2, BarChart3, BookOpen, RefreshCw, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Logo } from '../components/Logo'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

const features = [
  { icon: CheckCircle2, title: 'Problem Tracking', desc: 'Track every problem you solve with difficulty, tags, language, and time spent.' },
  { icon: BarChart3, title: 'GitHub-style Heatmap', desc: 'Visualize your coding activity and identify consistency patterns over time.' },
  { icon: BookOpen, title: 'Study Lists', desc: 'Organize problems into custom roadmaps with progress tracking.' },
  { icon: RefreshCw, title: 'Revision System', desc: 'Spaced repetition helps you retain what you learn with smart scheduling.' },
  { icon: TrendingUp, title: 'Analytics', desc: 'Deep insights into your performance, streaks, and problem-solving trends.' },
]

const stats = [
  { label: 'Problems Tracked', value: '1.2K+' },
  { label: 'Active Users', value: '5K+' },
  { label: 'Longest Streak', value: '365d' },
]

export default function Landing() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-base">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 bg-base/80 border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="text-sm font-bold text-white">CodeTrackr</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard">
                <Button size="sm">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Get Started <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-14">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-6"
          >
            Track • Solve • Improve
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="text-white">Master DSA with</span>{' '}
            <span className="text-primary">consistency</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted text-sm md:text-base mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Track your coding journey, build study lists, maintain streaks, and revise intelligently with CodeTrackr.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            {user ? (
              <Link to="/dashboard">
                <Button size="xl">
                  <LayoutDashboard className="w-4 h-4" />
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="xl">
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="xl">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-border max-w-md mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-lg font-bold text-white">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white">Everything you need to stay consistent</h2>
            <p className="text-muted mt-3 text-sm max-w-xl mx-auto">
              Built for developers who want to master DSA through structured practice and intelligent revision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-5 card-hover">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={24} />
            <span className="text-xs text-muted">CodeTrackr</span>
          </div>
          <span className="text-xs text-muted">Track • Solve • Improve</span>
        </div>
      </footer>
    </div>
  )
}
