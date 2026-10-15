import { Metadata } from 'next'
import { CompanyGrid } from '@/src/components/CompanyGrid'
import { InactivityRedirectHandler } from '@/src/components/InactivityRedirectHandler'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { generatePageMetadata } = await import('@/src/lib/metadata')
  return generatePageMetadata(locale, 'home')
}

export default function DashboardPage() {
  // Aggr a Multicont zůstávají skryté (nemazat), dokud se nerozhodne o jejich návratu
  // const hiddenCompanies = [
  //   {
  //     slug: 'Aggr',
  //     name: 'Aggr',
  //     logoUrl: '/images/aggr_logo.svg',
  //     description: 'Popis firmy A'
  //   },
  //   {
  //     slug: 'Multicont',
  //     name: 'Multicont',
  //     logoUrl: '/images/multicont.svg',
  //     description: 'Popis firmy C'
  //   }
  // ]

  const companies = [
    {
      slug: 'Gentec',
      name: 'Gentec',
      logoUrl: '/images/gentec_logo.svg',
      description: 'Popis firmy B'
    },
    {
      slug: 'Repower',
      name: 'Repower',
      logoUrl: '/images/Group_5-removebg-preview.png',
      description: 'Popis firmy D'
    },
    {
      slug: 'UKRHOLD',
      name: 'UKRHOLD'
      // logoUrl zatím chybí - dočasně zobrazen textový placeholder
    },
    {
      slug: 'Turbex',
      name: 'Turbex'
      // logoUrl zatím chybí - dočasně zobrazen textový placeholder
    }
  ]

  return (
    <>
      <CompanyGrid companies={companies} />
      <InactivityRedirectHandler
        redirectPath='/video'
        timeout={60000}
        enabled={true}
      />
    </>
  )
}
