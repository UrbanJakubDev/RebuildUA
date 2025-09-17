'use client'

import Image from 'next/image'
import { useState } from 'react'
import ImageSuspense from './ImageSuspense'

interface LocalImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: number
  className?: string
  clickable?: boolean
  onClick?: () => void
  priority?: boolean
}

export default function LocalImage({
  src,
  alt,
  width = 800,
  height = 600,
  quality = 90,
  className = '',
  clickable = false,
  onClick,
  priority = false
}: LocalImageProps) {
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
  }

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}
        style={{ width, height }}
      >
        <span>Obrázek se nepodařilo načíst</span>
      </div>
    )
  }

  return (
    <ImageSuspense className={className} loaderSize='md' loaderVariant='pulse'>
      <div className={`relative flex items-center justify-center ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          className={`${clickable ? 'cursor-pointer' : ''}`}
          onClick={clickable ? onClick : undefined}
          onError={handleError}
        />
      </div>
    </ImageSuspense>
  )
}
