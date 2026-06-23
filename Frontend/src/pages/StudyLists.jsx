import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronDown, ChevronRight, BookOpen, ExternalLink } from 'lucide-react'
import { getStudyLists, createStudyList, deleteStudyList, addProblemToList, removeProblemFromList } from '../services/studyListService'
import { getProblems } from '../services/problemService'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const badgeVariant = { Easy: 'success', Medium: 'warning', Hard: 'danger' }

export default function StudyLists() {
  const [lists, setLists] = useState([])
  const [allProblems, setAllProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [addingToList, setAddingToList] = useState(null)

  const fetchData = async () => {
    try {
      const [listsData, problemsData] = await Promise.all([
        getStudyLists(),
        getProblems({ limit: 200 }).catch(() => ({ problems: [] })),
      ])
      setLists(listsData)
      setAllProblems(problemsData.problems ?? problemsData ?? [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData() }, [])

  const handleCreate = async () => {
    if (!newName.trim()) return
    try {
      const data = { name: newName.trim() }
      if (newDesc.trim()) data.description = newDesc.trim()
      await createStudyList(data)
      setNewName('')
      setNewDesc('')
      setShowCreate(false)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteStudyList(id)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddProblem = async (listId, problemId) => {
    try {
      await addProblemToList(listId, problemId)
      setAddingToList(null)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemoveProblem = async (listId, problemId) => {
    try {
      await removeProblemFromList(listId, problemId)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const getProgress = (list) => {
    if (!list.problems?.length) return 0
    const solved = list.problems.filter((p) => p.status === 'Solved').length
    return Math.round((solved / list.problems.length) * 100)
  }

  const problemsNotInList = (list) =>
    allProblems.filter((p) => !list.problems?.some((lp) => lp._id === p._id || lp === p._id))

  if (loading) {
    return (
      <div className="min-h-screen bg-base p-4 md:p-6 lg:p-8 max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted">Loading study lists...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Study Lists</h1>
          <p className="text-sm text-muted mt-1">Organize problems into custom study lists</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4" />
          Create List
        </Button>
      </div>

      {showCreate && (
        <Card className="p-4 mb-6">
          <div className="space-y-3">
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Study list name" autoFocus />
            <Input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Description (optional)" />
            <div className="flex items-center gap-2">
              <Button onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
              <Button variant="ghost" onClick={() => { setShowCreate(false); setNewName(''); setNewDesc('') }}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      {lists.length === 0 && !showCreate ? (
        <div className="p-12 text-center">
          <BookOpen className="w-12 h-12 text-muted mx-auto mb-4" />
          <p className="text-muted text-sm mb-4">No study lists yet. Create your first one!</p>
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4" />
            Create List
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map((list) => {
            const progress = getProgress(list)
            const totalProblems = list.problems?.length || 0
            const solvedCount = list.problems?.filter((p) => p.status === 'Solved').length || 0
            const availableProblems = problemsNotInList(list)

            return (
              <Card key={list._id}>
                <CardContent className="p-0">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">{list.name}</h3>
                        {list.description && (
                          <p className="text-xs text-muted mt-0.5 truncate">{list.description}</p>
                        )}
                      </div>
                      <button onClick={() => handleDelete(list._id)} className="p-1 rounded text-muted hover:text-danger hover:bg-danger/10 transition-colors shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted">{solvedCount}/{totalProblems} solved</span>
                      <span className="text-xs font-medium text-white">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-hover rounded-full overflow-hidden mt-1.5">
                      <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.max(progress, 4)}%` }} />
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    {availableProblems.length > 0 && (
                      <div className="relative">
                        <Button variant="secondary" size="sm" className="w-full justify-between" onClick={() => setAddingToList(addingToList === list._id ? null : list._id)}>
                          <span>Add Problem</span>
                          <span className="text-muted">+</span>
                        </Button>
                        {addingToList === list._id && (
                          <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-40 overflow-y-auto bg-surface border border-border rounded-lg shadow-xl">
                            {availableProblems.slice(0, 20).map((p) => (
                              <button key={p._id} onClick={() => handleAddProblem(list._id, p._id)} className="w-full text-left px-3 py-2 text-xs text-white hover:bg-hover transition-colors truncate">
                                {p.title}
                              </button>
                            ))}
                            {availableProblems.length === 0 && (
                              <p className="px-3 py-2 text-xs text-muted">All problems already in list</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {totalProblems > 0 && (
                      <button onClick={() => setExpanded(expanded === list._id ? null : list._id)} className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors">
                        {expanded === list._id ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        View {totalProblems} problem{totalProblems !== 1 ? 's' : ''}
                      </button>
                    )}
                  </div>

                  {expanded === list._id && (
                    <div className="border-t border-border divide-y divide-border">
                      {list.problems.map((p) => (
                        <div key={p._id} className="flex items-center justify-between px-4 py-2.5 hover:bg-hover transition-colors group">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="text-xs text-white truncate">{p.title}</span>
                            {p.leetcodeLink && (
                              <a href={p.leetcodeLink} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary shrink-0">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <Badge variant={badgeVariant[p.difficulty] || 'default'} className="text-[10px] px-1.5 py-0">
                              {p.difficulty}
                            </Badge>
                            <button onClick={() => handleRemoveProblem(list._id, p._id)} className="text-muted hover:text-danger transition-colors">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
