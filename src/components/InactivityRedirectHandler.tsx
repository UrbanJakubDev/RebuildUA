'use client'

import { useInactivityRedirect } from '@/src/hooks/useInactivityRedirect'

interface InactivityRedirectHandlerProps {
  redirectPath?: string
  timeout?: number
  enabled?: boolean
}

export function InactivityRedirectHandler({
  redirectPath = '/video',
  timeout = 60000,
  enabled = true
}: InactivityRedirectHandlerProps) {
  useInactivityRedirect({
    timeout,
    redirectPath,
    enabled
  })

  return null // This component doesn't render anything
}

