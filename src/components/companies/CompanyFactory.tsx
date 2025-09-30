'use client'

import React from 'react'
import { CompanyComponent, CompanyPageProps } from './types'

// Import all company components
import { AggrCompany } from './AggrCompany'
import { GentecCompany } from './GentecCompany'
import { RepowerCompany } from './RepowerCompany'
import { MulticontCompany } from './MulticontCompany'

// Company registry mapping
const companyComponents: Record<string, CompanyComponent> = {
  aggr: AggrCompany,
  gentec: GentecCompany,
  repower: RepowerCompany,
  multicont: MulticontCompany
}

// Fallback component for unknown companies
function DefaultCompany({
  companyKey,
  companyName,
  t
}: CompanyPageProps): JSX.Element {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-4xl font-bold text-gray-800'>
          Company &quot;{companyName}&quot; not found
        </h1>
        <p className='text-gray-600'>
          The requested company page is not available.
        </p>
      </div>
    </div>
  )
}

export function CompanyFactory({
  companyKey,
  companyName,
  t
}: CompanyPageProps): JSX.Element {
  // Normalize company key to lowercase for consistent lookup
  const normalizedKey = companyKey.toLowerCase()

  // Get the appropriate component or fallback to default
  const CompanyComponent = companyComponents[normalizedKey] || DefaultCompany

  return (
    <CompanyComponent companyKey={companyKey} companyName={companyName} t={t} />
  )
}

// Export the registry for potential future use
export { companyComponents }
