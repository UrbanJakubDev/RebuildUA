'use client'

import { useMemo } from 'react'
import { JsonLd } from './JsonLd'

interface PageSchemaProps {
  title: string
  description: string
  url: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  image?: string
}

export function PageSchema({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  author,
  image
}: PageSchemaProps) {
  const pageSchema = useMemo(() => {
    // Use a stable timestamp to avoid hydration mismatch
    // This will be the same on both server and client
    const stableTimestamp = '2025-01-13T00:00:00.000Z'

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      url: url,
      mainEntity: {
        '@type': 'Article',
        headline: title,
        description: description,
        author: {
          '@type': 'Person',
          name: author || 'Your Name'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Your Company',
          logo: {
            '@type': 'ImageObject',
            url: 'https://yourdomain.com/logo.png'
          }
        },
        datePublished: publishedTime || stableTimestamp,
        dateModified: modifiedTime || stableTimestamp,
        image: image
          ? {
              '@type': 'ImageObject',
              url: image
            }
          : undefined
      }
    }
  }, [title, description, url, publishedTime, modifiedTime, author, image])

  return <JsonLd data={pageSchema} />
}
