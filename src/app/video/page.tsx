'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IoHandLeftOutline, IoClose } from 'react-icons/io5'

// Translations - using same structure as messages files
const translations: Record<string, { touchMeButton: string }> = {
  en: {
    touchMeButton: 'Discover More'
  },
  ua: {
    touchMeButton: 'Дізнатися більше'
  }
}

function VideoContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [locale, setLocale] = useState<string>('en')

  // Read loop parameter from URL, default to true
  const loopParam = searchParams.get('loop')
  const shouldLoop = loopParam !== 'false'

  // Read video URL from query parameter, fallback to default test video
  const videoParam = searchParams.get('video')

  const videoUrl = videoParam
    ? decodeURIComponent(videoParam)
    : '/videos/GENTEC_EN_720p-LQ-30-s-rpi.webm'

  // Detect locale from cookies or default to 'en'
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to get locale from cookie
      const cookies = document.cookie.split(';')
      const localeCookie = cookies.find(c =>
        c.trim().startsWith('NEXT_LOCALE=')
      )
      if (localeCookie) {
        const localeValue = localeCookie.split('=')[1]?.trim()
        if (localeValue && (localeValue === 'en' || localeValue === 'ua')) {
          setLocale(localeValue)
          return
        }
      }
      // Try to get from localStorage (if used elsewhere)
      const storedLocale =
        localStorage.getItem('locale') ||
        localStorage.getItem('preferredLanguage')
      if (storedLocale && (storedLocale === 'en' || storedLocale === 'ua')) {
        setLocale(storedLocale)
        return
      }
      // Try to detect from browser language
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'uk' || browserLang === 'ua') {
        setLocale('ua')
      }
    }
  }, [])

  const buttonText =
    translations[locale]?.touchMeButton || translations.en.touchMeButton

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [])

  // Handle button click - redirect to homepage
  const handleButtonClick = () => {
    router.push('/')
  }

  const handleClose = () => {
    // Redirect to videos page - use window.location for non-localized routes
    window.location.href = '/videos'
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault()
        router.push('/')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [router])

  // If not should loop redirect to home after video ends
  useEffect(() => {
    if (!shouldLoop && videoRef.current) {
      const handleEnded = () => {
        router.push('/')
      }
      const video = videoRef.current
      video.addEventListener('ended', handleEnded)
      return () => {
        video.removeEventListener('ended', handleEnded)
      }
    }
  }, [shouldLoop, router])

  return (
    <div className='relative h-screen w-screen overflow-hidden bg-white'>
      {/* Video container */}
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
        loop={shouldLoop}
        preload='metadata'
        crossOrigin='anonymous'
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={videoUrl} type='video/mp4' />
        <source src={videoUrl} type='video/webm; codecs="vp9, opus"' />
        <source src={videoUrl} type='video/webm' />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better button visibility */}
      <div className='absolute inset-0 bg-black/30' />

      {/* Large Touch Me Button - only shown when loop is enabled */}
      {shouldLoop && (
        <button
          onClick={handleButtonClick}
          className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center gap-4 rounded-2xl px-12 py-6 text-2xl font-bold text-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50'
          style={{
            minWidth: '200px',
            minHeight: '80px',
            background:
              'linear-gradient(90deg, var(--gentec-red), var(--gentec-dark-gray))',
            boxShadow:
              '0 0 30px rgba(196,44,49,0.5), 0 0 60px rgba(0,0,0,0.15)',
            opacity: 1,
            transition: 'none'
          }}
          aria-label={buttonText}
        >
          <span className='mr-2 flex h-12 w-12 items-center justify-center text-white'>
            <IoHandLeftOutline />
          </span>
          {buttonText}
        </button>
      )}

      {/* Close Button - only shown when loop is disabled */}
      {!shouldLoop && (
        <button
          onClick={handleClose}
          className='absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-300 hover:scale-110 hover:bg-black/70 focus:outline-none focus:ring-4 focus:ring-white/50'
          aria-label='Close video'
        >
          <IoClose size={24} />
        </button>
      )}
    </div>
  )
}

export default function VideoPage() {
  return (
    <Suspense
      fallback={
        <div className='relative flex h-screen w-screen items-center justify-center overflow-hidden bg-white'>
          <div className='text-gray-500'>Loading...</div>
        </div>
      }
    >
      <VideoContent />
    </Suspense>
  )
}
