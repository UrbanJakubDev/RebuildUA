import { useState, useEffect } from 'react'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export function useCookiesConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  })
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Načti uložené preference při mountování
    const consentGiven = localStorage.getItem('cookies-consent')
    if (consentGiven) {
      setHasConsent(true)

      const savedPreferences = localStorage.getItem('cookies-preferences')
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    }
  }, [])

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updated = { ...preferences, ...newPreferences }
    setPreferences(updated)

    // Ulož do localStorage
    localStorage.setItem('cookies-preferences', JSON.stringify(updated))

    // Aktualizuj Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: updated.analytics ? 'granted' : 'denied',
        marketing_storage: updated.marketing ? 'granted' : 'denied',
        functionality_storage: updated.functional ? 'granted' : 'denied'
      })
    }
  }

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    setPreferences(allAccepted)
    setHasConsent(true)
    localStorage.setItem('cookies-consent', 'true')
    localStorage.setItem('cookies-preferences', JSON.stringify(allAccepted))

    // Aktualizuj Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        marketing_storage: 'granted',
        functionality_storage: 'granted'
      })
    }
  }

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    setPreferences(onlyNecessary)
    setHasConsent(true)
    localStorage.setItem('cookies-consent', 'true')
    localStorage.setItem('cookies-preferences', JSON.stringify(onlyNecessary))

    // Deaktivuj Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        marketing_storage: 'denied',
        functionality_storage: 'denied'
      })
    }
  }

  const resetConsent = () => {
    localStorage.removeItem('cookies-consent')
    localStorage.removeItem('cookies-preferences')
    setHasConsent(false)
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    })
  }

  return {
    preferences,
    hasConsent,
    updatePreferences,
    acceptAll,
    rejectAll,
    resetConsent
  }
}
