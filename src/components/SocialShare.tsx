'use client'

import { useState } from 'react'

interface SocialShareProps {
  title: string
  description: string
  url?: string
  hashtags?: string[]
}

export function SocialShare({
  title,
  description,
  url,
  hashtags = []
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const currentUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'
  const fullUrl = url ? `${baseUrl}${url}` : currentUrl

  const shareData = {
    title,
    text: description,
    url: fullUrl
  }

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}&hashtags=${hashtags.join(',')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${fullUrl}`)}`
  }

  const handleNativeShare = async () => {
    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function'
    ) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      console.log('Error copying link:', error)
    }
  }

  const openShareUrl = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400')
  }

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <span className='mr-2 text-sm text-gray-600 dark:text-gray-400'>
        Share:
      </span>

      {/* Native Share Button */}
      {typeof navigator !== 'undefined' &&
        typeof navigator.share === 'function' && (
          <button
            onClick={handleNativeShare}
            className='rounded-md bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600'
          >
            Share
          </button>
        )}

      {/* Social Media Buttons */}
      <button
        onClick={() => openShareUrl(shareUrls.twitter)}
        className='rounded-md bg-blue-400 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-500'
        aria-label='Share on Twitter'
      >
        Twitter
      </button>

      <button
        onClick={() => openShareUrl(shareUrls.facebook)}
        className='rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700'
        aria-label='Share on Facebook'
      >
        Facebook
      </button>

      <button
        onClick={() => openShareUrl(shareUrls.linkedin)}
        className='rounded-md bg-blue-700 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-800'
        aria-label='Share on LinkedIn'
      >
        LinkedIn
      </button>

      <button
        onClick={() => openShareUrl(shareUrls.whatsapp)}
        className='rounded-md bg-green-500 px-3 py-1 text-sm text-white transition-colors hover:bg-green-600'
        aria-label='Share on WhatsApp'
      >
        WhatsApp
      </button>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className={`rounded-md px-3 py-1 text-sm transition-colors ${
          copied
            ? 'bg-green-500 text-white'
            : 'bg-gray-500 text-white hover:bg-gray-600'
        }`}
        aria-label='Copy link'
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}
