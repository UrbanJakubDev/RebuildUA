'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/src/navigation'
import { InactivityRedirectHandler } from '../InactivityRedirectHandler'
import { CompanySlug, CompanyTheme } from './companies'
import { CompanyTopBar } from './CompanyTopBar'
import { AnchorLink } from './AnchorLink'

// Společný rámec podstránky firmy: horní lišta, obsah, patička
export function CompanyShell({
  slug,
  theme,
  topSectionId,
  children
}: {
  slug: CompanySlug
  theme: CompanyTheme
  /** Sekce, na kterou vede „Back to top“ */
  topSectionId: string
  children: React.ReactNode
}) {
  const t = useTranslations('pages.company.layout')

  return (
    <div
      className="flex min-h-screen flex-col bg-white font-['Avenir_LT_Pro',Arial,sans-serif] antialiased"
      style={{ color: theme.text }}
    >
      <InactivityRedirectHandler redirectPath='/' timeout={60000} enabled />
      <CompanyTopBar active={slug} theme={theme} />
      {children}
      <footer
        className='border-t bg-white'
        style={{ borderColor: theme.border }}
      >
        <div className='mx-auto flex max-w-[1280px] items-center justify-between px-12 py-7 text-[13px] text-[#2c2a29]'>
          <span>© 2026 Rebuild Ukraine</span>
          <div className='flex gap-6'>
            <Link href='/' className='text-[#2c2a29]'>
              {t('allCompanies')}
            </Link>
            <AnchorLink to={topSectionId} className='text-[#2c2a29]'>
              {t('backToTop')}
            </AnchorLink>
          </div>
        </div>
      </footer>
    </div>
  )
}
