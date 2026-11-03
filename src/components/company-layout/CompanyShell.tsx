'use client'

import { InactivityRedirectHandler } from '../InactivityRedirectHandler'
import { CompanyTheme } from './companies'

// Obsah podstránky firmy – Header/Footer dodává společný layout
export function CompanyShell({
  theme,
  children
}: {
  theme: CompanyTheme
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-1 flex-col bg-white font-['Avenir_LT_Pro',Arial,sans-serif] antialiased"
      style={{ color: theme.text }}
    >
      <InactivityRedirectHandler redirectPath='/' timeout={60000} enabled />
      {children}
    </div>
  )
}
