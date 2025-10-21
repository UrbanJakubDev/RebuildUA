'use client'

import { useEffect, useRef } from 'react'

interface UseInactivityVideoTriggerOptions {
  timeout?: number // v milisekundách
  onTimeout?: () => void
  enabled?: boolean
}

export function useInactivityVideoTrigger({
  timeout = 60000, // 60 sekund defaultně
  onTimeout,
  enabled = true
}: UseInactivityVideoTriggerOptions = {}) {
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

      // Pokud uplynulo více času než timeout, spustíme callback
      if (timeSinceLastActivity >= timeout && onTimeout) {
        onTimeout()
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
  }, [timeout, onTimeout, enabled])

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
