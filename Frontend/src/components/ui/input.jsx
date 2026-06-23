import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-9 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder:text-muted/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-200',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'

export { Input }
