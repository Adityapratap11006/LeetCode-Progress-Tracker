import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Button = forwardRef(({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
  const variants = {
    default:
      'bg-gradient-to-r from-purple-bright to-indigo-bright text-white hover:from-purple-glow hover:to-indigo-bright shadow-lg shadow-purple-bright/25 hover:shadow-purple-bright/40',
    secondary: 'bg-glass text-white hover:bg-glass-hover border border-glass-border',
    ghost: 'text-muted hover:text-white hover:bg-glass-hover',
    danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20',
    outline:
      'bg-transparent text-muted border border-glass-border hover:bg-glass-hover hover:text-white',
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
