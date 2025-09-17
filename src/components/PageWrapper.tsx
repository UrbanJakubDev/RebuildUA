'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumbs } from './Breadcrumbs'

interface PageWrapperProps {
  children: ReactNode
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  showBreadcrumbs?: boolean
  className?: string
}

export function PageWrapper({
  children,
  title,
  description,
  image,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  showBreadcrumbs = true,
  className = ''
}: PageWrapperProps) {
  const pathname = usePathname()

  // Automaticky generovat title a description z pathname pokud nejsou poskytnuty
  const autoTitle =
    title ||
    pathname
      .split('/')
      .pop()
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') ||
    'Page'

  const autoDescription =
    description || `Learn more about ${autoTitle.toLowerCase()} on our website.`

  // Automaticky generovat URL z pathname
  const url = pathname

  return (
    <>
  

      {/* Breadcrumbs pokud jsou povoleny */}
      {showBreadcrumbs && <Breadcrumbs />}

      {/* Hlavní obsah */}
      <div className={className}>{children}</div>
    </>
  )
}

// Jednoduchá varianta pro rychlé použití
export function SimplePageWrapper({
  children,
  className = '',
  showBreadcrumbs = true
}: {
  children: ReactNode
  className?: string
  showBreadcrumbs?: boolean
}) {
  return (
    <PageWrapper showBreadcrumbs={showBreadcrumbs} className={className}>
      {children}
    </PageWrapper>
  )
}

// Varianta pro stránky s Next.js metadaty
interface PageWrapperWithMetadataProps extends PageWrapperProps {
  metadata?: any // Metadata jsou nyní volitelné
}

export function PageWrapperWithMetadata({
  children,
  metadata,
  image,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  showBreadcrumbs = true,
  className = ''
}: PageWrapperWithMetadataProps) {
  const pathname = usePathname()

  // Použít metadata pokud jsou dostupná, jinak fallback
  const title = metadata?.title || 'Page'
  const description = metadata?.description || 'Page description'
  const url = metadata?.openGraph?.url || pathname

  return (
    <>
      {showBreadcrumbs && <Breadcrumbs />}

      <div className={className}>{children}</div>
    </>
  )
}
