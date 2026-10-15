'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function IconHome({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden
    >
      <path d='M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.06l-.72-.72V20.25A1.75 1.75 0 0 1 17.69 22H6.31A1.75 1.75 0 0 1 4.56 20.25v-7.38l-.72.72a.75.75 0 0 1-1.06-1.06l8.69-8.69ZM6.06 12.81v7.44c0 .138.112.25.25.25h3.44v-4.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v4.5h3.44a.25.25 0 0 0 .25-.25v-7.44L12 6.94l-5.94 5.87Z' />
    </svg>
  )
}

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
            <IconHome className='h-5 w-5' />
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
        <IconHome className='h-6 w-6 text-primary' />
      </button>
    </div>
  )
}
