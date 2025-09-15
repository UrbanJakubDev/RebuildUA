'use client'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className='flex items-center gap-2'>
        <button
          className='text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground group relative rounded-lg p-2.5 transition-all duration-200 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50'
          disabled
        >
          <FiSun className='h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
        </button>
        <button
          className='text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground group relative rounded-lg p-2.5 transition-all duration-200 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50'
          disabled
        >
          <FiMoon className='h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
        </button>
      </div>
    )
  }

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className='text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground focus:ring-accent/20 group relative rounded-lg p-2.5 transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
      aria-label={
        resolvedTheme === 'light'
          ? 'Přepnout na tmavé téma'
          : 'Přepnout na světlé téma'
      }
    >
      {/* Hover background effect */}
      <div className='from-accent/0 via-accent/10 to-accent/0 absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100' />

      {/* Icon with smooth transitions */}
      <div className='relative z-10'>
        {resolvedTheme === 'light' ? (
          <FiMoon className='h-4 w-4 transition-all duration-200 group-hover:rotate-12 group-hover:scale-110' />
        ) : (
          <FiSun className='h-4 w-4 transition-all duration-200 group-hover:-rotate-12 group-hover:scale-110' />
        )}
      </div>

      {/* Subtle glow effect on hover */}
      <div className='bg-accent/5 absolute inset-0 rounded-lg opacity-0 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-none' />
    </button>
  )
}
