'use client'

import { useState, useEffect } from 'react'
import { CompanyCard } from './CompanyCard'

interface Company {
  slug: string
  name: string
  logoUrl: string
  description?: string
}

interface CompanyGridProps {
  companies: Company[]
}

export function CompanyGrid({ companies }: CompanyGridProps) {
  const [glowingCardIndex, setGlowingCardIndex] = useState<number | null>(null)
  const [isGlowing, setIsGlowing] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  // Detect low-end devices / Raspberry Pi
  useEffect(() => {
    // Check if user prefers reduced motion (accessibility + performance)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Detect low-end devices / Raspberry Pi
    // Check hardware concurrency (CPU cores) - Raspberry Pi typically has 4
    const lowEndDevice =
      navigator.hardwareConcurrency <= 4 || prefersReducedMotion
    setIsLowEndDevice(lowEndDevice)
  }, [])

  // Random card selection logic - optimized for Raspberry Pi
  useEffect(() => {
    // Check device capability (re-evaluate each time)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const deviceIsLowEnd =
      navigator.hardwareConcurrency <= 4 || prefersReducedMotion

    // Adjust interval based on device capability
    // Raspberry Pi: 15 seconds (less frequent), other devices: 5 seconds
    const intervalTime = deviceIsLowEnd ? 15000 : 5000

    // On low-end devices, reduce glow duration
    const glowDuration = deviceIsLowEnd ? 1000 : 2000

    const interval = setInterval(() => {
      // Select random card
      const randomIndex = Math.floor(Math.random() * companies.length)
      setGlowingCardIndex(randomIndex)
      setIsGlowing(true)

      // Stop glowing after specified duration
      setTimeout(() => {
        setIsGlowing(false)
        // Keep the index for a moment to show the "Explore More" text
        setTimeout(() => setGlowingCardIndex(null), 1000)
      }, glowDuration)
    }, intervalTime)

    return () => clearInterval(interval)
  }, [companies.length])

  return (
    <div className='grid h-full w-full grid-cols-2 grid-rows-2 gap-10 px-10 py-10'>
      {companies.map((company, index) => (
        <CompanyCard
          key={company.slug}
          companySlug={company.slug}
          companyName={company.name}
          logoUrl={company.logoUrl}
          description={company.description}
          isGlowing={glowingCardIndex === index && isGlowing}
          isLowEndDevice={isLowEndDevice}
        />
      ))}
    </div>
  )
}
