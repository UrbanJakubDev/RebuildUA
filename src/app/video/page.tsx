'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IoHandLeftOutline } from 'react-icons/io5'

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

  // Video URL - same as used in homepage
  const videoUrl = '/videos/GENTEC_EN_720p-LQ-30-s-rpi.webm'

  // Detect locale from cookies or default to 'en'
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to get locale from cookie
      const cookies = document.cookie.split(';')
      const localeCookie = cookies.find(c => c.trim().startsWith('NEXT_LOCALE='))
      if (localeCookie) {
        const localeValue = localeCookie.split('=')[1]?.trim()
        if (localeValue && (localeValue === 'en' || localeValue === 'ua')) {
          setLocale(localeValue)
          return
        }
      }
      // Try to get from localStorage (if used elsewhere)
      const storedLocale = localStorage.getItem('locale') || localStorage.getItem('preferredLanguage')
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

  const buttonText = translations[locale]?.touchMeButton || translations.en.touchMeButton

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

  return (
    <div className='relative h-screen w-screen bg-white overflow-hidden'>
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
        <source src={videoUrl} type='video/webm; codecs="vp9, opus"' />
        <source src={videoUrl} type='video/webm' />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better button visibility */}
      <div className='absolute inset-0 bg-black/30' />

      {/* Large Touch Me Button */}
      <button
        onClick={handleButtonClick}
        className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-6 text-2xl font-bold text-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50'
        style={{
          minWidth: '200px',
          minHeight: '80px',
          boxShadow:
            '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)',
          opacity: 1,
          transition: 'none'
        }}
        aria-label={buttonText}
      >
        <span className='mr-2 flex h-8 w-8 items-center justify-center'>
          <IoHandLeftOutline />
        </span>
        {buttonText}
      </button>
    </div>
  )
}

export default function VideoPage() {
  return (
    <Suspense fallback={
      <div className='relative h-screen w-screen bg-white overflow-hidden flex items-center justify-center'>
        <div className='text-gray-500'>Loading...</div>
      </div>
    }>
      <VideoContent />
    </Suspense>
  )
}

