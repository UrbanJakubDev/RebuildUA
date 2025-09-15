'use client'

import { useTranslations } from 'next-intl'
import Button from './Button'
import { useState } from 'react'

interface CallToActionProps {
  phoneNumber: string
  email: string
  className?: string
  title?: string
  description?: string
}

export function CallToAction({
  phoneNumber,
  email,
  className = '',
  title = 'Potřebujete pomoci?',
  description = 'Kontaktujte nás přímo'
}: CallToActionProps) {
  const [isCopied, setIsCopied] = useState(false)
  const t = useTranslations('callToAction')
  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber.replace(/\s/g, '')}`, '_self')
  }

  const handleEmailClick = () => {
    window.open(`mailto:${email}`, '_self')
  }

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <div
      className={`rounded-lg p-6 shadow-xl sm:p-8 ${className}`}
      style={{ background: 'var(--span-bg)' }}
    >
      <div className='mb-4 text-center sm:mb-6'>
        <h3 className='mb-2 text-xl font-bold text-button-text sm:text-2xl'>
          {title}
        </h3>
        <p className='text-sm text-button-text opacity-90 sm:text-base'>
          {description}
        </p>
      </div>

      <div className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4'>
        <Button
          onClick={handlePhoneClick}
          className='flex items-center gap-2 rounded-lg bg-background px-4 py-2 text-sm font-semibold text-button-text transition-colors duration-200 hover:bg-background-secondary sm:px-6 sm:py-3 sm:text-base'
        >
          <svg
            className='h-4 w-4 sm:h-5 sm:w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
          </svg>
          {t('phone')}
        </Button>

        <Button
          onClick={handleEmailClick}
          className='flex items-center gap-2 rounded-lg bg-background px-4 py-2 text-sm font-semibold text-button-text transition-colors duration-200 hover:bg-background-secondary sm:px-6 sm:py-3 sm:text-base'
        >
          <svg
            className='h-4 w-4 sm:h-5 sm:w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
            <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
          </svg>
          {t('email')}
        </Button>

        <Button
          onClick={handleEmailCopy}
          className='flex items-center gap-2 rounded-lg border-2 border-button-text bg-transparent px-4 py-2 text-sm font-semibold text-button-text transition-colors duration-200 hover:bg-background hover:text-primary sm:px-6 sm:py-3 sm:text-base'
        >
          <svg
            className='h-4 w-4 sm:h-5 sm:w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
            <path d='M8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
            <path d='M8 11a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
            <path d='M8 15a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
          </svg>
          {isCopied ? t('copied') : t('copy')}
        </Button>
      </div>

      <div className='mt-4 text-center text-xs text-button-text opacity-90 sm:mt-6 sm:text-sm'>
        <p>
          {t('phone')}: <span className='font-semibold'>{phoneNumber}</span>
        </p>
        <p>
          {t('email')}: <span className='font-semibold'>{email}</span>
        </p>
      </div>
    </div>
  )
}
