import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export interface LocalizedMetadataParams {
  locale: string
  pageKey?: string
  customTitle?: string
  customDescription?: string
  customOgTitle?: string
  customOgDescription?: string
}

/**
 * Generuje lokalizovaná metadata pro layout nebo obecné použití
 *
 * @example
 * // V layout.tsx
 * export async function generateMetadata({ params }: { params: { locale: string } }) {
 *   return generateLocalizedMetadata({ locale: params.locale })
 * }
 */
export async function generateLocalizedMetadata({
  locale,
  pageKey,
  customTitle,
  customDescription,
  customOgTitle,
  customOgDescription
}: LocalizedMetadataParams): Promise<Metadata> {
  const t = await getTranslations('metadata')
  const pageT = pageKey ? await getTranslations('metadata.pages') : null
  
  // Get keywords as array and join them into a string
  const keywordsRaw = t.raw('site.keywords') as unknown
  const keywords = Array.isArray(keywordsRaw) ? (keywordsRaw as string[]).join(', ') : String(keywordsRaw)
  


  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'

  // Get page-specific metadata if available
  const pageTitle = pageKey && pageT ? pageT(`${pageKey}.title`) : customTitle
  const pageDescription =
    pageKey && pageT ? pageT(`${pageKey}.description`) : customDescription
  const pageOgTitle =
    pageKey && pageT ? pageT(`${pageKey}.ogTitle`) : customOgTitle
  const pageOgDescription =
    pageKey && pageT ? pageT(`${pageKey}.ogDescription`) : customOgDescription

  // Use page metadata or fall back to defaults
  const title = pageTitle || t('defaults.description')
  const description = pageDescription || t('defaults.description')
  const ogTitle = pageOgTitle || title
  const ogDescription = pageOgDescription || description

  return {
    title: {
      default: title,
      template: t('defaults.titleTemplate')
    },
    description,
    keywords,
    authors: [{ name: t('site.author') }],
    creator: t('site.creator'),
    publisher: t('site.publisher'),
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: '/en',
        cs: '/cs',
        de: '/de'
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'cs' ? 'cs_CZ' : locale === 'de' ? 'de_DE' : 'en_US',
      url: `/${locale}`,
      title: ogTitle,
      description: ogDescription,
      siteName: t('site.name'),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('site.name')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription
    }
  }
}

/**
 * Generuje metadata pro konkrétní stránku podle klíče v messages souboru
 *
 * @example
 * // V page.tsx
 * export async function generateMetadata({ params: { locale } }) {
 *   return generatePageMetadata(locale, 'home')
 * }
 *
 * // Vyžaduje v messages souborech:
 * {
 *   "metadata": {
 *     "pages": {
 *       "home": {
 *         "title": "Domů",
 *         "description": "Popis stránky...",
 *         "ogTitle": "Next.js Starter Kit - Domů",
 *         "ogDescription": "OpenGraph popis..."
 *       }
 *     }
 *   }
 * }
 */
export async function generatePageMetadata(
  locale: string,
  pageKey: string
): Promise<Metadata> {
  return generateLocalizedMetadata({ locale, pageKey })
}

/**
 * Generuje metadata s vlastními hodnotami
 *
 * @example
 * // V page.tsx s vlastními hodnotami
 * export async function generateMetadata({ params: { locale } }) {
 *   return generateCustomPageMetadata(
 *     locale,
 *     'Vlastní titulek',
 *     'Vlastní popis',
 *     'Vlastní OG titulek',
 *     'Vlastní OG popis'
 *   )
 * }
 */
export async function generateCustomPageMetadata(
  locale: string,
  title: string,
  description: string,
  ogTitle?: string,
  ogDescription?: string
): Promise<Metadata> {
  return generateLocalizedMetadata({
    locale,
    customTitle: title,
    customDescription: description,
    customOgTitle: ogTitle,
    customOgDescription: ogDescription
  })
}
