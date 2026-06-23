import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import AuroraBackground from '../components/AuroraBackground'
import Particles from '../components/Particles'
import FeaturesSection from '../components/FeaturesSection'
import PreviewSection from '../components/PreviewSection'
import StatsSection from '../components/StatsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-algo-950 overflow-hidden">
      <AuroraBackground />
      <Particles count={60} />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 bg-algo-950/70 backdrop-blur-xl border-b border-glass-border"
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-bright to-indigo-bright flex items-center justify-center shadow-lg shadow-purple-bright/25">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white">AlgoForge</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="shadow-lg shadow-purple-bright/20">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-14">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-bright/10 border border-purple-bright/20 text-xs text-purple-glow font-medium mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Your DSA companion
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="text-white">Forge</span>{' '}
            <span className="text-gradient">consistency</span>
            <br />
            <span className="text-white">Master</span>{' '}
            <span className="text-gradient">DSA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-muted text-sm md:text-base mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Track your LeetCode journey with beautiful analytics, streaks, study lists and smart revision. Build unstoppable momentum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <Link to="/register">
              <Button size="xl" className="shadow-lg shadow-purple-bright/30">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl">
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Stats mini bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-glass-border max-w-md mx-auto"
          >
            {[
              { label: 'Problems', value: '1.2K+' },
              { label: 'Users', value: '5K+' },
              { label: 'Streak Record', value: '365d' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-lg font-bold text-white">{s.value}</p>
                <p className="text-[11px] text-muted">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <FeaturesSection />
      <PreviewSection />
      <StatsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
