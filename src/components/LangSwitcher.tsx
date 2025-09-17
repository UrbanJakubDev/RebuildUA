'use client'

import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'
import { useTranslations } from 'next-intl'
import GlassIcon from './GlassIcon'

const LangSwitcher: React.FC = () => {
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()
  const t = useTranslations('common.ui')

  const languages = [
    { code: 'en', variant: 'eng' as const },
    { code: 'ua', variant: 'ua' as const }
  ]

  const currentLang = pathname.split('/')[1] || 'en'

  return (
    <div className='flex items-center gap-2'>
      {languages.map(lang => {
        const isActive = currentLang === lang.code
        const href = `/${lang.code}/${urlSegments.join('/')}`

        return (
          <GlassIcon
            key={lang.code}
            variant={lang.variant}
            href={href}
            size='md'
            className={
              isActive
                ? 'bg-accent border-accent hover:bg-accent-hover scale-105 text-button-text shadow-lg transition-all duration-200'
                : 'opacity-70 transition-all duration-200 hover:opacity-100'
            }
          />
        )
      })}
    </div>
  )
}

export default LangSwitcher
