import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, AlertCircle, CheckCircle2 } from 'lucide-react'
import { createProblem } from '../services/problemService'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog'

function isValidLeetCodeUrl(url) {
  try {
    const u = new URL(url)
    return u.hostname === 'leetcode.com' || u.hostname === 'www.leetcode.com'
  } catch {
    return false
  }
}

export default function AddProblemForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    difficulty: 'Easy',
    status: 'Attempted',
    topic: '',
    leetcodeLink: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [urlError, setUrlError] = useState('')

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleUrlChange = (e) => {
    const val = e.target.value
    setForm((prev) => ({ ...prev, leetcodeLink: val }))
    if (val && !isValidLeetCodeUrl(val)) {
      setUrlError('Must be a valid LeetCode URL (https://leetcode.com/problems/...)')
    } else if (val && isValidLeetCodeUrl(val)) {
      setUrlError('')
    } else {
      setUrlError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title is required'); return }
    if (!form.leetcodeLink.trim()) { setError('LeetCode link is required'); return }
    if (!isValidLeetCodeUrl(form.leetcodeLink)) { setUrlError('Must be a valid LeetCode URL (https://leetcode.com/problems/...)'); return }
    setError('')
    setUrlError('')
    setSubmitting(true)
    try {
      // If status is Solved, backend will set solvedAt=now automatically
      await createProblem(form)
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create problem')
    } finally {
      setSubmitting(false)
    }
  }

  const isValid = form.leetcodeLink && isValidLeetCodeUrl(form.leetcodeLink)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-lg"
        >
          <DialogContent onClose={onClose}>
            <DialogHeader>
              <DialogTitle>Add Problem</DialogTitle>
              <DialogDescription>Track a new LeetCode problem</DialogDescription>
            </DialogHeader>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mx-6 mb-2 p-3 rounded-lg bg-danger/10 border border-danger/20 text-sm text-danger flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="px-6 pb-2 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Title</label>
                <Input name="title" value={form.title} onChange={handleChange} placeholder="Two Sum" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted">Difficulty</label>
                  <Select name="difficulty" value={form.difficulty} onChange={handleChange}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted">Status</label>
                  <Select name="status" value={form.status} onChange={handleChange}>
                    <option value="Solved">Solved</option>
                    <option value="Attempted">Attempted</option>
                    <option value="Need Review">Need Review</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Topic <span className="text-muted/50">(optional)</span></label>
                <Input name="topic" value={form.topic} onChange={handleChange} placeholder="Arrays, Hash Table, ..." />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">LeetCode Link</label>
                <Input
                  name="leetcodeLink"
                  value={form.leetcodeLink}
                  onChange={handleUrlChange}
                  placeholder="https://leetcode.com/problems/two-sum/"
                  className={urlError ? 'border-danger/50 focus:border-danger/50 focus:ring-danger/20' : isValid ? 'border-success/50 focus:border-success/50' : ''}
                />
                {urlError && (
                  <p className="text-xs text-danger flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {urlError}
                  </p>
                )}
                {isValid && (
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Valid LeetCode URL
                  </p>
                )}
                {form.status === 'Solved' && (
                  <p className="text-xs text-muted mt-1">Status is set to Solved — solvedAt will be recorded automatically.</p>
                )}
              </div>
            </form>

            <DialogFooter>
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Problem
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
