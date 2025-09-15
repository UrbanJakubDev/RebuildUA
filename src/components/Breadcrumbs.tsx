'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { JsonLd, breadcrumbSchema } from './JsonLd'
import Link from 'next/link'
import { useMemo } from 'react'

interface BreadcrumbItem {
  name: string
  href: string
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const t = useTranslations('common.navigation')

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { name: t('home') || 'Home', href: '/' }
    ]

    let currentPath = ''
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Skip locale segment
      if (index === 0 && ['en', 'cs', 'de'].includes(segment)) {
        return
      }

      // Generate readable name from segment
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toLowerCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({
        name: t(name) || name,
        href: currentPath
      })
    })

    return breadcrumbs
  }, [pathname, t])

  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          breadcrumbs.map(item => ({ name: item.name, url: item.href }))
        )}
      />
      <nav aria-label='Breadcrumb' className='mb-4'>
        <ol className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 ps-4 pt-1'>
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className='flex items-center'>
              {index > 0 && <span className='mx-2 text-gray-400'>/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className='font-medium text-gray-900 dark:text-gray-100'>
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className='transition-colors hover:text-gray-900 dark:hover:text-gray-100'
                >
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
