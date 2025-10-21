'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface UseInactivityRedirectOptions {
  timeout?: number // v milisekundách
  redirectPath?: string
  enabled?: boolean
}

export function useInactivityRedirect({
  timeout = 300000, // 5 minut defaultně
  redirectPath = '/',
  enabled = true
}: UseInactivityRedirectOptions = {}) {
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())

  const resetTimer = () => {
    if (!enabled) return

    lastActivityRef.current = Date.now()

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current

      // Pokud uplynulo více času než timeout, přesměrujeme
      if (timeSinceLastActivity >= timeout) {
        router.push(redirectPath)
      }
    }, timeout)
  }

  const handleActivity = () => {
    resetTimer()
  }

  useEffect(() => {
    if (!enabled) return

    // Event listenery pro detekci aktivity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'touchmove',
      'click',
      'keydown',
      'wheel'
    ]

    // Přidáme event listenery
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // Spustíme timer
    resetTimer()

    // Cleanup funkce
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [timeout, redirectPath, enabled])

  // Funkce pro manuální reset timeru
  const resetInactivityTimer = () => {
    resetTimer()
  }

  // Funkce pro získání času od poslední aktivity
  const getTimeSinceLastActivity = () => {
    return Date.now() - lastActivityRef.current
  }

  return {
    resetInactivityTimer,
    getTimeSinceLastActivity
  }
}
