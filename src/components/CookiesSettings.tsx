'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useCookiesConsent } from '@/src/hooks/useCookiesConsent'
import Button from './Button'

interface CookiesSettingsProps {
  className?: string
}

export function CookiesSettings({ className = '' }: CookiesSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { preferences, updatePreferences, resetConsent } = useCookiesConsent()
  const t = useTranslations('cookies')

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === 'necessary') return // Necessary cookies nelze vypnout

    updatePreferences({ [key]: !preferences[key] })
  }

  const handleReset = () => {
    resetConsent()
    setIsOpen(false)
  }

  return (
    <>
      {/* Cookies Settings Link */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center space-x-1 text-text-secondary transition-colors hover:text-button ${className}`}
      >
        <span>{t('btnLabel')}</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'>
          <div className='max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-background shadow-xl'>
            <div className='p-6'>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-xl font-semibold text-primary'>
                  {t('preferences')}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className='text-text-secondary transition-colors hover:text-primary'
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
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <div className='space-y-4'>
                {/* Necessary cookies */}
                <div className='flex items-center justify-between rounded-lg bg-background-secondary p-3'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-medium text-primary'>
                        {t('necessary.title')}
                      </h3>
                      <span className='rounded-full bg-secondary px-2 py-1 text-xs text-button-text'>
                        {t('always')}
                      </span>
                    </div>
                    <p className='mt-1 text-sm text-text-secondary'>
                      {t('necessary.description')}
                    </p>
                  </div>
                  <input
                    type='checkbox'
                    checked={preferences.necessary}
                    disabled
                    className='h-4 w-4 rounded border-background-secondary bg-background-secondary text-secondary focus:ring-secondary'
                  />
                </div>

                {/* Analytics cookies */}
                <div className='flex items-center justify-between rounded-lg bg-background-secondary p-3'>
                  <div className='flex-1'>
                    <h3 className='font-medium text-primary'>
                      {t('analytics.title')}
                    </h3>
                    <p className='mt-1 text-sm text-text-secondary'>
                      {t('analytics.description')}
                    </p>
                  </div>
                  <input
                    type='checkbox'
                    checked={preferences.analytics}
                    onChange={() => handleToggle('analytics')}
                    className='h-4 w-4 rounded border-background-secondary bg-background-secondary text-secondary focus:ring-secondary'
                  />
                </div>

                {/* Marketing cookies */}
                <div className='flex items-center justify-between rounded-lg bg-background-secondary p-3'>
                  <div className='flex-1'>
                    <h3 className='font-medium text-primary'>
                      {t('marketing.title')}
                    </h3>
                    <p className='mt-1 text-sm text-text-secondary'>
                      {t('marketing.description')}
                    </p>
                  </div>
                  <input
                    type='checkbox'
                    checked={preferences.marketing}
                    onChange={() => handleToggle('marketing')}
                    className='h-4 w-4 rounded border-background-secondary bg-background-secondary text-secondary focus:ring-secondary'
                  />
                </div>

                {/* Functional cookies */}
                <div className='flex items-center justify-between rounded-lg bg-background-secondary p-3'>
                  <div className='flex-1'>
                    <h3 className='font-medium text-primary'>
                      {t('functional.title')}
                    </h3>
                    <p className='mt-1 text-sm text-text-secondary'>
                      {t('functional.description')}
                    </p>
                  </div>
                  <input
                    type='checkbox'
                    checked={preferences.functional}
                    onChange={() => handleToggle('functional')}
                    className='h-4 w-4 rounded border-background-secondary bg-background-secondary text-secondary focus:ring-secondary'
                  />
                </div>
              </div>

              <div className='mt-6 flex gap-3 border-t border-background-secondary pt-4'>
                <Button
                  size='small'
                  variant='secondary'
                  onClick={handleReset}
                  className='flex-1'
                >
                  {t('reset')}
                </Button>
                <Button
                  size='small'
                  onClick={() => setIsOpen(false)}
                  className='flex-1'
                >
                  {t('close')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
