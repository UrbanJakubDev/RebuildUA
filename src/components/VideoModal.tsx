'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { IoClose } from 'react-icons/io5'
import { useTranslations } from 'next-intl'
import { VideoCard } from './VideoCard'

interface Video {
  id: string
  title: string
  thumbnail?: string
  duration?: string
  description?: string
  videoUrl?: string
}

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

// Placeholder video durations (these remain the same)
const videoDurations = ['3:45', '5:12', '7:23', '4:56', '6:18', '8:34']

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const t = useTranslations('videos')

  // Get localized video data
  const placeholderVideos: Video[] = t
    .raw('placeholders')
    .map((video: any, index: number) => ({
      id: (index + 1).toString(),
      title: video.title,
      duration: videoDurations[index],
      description: video.description
    }))

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
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
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleVideoClick = (video: Video) => {
    console.log('Video clicked:', video.title)
    // Video playback logic will be implemented here later
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div
      className='bg-background/95 fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm'
      onClick={handleBackdropClick}
    >
      <div className='border-border bg-card-bg shadow-card-shadow-hover relative h-[95vh] w-[95vw] max-w-7xl overflow-hidden rounded-xl border'>
        {/* Header */}
        <div className='border-border bg-background-secondary/50 flex items-center justify-between border-b p-6'>
          <h2 className='text-2xl font-bold text-primary'>
            {t('modal.title')}
          </h2>
          <button
            onClick={onClose}
            className='hover:bg-accent/10 rounded-full p-2 text-secondary transition-colors hover:text-primary'
            aria-label={t('modal.close')}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Video Grid */}
        <div className='h-full overflow-y-auto p-6 pb-20'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2'>
            {placeholderVideos.map(video => (
              <div key={video.id} className='h-80'>
                <VideoCard
                  title={video.title}
                  duration={video.duration}
                  description={video.description}
                  videoUrl={video.videoUrl}
                  onClick={() => handleVideoClick(video)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Glass effects using theme colors */}
        <div className='via-accent/30 absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent to-transparent' />
        <div className='via-accent/20 absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent to-transparent' />
        <div className='via-accent/20 absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent to-transparent' />
      </div>
    </div>
  )

  // Use portal to render modal outside of header hierarchy
  return typeof window !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null
}
