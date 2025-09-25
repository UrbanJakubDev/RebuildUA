'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IoHome } from 'react-icons/io5'

interface BackToTopProps {
  showHomeButton?: boolean
  homePath?: string
  className?: string
}

export function BackToTop({
  showHomeButton = true,
  homePath = '/',
  className = ''
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const goHome = () => {
    router.push(homePath)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <div className='flex flex-col gap-3'>
        {/* Home Button */}
        {showHomeButton && (
          <button
            onClick={goHome}
            className='text-primary hover:text-background flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-xl border border-border bg-card-bg hover:bg-accent-hover shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm'
            aria-label='Na hlavní stránku'
          >
            <IoHome className='h-5 w-5' />
          </button>
        )}

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className='text-primary hover:text-background flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-xl bg-accent shadow-md transition-all duration-200 hover:scale-105 hover:bg-accent-hover hover:shadow-lg active:scale-95 active:shadow-sm'
          aria-label='Zpět nahoru'
        >
          <svg
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 10l7-7m0 0l7 7m-7-7v18'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Varianta pouze s home buttonem
export function HomeButton({
  homePath = '/',
  className = ''
}: {
  homePath?: string
  className?: string
}) {
  const router = useRouter()

  const goHome = () => {
    router.push(homePath)
  }

  return (
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <button
        onClick={goHome}
        className='flex h-14 min-h-[56px] w-14 min-w-[56px] items-center justify-center rounded-xl border border-border bg-card-bg shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm'
        aria-label='Na hlavní stránku'
      >
        <IoHome className='h-6 w-6 text-primary' />
      </button>
    </div>
  )
}
