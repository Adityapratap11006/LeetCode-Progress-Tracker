import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, CheckCircle2, Timer, Zap } from 'lucide-react'
import { getStats, getStreak } from '../services/problemService'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

export default function Analytics() {
  const [stats, setStats] = useState(null)
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, streakData] = await Promise.all([
          getStats(),
          getStreak(),
        ])
        setStats(statsData)
        setStreak(streakData.streak ?? 0)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-base p-4 md:p-6 lg:p-8 max-w-6xl mx-auto flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted">Loading analytics...</span>
        </div>
      </div>
    )
  }

  const totalSolved = stats?.solvedProblems ?? 0
  const totalProblems = stats?.totalProblems ?? 0
  const completionRate = totalProblems ? Math.round((totalSolved / totalProblems) * 100) : 0
  const timeSpent = stats?.totalTimeSpent ?? 0

  const chartData = [
    { name: 'Easy', count: stats?.easyProblems || 0, fill: '#22c55e' },
    { name: 'Medium', count: stats?.mediumProblems || 0, fill: '#f59e0b' },
    { name: 'Hard', count: stats?.hardProblems || 0, fill: '#f43f5e' },
  ]

  const statCards = [
    { icon: CheckCircle2, label: 'Completion Rate', value: `${completionRate}%`, color: 'text-primary' },
    { icon: TrendingUp, label: 'Total Problems', value: totalProblems, color: 'text-success' },
    { icon: Zap, label: 'Current Streak', value: `${streak} day${streak !== 1 ? 's' : ''}`, color: 'text-warning' },
    { icon: Timer, label: 'Total Time Spent', value: timeSpent ? `${timeSpent}m` : '0m', color: 'text-accent' },
  ]

  return (
    <div className="min-h-screen bg-base p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-muted mt-1">Detailed insights into your progress</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {statCards.map((card) => (
          <Card key={card.label} className="p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <card.icon className={`w-4 h-4 ${card.color}`} />
              <span className="text-[11px] font-medium uppercase tracking-widest text-muted">{card.label}</span>
            </div>
            <span className={`text-xl font-bold ${card.color}`}>{card.value}</span>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Difficulty Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} contentStyle={{ backgroundColor: '#1C1F2B', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {['Easy', 'Medium', 'Hard'].map((level) => {
          const count = level === 'Easy' ? stats?.easyProblems : level === 'Medium' ? stats?.mediumProblems : stats?.hardProblems
          const color = level === 'Easy' ? 'bg-success' : level === 'Medium' ? 'bg-warning' : 'bg-danger'
          const textColor = level === 'Easy' ? 'text-success' : level === 'Medium' ? 'text-warning' : 'text-danger'
          return (
            <Card key={level} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${textColor}`}>{level}</span>
                <span className="text-sm text-white">{count}</span>
              </div>
              <div className="h-2 bg-hover rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${(count / (stats?.totalProblems || 1)) * 100}%` }} />
              </div>
              <p className="text-xs text-muted mt-1">{count} of {totalProblems} total</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
