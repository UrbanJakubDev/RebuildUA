'use client'

import { useEffect, useState } from 'react'
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5'
import CloudinaryImage from './CloudinaryImage'

interface ImageModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  isSingleImage?: boolean
}

export default function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  isSingleImage
}: ImageModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)

  useEffect(() => {
    setCurrentImageIndex(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (images.length > 1 && !isSingleImage) {
            e.preventDefault()
            setCurrentImageIndex(prev =>
              prev > 0 ? prev - 1 : images.length - 1
            )
          }
          break
        case 'ArrowRight':
          if (images.length > 1 && !isSingleImage) {
            e.preventDefault()
            setCurrentImageIndex(prev =>
              prev < images.length - 1 ? prev + 1 : 0
            )
          }
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, images.length, onClose, isSingleImage])

  if (!isOpen) return null

  const currentImage = images[currentImageIndex]

  const goToPrevious = () => {
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90'>
      <div className='relative flex h-full w-full items-center justify-center p-4'>
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute right-4 top-4 z-10 p-2 text-white transition-colors hover:text-gray-300'
          aria-label='Zavřít'
        >
          <IoClose size={24} />
        </button>

        {/* Navigation arrows */}
        {images.length > 1 && !isSingleImage && (
          <>
            <button
              onClick={goToPrevious}
              className='absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 text-white transition-colors hover:text-gray-300'
              aria-label='Předchozí obrázek'
            >
              <IoChevronBack size={32} />
            </button>
            <button
              onClick={goToNext}
              className='absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 text-white transition-colors hover:text-gray-300'
              aria-label='Další obrázek'
            >
              <IoChevronForward size={32} />
            </button>
          </>
        )}

        {/* Image */}
        <div className='relative max-h-full max-w-full'>
          <CloudinaryImage
            publicId={currentImage}
            alt={`Gallery image ${currentImageIndex + 1}`}
            width={1200}
            height={800}
            quality={90}
            crop='fit'
            className='max-h-full max-w-full object-contain'
          />
        </div>

        {/* Image counter */}
        {images.length > 1 && !isSingleImage && (
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white'>
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
}
