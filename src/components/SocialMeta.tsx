'use client'

interface SocialMetaProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export function SocialMeta({
  title,
  description,
  image = '/og-image.png',
  url,
  type = 'website'
}: SocialMetaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  return (
    <>
      {/* Open Graph */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={fullImageUrl} />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content='Next.js Starter Kit' />
      <meta property='og:locale' content='en_US' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullImageUrl} />
      <meta name='twitter:creator' content='@yourusername' />
      <meta name='twitter:site' content='@yourusername' />

      {/* Additional Meta */}
      <meta name='description' content={description} />
      <meta
        name='keywords'
        content='Next.js, React, TypeScript, Tailwind CSS, Boilerplate, Starter Kit'
      />
      <meta name='author' content='Your Name' />
      <meta name='robots' content='index, follow' />

      {/* Canonical URL */}
      <link rel='canonical' href={fullUrl} />
    </>
  )
}
