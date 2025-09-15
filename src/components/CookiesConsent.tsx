'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Button from './Button'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export function CookiesConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Vždy povoleno
    analytics: false,
    marketing: false,
    functional: false
  })

  const t = useTranslations('cookies')

  useEffect(() => {
    // Zkontroluj, jestli už uživatel dal consent
    const consentGiven = localStorage.getItem('cookies-consent')
    if (!consentGiven) {
      setShowConsent(true)
    } else {
      // Načti uložené preference
      const savedPreferences = localStorage.getItem('cookies-preferences')
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    setPreferences(allAccepted)
    saveConsent(allAccepted)
    setShowConsent(false)
  }

  const handleAcceptSelected = () => {
    saveConsent(preferences)
    setShowConsent(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    setPreferences(onlyNecessary)
    saveConsent(onlyNecessary)
    setShowConsent(false)
  }

  const saveConsent = (cookiePrefs: CookiePreferences) => {
    localStorage.setItem('cookies-consent', 'true')
    localStorage.setItem('cookies-preferences', JSON.stringify(cookiePrefs))

    // Zde můžete přidat logiku pro aktivaci/deaktivaci cookies
    if (cookiePrefs.analytics) {
      // Aktivuj Google Analytics
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted'
      })
    } else {
      // Deaktivuj Google Analytics
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Necessary cookies nelze vypnout

    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!showConsent) return null

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 border-t border-background-secondary bg-background shadow-lg'>
      <div className='mx-auto max-w-7xl p-4'>
        {!showPreferences ? (
          // Základní consent banner
          <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
            <div className='flex-1'>
              <h3 className='mb-2 text-lg font-semibold text-primary'>
                {t('title')}
              </h3>
              <p className='text-sm text-text-secondary'>{t('description')}</p>
            </div>
            <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row'>
              <Button
                size='small'
                variant='secondary'
                onClick={() => setShowPreferences(true)}
                className='w-full sm:w-auto'
              >
                {t('customize')}
              </Button>
              <Button
                size='small'
                variant='secondary'
                onClick={handleRejectAll}
                className='w-full sm:w-auto'
              >
                {t('rejectAll')}
              </Button>
              <Button
                size='small'
                onClick={handleAcceptAll}
                className='w-full sm:w-auto'
              >
                {t('acceptAll')}
              </Button>
            </div>
          </div>
        ) : (
          // Detailní preference
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-primary'>
                {t('preferences')}
              </h3>
              <Button
                size='small'
                variant='secondary'
                onClick={() => setShowPreferences(false)}
              >
                {t('back')}
              </Button>
            </div>

            <div className='space-y-3'>
              {/* Necessary cookies */}
              <div className='flex items-center justify-between rounded-lg bg-background-secondary p-3'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <h4 className='font-medium text-primary'>
                      {t('necessary.title')}
                    </h4>
                    <span className='rounded-full bg-secondary px-2 py-1 text-xs text-button-text'>
                      {t('always')}
                    </span>
                  </div>
                  <p className='mt-1 text-sm text-text-secondary'>
                    {t('necessary.description')}
                  </p>
                </div>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={preferences.necessary}
                    disabled
                    className='h-4 w-4 rounded border-background-secondary bg-background-secondary text-secondary focus:ring-secondary'
                  />
                </div>
              </div>

              {/* Analytics cookies */}
              <div className='flex items-center justify-between rounded-lg bg-background-secondary p-3'>
                <div className='flex-1'>
                  <h4 className='font-medium text-primary'>
                    {t('analytics.title')}
                  </h4>
                  <p className='mt-1 text-sm text-text-secondary'>
                    {t('analytics.description')}
                  </p>
                </div>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className='h-4 w-4 rounded border-background-secondary bg-background-secondary text-secondary focus:ring-secondary'
                  />
                </div>
              </div>

              {/* Marketing cookies */}
              <div className='flex items-center justify-between rounded-lg bg-background-secondary p-3'>
                <div className='flex-1'>
                  <h4 className='font-medium text-primary'>
                    {t('marketing.title')}
                  </h4>
                  <p className='mt-1 text-sm text-text-secondary'>
                    {t('marketing.description')}
                  </p>
                </div>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className='h-4 w-4 rounded border-background-secondary bg-background-secondary text-secondary focus:ring-secondary'
                  />
                </div>
              </div>

              {/* Functional cookies */}
              <div className='flex items-center justify-between rounded-lg bg-background-secondary p-3'>
                <div className='flex-1'>
                  <h4 className='font-medium text-primary'>
                    {t('functional.title')}
                  </h4>
                  <p className='mt-1 text-sm text-text-secondary'>
                    {t('functional.description')}
                  </p>
                </div>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={preferences.functional}
                    onChange={() => togglePreference('functional')}
                    className='h-4 w-4 rounded border-background-secondary bg-background-secondary text-secondary focus:ring-secondary'
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 border-t border-background-secondary pt-4 sm:flex-row'>
              <Button
                size='small'
                variant='secondary'
                onClick={handleRejectAll}
                className='w-full sm:w-auto'
              >
                {t('rejectAll')}
              </Button>
              <Button
                size='small'
                onClick={handleAcceptSelected}
                className='w-full sm:w-auto'
              >
                {t('savePreferences')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
