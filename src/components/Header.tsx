'use client'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FC, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './ThemeSwitch'
import { Logo } from '../app/icons/Logo'

function IconHome({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden
    >
      <path d='M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.06l-.72-.72V20.25A1.75 1.75 0 0 1 17.69 22H6.31A1.75 1.75 0 0 1 4.56 20.25v-7.38l-.72.72a.75.75 0 0 1-1.06-1.06l8.69-8.69ZM6.06 12.81v7.44c0 .138.112.25.25.25h3.44v-4.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v4.5h3.44a.25.25 0 0 0 .25-.25v-7.44L12 6.94l-5.94 5.87Z' />
    </svg>
  )
}

function IconVideocam({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden
    >
      <path d='M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z' />
    </svg>
  )
}

interface Props {
  locale: string
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('common.navigation')
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const handleVideosClick = () => {
    router.push('/videos')
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on window resize (when switching to desktop view)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  return (
    <header
      ref={headerRef}
      className='sticky top-0 z-50 border-b border-border bg-black/95 py-2 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-black/90'
    >
      <div className='mx-auto flex max-w-[1920px] items-center justify-between px-8 py-4 lg:px-12'>
        {/* Left Section - Logo and Navigation */}
        <div className='flex items-center gap-8'>
          {/* Logo */}
          <Link
            lang={locale}
            href='/'
            className='flex scale-110 items-center transition-opacity duration-200 hover:opacity-80'
          >
            <Logo />
          </Link>

          {/* Navigation Links */}
          <nav className='hidden items-center gap-6 md:flex'>
            <Link
              lang={locale}
              href='/'
              className='flex items-center gap-3 rounded-2xl px-5 py-3 text-lg font-medium text-secondary transition-all duration-200 hover:bg-background-secondary hover:text-primary'
            >
              <IconHome size={28} />
              <span>{t('home')}</span>
            </Link>

            <button
              onClick={handleVideosClick}
              className='flex items-center gap-3 rounded-2xl px-5 py-3 text-lg font-medium text-secondary transition-all duration-200 hover:bg-background-secondary hover:text-primary'
            >
              <IconVideocam size={28} />
              <span>{t('videos')}</span>
            </button>
          </nav>
        </div>

        {/* Right Section - Language & Theme */}
        <div className='flex items-center gap-6'>
          {/* Mobile menu for navigation */}
          <div className='flex items-center gap-3 md:hidden'>
            <Link
              href={`/${locale}`}
              className='rounded-2xl p-3 text-xl text-secondary transition-all duration-200 hover:bg-background-secondary hover:text-primary'
              title={t('home')}
            >
              <IconHome size={30} />
            </Link>

            <button
              onClick={handleVideosClick}
              className='rounded-2xl p-3 text-xl text-secondary transition-all duration-200 hover:bg-background-secondary hover:text-primary'
              title={t('videos')}
            >
              <IconVideocam size={30} />
            </button>
          </div>

          {/* Theme Switch - uncomment when needed */}
          {/* <ThemeSwitch /> */}

          {/* Language Switcher */}
          <div className='bg-background-secondary/40 rounded-2xl p-3'>
            <LangSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
