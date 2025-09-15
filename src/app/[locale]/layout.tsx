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
import {
  JsonLd,
  websiteSchema,
  organizationSchema
} from '@/src/components/JsonLd'
import { GoogleAnalytics } from '@/src/components/GoogleAnalytics'
import { WebVitals } from '@/src/components/WebVitals'
import { CookiesConsent } from '@/src/components/CookiesConsent'
import { Footer } from '@/src/components/Footer'
import { SocialBar } from '@/src/components/SocialBar'
import { BackToTop } from '@/src/components/BackToTop'
import './globals.css'
import { Suspense } from 'react'

// Configure Cloudinary globally
if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  // This ensures the environment variable is available
  console.log(
    'Cloudinary cloud name configured:',
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  )
} else {
  console.error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set')
}

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
      <body className='flex min-h-screen flex-col'>
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <GoogleAnalytics />
        <WebVitals />
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='system'
          themes={['light', 'dark']}
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
            <Header locale={locale} />
            <main className='mx-auto w-full max-w-screen-2xl flex-1'>
              <Suspense
                fallback={
                  <div className='flex h-32 items-center justify-center'>
                    Loading...
                  </div>
                }
              >
                {children}
              </Suspense>
            </main>
            <Footer />
            <SocialBar
              whatsappNumber='+420123456789'
              instagramUrl='https://instagram.com'
              facebookUrl='https://facebook.com'
              linkedinUrl='https://linkedin.com'
              twitterUrl='https://twitter.com'
            />
            <BackToTop />
            <Suspense fallback={null}>
              <CookiesConsent />
            </Suspense>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
