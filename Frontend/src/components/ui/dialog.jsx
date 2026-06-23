import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { X } from 'lucide-react'

const DialogOverlay = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/70',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = forwardRef(({ className, children, onClose, ...props }, ref) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      ref={ref}
      className={cn(
        'relative w-full max-w-lg rounded-xl border border-border bg-surface shadow-xl',
        className,
      )}
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-muted hover:text-white hover:bg-hover transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      {children}
    </div>
  </div>
))
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({ className, ...props }) => (
  <div className={cn('px-6 pt-6 pb-4', className)} {...props} />
)

const DialogTitle = ({ className, ...props }) => (
  <h2 className={cn('text-lg font-semibold text-white', className)} {...props} />
)

const DialogDescription = ({ className, ...props }) => (
  <p className={cn('text-sm text-muted mt-1', className)} {...props} />
)

const DialogFooter = ({ className, ...props }) => (
  <div className={cn('flex items-center justify-end gap-3 px-6 py-4 border-t border-border', className)} {...props} />
)

export { DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter }
