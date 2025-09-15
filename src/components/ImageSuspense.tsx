'use client'

import { Suspense } from 'react'
import { cn } from '@/lib/utils'
import Loader from './Loader'

interface ImageSuspenseProps {
  children: React.ReactNode
  className?: string
  loaderSize?: 'sm' | 'md' | 'lg' | 'xl'
  loaderVariant?: 'spinner' | 'dots' | 'pulse'
  fallback?: React.ReactNode
}

export default function ImageSuspense({
  children,
  className,
  loaderSize = 'md',
  loaderVariant = 'spinner',
  fallback
}: ImageSuspenseProps) {
  const defaultFallback = (
    <div
      className={cn(
        'bg-background/50 flex items-center justify-center',
        'border-button/30 min-h-[200px] rounded-lg border-2 border-dashed',
        className
      )}
    >
      <Loader size={loaderSize} variant={loaderVariant} />
    </div>
  )

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>
}
