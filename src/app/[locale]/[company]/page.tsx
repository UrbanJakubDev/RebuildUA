'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { CompanyFactory } from '@/src/components/companies'

export default function CompanyPage({
  params
}: {
  params: { company: string; locale: string }
}): JSX.Element {
  const t = useTranslations('pages.company')

  return (
    <CompanyFactory
      companyKey={params.company.toLowerCase()}
      companyName={params.company}
      t={t}
    />
  )
}
