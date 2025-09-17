'use client'

import { Link } from '@/src/navigation'
import LocalImage from './LocalImage'

interface CompanyCardProps {
  companySlug: string
  companyName: string
  logoUrl: string
  description?: string
}

export function CompanyCard({
  companySlug,
  companyName,
  logoUrl,
  description
}: CompanyCardProps) {
  return (
    <Link href={`/${companySlug}`} className='block h-full w-full'>
      <div className='group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-white/30 hover:bg-white/20 hover:shadow-2xl'>
        {/* Logo - hlavní prvek */}
        <div className='flex h-full w-full items-center justify-center'>
          <LocalImage
            src={logoUrl}
            alt={`${companyName} logo`}
            width={500}
            height={500}
            className='max-h-full max-w-full object-contain'
          />
        </div>

        {/* Glass thickness effect - top edge */}
        <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60' />

        {/* Glass thickness effect - left edge */}
        <div className='absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-40' />

        {/* Glass thickness effect - right edge */}
        <div className='absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-40' />

        {/* Hover glow effect */}
        <div className='to-accent/10 absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

        {/* Inner glass reflection */}
        <div className='absolute inset-2 rounded-md bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      </div>
    </Link>
  )
}
