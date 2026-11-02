'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export type HomeView = 'classic' | 'new'

const STORAGE_KEY = 'rebuildua:homeView'
const DEFAULT_VIEW: HomeView = 'new'

// Volba vzhledu úvodní stránky; pamatuje si ji prohlížeč (kiosk) v localStorage
export function useHomeView() {
  const [view, setView] = useState<HomeView>(DEFAULT_VIEW)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'classic' || stored === 'new') setView(stored)
    } catch {
      // localStorage nemusí být dostupný – zůstane výchozí vzhled
    }
  }, [])

  const changeView = useCallback((next: HomeView) => {
    setView(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignorujeme – volba platí aspoň do obnovení stránky
    }
  }, [])

  return [view, changeView] as const
}

export function HomeViewSwitch({
  view,
  onChange,
  variant
}: {
  view: HomeView
  onChange: (view: HomeView) => void
  /** dark = původní černá patička, light = patička nového designu */
  variant: 'dark' | 'light'
}) {
  const t = useTranslations('common.footer')
  const options: HomeView[] = ['classic', 'new']

  const activeClass =
    variant === 'dark'
      ? 'border-white bg-white text-black'
      : 'border-[#2c2a29] bg-[#2c2a29] text-white'
  const idleClass =
    variant === 'dark'
      ? 'border-white/30 text-text-secondary hover:border-white/60'
      : 'border-[#d1d1d1] text-[#2c2a29] hover:border-[#2c2a29]'

  return (
    <div className='flex items-center gap-2 text-[13px]'>
      <span
        className={
          variant === 'dark' ? 'text-text-secondary' : 'text-[#2c2a29]'
        }
      >
        {t('view')}
      </span>
      {options.map(option => (
        <button
          key={option}
          type='button'
          onClick={() => onChange(option)}
          className={`rounded-full border px-3 py-1 font-bold transition-colors ${
            view === option ? activeClass : idleClass
          }`}
        >
          {t(option === 'classic' ? 'viewClassic' : 'viewNew')}
        </button>
      ))}
    </div>
  )
}
