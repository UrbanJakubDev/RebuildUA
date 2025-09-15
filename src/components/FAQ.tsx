'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

interface FAQData {
  cs: FAQItem[]
  en: FAQItem[]
  de: FAQItem[]
}

interface FAQProps {
  items: FAQItem[]
  title?: string
  subtitle?: string
  className?: string
  grouped?: boolean
}

export function FAQ({
  items,
  title,
  subtitle,
  className = '',
  grouped = false
}: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const t = useTranslations('faq')

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const toggleAll = () => {
    if (openItems.size === items.length) {
      setOpenItems(new Set())
    } else {
      setOpenItems(new Set(items.map(item => item.id)))
    }
  }

  const renderFAQItem = (item: FAQItem) => (
    <div
      key={item.id}
      className='mb-3 sm:mb-4 overflow-hidden rounded-lg border border-background-secondary'
    >
      <button
        onClick={() => toggleItem(item.id)}
        className='hover:bg-dropdown-hover flex w-full items-center justify-between bg-background-secondary px-4 sm:px-6 py-3 sm:py-4 text-left transition-colors duration-200'
        aria-expanded={openItems.has(item.id)}
        aria-controls={`faq-${item.id}`}
      >
        <span className='pr-3 sm:pr-4 text-sm sm:text-base font-semibold text-primary'>{item.question}</span>
        <svg
          className={`h-4 w-4 sm:h-5 sm:w-5 text-text-secondary transition-transform duration-200 ${
            openItems.has(item.id) ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      <div
        id={`faq-${item.id}`}
        className={`bg-background px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 ${
          openItems.has(item.id)
            ? 'max-h-96 opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
        aria-hidden={!openItems.has(item.id)}
      >
        <div className='text-sm sm:text-base leading-relaxed text-text-secondary'>{item.answer}</div>
      </div>
    </div>
  )

  if (grouped && items.some(item => item.category)) {
    const groupedItems = items.reduce(
      (acc, item) => {
        const category = item.category || t('defaultCategory')
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(item)
        return acc
      },
      {} as Record<string, FAQItem[]>
    )

    return (
      <div className={`mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className='mb-8 sm:mb-12 text-center'>
          <h2 className='mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-primary'>
            {title || t('defaultTitle')}
          </h2>
          <p className='mx-auto max-w-2xl text-base sm:text-lg text-text-secondary'>
            {subtitle || t('defaultSubtitle')}
          </p>
        </div>

        <div className='mb-4 sm:mb-6 text-center'>
          <button
            onClick={toggleAll}
            className='text-sm sm:text-base font-medium text-button underline hover:text-secondary'
          >
            {openItems.size === items.length
              ? t('collapseAll')
              : t('expandAll')}
          </button>
        </div>

        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className='mb-8 sm:mb-12'>
            <h3 className='mb-4 sm:mb-6 text-center text-lg sm:text-xl font-semibold text-primary'>
              {category}
            </h3>
            <div className='space-y-3 sm:space-y-4'>{categoryItems.map(renderFAQItem)}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className='mb-8 sm:mb-12 text-center'>
        <h2 className='mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-primary'>
          {title || t('defaultTitle')}
        </h2>
        <p className='mx-auto max-w-2xl text-base sm:text-lg text-text-secondary'>
          {subtitle || t('defaultSubtitle')}
        </p>
      </div>

      <div className='mb-4 sm:mb-6 text-center'>
        <button
          onClick={toggleAll}
          className='text-sm sm:text-base font-medium text-button underline hover:text-secondary'
        >
          {openItems.size === items.length ? t('collapseAll') : t('expandAll')}
        </button>
      </div>

      <div className='space-y-3 sm:space-y-4'>{items.map(renderFAQItem)}</div>

      {/* Search functionality */}
      <div className='mt-8 sm:mt-12 rounded-lg bg-background-secondary p-4 sm:p-6'>
        <h3 className='mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-primary'>
          {t('notFoundTitle')}
        </h3>
        <p className='mb-3 sm:mb-4 text-sm sm:text-base text-text-secondary'>{t('notFoundDescription')}</p>
        <div className='flex flex-col gap-3 sm:gap-4 sm:flex-row'>
          <button className='rounded-lg bg-button px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-button-text transition-colors duration-200 hover:bg-secondary'>
            {t('contactUs')}
          </button>
          <button className='rounded-lg bg-button-secondary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-primary transition-colors duration-200 hover:bg-background'>
            {t('askQuestion')}
          </button>
        </div>
      </div>
    </div>
  )
}
