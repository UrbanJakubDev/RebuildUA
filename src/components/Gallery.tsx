'use client'

import { useMemo, useState } from 'react'
import LocalImage from './LocalImage'
import ImageModal from './ImageModal'

interface GalleryProps {
  images: string[]
  columns: number
  className?: string
}

export function Gallery({ images, columns, className = '' }: GalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Responsive grid columns
  const getGridCols = () => {
    if (columns === 1) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    if (columns === 2) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
    if (columns === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    if (columns === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    return `grid-cols-${columns}`
  }

  return (
    <>
      <div className={`grid gap-3 sm:gap-4 ${getGridCols()} ${className}`}>
        {images.map((image, index) => (
          <LocalImage
            key={image}
            src={image}
            alt='Gallery image'
            clickable={true}
            quality={90}
            onClick={() => handleImageClick(index)}
            className='h-auto w-full rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg'
          />
        ))}
      </div>

      <ImageModal
        images={images}
        currentIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}
