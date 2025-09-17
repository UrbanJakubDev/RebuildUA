'use client'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FC, useState, useEffect, useRef } from 'react'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './ThemeSwitch'
import { Logo } from '../app/icons/Logo'
import { VideoModal } from './VideoModal'
import { IoVideocam, IoHome } from 'react-icons/io5'

interface Props {
  locale: string
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('common.navigation')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleVideoModal = () => {
    setIsVideoModalOpen(!isVideoModalOpen)
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
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
      className='border-border bg-card-bg/95 supports-[backdrop-filter]:bg-card-bg/90 sticky top-0 z-50 border-b shadow-sm backdrop-blur-sm'
    >
      <div className='mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 lg:px-8 lg:py-5'>
        {/* Left Section - Logo and Navigation */}
        <div className='flex items-center gap-6'>
          {/* Logo */}
          <Link
            lang={locale}
            href='/'
            className='flex items-center transition-opacity duration-200 hover:opacity-80'
          >
            <Logo />
          </Link>

          {/* Navigation Links */}
          <nav className='hidden items-center gap-4 md:flex'>
            <Link
              lang={locale}
              href='/'
              className='flex items-center gap-2 rounded-lg px-3 py-2 text-secondary transition-all duration-200 hover:bg-background-secondary hover:text-primary'
            >
              <IoHome size={18} />
              <span className='text-sm font-medium'>Domů</span>
            </Link>

            <button
              onClick={toggleVideoModal}
              className='flex items-center gap-2 rounded-lg px-3 py-2 text-secondary transition-all duration-200 hover:bg-background-secondary hover:text-primary'
            >
              <IoVideocam size={18} />
              <span className='text-sm font-medium'>Videa</span>
            </button>
          </nav>
        </div>

        {/* Right Section - Language & Theme */}
        <div className='flex items-center gap-4'>
          {/* Mobile menu for navigation */}
          <div className='flex items-center gap-2 md:hidden'>
            <Link
              href={`/${locale}`}
              className='rounded-lg p-2 text-secondary transition-all duration-200 hover:bg-background-secondary hover:text-primary'
              title='Domů'
            >
              <IoHome size={20} />
            </Link>

            <button
              onClick={toggleVideoModal}
              className='rounded-lg p-2 text-secondary transition-all duration-200 hover:bg-background-secondary hover:text-primary'
              title='Videa'
            >
              <IoVideocam size={20} />
            </button>
          </div>

          {/* Theme Switch - uncomment when needed */}
          {/* <ThemeSwitch /> */}

          {/* Language Switcher */}
          <LangSwitcher />
        </div>
      </div>

      {/* Video Modal - now renders as portal on full screen */}
      <VideoModal isOpen={isVideoModalOpen} onClose={closeVideoModal} />
    </header>
  )
}
