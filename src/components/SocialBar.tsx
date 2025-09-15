'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface SocialLink {
  name: string
  icon: React.ReactNode
  url?: string
  onClick?: () => void
  color: string
  hoverColor: string
}

interface SocialBarProps {
  whatsappNumber?: string
  whatsappMessage?: string
  instagramUrl?: string
  facebookUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  className?: string
}

export function SocialBar({
  whatsappNumber = '+420123456789',
  whatsappMessage,
  instagramUrl = '#',
  facebookUrl = '#',
  linkedinUrl = '#',
  twitterUrl = '#',
  className = ''
}: SocialBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const t = useTranslations('whatsapp')

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage || t('message'))
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\s/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const socialLinks: SocialLink[] = [
    {
      name: 'WhatsApp',
      icon: (
        <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488' />
        </svg>
      ),
      onClick: handleWhatsAppClick,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12.017 0C8.396 0 7.989.016 6.756.072 5.526.127 4.719.241 4.001.48a5.892 5.892 0 00-2.13 1.389A5.904 5.904 0 00.48 4.001C.241 4.719.127 5.526.072 6.756.016 7.99 0 8.396 0 12.017c0 3.622.016 4.028.072 5.261.055 1.23.169 2.037.408 2.755.216.79.518 1.46 1.389 2.13a5.892 5.892 0 002.13 1.389c.718.239 1.525.353 2.755.408 1.233.056 1.639.072 5.261.072 3.622 0 4.028-.016 5.261-.072 1.23-.055 2.037-.169 2.755-.408a5.892 5.892 0 002.13-1.389 5.904 5.904 0 001.389-2.13c.239-.718.353-1.525.408-2.755.056-1.233.072-1.639.072-5.261 0-3.622-.016-4.028-.072-5.261-.055-1.23-.169-2.037-.408-2.755a5.892 5.892 0 00-1.389-2.13A5.904 5.904 0 0019.999.48c-.718-.239-1.525-.353-2.755-.408C16.011.016 15.605 0 12.017 0zM12.017 2.163c3.557 0 3.976.016 5.378.072 1.298.059 2.002.277 2.472.459.621.243 1.064.533 1.529.998.464.464.754.908.998 1.529.182.47.4 1.174.459 2.472.056 1.402.072 1.821.072 5.378 0 3.557-.016 3.976-.072 5.378-.059 1.298-.277 2.002-.459 2.472-.243.621-.534 1.064-.998 1.529-.465.464-.908.754-1.529.998-.47.182-1.174.4-2.472.459-1.401.056-1.821.072-5.378.072-3.557 0-3.976-.016-5.378-.072-1.298-.059-2.002-.277-2.472-.459a4.128 4.128 0 01-1.529-.998 4.108 4.108 0 01-.998-1.529c-.182-.47-.4-1.174-.459-2.472-.056-1.402-.072-1.821-.072-5.378 0-3.557.016-3.976.072-5.378.059-1.298.277-2.002.459-2.472.243-.621.533-1.064.998-1.529.464-.464.908-.754 1.529-.998.47-.182 1.174-.4 2.472-.459 1.402-.056 1.821-.072 5.378-.072zm0 3.681a6.173 6.173 0 100 12.346 6.173 6.173 0 100-12.346zm0 10.183a4.01 4.01 0 110-8.02 4.01 4.01 0 010 8.02zm7.846-10.405a1.441 1.441 0 11-2.883 0 1.441 1.441 0 012.883 0z' />
        </svg>
      ),
      url: instagramUrl,
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
        </svg>
      ),
      url: facebookUrl,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
      url: linkedinUrl,
      color: 'bg-blue-700',
      hoverColor: 'hover:bg-blue-800'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
        </svg>
      ),
      url: twitterUrl,
      color: 'bg-blue-400',
      hoverColor: 'hover:bg-blue-500'
    }
  ]

  return (
    <div className={`fixed bottom-20 right-4 z-40 ${className}`}>
      <div className='flex flex-col-reverse items-end space-y-2 space-y-reverse'>
        {/* Social Links */}
        <div
          className={`flex flex-col space-y-2 transition-all duration-300 ${
            isExpanded
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-4 opacity-0'
          }`}
        >
          {socialLinks.map(link => (
            <button
              key={link.name}
              onClick={
                link.onClick ||
                (() => link.url && window.open(link.url, '_blank'))
              }
              className={`
                flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg 
                transition-all duration-200 hover:scale-110 hover:shadow-xl
                ${link.color} ${link.hoverColor}
              `}
              aria-label={link.name}
              title={link.name}
            >
              {link.icon}
            </button>
          ))}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            flex h-12 w-12 items-center justify-center rounded-full bg-button text-button-text shadow-lg 
            transition-all duration-300 hover:scale-110 hover:bg-secondary hover:shadow-xl
            ${isExpanded ? 'rotate-45' : 'rotate-0'}
          `}
          aria-label={
            isExpanded ? 'Zavřít sociální sítě' : 'Otevřít sociální sítě'
          }
          title={isExpanded ? 'Zavřít' : 'Sociální sítě'}
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
