import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-lg border border-glass-border bg-glass px-3 py-2 pr-8 text-sm text-white appearance-none focus:outline-none focus:border-purple-bright/40 focus:ring-1 focus:ring-purple-bright/20 transition-all duration-200 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
  </div>
))
Select.displayName = 'Select'

export { Select }
