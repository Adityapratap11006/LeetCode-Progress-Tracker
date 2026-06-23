import { cn } from '../../lib/utils'

const variants = {
  solved: 'bg-success-subtle text-success border-success/20',
  attempted: 'bg-attempted-subtle text-attempted border-attempted/20',
  review: 'bg-purple-bright/10 text-purple-glow border-purple-bright/20',
  default: 'bg-glass text-muted border-glass-border',
  success: 'bg-success-subtle text-success border-success/20',
  warning: 'bg-warning-subtle text-warning border-warning/20',
  danger: 'bg-danger-subtle text-danger border-danger/20',
  accent: 'bg-purple-bright/10 text-purple-glow border-purple-bright/20',
}

export function Badge({ className, variant = 'default', children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium border',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
