'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { BackToTop } from './BackToTop'
import { BackgroundSlideshow } from './BackgroundSlideshow'
import { HomeViewSwitch, useHomeView } from './HomeViewSwitch'
import { COMPANY_SLUGS } from './company-layout/companies'
import { CompanyFooter, CompanyTheme, CompanyTopBar } from './company-layout'

const companyPagePattern = new RegExp(
  `^/[a-z]{2}/(${COMPANY_SLUGS.join('|')})/?$`,
  'i'
)
const homePagePattern = /^\/[a-z]{2}\/?$/i

// Neutrální barvy lišty na úvodní stránce (bez akcentu konkrétní firmy)
const homeTheme: CompanyTheme = {
  text: '#2c2a29',
  accent: '#2c2a29',
  border: '#ebebeb',
  tabBg: '#f5f5f5'
}

// Podstránky firem mají vlastní lištu a patičku z nového designu.
// Úvodní stránka umí oba vzhledy – přepínač je v patičce.
// Ostatní stránky si nechávají původní Header/Footer a slideshow pozadí.
export function SiteChrome({
  locale,
  children
}: {
  locale: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [view, setView] = useHomeView()
  const content = (
    <Suspense
      fallback={
        <div className='flex h-full items-center justify-center'>
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  )

  if (companyPagePattern.test(pathname)) {
    return <div className='min-h-screen bg-white'>{content}</div>
  }

  const isHome = homePagePattern.test(pathname)
  const main = (
    <main className='relative flex-1'>
      {/* Background slideshow */}
      <BackgroundSlideshow />

      {/* Content */}
      <div className='relative z-10 h-full'>{content}</div>
    </main>
  )

  if (isHome && view === 'new') {
    return (
      <div className="flex min-h-screen flex-col font-['Avenir_LT_Pro',Arial,sans-serif] antialiased">
        <CompanyTopBar theme={homeTheme} />
        {main}
        <CompanyFooter theme={homeTheme}>
          <HomeViewSwitch view={view} onChange={setView} variant='light' />
        </CompanyFooter>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen flex-col'>
      {/* NavBar */}
      <Header locale={locale} />

      {main}

      {/* Footer */}
      <Footer>
        {isHome && (
          <HomeViewSwitch view={view} onChange={setView} variant='dark' />
        )}
      </Footer>

      <BackToTop />
    </div>
  )
}
