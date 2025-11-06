'use client'

import { ThemeProvider } from '@/src/components/ThemeProvider'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { Space_Grotesk } from 'next/font/google'
import { useEffect, useState } from 'react'
import '../[locale]/globals.css'
import enMessages from '../../../messages/en.json'
import uaMessages from '../../../messages/ua.json'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const messagesMap: Record<string, AbstractIntlMessages> = {
  en: enMessages as unknown as AbstractIntlMessages,
  ua: uaMessages as unknown as AbstractIntlMessages
}

export default function VideosLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [locale, setLocale] = useState<string>('en')
  const [messages, setMessages] = useState<AbstractIntlMessages>(
    enMessages as unknown as AbstractIntlMessages
  )

  // Detect locale and load messages
  useEffect(() => {
    let detectedLocale = 'en'

    if (typeof window !== 'undefined') {
      // Try to get locale from cookie
      const cookies = document.cookie.split(';')
      const localeCookie = cookies.find(c =>
        c.trim().startsWith('NEXT_LOCALE=')
      )
      if (localeCookie) {
        const localeValue = localeCookie.split('=')[1]?.trim()
        if (localeValue && (localeValue === 'en' || localeValue === 'ua')) {
          detectedLocale = localeValue
        }
      } else {
        // Try to get from localStorage
        const storedLocale =
          localStorage.getItem('locale') ||
          localStorage.getItem('preferredLanguage')
        if (storedLocale && (storedLocale === 'en' || storedLocale === 'ua')) {
          detectedLocale = storedLocale
        } else {
          // Try to detect from browser language
          const browserLang = navigator.language.split('-')[0]
          if (browserLang === 'uk' || browserLang === 'ua') {
            detectedLocale = 'ua'
          }
        }
      }
    }

    setLocale(detectedLocale)
    setMessages(messagesMap[detectedLocale] || enMessages)
  }, [])

  return (
    <html
      lang={locale}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className='h-screen w-screen overflow-hidden bg-white'>
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='dark'
          themes={['light', 'dark', 'ukrainian', 'energy', 'corporate']}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
