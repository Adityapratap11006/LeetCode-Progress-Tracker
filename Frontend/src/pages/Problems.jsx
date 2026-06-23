import { useState, useEffect, useCallback } from 'react'
import { Search, Plus, RefreshCw, Trash2, Edit3, ExternalLink, FileText } from 'lucide-react'
import { getProblems, deleteProblem } from '../services/problemService'
import AddProblemForm from '../components/AddProblemForm'
import EditProblemForm from '../components/EditProblemForm'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'

const DIFFICULTIES = [
  { value: 'All', label: 'All Difficulties' },
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' },
]

const STATUS_FILTERS = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Solved', label: 'Solved' },
  { value: 'Attempted', label: 'Attempted' },
  { value: 'Need Review', label: 'Need Review' },
]

const SORTS = [
  { value: '-createdAt', label: 'Newest' },
  { value: 'createdAt', label: 'Oldest' },
  { value: 'title', label: 'Title A-Z' },
  { value: '-title', label: 'Title Z-A' },
  { value: '-timeSpentMinutes', label: 'Most Time' },
]

const PAGE_SIZES = [10, 25, 50]

const badgeVariant = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
  Solved: 'solved',
  Attempted: 'attempted',
  'Need Review': 'review',
}

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
        active
          ? 'bg-primary/10 text-primary border-primary/20'
          : 'text-muted border-border hover:text-white hover:bg-hover'
      }`}
    >
      {label}
    </button>
  )
}

export default function Problems() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState('-createdAt')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)
  const [showAdd, setShowAdd] = useState(false)
  const [editProblem, setEditProblem] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [showNotes, setShowNotes] = useState(null)

  const fetchProblems = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, limit, sort }
      if (difficulty !== 'All') params.difficulty = difficulty
      if (status !== 'All') params.status = status
      if (search.trim()) params.search = search.trim()
      const data = await getProblems(params)
      setProblems(data.problems ?? data)
      setTotalPages(data.totalPages ?? 1)
      setTotal(data.total ?? 0)
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false)
    }
  }, [page, limit, sort, difficulty, status, search])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchProblems() }, [fetchProblems])
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setPage(1) }, [difficulty, status, search, limit])

  const handleDelete = async (problem) => {
    setDeleting(problem._id)
    try {
      await deleteProblem(problem._id)
      fetchProblems()
    } catch {
      // handled
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="min-h-screen bg-base p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Problems</h1>
          <p className="text-sm text-muted mt-1">Manage and track your LeetCode problems</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4" />
          Add Problem
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="pl-9"
            />
          </div>
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="min-w-[140px]">
            {DIFFICULTIES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="min-w-[140px]">
            {STATUS_FILTERS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="min-w-[130px]">
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
          <Button variant="ghost" size="icon" onClick={fetchProblems} title="Refresh">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
            <Chip key={d} label={d === 'All' ? 'All' : d} active={difficulty === d} onClick={() => setDifficulty(d)} />
          ))}
          <span className="w-px h-5 bg-border self-center mx-1" />
          {['All', 'Solved', 'Attempted', 'Need Review'].map((s) => (
            <Chip key={s} label={s === 'All' ? 'All Statuses' : s} active={status === s} onClick={() => setStatus(s)} />
          ))}
        </div>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-hover rounded-lg animate-pulse" />
              ))}
            </div>
          ) : problems.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-muted">Title</th>
                      <th className="text-left px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-muted">Difficulty</th>
                      <th className="text-left px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-muted">Status</th>
                      <th className="text-left px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-muted">Tags</th>
                      <th className="text-left px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-muted">Language</th>
                      <th className="text-left px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-muted">Time</th>
                      <th className="text-left px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-muted">Attempts</th>
                      <th className="text-right px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {problems.map((p) => (
                      <tr key={p._id} className="group hover:bg-hover transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 max-w-[240px]">
                            <span className="text-sm font-medium text-white truncate">{p.title}</span>
                            {p.leetcodeLink && (
                              <a href={p.leetcodeLink} target="_blank" rel="noopener noreferrer"
                                className="text-muted hover:text-primary transition-colors shrink-0">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={badgeVariant[p.difficulty] || 'default'}>{p.difficulty}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={badgeVariant[p.status] || 'default'}>{p.status}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-[160px]">
                            {p.tags?.length > 0 ? (
                              p.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-hover text-muted border border-border">
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-muted">—</span>
                            )}
                            {p.tags?.length > 2 && (
                              <span className="text-[10px] text-muted">+{p.tags.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted">{p.language || '—'}</td>
                        <td className="px-6 py-4 text-muted">{p.timeSpentMinutes ? `${p.timeSpentMinutes}m` : '—'}</td>
                        <td className="px-6 py-4 text-muted">{p.attemptCount || '—'}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => setShowNotes(showNotes === p._id ? null : p._id)} title="Notes">
                              <FileText className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditProblem(p)} title="Edit">
                              <Edit3 className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost" size="icon"
                              onClick={() => handleDelete(p)}
                              title="Delete"
                              className="hover:text-danger hover:bg-danger/10"
                              disabled={deleting === p._id}
                            >
                              <Trash2 className={`w-3.5 h-3.5 ${deleting === p._id ? 'animate-spin' : ''}`} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {showNotes && (
                <div className="border-t border-border px-6 py-4 bg-secondary/50">
                  <p className="text-xs text-muted mb-1">Notes for <span className="text-white font-medium">{problems.find(p => p._id === showNotes)?.title}</span></p>
                  <p className="text-sm text-white">{problems.find(p => p._id === showNotes)?.notes || 'No notes added.'}</p>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center">
              <p className="text-muted text-sm">No problems found</p>
              <Button variant="secondary" className="mt-4" onClick={() => setShowAdd(true)}>
                <Plus className="w-4 h-4" />
                Add your first problem
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-hover rounded-lg animate-pulse" />
          ))
        ) : problems.length > 0 ? (
          problems.map((p) => (
            <Card key={p._id} className="p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-white truncate">{p.title}</span>
                    {p.leetcodeLink && (
                      <a href={p.leetcodeLink} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary shrink-0">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge variant={badgeVariant[p.difficulty] || 'default'}>{p.difficulty}</Badge>
                    <Badge variant={badgeVariant[p.status] || 'default'}>{p.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => setShowNotes(showNotes === p._id ? null : p._id)} title="Notes">
                    <FileText className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setEditProblem(p)} title="Edit">
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(p)} className="hover:text-danger hover:bg-danger/10" disabled={deleting === p._id}>
                    <Trash2 className={`w-3.5 h-3.5 ${deleting === p._id ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                {p.language && <span>Lang: {p.language}</span>}
                {p.timeSpentMinutes ? <span>Time: {p.timeSpentMinutes}m</span> : null}
                {p.attemptCount ? <span>Attempts: {p.attemptCount}</span> : null}
              </div>
              {p.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-hover text-muted border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {showNotes === p._id && (
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-xs text-muted mb-1">Notes:</p>
                  <p className="text-xs text-white">{p.notes || 'No notes added.'}</p>
                </div>
              )}
            </Card>
          ))
        ) : (
          <div className="p-12 text-center">
            <p className="text-muted text-sm">No problems found</p>
            <Button variant="secondary" className="mt-4" onClick={() => setShowAdd(true)}>
              <Plus className="w-4 h-4" />
              Add your first problem
            </Button>
          </div>
        )}
      </div>

      {problems.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Rows per page:</span>
            <Select value={String(limit)} onChange={(e) => setLimit(Number(e.target.value))} className="min-w-[70px]">
              {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
            <span className="text-xs text-muted ml-2">{total} total</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Previous
            </Button>
            <span className="text-xs text-muted px-2">Page {page} of {totalPages}</span>
            <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              Next
            </Button>
          </div>
        </div>
      )}

      {showAdd && <AddProblemForm onClose={() => setShowAdd(false)} onSuccess={fetchProblems} />}
      {editProblem && <EditProblemForm key={editProblem._id} problem={editProblem} onClose={() => setEditProblem(null)} onSuccess={fetchProblems} />}
    </div>
  )
}
