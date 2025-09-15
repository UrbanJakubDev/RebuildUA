'use client'

import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
// Removed useLanguagePreference - using system detection via URL instead

const LangSwitcher: React.FC = () => {
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()
  const t = useTranslations('common.ui')
  // Removed language settings translations - no longer needed
  // Simplified language switching - no settings dropdown needed

  const languages = [
    { code: 'cs', flag: '🇨🇿', name: 'Čeština' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' }
  ]

  const currentLang = pathname.split('/')[1] || 'cs'

  return (
    <div className='relative z-[60]'>
      <div className='flex items-center gap-2'>
        <span className='text-sm text-text-secondary'>{t('language')}:</span>
        <div className='flex items-center gap-1'>
          {languages.map(lang => {
            const isActive = currentLang === lang.code
            const href = `/${lang.code}/${urlSegments.join('/')}`

            return (
              <Link
                key={lang.code}
                href={href}
                className={`
                  flex h-8 w-8 items-center justify-center rounded-md border-2 transition-all duration-200
                  ${
                    isActive
                      ? 'scale-110 border-button bg-button'
                      : 'hover:border-dropdown-hover border-background-secondary'
                  }
                  ${isActive ? 'ring-2 ring-button' : ''}
                `}
                title={lang.name}
              >
                <span className='text-lg leading-none'>{lang.flag}</span>
              </Link>
            )
          })}
        </div>

        {/* Removed settings button - simplified language switching */}
      </div>

      {/* Settings dropdown removed - using system language detection */}
    </div>
  )
}

export default LangSwitcher
