import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import {
  FileText, CheckCircle2, Clock, AlertTriangle, Timer, Zap, Plus, TrendingUp,
} from 'lucide-react'
import { getStats, getStreak, getProblems } from '../services/problemService'
import { useAuth } from '../context/AuthContext'
import StatsCard from '../components/StatsCard'
import ProgressRing from '../components/ProgressRing'
import AddProblemForm from '../components/AddProblemForm'
import Particles from '../components/Particles'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

const PIE_COLORS = ['#22c55e', '#f59e0b', '#ef4444']

const greetings = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function CustomTooltip({ active, payload }) {
  if (active && payload?.length) {
    return (
      <div className="glass-card !rounded-lg px-3 py-2 text-sm shadow-xl">
        <span className="text-white font-medium">{payload[0].name}: </span>
        <span className="text-muted">{payload[0].value}</span>
      </div>
    )
  }
  return null
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [streak, setStreak] = useState(0)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)

  const fetchData = async () => {
    try {
      const [statsData, streakData, problemsData] = await Promise.all([
        getStats(),
        getStreak(),
        getProblems({ limit: 5, sort: '-createdAt' }),
      ])
      setStats(statsData)
      setStreak(streakData.streak ?? 0)
      setRecent(problemsData.problems ?? problemsData ?? [])
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const totalSolved = stats?.solvedProblems ?? 0
  const totalProblems = stats?.totalProblems ?? 0

  const pieData = [
    { name: 'Easy', value: stats?.easyProblems ?? 0 },
    { name: 'Medium', value: stats?.mediumProblems ?? 0 },
    { name: 'Hard', value: stats?.hardProblems ?? 0 },
  ].filter((d) => d.value > 0)

  const statCards = [
    { icon: FileText, label: 'Total Problems', value: stats?.totalProblems, color: 'text-purple-glow', gradient: 'from-purple-bright/10 to-transparent', delay: 0.05 },
    { icon: CheckCircle2, label: 'Solved', value: totalSolved, color: 'text-success', gradient: 'from-green-500/10 to-transparent', delay: 0.1 },
    { icon: Clock, label: 'Attempted', value: stats?.attemptedProblems, color: 'text-attempted', gradient: 'from-blue-500/10 to-transparent', delay: 0.15 },
    { icon: AlertTriangle, label: 'Need Review', value: stats?.needReviewProblems, color: 'text-warning', gradient: 'from-yellow-500/10 to-transparent', delay: 0.2 },
    { icon: Timer, label: 'Time Spent', value: stats?.totalTimeSpent != null ? `${stats.totalTimeSpent}m` : '0m', color: 'text-purple-glow', gradient: 'from-purple-bright/10 to-transparent', delay: 0.25 },
    { icon: Zap, label: 'Current Streak', value: `${streak} day${streak !== 1 ? 's' : ''}`, color: 'text-indigo-bright', gradient: 'from-indigo-bright/10 to-transparent', delay: 0.3 },
  ]

  return (
    <div className="min-h-screen bg-algo-950 relative">
      <Particles count={30} color="139, 92, 246" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="p-6 lg:p-8 max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">
              {greetings()}, {user?.username || 'Forger'} <span className="inline-block animate-float" style={{ animationDuration: '3s' }}>👋</span>
            </h1>
            <p className="text-sm text-muted mt-1">Here&apos;s your LeetCode progress overview</p>
          </div>
          <Button onClick={() => setShowAdd(true)} className="shadow-lg shadow-purple-bright/25">
            <Plus className="w-4 h-4" />
            Add Problem
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map((card) => (
            <StatsCard key={card.label} {...card} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-glow" />
                  <CardTitle>Difficulty Distribution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {pieData.length > 0 ? (
                  <div className="flex items-center justify-center h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={110}
                          paddingAngle={4}
                          dataKey="value"
                          animationBegin={400}
                          animationDuration={1200}
                        >
                          {pieData.map((_, idx) => (
                            <Cell key={idx} fill={PIE_COLORS[idx]} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-3 shrink-0">
                      {pieData.map((entry, idx) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }} />
                          <span className="text-sm text-muted">{entry.name}</span>
                          <span className="text-sm font-medium text-white ml-2">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-[260px] flex items-center justify-center text-sm text-muted">No data yet</div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress Ring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[260px]">
                <ProgressRing solved={totalSolved} total={totalProblems} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Activity Heatmap placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[3px]">
                {Array.from({ length: 364 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-sm transition-colors duration-200 hover:scale-150 cursor-pointer"
                    style={{
                      backgroundColor: !stats?.totalProblems
                        ? 'rgba(255,255,255,0.03)'
                        : i % 7 === 0
                          ? 'rgba(34,197,94,0.3)'
                          : i % 5 === 0
                            ? 'rgba(34,197,94,0.15)'
                            : 'rgba(255,255,255,0.03)',
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-[11px] text-muted">Less</span>
                {[0.03, 0.1, 0.2, 0.4, 0.6].map((o) => (
                  <div key={o} className="w-3 h-3 rounded-sm" style={{ backgroundColor: `rgba(34,197,94,${o})` }} />
                ))}
                <span className="text-[11px] text-muted">More</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-glow" />
                <CardTitle>Recent Problems</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/problems'}>
                View all
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 glass rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : recent.length > 0 ? (
                <div className="divide-y divide-glass-border">
                  {recent.map((p, i) => (
                    <motion.div
                      key={p._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-center justify-between px-6 py-3.5 hover:bg-glass-hover transition-colors"
                    >
                      <span className="text-sm font-medium text-white truncate">{p.title}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={p.difficulty === 'Easy' ? 'success' : p.difficulty === 'Medium' ? 'warning' : 'danger'}>
                          {p.difficulty}
                        </Badge>
                        <Badge variant={p.status === 'Solved' ? 'solved' : p.status === 'Attempted' ? 'attempted' : 'review'}>
                          {p.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-muted">No problems yet. Add your first one!</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {showAdd && <AddProblemForm onClose={() => setShowAdd(false)} onSuccess={fetchData} />}
    </div>
  )
}
