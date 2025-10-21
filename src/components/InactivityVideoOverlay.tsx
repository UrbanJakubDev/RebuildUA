'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useInactivityVideoTrigger } from '@/src/hooks/useInactivityVideoTrigger'
import { useTranslations } from 'next-intl'

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
          src={videoUrl}
          className='h-full w-full object-cover'
          autoPlay
          onEnded={handleClose}
          playsInline
          muted={false}
          loop={true}
        >
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better button visibility */}
        <div className='absolute inset-0 bg-black/30' />

        {/* Large Touch Me Button */}
        <button
          onClick={handleTouchMeClick}
          className={`hover:shadow-3xl absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-6 text-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 ${
            isAnimating ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          } energy-pulse`}
          style={{
            minWidth: '200px',
            minHeight: '80px',
            boxShadow:
              '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)'
          }}
          aria-label={t('touchMeButton')}
        >
          {t('touchMeButton')}
        </button>

        {/* Close instruction */}
        <div
          className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform text-center text-white transition-all duration-500 ${
            isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-70'
          }`}
        >
          <p className='text-lg font-medium'>{t('closeInstruction')}</p>
          <p className='text-sm opacity-80'>{t('closeInstructionSub')}</p>
        </div>
      </div>
    </div>
  )

  // Use portal to render overlay outside of component hierarchy
  return typeof window !== 'undefined'
    ? createPortal(overlayContent, document.body)
    : null
}
