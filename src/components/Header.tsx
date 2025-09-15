'use client'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FC, useState, useEffect, useRef } from 'react'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './ThemeSwitch'
import { Logo } from '../app/icons/logo'

interface Props {
  locale: string
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('common.navigation')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
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
      className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-background-secondary backdrop-blur'
    >
      <div className='mx-auto flex max-w-screen-2xl items-start justify-between p-4 lg:p-5'>
        {/* Logo */}
        <Link lang={locale} href='/' className='flex items-center'>
          <div className='flex flex-row items-center'>
            <Logo />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden flex-row items-center gap-3 lg:flex'>
          <nav className='mr-10 inline-flex gap-6'>
            <Link
              lang={locale}
              href='/about'
              className='font-medium text-text-secondary transition-colors duration-200 hover:text-primary'
            >
              {t('about')}
            </Link>
            <Link
              lang={locale}
              href='/support'
              className='font-medium text-text-secondary transition-colors duration-200 hover:text-primary'
            >
              {t('support')}
            </Link>
            <Link
              lang={locale}
              href='/examples'
              className='font-medium text-text-secondary transition-colors duration-200 hover:text-primary'
            >
              {t('examples')}
            </Link>
          </nav>
          <ThemeSwitch />
          <LangSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className='inline-flex items-center justify-center rounded-md p-2 text-primary transition-colors duration-200 hover:bg-background-secondary hover:text-button lg:hidden'
          aria-expanded={isMobileMenuOpen}
          aria-label={t('toggleMenu')}
        >
          <svg
            className='h-6 w-6'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 24 24'
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='space-y-4 border-t border-background-secondary bg-background px-4 pb-6 pt-2'>
          {/* Mobile Navigation Links */}
          <nav className='flex flex-col space-y-4'>
            <Link
              lang={locale}
              href='/about'
              className='block rounded-md px-3 py-2 text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-background-secondary hover:text-primary'
              onClick={closeMobileMenu}
            >
              {t('about')}
            </Link>
            <Link
              lang={locale}
              href='/support'
              className='block rounded-md px-3 py-2 text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-background-secondary hover:text-primary'
              onClick={closeMobileMenu}
            >
              {t('support')}
            </Link>
            <Link
              lang={locale}
              href='/examples'
              className='block rounded-md px-3 py-2 text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-background-secondary hover:text-primary'
              onClick={closeMobileMenu}
            >
              {t('examples')}
            </Link>
          </nav>

          {/* Mobile Controls */}
          <div className='border-t border-background-secondary pt-4'>
            <div className='flex items-center justify-between px-3'>
              <span className='text-sm font-medium text-primary'>
                {t('themeAndLanguage')}
              </span>
              <div className='flex items-center gap-3'>
                <ThemeSwitch />
                <LangSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
