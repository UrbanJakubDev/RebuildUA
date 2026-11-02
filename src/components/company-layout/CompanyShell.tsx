'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/src/navigation'
import { InactivityRedirectHandler } from '../InactivityRedirectHandler'
import { CompanySlug, CompanyTheme } from './companies'
import { CompanyTopBar } from './CompanyTopBar'
import { AnchorLink } from './AnchorLink'
import { CompanyFooter } from './CompanyFooter'

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
      <CompanyFooter theme={theme}>
        <div className='flex gap-6'>
          <Link href='/' className='text-[#2c2a29]'>
            {t('allCompanies')}
          </Link>
          <AnchorLink to={topSectionId} className='text-[#2c2a29]'>
            {t('backToTop')}
          </AnchorLink>
        </div>
      </CompanyFooter>
    </div>
  )
}
