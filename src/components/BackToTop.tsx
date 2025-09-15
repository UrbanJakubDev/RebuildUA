'use client'

import { useState, useEffect } from 'react'
import Button from './Button'

interface BackToTopProps {
  className?: string
  threshold?: number
  smooth?: boolean
}

export function BackToTop({
  className = '',
  threshold = 300,
  smooth = true
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  if (!isVisible) return null

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 z-50 rounded-full bg-button p-4 text-button-text shadow-lg transition-all duration-300 hover:scale-110 hover:bg-secondary hover:shadow-xl  ${className}`}
      aria-label='Zpět nahoru'
    >
      <svg
        className='h-6 w-6'
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
    </Button>
  )
}
