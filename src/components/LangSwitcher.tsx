'use client'

import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'
import { useTranslations } from 'next-intl'

const LangSwitcher: React.FC = () => {
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()
  const t = useTranslations('common.ui')

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ua', label: 'UA' }
  ]

  const currentLang = pathname.split('/')[1] || 'en'

  return (
    <div className='flex items-center gap-2'>
      {languages.map(lang => {
        const isActive = currentLang === lang.code
        const href = `/${lang.code}/${urlSegments.join('/')}`

        return (
          <a
            key={lang.code}
            href={href}
            className={`text-primary hover:text-background flex h-10 min-h-[40px] w-10 min-w-[40px] items-center justify-center rounded-xl border text-sm font-medium shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm ${
              isActive
                ? 'scale-105 border-accent bg-accent text-button-text shadow-lg hover:bg-accent-hover'
                : 'border-border bg-card-bg text-primary opacity-70 hover:border-border-hover hover:opacity-100'
            }`}
            title={lang.code === 'en' ? 'English' : 'Українська'}
          >
            {lang.label}
          </a>
        )
      })}
    </div>
  )
}

export default LangSwitcher
