import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './navigation'
import { defaultLocale } from './i18n'

// Function to detect preferred language from Accept-Language header
function getPreferredLocale(
  acceptLanguage: string | null,
  storedLanguage?: string
): string {
  // First priority: stored language preference
  if (storedLanguage && routing.locales.includes(storedLanguage as any)) {
    return storedLanguage
  }

  if (!acceptLanguage) return defaultLocale

  // Parse Accept-Language header (e.g., "cs-CZ,cs;q=0.9,en;q=0.8,de;q=0.7")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [language, quality = '1'] = lang.trim().split(';q=')
      return {
        language: language.split('-')[0], // Extract base language (cs, en, de)
        quality: parseFloat(quality)
      }
    })
    .sort((a, b) => b.quality - a.quality) // Sort by quality

  // Find the first supported language
  for (const { language } of languages) {
    if (routing.locales.includes(language)) {
      return language
    }
  }

  return defaultLocale // fallback to default locale
}

type CustomMiddleware = (req: NextRequest) => Promise<NextRequest>
const customMiddleware: CustomMiddleware = async req => {
  console.log('Custom middleware executed before next-intl')
  return req
}

const intlMiddleware = createMiddleware(routing)

export default async function middleware(
  req: NextRequest
): Promise<NextResponse | ReturnType<typeof intlMiddleware>> {
  await customMiddleware(req)

  // Check if this is the root path and no locale is specified
  const pathname = req.nextUrl.pathname
  if (pathname === '/') {
    const storedLanguage = req.cookies.get('preferredLanguage')?.value
    const preferredLocale = getPreferredLocale(
      req.headers.get('accept-language'),
      storedLanguage
    )

    // Redirect to preferred locale if it's different from default
    if (preferredLocale !== defaultLocale) {
      const url = req.nextUrl.clone()
      url.pathname = `/${preferredLocale}`
      return NextResponse.redirect(url)
    }
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/', '/(en|ua)/:path*']
}
