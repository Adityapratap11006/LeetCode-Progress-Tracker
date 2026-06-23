import { cn } from '../../lib/utils'

const variants = {
  solved: 'bg-success/10 text-success border-success/20',
  attempted: 'bg-blue/10 text-blue border-blue/20',
  review: 'bg-primary/10 text-primary border-primary/20',
  default: 'bg-surface text-muted border-border',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  accent: 'bg-primary/10 text-primary border-primary/20',
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
