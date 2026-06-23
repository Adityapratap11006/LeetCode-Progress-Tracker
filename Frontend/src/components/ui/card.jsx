import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Card = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('glass-card glass-card-glow', className)} {...props}>
    {children}
  </div>
))
Card.displayName = 'Card'

const CardHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center justify-between px-6 py-5 border-b border-glass-border', className)} {...props}>
    {children}
  </div>
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-sm font-semibold text-white', className)} {...props}>
    {children}
  </h3>
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn('text-xs text-muted', className)} {...props}>
    {children}
  </p>
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props}>
    {children}
  </div>
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center px-6 py-4 border-t border-glass-border', className)} {...props}>
    {children}
  </div>
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
