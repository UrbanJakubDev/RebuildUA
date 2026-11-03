'use client'

import { useEffect, useState } from 'react'
import { CompanyTheme } from './companies'
import { AnchorLink } from './AnchorLink'

export interface SectionNavItem {
  id: string
  label: string
}

export function SectionNav({
  items,
  theme
}: {
  items: SectionNavItem[]
  theme: CompanyTheme
}) {
  const [active, setActive] = useState(items[0]?.id)
  const ids = items.map(item => item.id).join(',')

  // Zvýraznění sekce, která je právě pod lištou
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-190px 0px -60% 0px' }
    )
    ids.split(',').forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return (
    <nav
      className='sticky top-[124px] z-[15] border-b bg-white/95 backdrop-blur-md'
      style={{ borderColor: theme.border }}
    >
      <div className='mx-auto flex h-[52px] max-w-[1280px] items-stretch gap-8 px-12'>
        {items.map(({ id, label }) => (
          <AnchorLink
            key={id}
            to={id}
            onClick={() => setActive(id)}
            className='-mb-px flex items-center border-b-[3px] text-[13px] font-bold'
            style={{
              color: theme.text,
              borderBottomColor: active === id ? theme.accent : 'transparent'
            }}
          >
            {label}
          </AnchorLink>
        ))}
      </div>
    </nav>
  )
}
