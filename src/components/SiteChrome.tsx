'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { BackToTop } from './BackToTop'
import { BackgroundSlideshow } from './BackgroundSlideshow'
import { COMPANY_SLUGS } from './company-layout/companies'

const companyPagePattern = new RegExp(
  `^/[a-z]{2}/(${COMPANY_SLUGS.join('|')})/?$`,
  'i'
)

// Podstránky firem mají vlastní lištu a patičku z nového designu,
// ostatní stránky si nechávají původní Header/Footer a slideshow pozadí.
export function SiteChrome({
  locale,
  children
}: {
  locale: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
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

  return (
    <div className='flex min-h-screen flex-col'>
      {/* NavBar */}
      <Header locale={locale} />

      {/* Main - vyplní zbývající místo */}
      <main className='relative flex-1'>
        {/* Background slideshow */}
        <BackgroundSlideshow />

        {/* Content */}
        <div className='relative z-10 h-full'>{content}</div>
      </main>

      {/* Footer */}
      <Footer />

      <BackToTop />
    </div>
  )
}
