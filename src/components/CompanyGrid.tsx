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

  // Random card selection logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Select random card
      const randomIndex = Math.floor(Math.random() * companies.length)
      setGlowingCardIndex(randomIndex)
      setIsGlowing(true)

      // Stop glowing after 2 seconds
      setTimeout(() => {
        setIsGlowing(false)
        // Keep the index for a moment to show the "Explore More" text
        setTimeout(() => setGlowingCardIndex(null), 1000)
      }, 2000)
    }, 5000) // Trigger every 5 seconds

    return () => clearInterval(interval)
  }, [companies.length])

  return (
    <div className='grid h-full w-full grid-cols-2 grid-rows-2 gap-10'>
      {companies.map((company, index) => (
        <CompanyCard
          key={company.slug}
          companySlug={company.slug}
          companyName={company.name}
          logoUrl={company.logoUrl}
          description={company.description}
          isGlowing={glowingCardIndex === index && isGlowing}
        />
      ))}
    </div>
  )
}
