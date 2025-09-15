'use client'

import { useState } from 'react'
import CloudinaryImage from './CloudinaryImage'
import ImageModal from './ImageModal'

interface ClickableImageProps {
  publicId: string
  alt: string
  width?: number | string
  height?: number | string
  className?: string
  quality?: number
  crop?: 'fill' | 'scale' | 'fit' | 'thumb' | 'crop' | 'limit'
  gravity?: 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'center' | 'faces'
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'gif'
  priority?: boolean
  sizes?: string
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fill?: boolean
  showLoader?: boolean
  loaderSize?: 'sm' | 'md' | 'lg' | 'xl'
  loaderVariant?: 'spinner' | 'dots' | 'pulse'
}

export default function ClickableImage(props: ClickableImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <CloudinaryImage
        {...props}
        clickable={true}
        onClick={handleImageClick}
        showLoader={props.showLoader}
        loaderSize={props.loaderSize}
        loaderVariant={props.loaderVariant}
      />

      <ImageModal
        images={[props.publicId]}
        currentIndex={0}
        isOpen={isModalOpen}
        onClose={closeModal}
        isSingleImage={true}
      />
    </>
  )
}
