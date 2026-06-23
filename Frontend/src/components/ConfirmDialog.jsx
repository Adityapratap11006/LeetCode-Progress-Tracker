import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from './ui/button'
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmText = 'Delete', cancelText = 'Cancel', variant = 'danger' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogContent onClose={onClose}>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${variant === 'danger' ? 'bg-danger/10' : 'bg-warning/10'}`}>
                    <AlertTriangle className={`w-5 h-5 ${variant === 'danger' ? 'text-danger' : 'text-warning'}`} />
                  </div>
                  <DialogTitle>{title}</DialogTitle>
                </div>
              </DialogHeader>
              <DialogDescription className="px-6">{description}</DialogDescription>
              <DialogFooter>
                <Button variant="secondary" onClick={onClose}>{cancelText}</Button>
                <Button variant={variant === 'danger' ? 'destructive' : 'default'} onClick={onConfirm}>
                  {confirmText}
                </Button>
              </DialogFooter>
            </DialogContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
