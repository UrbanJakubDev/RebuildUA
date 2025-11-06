'use client'

import { Suspense } from 'react'
import { useTranslations } from 'next-intl'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const t = useTranslations('common.footer')

  return (
    <footer className='border-t border-background-secondary bg-black'>
      <div className='mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0'>
          {/* Left side - Copyright and Author */}
          <div className='flex flex-col items-center space-y-1 md:flex-row md:space-x-4 md:space-y-0'>
            <p className='text-sm text-text-secondary'>
              © {currentYear} {t('copyright')}
            </p>
            <div className='flex items-center space-x-1'></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
