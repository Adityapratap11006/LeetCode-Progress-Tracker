import { useState, useEffect } from 'react'
import { RefreshCw, Calendar, CheckCircle2, TrendingUp, Clock } from 'lucide-react'
import { getDueRevisions, getRevisionStats, completeRevision } from '../services/revisionService'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const badgeVariant = { Easy: 'success', Medium: 'warning', Hard: 'danger' }

function formatNextDate(dateStr) {
  if (!dateStr) return 'Today'
  const d = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(d)
  target.setHours(0, 0, 0, 0)
  const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24))
  if (diffDays <= 0) return 'Due now'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays < 7) return `In ${diffDays} days`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Revisions() {
  const [dueProblems, setDueProblems] = useState([])
  const [stats, setStats] = useState({ dueToday: 0, totalRevisionsCompleted: 0 })
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(null)

  const fetchData = async () => {
    try {
      const [dueData, statsData] = await Promise.all([
        getDueRevisions(),
        getRevisionStats(),
      ])
      setDueProblems(dueData)
      setStats(statsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData() }, [])

  const handleComplete = async (id) => {
    setCompleting(id)
    try {
      await completeRevision(id)
      setDueProblems((prev) => prev.filter((p) => p._id !== id))
      setStats((prev) => ({
        ...prev,
        dueToday: Math.max(0, prev.dueToday - 1),
        totalRevisionsCompleted: prev.totalRevisionsCompleted + 1,
      }))
    } catch (err) {
      console.error(err)
      fetchData()
    } finally {
      setCompleting(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base p-4 md:p-6 lg:p-8 max-w-5xl mx-auto flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted">Loading revisions...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Revisions</h1>
        <p className="text-sm text-muted mt-1">Spaced repetition keeps your problem-solving skills sharp</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-5 flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-2 text-muted mb-3">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-medium uppercase tracking-widest">Due Today</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats.dueToday || 0}</span>
            <span className="text-sm text-muted">revision{stats.dueToday !== 1 ? 's' : ''}</span>
          </div>
          <p className="text-xs text-muted mt-2">Focus on these to reinforce your knowledge</p>
        </Card>

        <Card className="p-5 flex flex-col justify-center min-h-[140px]">
          <div className="flex items-center gap-2 text-muted mb-3">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-[11px] font-medium uppercase tracking-widest">Completed</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats.totalRevisionsCompleted || 0}</span>
            <span className="text-sm text-muted">total</span>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-center min-h-[140px]">
          <div className="flex items-center gap-2 text-muted mb-3">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-[11px] font-medium uppercase tracking-widest">Queue</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{dueProblems.length}</span>
            <span className="text-sm text-muted">item{dueProblems.length !== 1 ? 's' : ''}</span>
          </div>
        </Card>
      </div>

      {/* Revision Queue */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Active Queue</h2>
        {dueProblems.length > 0 && (
          <span className="text-xs text-muted bg-surface px-2 py-0.5 rounded-full border border-border">
            {dueProblems.length} item{dueProblems.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {dueProblems.length > 0 ? (
        <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
          {dueProblems.map((problem) => (
            <div key={problem._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-4 hover:bg-hover transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="text-sm font-medium text-white truncate">{problem.title}</h3>
                  <Badge variant={badgeVariant[problem.difficulty] || 'default'}>{problem.difficulty}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Revision #{problem.revisionCount || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Next: {formatNextDate(problem.nextRevisionDate)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button onClick={() => handleComplete(problem._id)} disabled={completing === problem._id} size="sm">
                  {completing === problem._id ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  {completing === problem._id ? 'Marking...' : 'Mark as Revised'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="text-sm font-semibold text-white mb-1">All caught up!</h3>
          <p className="text-sm text-muted max-w-md mx-auto">
            No pending revisions. Keep solving problems to build your revision queue.
          </p>
        </Card>
      )}
    </div>
  )
}
