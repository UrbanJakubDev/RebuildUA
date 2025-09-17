'use client'

import { ReactNode } from 'react'

interface GlassIconProps {
  onClick?: () => void
  href?: string
  className?: string
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'home' | 'play' | 'video' | 'eng' | 'ua' | 'top' | 'back'
  children?: ReactNode
}

const sizeClasses = {
  sm: 'h-10 w-10 min-h-[40px] min-w-[40px] text-sm',
  md: 'h-12 w-12 min-h-[48px] min-w-[48px] text-base',
  lg: 'h-14 w-14 min-h-[56px] min-w-[56px] text-lg',
  xl: 'h-16 w-16 min-h-[64px] min-w-[64px] text-xl'
}

// Clean button styles for each variant using custom colors
const variantStyles = {
  home: 'bg-card-bg border-border text-primary hover:border-border-hover',
  play: 'bg-accent border-accent text-button-text hover:bg-accent-hover',
  video: 'bg-button border-button text-button-text hover:bg-accent-hover',
  eng: 'bg-card-bg border-border text-primary hover:border-border-hover',
  ua: 'bg-card-bg border-border text-primary hover:border-border-hover',
  top: 'bg-accent border-accent text-button-text hover:bg-accent-hover',
  back: 'bg-card-bg border-border text-primary hover:border-border-hover'
}

// Icon definitions for each variant
const iconVariants = {
  home: {
    title: 'Domů',
    icon: (
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
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        />
      </svg>
    )
  },
  play: {
    title: 'Přehrát',
    icon: (
      <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M8 5v14l11-7z' />
      </svg>
    )
  },
  video: {
    title: 'Přehrát video',
    icon: (
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
          d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
        />
      </svg>
    )
  },
  eng: {
    title: 'English',
    icon: <span className='text-2xl leading-none'>🇬🇧</span>
  },
  ua: {
    title: 'Україна',
    icon: <span className='text-2xl leading-none'>🇺🇦</span>
  },
  top: {
    title: 'Zpět nahoru',
    icon: (
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
    )
  },
  back: {
    title: 'Zpět',
    icon: (
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
          d='M10 19l-7-7m0 0l7-7m-7 7h18'
        />
      </svg>
    )
  }
}

export function GlassIcon({
  onClick,
  href,
  className = '',
  title,
  size = 'lg',
  variant = 'home',
  children
}: GlassIconProps) {
  const baseClasses = `flex items-center justify-center rounded-xl border shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm ${sizeClasses[size]} ${variantStyles[variant]} ${className}`

  const iconTitle = title || iconVariants[variant].title
  const iconContent = children || iconVariants[variant].icon

  if (href) {
    return (
      <a href={href} className={baseClasses} title={iconTitle}>
        {iconContent}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={baseClasses} title={iconTitle}>
      {iconContent}
    </button>
  )
}

// Export default GlassIcon as the main component
export default GlassIcon
