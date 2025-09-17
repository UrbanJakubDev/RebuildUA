'use client'

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
  return (
    <div className='grid h-full w-full grid-cols-2 grid-rows-2 gap-10'>
      {companies.map(company => (
        <CompanyCard
          key={company.slug}
          companySlug={company.slug}
          companyName={company.name}
          logoUrl={company.logoUrl}
          description={company.description}
        />
      ))}
    </div>
  )
}
