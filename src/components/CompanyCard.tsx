'use client'

import { Link } from '@/src/navigation'
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

  return (
    <Link href={`/${companySlug}`} className='block h-full w-full'>
      <div
        className={`group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/10 p-8 shadow-lg transition-all duration-300 ${
          isLowEndDevice ? '' : 'backdrop-blur-sm'
        } ${
          isGlowing
            ? '-translate-y-1 scale-[1.02] border-white/40 bg-white/20 shadow-2xl'
            : ''
        }`}
      >
        {/* Logo - hlavní prvek */}
        <div className='relative z-10 flex h-full w-full items-center justify-center'>
          <LocalImage
            src={logoUrl}
            alt={`${companyName} logo`}
            width={500}
            height={500}
            className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
              isGlowing ? 'scale-105' : ''
            }`}
          />
        </div>

        {/* Simple glow effect */}
        <div
          className={`absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent transition-opacity duration-300 ${
            isGlowing ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Call-to-Action Text */}
        <div
          className={`absolute bottom-2 right-2 font-medium transition-all duration-300 ${
            isGlowing ? 'text-base text-white/90' : 'text-xs text-white/60'
          }`}
        >
          {t('exploreMore')} →
        </div>
      </div>
    </Link>
  )
}
