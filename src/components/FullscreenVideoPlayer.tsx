'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoClose } from 'react-icons/io5'
import Button from './Button'

interface FullscreenVideoPlayerProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title: string
}

export function FullscreenVideoPlayer({
  isOpen,
  onClose,
  videoUrl,
  title
}: FullscreenVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      // Small delay to ensure smooth animation
      const timer = setTimeout(() => setIsAnimating(false), 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle keyboard navigation and fullscreen functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      }

      // Space bar to close (since we removed play/pause controls)
      if (e.key === ' ') {
        e.preventDefault()
        onClose()
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
  }, [isOpen, onClose])

  // Handle fullscreen toggle
  const toggleFullscreen = async () => {
    if (!videoRef.current) return

    try {
      if (!document.fullscreenElement) {
        await videoRef.current.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error)
    }
  }

  if (!isOpen) return null

  const playerContent = (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-500 ease-out ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Close button */}
      <Button
        onClick={onClose}
        variant='secondary'
        size='small'
        rounded={true}
        className={`absolute right-4 top-4 z-10 transition-all duration-300 hover:scale-105 ${
          isAnimating ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label='Close video'
      >
        <IoClose size={20} />
      </Button>

      {/* Video container */}
      <div
        className={`relative flex h-full max-h-[90vh] w-full max-w-7xl items-center justify-center transition-all duration-500 ease-out ${
          isAnimating
            ? 'translate-y-8 scale-90 opacity-0'
            : 'translate-y-0 scale-100 opacity-100'
        }`}
      >
        <video
          ref={videoRef}
          className='max-h-full max-w-full object-contain'
          style={{
            willChange: 'auto',
            transform: 'translateZ(0)' // Force GPU acceleration
          }}
          autoPlay
          onDoubleClick={toggleFullscreen}
          onEnded={onClose}
          title={title}
          playsInline
          muted={false}
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
      </div>
    </div>
  )

  // Use portal to render player outside of modal hierarchy
  return typeof window !== 'undefined'
    ? createPortal(playerContent, document.body)
    : null
}
