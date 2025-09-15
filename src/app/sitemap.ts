import { MetadataRoute } from 'next'
import { locales } from '@/src/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'

  // Base routes for each locale
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }
  ]

  // Generate localized routes
  const localizedRoutes: MetadataRoute.Sitemap = []

  locales.forEach(locale => {
    routes.forEach(route => {
      const localizedUrl =
        locale === 'en'
          ? route.url
          : `${baseUrl}/${locale}${route.url === baseUrl ? '' : route.url.replace(baseUrl, '')}`

      localizedRoutes.push({
        url: localizedUrl,
        lastModified: route.lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority
      })
    })
  })

  return localizedRoutes
}
