'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Loader from './Loader'

interface ImageLoaderProps {
  children: React.ReactNode
  className?: string
  loaderSize?: 'sm' | 'md' | 'lg' | 'xl'
  loaderVariant?: 'spinner' | 'dots' | 'pulse'
  showLoader?: boolean
}

export default function ImageLoader({
  children,
  className,
  loaderSize = 'md',
  loaderVariant = 'spinner',
  showLoader = true
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className={cn('relative', className)}>
      {children}

      {/* Loading overlay */}
      {showLoader && isLoading && (
        <div className='bg-background/80 absolute inset-0 flex items-center justify-center backdrop-blur-sm'>
          <Loader size={loaderSize} variant={loaderVariant} />
        </div>
      )}

      {/* Error overlay */}
      {hasError && (
        <div className='bg-background/80 absolute inset-0 flex items-center justify-center backdrop-blur-sm'>
          <div className='text-center text-text-secondary'>
            <div className='mb-2 text-2xl'>⚠️</div>
            <div className='text-sm'>Chyba načítání obrázku</div>
          </div>
        </div>
      )}
    </div>
  )
}
