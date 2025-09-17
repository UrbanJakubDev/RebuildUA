'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface BackToTopProps {
  showBackButton?: boolean
  backPath?: string
  className?: string
}

export function BackToTop({
  showBackButton = true,
  backPath = '/',
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

  const goBack = () => {
    router.push(backPath)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <div className='flex flex-col gap-3'>
        {/* Back Button */}
        {showBackButton && (
          <button
            onClick={goBack}
            className='border-border bg-card-bg flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-xl border shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm'
            aria-label='Zpět na hlavní stránku'
          >
            <svg
              className='h-5 w-5 text-primary'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
          </button>
        )}

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className='bg-accent hover:bg-accent-hover flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm'
          aria-label='Zpět nahoru'
        >
          <svg
            className='h-5 w-5 text-button-text'
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

// Varianta pouze s back buttonem
export function BackButton({
  backPath = '/',
  className = ''
}: {
  backPath?: string
  className?: string
}) {
  const router = useRouter()

  const goBack = () => {
    router.push(backPath)
  }

  return (
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <button
        onClick={goBack}
        className='border-border bg-card-bg flex h-14 min-h-[56px] w-14 min-w-[56px] items-center justify-center rounded-xl border shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm'
        aria-label='Zpět na hlavní stránku'
      >
        <svg
          className='h-6 w-6 text-primary'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 19l-7-7m0 0l7-7m-7 7h18'
          />
        </svg>
      </button>
    </div>
  )
}
