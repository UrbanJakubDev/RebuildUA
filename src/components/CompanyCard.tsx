'use client'

import { Link } from '@/src/navigation'
import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import LocalImage from './LocalImage'

interface CompanyCardProps {
  companySlug: string
  companyName: string
  logoUrl: string
  description?: string
  isGlowing?: boolean
  isLowEndDevice?: boolean
}

export function CompanyCard({
  companySlug,
  companyName,
  logoUrl,
  description,
  isGlowing = false,
  isLowEndDevice = false
}: CompanyCardProps) {
  const t = useTranslations('common.navigation')
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([])
  const cardRef = useRef<HTMLDivElement>(null)

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
  }

  return (
    <Link href={`/${companySlug}`} className='block h-full w-full'>
      <div
        ref={cardRef}
        onClick={createRipple}
        className={`group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/10 p-8 shadow-lg transition-all duration-300 ${
          isLowEndDevice ? '' : 'backdrop-blur-sm'
        } ${
          isGlowing
            ? '-translate-y-1 scale-[1.02] border-white/30 bg-white/20 shadow-2xl'
            : ''
        }`}
      >
        {/* Energy Pulse Background - gradient from top-left */}
        <div
          className={`from-accent/10 via-accent/5 absolute inset-0 rounded-lg bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 ${
            isGlowing ? 'opacity-100' : ''
          }`}
        />

        {/* Energy Pulse Ring */}
        <div
          className={`border-accent/20 absolute inset-0 rounded-lg border opacity-0 transition-all duration-500 ${
            isGlowing ? 'border-accent/40 scale-105 opacity-100' : ''
          }`}
        />

        {/* Logo - hlavní prvek */}
        <div className='relative z-10 flex h-full w-full items-center justify-center'>
          <LocalImage
            src={logoUrl}
            alt={`${companyName} logo`}
            width={500}
            height={500}
            className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
              isGlowing ? 'scale-105 drop-shadow-lg' : ''
            }`}
          />
        </div>

        {/* Glass thickness effect - top edge with energy pulse */}
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-300 ${
            isGlowing ? 'via-accent/60 opacity-100' : 'opacity-60'
          }`}
        />

        {/* Glass thickness effect - left edge with energy pulse */}
        <div
          className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent transition-all duration-300 ${
            isGlowing ? 'via-accent/40 opacity-80' : 'opacity-40'
          }`}
        />

        {/* Glass thickness effect - right edge with energy pulse */}
        <div
          className={`absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent transition-all duration-300 ${
            isGlowing ? 'via-accent/40 opacity-80' : 'opacity-40'
          }`}
        />

        {/* Enhanced glow effect - gradient from top-left corner */}
        <div
          className={`via-accent/20 absolute inset-0 rounded-lg bg-gradient-to-br from-white/40 to-transparent transition-opacity duration-300 ${
            isGlowing ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Inner glass reflection with energy - gradient from top-left */}
        <div
          className={`via-accent/10 absolute inset-2 rounded-md bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 ${
            isGlowing ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Call-to-Action Text */}
        <div
          className={`absolute bottom-2 right-2 font-medium transition-all duration-300 ${
            isGlowing ? 'text-lg text-white/90' : 'text-xs text-white/60'
          }`}
        >
          {t('exploreMore')} →
        </div>

        {/* Ripple Effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className='ripple-effect pointer-events-none absolute rounded-full bg-white/20'
            style={{
              left: ripple.x - 15,
              top: ripple.y - 15,
              width: 30,
              height: 30
            }}
          />
        ))}

        {/* Energy Flow Lines - disabled on low-end devices for better performance */}
        {!isLowEndDevice && (
          <div className='absolute inset-0 overflow-hidden rounded-lg'>
            <div
              className={`bg-accent/20 energy-pulse absolute -left-2 -top-2 h-4 w-4 rounded-full transition-all duration-700 ${
                isGlowing ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div
              className={`bg-accent/20 energy-pulse absolute -right-2 -top-2 h-4 w-4 rounded-full transition-all duration-700 ${
                isGlowing ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: '200ms' }}
            />
            <div
              className={`bg-accent/20 energy-pulse absolute -bottom-2 -left-2 h-4 w-4 rounded-full transition-all duration-700 ${
                isGlowing ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: '400ms' }}
            />
            <div
              className={`bg-accent/20 energy-pulse absolute -bottom-2 -right-2 h-4 w-4 rounded-full transition-all duration-700 ${
                isGlowing ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: '600ms' }}
            />
          </div>
        )}
      </div>
    </Link>
  )
}
