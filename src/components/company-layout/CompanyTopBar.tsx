'use client'

import NextLink from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/src/navigation'
import { COMPANY_TABS, CompanySlug, CompanyTheme } from './companies'

const languages = ['en', 'ua'] as const

export function CompanyTopBar({
  active,
  theme
}: {
  active: CompanySlug
  theme: CompanyTheme
}) {
  const locale = useLocale()
  const t = useTranslations('pages.company.layout')

  return (
    <div
      className='sticky top-0 z-20 border-b bg-white'
      style={{ borderColor: theme.border }}
    >
      <div className='mx-auto flex h-14 max-w-[1280px] items-center gap-10 px-12'>
        <Link
          href='/'
          className='flex items-baseline gap-1.5 text-base font-black tracking-[-0.01em] text-[#2c2a29]'
        >
          Rebuild<span className='font-[350]'>Ukraine</span>
        </Link>
        <div className='flex flex-1 items-center gap-1'>
          {COMPANY_TABS.map(({ slug, name }) => {
            const isActive = slug === active
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className={`rounded px-2.5 py-1.5 text-[13px] text-[#2c2a29] ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
                style={{ background: isActive ? theme.tabBg : 'transparent' }}
              >
                {name}
              </Link>
            )
          })}
          <span className='mx-3 h-[18px] w-px bg-[#d1d1d1]' />
          {/* Videa leží mimo [locale] routing, stejně jako v hlavním Headeru */}
          <NextLink
            href='/videos'
            className='px-2.5 py-1.5 text-[13px] font-medium text-[#2c2a29]'
          >
            {t('videos')}
          </NextLink>
        </div>
        <div className='flex gap-0.5 text-xs font-bold tracking-[0.06em]'>
          {languages.map(lang => (
            <Link
              key={lang}
              href={`/${active}`}
              locale={lang}
              className={`border-b-2 px-2 py-1.5 text-[#2c2a29] ${
                locale === lang ? 'border-[#2c2a29]' : 'border-transparent'
              }`}
            >
              {lang.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
