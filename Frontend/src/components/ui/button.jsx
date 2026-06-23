import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Button = forwardRef(({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
  const variants = {
    default:
      'bg-primary text-white hover:bg-primary-hover shadow-sm',
    secondary: 'bg-surface text-white hover:bg-hover border border-border',
    ghost: 'text-muted hover:text-white hover:bg-hover',
    danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20',
    outline:
      'bg-transparent text-muted border border-border hover:bg-hover hover:text-white',
  }
  const sizes = {
    default: 'h-9 px-4 text-sm',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-11 px-6 text-sm',
    xl: 'h-12 px-8 text-base',
    icon: 'h-9 w-9 p-0',
  }

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})
Button.displayName = 'Button'

export { Button }
