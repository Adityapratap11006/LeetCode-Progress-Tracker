import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, AlertCircle } from 'lucide-react'
import { updateProblem } from '../services/problemService'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog'

const STATUSES = ['Solved', 'Attempted', 'Need Review']

export default function EditProblemForm({ problem, onClose, onSuccess }) {
  const [form, setForm] = useState({
    status: problem?.status || 'Attempted',
    notes: problem?.notes || '',
    language: problem?.language || '',
    timeSpentMinutes: problem?.timeSpentMinutes || 0,
    attemptCount: problem?.attemptCount || 1,
    revisionCount: problem?.revisionCount || 0,
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: ['timeSpentMinutes', 'attemptCount', 'revisionCount'].includes(name) ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await updateProblem(problem._id, form)
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update problem')
    } finally {
      setSubmitting(false)
    }
  }

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
              <DialogTitle>Edit Problem</DialogTitle>
              <DialogDescription>{problem?.title}</DialogDescription>
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
                <label className="text-xs font-medium text-muted">Status</label>
                <Select name="status" value={form.status} onChange={handleChange}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </Select>
                {form.status === 'Solved' && (
                  <p className="text-xs text-muted mt-1">Marking as Solved will record the date automatically.</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Language <span className="text-muted/50">(optional)</span></label>
                <Input name="language" value={form.language} onChange={handleChange} placeholder="Python, JavaScript, ..." />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted">Time (min)</label>
                  <Input type="number" name="timeSpentMinutes" value={form.timeSpentMinutes} onChange={handleChange} min="0" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted">Attempts</label>
                  <Input type="number" name="attemptCount" value={form.attemptCount} onChange={handleChange} min="1" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted">Revisions</label>
                  <Input type="number" name="revisionCount" value={form.revisionCount} onChange={handleChange} min="0" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Notes <span className="text-muted/50">(optional)</span></label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="flex w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder:text-muted/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-200 resize-none"
                  placeholder="Any notes about this problem..."
                />
              </div>
            </form>

            <DialogFooter>
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
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
