'use client'

import { cn } from "@/lib/utils"



interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  variant?: 'spinner' | 'dots' | 'pulse'
}

export default function Loader({
  size = 'md',
  className,
  variant = 'spinner'
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const renderSpinner = () => (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-transparent',
        'border-r-button/30 border-t-button',
        sizeClasses[size],
        className
      )}
    />
  )

  const renderDots = () => (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={cn(
            'animate-pulse rounded-full bg-button',
            size === 'sm' && 'h-1.5 w-1.5',
            size === 'md' && 'h-2 w-2',
            size === 'lg' && 'h-2.5 w-2.5',
            size === 'xl' && 'h-3 w-3'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div
      className={cn(
        'animate-pulse rounded-full bg-button',
        sizeClasses[size],
        className
      )}
    />
  )

  switch (variant) {
    case 'dots':
      return renderDots()
    case 'pulse':
      return renderPulse()
    default:
      return renderSpinner()
  }
}
