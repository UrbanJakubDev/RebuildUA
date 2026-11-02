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
      name: 'UKRHOLD',
      logoUrl: '/images/ukrhold/image5.png'
    },
    {
      slug: 'Turbex',
      name: 'Turbex',
      logoUrl: '/images/turbex/image3.png'
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
