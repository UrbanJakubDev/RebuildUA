'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'
import { useTranslations } from 'next-intl'
import { VideoCard } from '@/src/components/VideoCard'

interface Video {
  id: string
  title: string
  thumbnail?: string
  duration?: string
  description?: string
  videoUrl?: string
}

function VideosContent() {
  const t = useTranslations('videos')
  const router = useRouter()

  // If url not localhost, use the following videos /videos/GENTEC_EN_720p-LQ-30-s-rpi.webm for all videos
  const isLocalhost = window.location.hostname === 'localhost'

  // Get real video data - using single test video for deployment
  const realVideos: Video[] = [
    {
      id: '1',
      title: t('realVideos.gentec.title'),
      duration: '0:30',
      description: t('realVideos.gentec.description'),
      videoUrl: isLocalhost ? '/videos/GENTEC_EN_1080p.mp4' : '/videos/GENTEC_EN_720p-LQ-30-s-rpi.webm'
    },
    {
      id: '2',
      title: t('realVideos.ke-mng-500.title'),
      duration: '0:30',
      description: t('realVideos.ke-mng-500.description'),
      videoUrl: isLocalhost ? '/videos/gentec_-_ke_mng_500 (2160p).mp4' : '/videos/GENTEC_EN_720p-LQ-30-s-rpi.webm'
    },
    {
      id: '3',
      title: t('realVideos.press-conference.title'),
      duration: '0:30',
      description: t('realVideos.press-conference.description'),
      videoUrl: isLocalhost ? '/videos/Press_conference_1.7.2024.mp4' : '/videos/GENTEC_EN_720p-LQ-30-s-rpi.webm'
    }
  ]

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [router])

  const handleVideoClick = (video: Video) => {
    if (video.videoUrl) {
      // Redirect to video page with video URL and loop=false
      const encodedUrl = encodeURIComponent(video.videoUrl)
      router.push(`/video?video=${encodedUrl}&loop=false`)
    }
  }

  const handleClose = () => {
    router.push('/')
  }

  return (
    <div className='relative h-screen w-screen overflow-hidden bg-background'>
      <div className='flex h-full flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-border bg-background p-6'>
          <h2 className='text-2xl font-bold text-primary'>
            {t('modal.title')}
          </h2>
          <button
            onClick={handleClose}
            className='hover:bg-accent/10 rounded-full p-2 text-secondary transition-colors hover:text-primary'
            aria-label={t('modal.close')}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Video Grid */}
        <div className='flex-1 overflow-y-auto bg-background p-6 pb-20'>
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
}

export default function VideosPage() {
  return <VideosContent />
}
