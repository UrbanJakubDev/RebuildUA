'use client'

import Button from './Button'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

interface PricingItem {
  id: string
  name: string
  description: string
  price: string
  features: string[]
  popular?: boolean
}

interface PricingData {
  cs: PricingItem[]
  en: PricingItem[]
  de: PricingItem[]
}

interface PricingTableProps {
  items: PricingItem[]
  title?: string
  subtitle?: string
  className?: string
  downloadUrl?: string
}

export function PricingTable({
  items,
  title,
  subtitle,
  className = '',
  downloadUrl
}: PricingTableProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const t = useTranslations('pricingTable')

  const handleDownloadPDF = () => {
    if (downloadUrl) {
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'cenik-sluzeb.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className='mb-8 text-center sm:mb-12'>
        <h2 className='mb-3 text-2xl font-bold text-primary sm:mb-4 sm:text-3xl'>
          {title || t('defaultTitle')}
        </h2>
        <p className='mx-auto max-w-2xl text-base text-text-secondary sm:text-lg'>
          {subtitle || t('defaultSubtitle')}
        </p>

        {downloadUrl && (
          <div className='mt-4 sm:mt-6'>
            <Button
              onClick={handleDownloadPDF}
              className='mx-auto flex items-center gap-2 rounded-lg bg-button px-4 py-2 text-sm font-semibold text-button-text transition-colors duration-200 hover:bg-secondary sm:px-6 sm:py-3 sm:text-base'
            >
              <svg
                className='h-4 w-4 sm:h-5 sm:w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
              {t('downloadPdf')}
            </Button>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {items.map(item => (
          <div
            key={item.id}
            className={`relative rounded-lg border-2 bg-background shadow-lg transition-all duration-300 hover:shadow-xl ${
              item.popular
                ? 'scale-105 border-button'
                : 'border-background-secondary hover:border-text-secondary'
            } ${selectedItem === item.id ? 'ring-2 ring-button' : ''}`}
          >
            {item.popular && (
              <div className='absolute -top-3 left-1/2 -translate-x-1/2 transform'>
                <span className='rounded-full bg-button px-3 py-1 text-xs font-semibold text-button-text sm:px-4 sm:text-sm'>
                  {t('popular')}
                </span>
              </div>
            )}

            <div className='p-4 sm:p-6'>
              <div className='mb-4 text-center sm:mb-6'>
                <h3 className='mb-2 text-lg font-bold text-primary sm:text-xl'>
                  {item.name}
                </h3>
                <p className='mb-3 text-xs text-text-secondary sm:mb-4 sm:text-sm'>
                  {item.description}
                </p>
                <div className='text-2xl font-bold text-button sm:text-3xl'>
                  {item.price}
                </div>
              </div>

              <ul className='mb-4 space-y-2 sm:mb-6 sm:space-y-3'>
                {item.features.map((feature, index) => (
                  <li key={index} className='flex items-start'>
                    <svg
                      className='mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-button sm:mr-3 sm:h-5 sm:w-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='text-xs text-text-secondary sm:text-sm'>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => setSelectedItem(item.id)}
                className={`w-full rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 sm:px-4 sm:py-3 sm:text-base ${
                  item.popular
                    ? 'bg-button text-button-text hover:bg-secondary'
                    : 'bg-button-secondary text-primary hover:bg-background-secondary'
                }`}
              >
                {t('selectService')}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className='mt-6 text-center sm:mt-8'>
          <p className='text-sm text-text-secondary sm:text-base'>
            {t('selected')}{' '}
            <span className='font-semibold text-button'>
              {selectedItem &&
                items.find(item => item.id === selectedItem)?.name}
            </span>
          </p>
          <Button
            onClick={() => setSelectedItem(null)}
            className='mt-2 rounded-lg bg-button-secondary px-3 py-2 text-xs text-primary hover:bg-background-secondary sm:px-4 sm:text-sm'
          >
            {t('cancelSelection')}
          </Button>
        </div>
      )}
    </div>
  )
}
