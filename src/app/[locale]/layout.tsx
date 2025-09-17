import { ThemeProvider } from '@/src/components/ThemeProvider'
import type { Metadata } from 'next'
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages
} from 'next-intl'
import { Inter, Rubik, Space_Grotesk } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Header } from '@/src/components/Header'

import { Footer } from '@/src/components/Footer'
import { BackToTop } from '@/src/components/BackToTop'
import './globals.css'
import { Suspense } from 'react'
import { BackgroundSlideshow } from '../../components/BackgroundSlideshow'

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
export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { generateLocalizedMetadata } = await import('@/src/lib/metadata')
  return generateLocalizedMetadata({ locale: params.locale })
}

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()
  return (
    <html
      lang={locale}
      dir={locale === 'ar' || locale == 'fa' ? 'rtl' : 'ltr'}
      className={`${space_grotesk.variable} ${rubik.variable} scroll-smooth`}
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
      <body className='flex h-screen flex-col'>
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='light'
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
            {/* NavBar */}
            <Header locale={locale} />

            {/* Main - vyplní zbývající místo */}
            <main className='relative flex-1'>
              {/* Background slideshow */}
              <BackgroundSlideshow />

              {/* Content */}
              <div className='relative z-10 h-full px-10 py-10'>
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
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
