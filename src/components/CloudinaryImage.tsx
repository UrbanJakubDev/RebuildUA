'use client'

import { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { cn } from '@/lib/utils'
import Loader from './Loader'
import { CLOUDINARY_CONFIG } from '@/src/lib/cloudinary-config'

interface CloudinaryImageProps {
  publicId: string
  alt: string
  width?: number | string
  height?: number | string
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  crop?: 'fill' | 'scale' | 'fit' | 'thumb' | 'crop' | 'limit'
  gravity?: 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'center' | 'faces'
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'gif'
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fill?: boolean
  onClick?: () => void
  clickable?: boolean
  showLoader?: boolean
  loaderSize?: 'sm' | 'md' | 'lg' | 'xl'
  loaderVariant?: 'spinner' | 'dots' | 'pulse'
}

export default function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  quality = 75,
  crop = 'fill',
  gravity = 'auto',
  format = 'auto',
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  onClick,
  clickable = false,
  showLoader = true,
  loaderSize = 'md',
  loaderVariant = 'spinner'
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Extract public ID from Cloudinary URL if full URL is provided
  const extractPublicId = (input: string): string => {
    if (
      input.includes('cloudinary.com') ||
      input.includes('res.cloudinary.com')
    ) {
      try {
        const url = new URL(input)
        const pathParts = url.pathname.split('/')
        const uploadIndex = pathParts.indexOf('upload')

        if (uploadIndex !== -1 && uploadIndex + 2 < pathParts.length) {
          // Skip version and filename, get the public ID
          return pathParts
            .slice(uploadIndex + 2)
            .join('/')
            .replace(/\.[^/.]+$/, '')
        }
      } catch (error) {
        console.error('Error parsing Cloudinary URL:', error)
      }
    }
    return input
  }

  const finalPublicId = extractPublicId(publicId)

  const imageProps = {
    src: finalPublicId,
    alt,
    className: cn(
      className || '',
      clickable ? 'hover:opacity-90 transition-opacity' : '',
      isLoading ? 'opacity-0' : 'opacity-100'
    ),
    priority,
    sizes,
    quality,
    crop,
    gravity,
    format,
    loading,
    placeholder,
    blurDataURL,
    onLoad: () => setIsLoading(false),
    onError: () => {
      setIsLoading(false)
      setHasError(true)
    }
  }

  const handleClick = () => {
    if (clickable && onClick) {
      onClick()
    }
  }

  const renderImage = () => {
    // If fill is true, we don't need width/height
    if (fill) {
      return <CldImage {...imageProps} fill cloudName={CLOUDINARY_CONFIG.cloudName} />
    }

    // CldImage requires width and height when not using fill, so we need to provide defaults if not given
    const finalWidth = width || 800
    const finalHeight = height || 600

    return (
      <CldImage
        {...imageProps}
        width={finalWidth as number}
        height={finalHeight as number}
        cloudName={CLOUDINARY_CONFIG.cloudName}
      />
    )
  }

  return (
    <div
      onClick={handleClick}
      className={cn('relative', clickable ? 'cursor-pointer' : '')}
    >
      {renderImage()}

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
