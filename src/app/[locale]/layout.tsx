import { ThemeProvider } from '@/src/components/ThemeProvider'
import type { Metadata } from 'next'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { Rubik, Space_Grotesk, Montserrat } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { CustomScrollbar } from '@/src/components/CustomScrollbar'
import './globals.css'
import { SiteChrome } from '@/src/components/SiteChrome'
import enMessages from '../../../messages/en.json'
import uaMessages from '../../../messages/ua.json'

// 🚨 QUICK TOGGLE: Set to false to disable custom scrollbar
const ENABLE_CUSTOM_SCROLLBAR = true

const messagesByLocale = {
  en: enMessages,
  ua: uaMessages
} as const

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
  const messages =
    messagesByLocale[locale as keyof typeof messagesByLocale] ?? enMessages
  return (
    <html
      lang={locale}
      dir={locale === 'ar' || locale == 'fa' ? 'rtl' : 'ltr'}
      className={`${space_grotesk.variable} ${rubik.variable} ${montserrat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head />
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
            messages={messages as unknown as AbstractIntlMessages}
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
              <SiteChrome locale={locale}>{children}</SiteChrome>
            </CustomScrollbar>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
