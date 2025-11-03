'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useInactivityVideoTrigger } from '@/src/hooks/useInactivityVideoTrigger'
import { useTranslations } from 'next-intl'
import { IoHandLeftOutline } from 'react-icons/io5'

interface InactivityVideoOverlayProps {
  videoUrl: string
  timeout?: number
  enabled?: boolean
}

export function InactivityVideoOverlay({
  videoUrl,
  timeout = 60000,
  enabled = true
}: InactivityVideoOverlayProps) {
  const t = useTranslations('inactivityVideo')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const { resetInactivityTimer } = useInactivityVideoTrigger({
    timeout,
    onTimeout: () => setIsOpen(true),
    enabled
  })

  // Handle animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      // Small delay to ensure smooth animation
      const timer = setTimeout(() => setIsAnimating(false), 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle keyboard navigation and video functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        handleClose()
      }

      // Space bar to close
      if (e.key === ' ') {
        e.preventDefault()
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'

      // Auto-play video when opened with slight delay for animation
      const playTimer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(console.error)
        }
      }, 300)

      return () => clearTimeout(playTimer)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Ensure video loops continuously - handle edge cases where loop might not work
  useEffect(() => {
    if (!isOpen || !videoRef.current) return

    const video = videoRef.current

    const handleEnded = () => {
      // Restart video if it ends (backup in case loop attribute doesn't work)
      if (video.ended) {
        video.currentTime = 0
        video.play().catch(console.error)
      }
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    resetInactivityTimer()
  }

  const handleTouchMeClick = () => {
    handleClose()
  }

  if (!isOpen) return null

  const overlayContent = (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-500 ease-out ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Video container */}
      <div
        className={`relative flex h-full w-full items-center justify-center transition-all duration-500 ease-out ${
          isAnimating
            ? 'translate-y-8 scale-90 opacity-0'
            : 'translate-y-0 scale-100 opacity-100'
        }`}
      >
        <video
          ref={videoRef}
          className='h-full w-full object-cover'
          style={{
            willChange: 'auto',
            transform: 'translateZ(0)' // Force GPU acceleration
          }}
          autoPlay
          playsInline
          muted={false}
          loop={true}
          preload='metadata'
          crossOrigin='anonymous'
          disablePictureInPicture
          disableRemotePlayback
        >
          <source
            src={videoUrl}
            type='video/webm; codecs="vp9, opus"'
          />
          <source src={videoUrl} type='video/webm' />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better button visibility */}
        <div className='absolute inset-0 bg-black/30' />

        {/* Large Touch Me Button */}
        <button
          onClick={handleTouchMeClick}
          className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-6 text-2xl font-bold text-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50'
          style={{
            minWidth: '200px',
            minHeight: '80px',
            boxShadow:
              '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)',
            opacity: 1, // Remove transition opacity
            transition: 'none' // Remove animation
          }}
          aria-label={t('touchMeButton')}
        >
          <span className='mr-2 flex h-8 w-8 items-center justify-center'>
            <IoHandLeftOutline />
          </span>
          {t('touchMeButton')}
        </button>
      </div>
    </div>
  )

  // Use portal to render overlay outside of component hierarchy
  return typeof window !== 'undefined'
    ? createPortal(overlayContent, document.body)
    : null
}
