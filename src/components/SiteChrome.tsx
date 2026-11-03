'use client'

import { Suspense } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { BackToTop } from './BackToTop'
import { BackgroundSlideshow } from './BackgroundSlideshow'

// Původní Header/Footer a slideshow pozadí pro všechny stránky
export function SiteChrome({
  locale,
  children
}: {
  locale: string
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* NavBar */}
      <Header locale={locale} />

      {/* Main - vyplní zbývající místo */}
      <main className='relative flex flex-1 flex-col'>
        {/* Background slideshow */}
        <BackgroundSlideshow />

        {/* Content */}
        <div className='relative z-10 flex flex-1 flex-col'>
          <Suspense
            fallback={
              <div className='flex h-full items-center justify-center'>
                Loading...
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <BackToTop />
    </div>
  )
}
