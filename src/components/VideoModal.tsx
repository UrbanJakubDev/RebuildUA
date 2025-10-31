'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoClose } from 'react-icons/io5'
import { useTranslations } from 'next-intl'
import { VideoCard } from './VideoCard'
import { FullscreenVideoPlayer } from './FullscreenVideoPlayer'

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
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Get real video data
  const realVideos: Video[] = [
    {
      id: '1',
      title: t('realVideos.gentec.title'),
      duration: '0:30',
      description: t('realVideos.gentec.description'),
      videoUrl: '/videos/GENTEC_EN_720p-LQ-30-s-rpi.mp4'
    }
  ]

  // Handle animations and keyboard navigation
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      // Small delay to ensure smooth animation
      const timer = setTimeout(() => setIsAnimating(false), 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

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
    if (video.videoUrl) {
      setSelectedVideo(video)
    }
  }

  const handleCloseVideo = () => {
    setSelectedVideo(null)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div
      className={`bg-background/95 fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-500 ease-out ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative h-[95vh] w-[95vw] max-w-7xl overflow-hidden rounded-xl border border-border bg-background shadow-card-shadow-hover transition-all duration-500 ease-out ${
          isAnimating
            ? 'translate-y-4 scale-95 opacity-0'
            : 'translate-y-0 scale-100 opacity-100'
        }`}
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-border bg-background p-6'>
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
        <div className='h-full overflow-y-auto bg-background p-6 pb-20'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2'>
            {realVideos.map(video => (
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

  return (
    <>
      {/* Main Video Modal */}
      {typeof window !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null}

      {/* Fullscreen Video Player */}
      {selectedVideo && selectedVideo.videoUrl && (
        <FullscreenVideoPlayer
          isOpen={!!selectedVideo}
          onClose={handleCloseVideo}
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
        />
      )}
    </>
  )
}
