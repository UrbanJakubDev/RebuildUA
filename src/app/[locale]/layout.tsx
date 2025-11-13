import { ThemeProvider } from '@/src/components/ThemeProvider'
import type { Metadata } from 'next'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { Inter, Rubik, Space_Grotesk, Montserrat } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Header } from '@/src/components/Header'

import { Footer } from '@/src/components/Footer'
import { BackToTop } from '@/src/components/BackToTop'
import { CustomScrollbar } from '@/src/components/CustomScrollbar'
import './globals.css'
import { Suspense } from 'react'
import { BackgroundSlideshow } from '../../components/BackgroundSlideshow'

// 🚨 QUICK TOGGLE: Set to false to disable custom scrollbar
const ENABLE_CUSTOM_SCROLLBAR = true

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter'
})
const rubik = Rubik({
  subsets: ['arabic'],
  variable: '--rubik'
})
const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-avenir',
  weight: ['400', '700'],
  fallback: ['sans-serif']
})
export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { generateLocalizedMetadata } = await import('@/src/lib/metadata')
  return generateLocalizedMetadata({ locale: params.locale })
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Import messages directly instead of using useMessages hook
  const messages = (await import(`../../../messages/${locale}.json`)).default
  return (
    <html
      lang={locale}
      dir={locale === 'ar' || locale == 'fa' ? 'rtl' : 'ltr'}
      className={`${space_grotesk.variable} ${rubik.variable} ${montserrat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel='preload'
          href='/_next/static/css/a153700f3d793704.css'
          as='style'
        />
        <link
          rel='preload'
          href='/_next/static/media/b7387a63dd068245-s.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </head>
      <body
        className={
          ENABLE_CUSTOM_SCROLLBAR
            ? 'h-screen overflow-hidden'
            : 'flex h-screen flex-col'
        }
      >
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='dark'
          themes={['light', 'dark', 'ukrainian', 'energy', 'corporate']}
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages as AbstractIntlMessages}
          >
            <NextTopLoader
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              easing='ease'
              speed={200}
              shadow='0 0 10px #2299DD,0 0 5px #2299DD'
              color='var(--primary)'
              showSpinner={false}
            />
            <CustomScrollbar thumbWidth={50} enabled={ENABLE_CUSTOM_SCROLLBAR}>
              <div className='flex min-h-screen flex-col'>
                {/* NavBar */}
                <Header locale={locale} />

                {/* Main - vyplní zbývající místo */}
                <main className='relative flex-1'>
                  {/* Background slideshow */}
                  <BackgroundSlideshow />

                  {/* Content */}
                  <div className='relative z-10 h-full'>
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
            </CustomScrollbar>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
