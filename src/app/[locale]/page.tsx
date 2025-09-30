import { Metadata } from 'next'
import { CompanyGrid } from '@/src/components/CompanyGrid'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { generatePageMetadata } = await import('@/src/lib/metadata')
  return generatePageMetadata(locale, 'home')
}

export default function DashboardPage() {
  // Ukázková data firem - můžete je nahradit skutečnými daty
  const companies = [
    {
      slug: 'Aggr',
      name: 'Aggr',
      logoUrl: '/images/aggr_logo.svg', // Logo Aggr
      description: 'Popis firmy A'
    },
    {
      slug: 'Gentec',
      name: 'Gentec',
      logoUrl: '/images/gentec_logo.svg', // Logo Gentec
      description: 'Popis firmy B'
    },
    {
      slug: 'Multicont',
      name: 'Multicont',
      logoUrl: '/images/multicont.svg', // Logo Multicont
      description: 'Popis firmy C'
    },
    {
      slug: 'Repower',
      name: 'Repower',
      logoUrl: '/images/Group_5-removebg-preview.png', // Logo Repower
      description: 'Popis firmy D'
    }
  ]

  return <CompanyGrid companies={companies} />
}
