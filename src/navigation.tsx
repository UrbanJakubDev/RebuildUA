'use client'
import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale } from './i18n'
import { appConfig } from './config/app'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: appConfig.multiLang.enabled ? 'always' : 'never'
})

export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/support': '/support'
}

// Vytvoříme navigation funkce pouze pokud je multi-language support povolen
const navigationConfig = appConfig.multiLang.enabled
  ? createNavigation(routing)
  : {
      Link: ({ href, children, ...props }: any) => {
        return (
          <a href={href} {...props}>
            {children}
          </a>
        )
      },
      redirect: (href: string) => (window.location.href = href),
      usePathname: () => window.location.pathname,
      useRouter: () => ({
        push: (href: string) => (window.location.href = href),
        replace: (href: string) => window.location.replace(href)
      }),
      getPathname: (href: string) => href
    }

export const { Link, redirect, usePathname, useRouter } = navigationConfig

// Fallback getPathname function
export const getPathname = (href: string) => href
