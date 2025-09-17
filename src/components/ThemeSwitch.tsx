'use client'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const themes = [
  { id: 'light', name: 'Professional Red', icon: '🔴' },
  { id: 'dark', name: 'Dark Professional', icon: '⚫' },
  { id: 'ukrainian', name: 'Ukrainian Hope', icon: '🇺🇦' },
  { id: 'energy', name: 'Energy Green', icon: '🌱' },
  { id: 'corporate', name: 'Corporate Steel', icon: '⚙️' }
]

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className='flex items-center gap-2'>
        <select
          className='text-muted-foreground border-border focus:ring-accent/20 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50'
          disabled
        >
          <option>Načítání...</option>
        </select>
      </div>
    )
  }

  const currentTheme =
    themes.find(theme => theme.id === resolvedTheme) || themes[0]

  return (
    <select
      value={resolvedTheme}
      onChange={e => setTheme(e.target.value)}
      className='text-muted-foreground border-border focus:ring-accent/20 hover:border-border-hover rounded-lg border bg-background px-3 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2'
      aria-label='Vyberte téma'
    >
      {themes.map(theme => (
        <option key={theme.id} value={theme.id}>
          {theme.icon} {theme.name}
        </option>
      ))}
    </select>
  )
}
