import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import {
  Zap, CheckCircle2, Timer, Plus, RefreshCw, BarChart3,
  TrendingUp, Target,
} from 'lucide-react'
import { getStats, getStreak, getProblems, getHeatmap } from '../services/problemService'
import { useAuth } from '../context/AuthContext'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

const greetings = () => {
  const h = parseInt(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }))
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Good night'
}

const DAYS = 364
const HEATMAP_COLS = 52

function generateHeatmapData(activityData) {
  const activityMap = {}
  if (activityData && activityData.length) {
    activityData.forEach(({ date, count }) => { activityMap[date] = count })
  }
  const cells = []
  const today = new Date()
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const count = activityMap[dateStr] || 0
    let level = 0
    if (count > 0) level = count >= 4 ? 4 : count >= 3 ? 3 : count >= 2 ? 2 : 1
    cells.push({ date: dateStr, count, level })
  }
  return cells
}

function getLevelColor(level) {
  const colors = ['bg-hover', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary']
  return colors[level] || colors[0]
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div className="bg-surface border border-border rounded-lg px-3 py-2 text-sm shadow-xl">
        <p className="text-white font-medium">{label}</p>
        <p className="text-muted">{payload[0].value} problems</p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [streak, setStreak] = useState(0)
  const [recent, setRecent] = useState([])
  const [heatmapData, setHeatmapData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)

  const fetchData = async () => {
    try {
      const [statsData, streakData, problemsData, heatmapRaw] = await Promise.all([
        getStats(),
        getStreak(),
        getProblems({ limit: 5, sort: '-createdAt' }),
        getHeatmap().catch(() => []),
      ])
      setStats(statsData)
      setStreak(streakData.streak ?? 0)
      setRecent(problemsData.problems ?? problemsData ?? [])
      setHeatmapData(generateHeatmapData(heatmapRaw))
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData() }, [])

  const totalSolved = stats?.solvedProblems ?? 0
  const easyCount = stats?.easyProblems ?? 0
  const mediumCount = stats?.mediumProblems ?? 0
  const hardCount = stats?.hardProblems ?? 0
  const timeSpent = stats?.totalTimeSpent ?? 0

  const hours = Math.floor(timeSpent / 60)
  const minutes = timeSpent % 60
  const timeDisplay = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

  const weeklyData = (() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days.map((name, i) => {
      const today = new Date()
      const dayOffset = (today.getDay() - i + 7) % 7
      const target = new Date(today)
      target.setDate(today.getDate() - dayOffset)
      const dateStr = target.toISOString().split('T')[0]
      const cell = heatmapData.find(c => c.date === dateStr)
      return { name, count: cell?.count || 0 }
    }).reverse()
  })()

  const statCards = [
    { icon: Zap, label: 'Current Streak', value: `${streak} day${streak !== 1 ? 's' : ''}`, color: 'text-primary' },
    { icon: CheckCircle2, label: 'Total Solved', value: totalSolved, color: 'text-success' },
    { icon: Target, label: 'Easy', value: easyCount, color: 'text-success' },
    { icon: TrendingUp, label: 'Medium', value: mediumCount, color: 'text-warning' },
    { icon: BarChart3, label: 'Hard', value: hardCount, color: 'text-danger' },
    { icon: Timer, label: 'Time Spent', value: timeDisplay, color: 'text-accent' },
  ]

  return (
    <div className="min-h-screen bg-base p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {greetings()}, {user?.username || 'Forger'}
          </h1>
          <p className="text-sm text-muted mt-1">Track your coding progress and stay consistent</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAdd(true)}>
            <Plus className="w-4 h-4" />
            Add Problem
          </Button>
          <Button variant="secondary" onClick={() => navigate('/revisions')}>
            <RefreshCw className="w-4 h-4" />
            Review
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/analytics')}>
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {statCards.map((card) => (
          <Card key={card.label} className="p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <card.icon className={`w-4 h-4 ${card.color}`} />
              <span className="text-[11px] font-medium uppercase tracking-widest text-muted">{card.label}</span>
            </div>
            <span className={`text-xl font-bold ${card.color}`}>
              {card.value}
            </span>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#10b981" maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Difficulty Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Easy', count: easyCount, total: totalSolved || 1, color: 'bg-success' },
              { label: 'Medium', count: mediumCount, total: totalSolved || 1, color: 'bg-warning' },
              { label: 'Hard', count: hardCount, total: totalSolved || 1, color: 'bg-danger' },
            ].map(({ label, count, total, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-muted">{label}</span>
                  <span className="text-sm font-medium text-white">{count}</span>
                </div>
                <div className="h-2 bg-hover rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${color}`}
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-[3px]" style={{ minWidth: 700 }}>
              {Array.from({ length: HEATMAP_COLS }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {[0, 1, 2, 3, 4, 5, 6].map((rowIdx) => {
                    const cellIdx = colIdx * 7 + rowIdx
                    const cell = heatmapData[cellIdx]
                    return (
                      <div
                        key={rowIdx}
                        className={`w-3 h-3 rounded-sm ${cell ? getLevelColor(cell.level) : 'bg-hover'}`}
                        title={cell ? `${cell.date}: ${cell.count} solved` : ''}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-[11px] text-muted">Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} className={`w-3 h-3 rounded-sm ${getLevelColor(l)}`} />
            ))}
            <span className="text-[11px] text-muted">More</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Problems */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Problems</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('/problems')}>
            View all
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-hover rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recent.length > 0 ? (
            <div className="divide-y divide-border">
              {recent.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-hover transition-colors"
                >
                  <span className="text-sm font-medium text-white truncate mr-4">{p.title}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={p.difficulty === 'Easy' ? 'success' : p.difficulty === 'Medium' ? 'warning' : 'danger'}>
                      {p.difficulty}
                    </Badge>
                    <Badge variant={p.status === 'Solved' ? 'solved' : p.status === 'Attempted' ? 'attempted' : 'review'}>
                      {p.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-muted">No problems yet. Add your first one!</div>
          )}
        </CardContent>
      </Card>

      {/* Add Problem Dialog */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-surface shadow-xl p-6">
            <button
              onClick={() => setShowAdd(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-muted hover:text-white hover:bg-hover transition-colors"
            >
              <span className="text-lg">&times;</span>
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">Add Problem</h2>
            <p className="text-sm text-muted">Problem form integration coming soon.</p>
          </div>
        </div>
      )}
    </div>
  )
}
